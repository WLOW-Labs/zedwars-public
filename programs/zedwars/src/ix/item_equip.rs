use crate::{
    account_realloc, ensure_rent_exempt,
    errors::ZedWarsError,
    events::ActionSuccessful,
    is_authenticated,
    state::{Character, Config, ConfigVar, Event, Item, ItemType, MapTile, Session}, constants::PlayerVerifyArgs, ix::verify_player, session_reimburse,
};
use anchor_lang::prelude::*;
use bubblegum_cpi::get_asset_id;
use solana_program::{program::invoke, system_instruction};
use verify_player::VerifyPlayerArgs;

use super::SplAccountCompression;

/// The accounts for the item equip instruction
#[derive(Accounts)]
pub struct ItemEquipAccounts<'info> {
    /// The signer
    /// It could be the delegate or the player.
    #[account(mut)]
    pub signer: Signer<'info>,
    /// The optional session account
    /// It is only present if the signer is the delegate.
    #[account(mut,seeds=[Session::SEED_PREFIX,player.key().as_ref()],bump)]
    pub session: Option<Account<'info, Session>>,
    /// The player wallet account
    /// CHECK: Checked in the handler.
    #[account(mut)]
    pub player: UncheckedAccount<'info>,
    /// CHECK: unsafe
    #[account(mut)]
    pub player_merkle_tree: UncheckedAccount<'info>,
    /// The character account
    #[account(mut,seeds=[Character::SEED_PREFIX,character.mint.as_ref()],bump)]
    pub character: Account<'info, Character>,
    /// The item account
    #[account(seeds=[Item::SEED_PREFIX,item.id.to_le_bytes().as_slice()],bump)]
    pub item: Account<'info, Item>,
    /// The tile account
    #[account(mut,seeds=[MapTile::SEED_PREFIX,tile.x.to_le_bytes().as_slice(),tile.y.to_le_bytes().as_slice()],bump)]
    pub tile: Account<'info, MapTile>,
    /// The config account
    #[account(seeds=[Config::SEED_PREFIX],bump)]
    pub config: Box<Account<'info, Config>>,
    pub system_program: Program<'info, System>,
    pub compression_program: Program<'info, SplAccountCompression>,
}

/// The handler for the item equip instruction
pub fn handle_item_equip<'info>(ctx: Context<'_, '_, '_, 'info, ItemEquipAccounts<'info>>, args: PlayerVerifyArgs) -> Result<()> {
    is_authenticated!(ctx);

    let asset_id = get_asset_id(ctx.accounts.player_merkle_tree.key, args.index.into());

    //check if the proof matches the player
    require_eq!(asset_id, ctx.accounts.character.mint, ZedWarsError::NoAuthority);
    
    //check if the signer owns the player
    msg!("Checking if signer owns the nft");    
    let res = verify_player(VerifyPlayerArgs{
        data_hash: args.data_hash,
        creator_hash: args.creator_hash,
        root: args.root,
        index: args.index,
        compression_program: ctx.accounts.compression_program.to_account_info(),
        merkle_tree: ctx.accounts.player_merkle_tree.to_account_info(),
        owner: ctx.accounts.player.key(),
        delegate: ctx.accounts.player.key(),
        proof_accounts: ctx.remaining_accounts.to_vec()
    });
    require!(res.is_ok(), ZedWarsError::NoAuthority);

    let character = &mut ctx.accounts.character;

    // check if the character is alive
    msg!("Checking if the character is alive");
    require_gt!(character.hp, 0, ZedWarsError::CharacterIsDead);

    // the character must be on the tile
    msg!("Checking if the character is on the tile");
    require!(
        character.x == ctx.accounts.tile.x && character.y == ctx.accounts.tile.y,
        ZedWarsError::InvalidTile
    );

    // check if the item is in the inventory, if it's not a zombie weapon
    let is_zombie_weapon = if let ItemType::Weapon { weapon_type, .. } = ctx.accounts.item.item_type {
        weapon_type == crate::state::WeaponType::ZombieBite || weapon_type == crate::state::WeaponType::ZombieClaw
    } else {
        false
    };
    let item_index = character.inventory.iter().position(|x| x == &ctx.accounts.item.id);
    if !is_zombie_weapon {
        msg!("Checking if the item is in the inventory");
        require!(item_index.is_some(), ZedWarsError::MissingItem);
    }

    if !is_zombie_weapon {
        require!(!character.is_zombie, ZedWarsError::NoItemZombie)
    }

    // check if the item is equippable
    msg!("Checking if the item is equippable");
    require!(
        matches!(
            ctx.accounts.item.item_type,
            ItemType::Weapon { .. } | ItemType::Armor { .. } | ItemType::Backpack { .. }
        ),
        ZedWarsError::InvalidItem
    );

    // the character must not have an item equipped in the same slot
    //msg!("Checking if the character has an item equipped in the same slot");
    //match ctx.accounts.item.item_type {
    //    crate::state::ItemType::Weapon { .. } => {
    //        require!(
    //            character.equipped_items.weapon.is_none(),
    //            ZedWarsError::InvalidCharacterState
    //        );
    //    }
    //    crate::state::ItemType::Armor { .. } => {
    //        require!(
    //            character.equipped_items.armor.is_none(),
    //            ZedWarsError::InvalidCharacterState
    //        );
    //    }
    //    _ => {}
    //}

    // equip the item
    character.equip_item(&ctx.accounts.item);

    // remove item from inventory
    if !is_zombie_weapon {
        msg!("Removing item from inventory");
        ctx.accounts.character.inventory.remove(item_index.unwrap());
    }
    let slot = Clock::get()?.slot;
    // use energy
    ctx.accounts.character.use_energy(
        ctx.accounts.config.get_config_variable(ConfigVar::EquipItemEnergyCost) as u8,
        Clock::get()?.unix_timestamp,
        slot,
        &ctx.accounts.config,
        &mut ctx.accounts.tile,
    )?;

    emit!(ActionSuccessful {
        character: ctx.accounts.character.key(),
        action: "Equipped Item".to_string(),
    });

    ctx.accounts.character.add_event(Event {
        message: format!("Successfully equipped {}", ctx.accounts.item.name),
        timestamp: Clock::get()?.unix_timestamp,
        severity: 3,
        block: Clock::get()?.slot,
    });

    account_realloc!(ctx, character, ctx.accounts.character.size());
    ensure_rent_exempt!(ctx, signer, character);
    session_reimburse!(ctx, session, signer);

    Ok(())
}
