use anchor_lang::prelude::*;

use bubblegum_cpi::get_asset_id;
use solana_program::{program::invoke, system_instruction};

use crate::{
    account_realloc, ensure_rent_exempt,
    errors::ZedWarsError,
    events::ActionSuccessful,
    is_authenticated,
    state::{Character, Config, ConfigVar, EquipSlot, Event, Session}, constants::PlayerVerifyArgs, ix::{VerifyPlayerArgs, verify_player}, session_reimburse,
};

use super::SplAccountCompression;

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct ItemUnequipArgs {
    pub slot: EquipSlot,
    pub player_verify: PlayerVerifyArgs,
}


/// The accounts for the item unequip instruction
#[derive(Accounts)]
pub struct ItemUnequipAccounts<'info> {
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
    /// The config account
    #[account(seeds=[Config::SEED_PREFIX],bump)]
    pub config: Account<'info, Config>,
    /// The system program.
    pub system_program: Program<'info, System>,
    pub compression_program: Program<'info, SplAccountCompression>,
}

/// The handler for the item equip instruction
pub fn handle_item_unequip<'info>(ctx: Context<'_, '_, '_, 'info, ItemUnequipAccounts<'info>>, args: ItemUnequipArgs) -> Result<()> {
    is_authenticated!(ctx);

    let asset_id = get_asset_id(ctx.accounts.player_merkle_tree.key, args.player_verify.index.into());

    //check if the proof matches the player
    require_eq!(asset_id, ctx.accounts.character.mint, ZedWarsError::NoAuthority);
    
    //check if the signer owns the player
    msg!("Checking if signer owns the nft");    
    let res = verify_player(VerifyPlayerArgs{
        data_hash: args.player_verify.data_hash,
        creator_hash: args.player_verify.creator_hash,
        root: args.player_verify.root,
        index: args.player_verify.index,
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

    // the character must have an item equipped in the slot
    msg!("Checking if the character has an item equipped in the slot");
    let item_id = match args.slot {
        EquipSlot::Weapon => {
            require!(
                character.equipped_items.weapon.is_some(),
                ZedWarsError::UnequipEmptySlot
            );
            character.equipped_items.weapon.unwrap()
        }
        EquipSlot::Armor => {
            require!(
                character.equipped_items.armor.is_some(),
                ZedWarsError::UnequipEmptySlot
            );
            character.equipped_items.armor.unwrap()
        }
        EquipSlot::Backpack => {
            require!(
                character.equipped_items.backpack.is_some(),
                ZedWarsError::UnequipEmptySlot
            );
            character.equipped_items.backpack.unwrap()
        }
    };

    // the character must have enough free inventory space
    msg!("Checking if the character has enough free inventory space");
    require!(
        character.inventory.len()
            < ctx.accounts.config.get_config_variable(ConfigVar::BaseInventorySize) as usize
                + character.backpack_space as usize,
        ZedWarsError::InventoryFull
    );

    // unequip item
    ctx.accounts.character.unequip_item(args.slot);

    emit!(ActionSuccessful {
        character: ctx.accounts.character.key(),
        action: "Unequipped Item.".to_string(),
    });

    ctx.accounts.character.add_event(Event {
        message: format!("Unequipped @{}@.", item_id),
        timestamp: Clock::get()?.unix_timestamp,
        severity: 3,
        block: Clock::get()?.slot,
    });

    account_realloc!(ctx, character, ctx.accounts.character.size());
    ensure_rent_exempt!(ctx, player, character);
    session_reimburse!(ctx, session, signer);

    Ok(())
}
