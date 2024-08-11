use crate::{
    account_realloc,
    constants::PlayerVerifyArgs,
    ensure_rent_exempt,
    errors::ZedWarsError,
    events::ActionSuccessful,
    is_authenticated,
    ix::verify_player,
    session_reimburse,
    state::{
        Character, Config, ConfigVar, ConsumableType, Event, Item, ItemKind, ItemRarity, ItemType, MapTile, Session,
        Skill, Stat, TileType,
    },
};
use anchor_lang::prelude::*;
use bubblegum_cpi::get_asset_id;
use solana_program::{program::invoke, system_instruction};
use verify_player::VerifyPlayerArgs;

use super::SplAccountCompression;

#[derive(Accounts)]
pub struct ItemCraftAccounts<'info> {
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
    /// The tile account
    #[account(mut,seeds=[MapTile::SEED_PREFIX,tile.x.to_le_bytes().as_slice(),tile.y.to_le_bytes().as_slice()],bump)]
    pub tile: Account<'info, MapTile>,
    /// The item to craft
    #[account(mut,seeds=[Item::SEED_PREFIX,item.id.to_le_bytes().as_slice()],bump)]
    pub item: Account<'info, Item>,
    /// The config account
    #[account(mut,seeds=[Config::SEED_PREFIX],bump)]
    pub config: Box<Account<'info, Config>>,
    /// The system program
    pub system_program: Program<'info, System>,
    /// The sysvar slot hashes account
    /// CHECK: Only the address needs to be checked
    #[account(address=solana_program::sysvar::slot_hashes::id())]
    pub sysvar_slot_hashes: UncheckedAccount<'info>,
    pub compression_program: Program<'info, SplAccountCompression>,
}

pub fn handle_item_craft<'info>(
    ctx: Context<'_, '_, '_, 'info, ItemCraftAccounts<'info>>,
    args: PlayerVerifyArgs,
) -> Result<()> {
    is_authenticated!(ctx);

    let asset_id = get_asset_id(ctx.accounts.player_merkle_tree.key, args.index.into());

    //check if the proof matches the player
    require_eq!(asset_id, ctx.accounts.character.mint, ZedWarsError::NoAuthority);

    //check if the signer owns the player
    msg!("Checking if signer owns the nft");
    let res = verify_player(VerifyPlayerArgs {
        data_hash: args.data_hash,
        creator_hash: args.creator_hash,
        root: args.root,
        index: args.index,
        compression_program: ctx.accounts.compression_program.to_account_info(),
        merkle_tree: ctx.accounts.player_merkle_tree.to_account_info(),
        owner: ctx.accounts.player.key(),
        delegate: ctx.accounts.player.key(),
        proof_accounts: ctx.remaining_accounts.to_vec(),
    });
    require!(res.is_ok(), ZedWarsError::NoAuthority);

    let now = Clock::get()?.unix_timestamp;
    let slot = Clock::get()?.slot;
    // check if the character is alive
    msg!("Checking if the character is alive");
    require_gt!(ctx.accounts.character.hp, 0, ZedWarsError::CharacterIsDead);

    // The character must not be zombie
    msg!("Checking if the character is a zombie");
    require!(!ctx.accounts.character.is_zombie, ZedWarsError::CannotBeZombie);

    // checks if the tile is valid
    msg!("Checking if the tile is valid");
    require!(
        ctx.accounts.character.x == ctx.accounts.tile.x && ctx.accounts.character.y == ctx.accounts.tile.y,
        ZedWarsError::InvalidTile
    );

    // The tile must have a generator
    msg!("Checking if the tile has a generator");
    require!(ctx.accounts.tile.has_generator, ZedWarsError::MissingGenerator);

    // The tile must be powered
    msg!("Checking if the tile is powered");
    require!(ctx.accounts.tile.has_power_until > now, ZedWarsError::TileNotPowered);

    // craft item
    msg!("Crafting item");
    if let ItemType::Consumable { consumable_type, .. } = ctx.accounts.item.item_type {
        // The character must have space in the inventory
        msg!("Checking if the character has space in the inventory");
        require!(
            ctx.accounts.character.inventory.len()
                < ctx.accounts.config.get_config_variable(ConfigVar::BaseInventorySize) as usize
                    + ctx.accounts.character.backpack_space as usize,
            ZedWarsError::InventoryFull
        );

        match consumable_type {
            ConsumableType::Revive => {
                // The character must have the revive syringe crafter skill
                msg!("Checking if the character has the revive syringe crafter skill");
                require!(
                    ctx.accounts.character.has_skill(Skill::RevivalSyringeCrafter),
                    ZedWarsError::InvalidCharacterState
                );
                // The tile must be zed corp building
                msg!("Checking if the tile is a zed corp building");
                require!(
                    ctx.accounts.tile.tile_type == TileType::ZedCorp,
                    ZedWarsError::WrongTileForCrafting
                );

                ctx.accounts.character.use_energy(
                    5, //TODO: config variable this
                    now,
                    slot,
                    &ctx.accounts.config,
                    &mut ctx.accounts.tile,
                )?;

                ctx.accounts.character.gain_xp(50, &ctx.accounts.config);

                ctx.accounts.character.inventory.push(ctx.accounts.item.id);
            }
            ConsumableType::Energy => {
                // The character must have the adrenaline syringe crafter skill
                msg!("Checking if the character has the adrenaline syringe crafter skill");
                require!(
                    ctx.accounts.character.has_skill(Skill::AdrenalineSyringeCrafter),
                    ZedWarsError::InvalidCharacterState
                );
                // The tile must be zed corp building
                msg!("Checking if the tile is a zed corp building");
                require!(
                    ctx.accounts.tile.tile_type == TileType::ZedCorp,
                    ZedWarsError::WrongTileForCrafting
                );

                ctx.accounts.character.use_energy(
                    30, //TODO: config variable this
                    now,
                    slot,
                    &ctx.accounts.config,
                    &mut ctx.accounts.tile,
                )?;

                ctx.accounts.character.gain_xp(75, &ctx.accounts.config);

                ctx.accounts.character.inventory.push(ctx.accounts.item.id);
            }
            ConsumableType::Xp => {
                // The character must have the ExperienceSyringeCrafter skill
                msg!("Checking if the character has the ExperienceSyringeCrafter skill");
                require!(
                    ctx.accounts.character.has_skill(Skill::ExperienceSyringeCrafter),
                    ZedWarsError::InvalidCharacterState
                );
                // The tile must be zed corp building
                msg!("Checking if the tile is a zed corp building");
                require!(
                    ctx.accounts.tile.tile_type == TileType::ZedCorp,
                    ZedWarsError::WrongTileForCrafting
                );

                ctx.accounts.character.use_energy(
                    25, //TODO: config variable this
                    now,
                    slot,
                    &ctx.accounts.config,
                    &mut ctx.accounts.tile,
                )?;

                ctx.accounts.character.gain_xp(250, &ctx.accounts.config);


                ctx.accounts.character.inventory.push(ctx.accounts.item.id);
            }
            _ => {}
        }
    } else {
        match ctx.accounts.item.item_type {
            ItemType::Weapon { .. } | ItemType::Armor { .. } | ItemType::Backpack { .. } => {
                msg!("Checking if they are crafting a valid item");
                require!(
                    ctx.accounts.item.kind != ItemKind::None && ctx.accounts.item.kind != ItemKind::Consumable,
                    ZedWarsError::InvalidCraftingItem
                );

                if ctx.accounts.item.rarity == ItemRarity::Legendary {
                    msg!("Check if there is an available legendary item");
                    require_gt!(
                        ctx.accounts.config.legendary_items[ctx.accounts.item.kind as usize].len(),
                        0,
                        ZedWarsError::NoLegendaryAvailable
                    );
                }

                // the corresponding blueprints to an item are item_id + 9
                let blueprint_id = ctx.accounts.item.id + 9;

                msg!("Check if they have enough blueprint pieces");
                let blueprint_count = ctx
                    .accounts
                    .character
                    .inventory
                    .iter()
                    .filter(|&item_id| *item_id == blueprint_id)
                    .count();

                //TODO: Use config variables for these
                let blueprints_needed = match ctx.accounts.item.rarity {
                    ItemRarity::Rare => 5,
                    ItemRarity::Epic => 7,
                    ItemRarity::Legendary => 9,
                    _ => 0,
                };
                require!(
                    blueprint_count >= blueprints_needed,
                    ZedWarsError::InsufficientBlueprints
                );

                msg!("Deleting blueprint pieces");
                for _ in 0..blueprints_needed {
                    let pos = ctx
                        .accounts
                        .character
                        .inventory
                        .iter()
                        .position(|&x| x == blueprint_id)
                        .unwrap();
                    ctx.accounts.character.inventory.remove(pos);
                }
                if ctx.accounts.item.rarity == ItemRarity::Legendary {
                    let legendary_item_id = ctx.accounts.config.legendary_items[ctx.accounts.item.kind as usize].pop();
                    require!(legendary_item_id.is_some(), ZedWarsError::NoLegendaryAvailable);
                    ctx.accounts.character.inventory.push(legendary_item_id.unwrap());
                } else {
                    ctx.accounts.character.inventory.push(ctx.accounts.item.id);
                }
            }
            _ => {
                // ignore other types
            }
        }
    }

    ctx.accounts.character.add_event(Event {
        message: format!("{} successfully crafted.", ctx.accounts.item.name),
        timestamp: now,
        severity: 4,
        block: Clock::get()?.slot,
    });

    ctx.accounts.character.update_stat(Stat::ItemsCrafted, 1);
    ctx.accounts.character.last_attacked_at = now;

    account_realloc!(ctx, character, ctx.accounts.character.size());
    account_realloc!(ctx, config, ctx.accounts.config.size());
    ensure_rent_exempt!(ctx, signer, character);
    ensure_rent_exempt!(ctx, signer, config);

    emit!(ActionSuccessful {
        character: ctx.accounts.character.key(),
        action: "Crafting successful.".to_string(),
    });

    session_reimburse!(ctx, session, signer);

    Ok(())
}
