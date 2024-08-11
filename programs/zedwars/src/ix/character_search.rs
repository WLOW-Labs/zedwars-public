use crate::{
    account_realloc, ensure_rent_exempt, session_reimburse,
    errors::ZedWarsError,
    events::ItemFound,
    is_authenticated,
    state::{Character, Config, ConfigVar, Event, MapTile, Session, Skill, Stat, TileType, WeeklyMissionType}, constants::PlayerVerifyArgs, ix::verify_player,
};
use anchor_lang::prelude::*;
use arrayref::array_ref;
use bubblegum_cpi::get_asset_id;
use solana_program::{program::invoke, system_instruction};
use verify_player::VerifyPlayerArgs;

use super::SplAccountCompression;

/// The accounts for the `character_search` instruction.
#[derive(Accounts)]
pub struct CharacterSearchAccounts<'info> {
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

/// handle the `character_search` instruction
pub fn handle_character_search<'info>(ctx: Context<'_, '_, '_, 'info, CharacterSearchAccounts<'info>>, args: PlayerVerifyArgs) -> Result<()> {
    // check if the player is the owner of the character
    msg!("Checking if the player is the owner of the character");
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

    let recent_slothashes = &ctx.accounts.sysvar_slot_hashes;
    let data = recent_slothashes.data.borrow();
    let most_recent = array_ref![data, 12, 8];

    let clock = Clock::get()?;
    let slot = Clock::get()?.slot;
    // seed for the random number is a combination of the slot_hash - timestamp
    let seed = u64::from_le_bytes(*most_recent).saturating_sub(clock.unix_timestamp as u64);

    msg!("Seed: {}", seed);

    let now = Clock::get()?.unix_timestamp;

    // check if the character is alive
    msg!("Checking if the character is alive");
    require_gt!(ctx.accounts.character.hp, 0, ZedWarsError::CharacterIsDead);

    // street cannot be searched
    msg!("Checking if the tile is searchable");
    require!(
        ctx.accounts.tile.tile_type != TileType::Street,
        ZedWarsError::InvalidTile
    );

    // The character must not be a zombie
    msg!("Checking if the character is a zombie");
    require!(!ctx.accounts.character.is_zombie, ZedWarsError::InvalidCharacterState);

    // check if there's room in the inventory
    msg!("Checking if there's room in the inventory");
    require!(
        ctx.accounts.character.inventory.len()
            < ctx.accounts.config.get_config_variable(ConfigVar::BaseInventorySize) as usize
                + ctx.accounts.character.backpack_space as usize,
        ZedWarsError::InventoryFull
    );

    // check if the character is on the tile they are searching
    msg!("Checking if the character is on the tile they are searching");
    require!(
        (ctx.accounts.character.x == ctx.accounts.tile.x) && (ctx.accounts.character.y == ctx.accounts.tile.y),
        ZedWarsError::SearchingWrongTile
    );

    // Check if the tile has been exhausted
    ctx.accounts.tile.update_tile_loot(&ctx.accounts.config);
    require_gt!(ctx.accounts.tile.lootable_items, 0, ZedWarsError::TileExhausted);

    // update character
    ctx.accounts.character.use_energy(
        ctx.accounts.config.get_config_variable(ConfigVar::SearchEnergyCost) as u8,
        now,
        slot,
        &ctx.accounts.config,
        &mut ctx.accounts.tile,
    )?;

    let rng = (seed >> 32) as u32;

    // is the action successful?
    let mut search_success_rate = ctx.accounts.config.search_success_rates[ctx.accounts.tile.tile_type.to_usize()];
    let mut bonus_multiplier = 10000; // Start with a base multiplier of 10000 (equivalent to no change).

    // Add bonuses for skills and conditions
    if ctx.accounts.character.has_skill(Skill::TechLooter) && ctx.accounts.tile.tile_type == TileType::ZedCorp {
        bonus_multiplier += ctx.accounts.config.get_config_variable(ConfigVar::LooterSearchSuccessRateBonus);
    }
    if ctx.accounts.character.has_skill(Skill::Looter) {
        bonus_multiplier += ctx.accounts.config.get_config_variable(ConfigVar::LooterSearchSuccessRateBonus);
    }
    if ctx.accounts.character.has_skill(Skill::AdvancedLooter) {
        bonus_multiplier += ctx.accounts.config.get_config_variable(ConfigVar::AdvancedLooterSearchSuccessRateBonus);
    }

    // Boost for building power
    if ctx.accounts.tile.has_power_until > now {
        bonus_multiplier += 2500; // Add 25% bonus
    }

    // Boost for player premium status
    if ctx.accounts.character.has_premium {
        bonus_multiplier += 2500; // Add 25% bonus
    }

    // Apply the accumulated bonuses in one operation
    search_success_rate = search_success_rate * bonus_multiplier / 10000;

    // Make it so we can't find anything if it's an arcade without power
    if ctx.accounts.tile.tile_type == TileType::Arcade && ctx.accounts.tile.has_power_until < now {
        search_success_rate = 0;
    }
    if Character::is_action_successful(search_success_rate, rng) {
        let item_found = ctx.accounts.tile.search_tile(rng, &ctx.accounts.config, ctx.accounts.character.has_skill(Skill::AdvancedLooter) && ctx.accounts.character.has_premium);

        if let Some(mut item_id) = item_found {

            // item_id = 0 means we hit the rdt so we need to grab an item from the rdt 
            if item_id == 0 {
                msg!("Rare drop table hit, grabbing item from RDT");
                let rdt_item_idx = ctx.accounts.config.rare_drop_table[(rng % ctx.accounts.config.rare_drop_table.len() as u32) as usize] as usize;
                item_id = ctx.accounts.config.rare_drop_table[rdt_item_idx];
                //remove the found item from the rare drop table so no one else can find it
                //TODO: Add some way to auto add back in raffle ticket items so there is at least always something in the rdt
                ctx.accounts.config.rare_drop_table.remove(rdt_item_idx);
            }
            // gain item
            ctx.accounts.character.inventory.push(item_id);
            // reset last attacked at
            ctx.accounts.character.last_attacked_at = now;
            // gain xp
            ctx.accounts.character.gain_xp(
                ctx.accounts.config.get_config_variable(ConfigVar::SearchSuccessXpGain),
                &ctx.accounts.config,
            );
            msg!("Item found: {}", item_id);

            emit!(ItemFound { 
                character: ctx.accounts.character.mint.key(),
                item_id
            });

            ctx.accounts.character.add_event(Event {
                message: format!("Item found: @{}@", item_id),
                timestamp: now,
                severity: 4,
                block: Clock::get()?.slot,
            });

            ctx.accounts.character.update_stat(Stat::ItemsFound, 1);
            ctx.accounts.character.progress_mission(WeeklyMissionType::FindItems, 1, &ctx.accounts.config);
        
            // Reduce available loot by 1
            ctx.accounts.tile.lootable_items -= 1;
        }
    } else {
        ctx.accounts.character.add_event(Event {
            message: "Failed to find any items.".to_string(),
            timestamp: now,
            severity: 3,
            block: Clock::get()?.slot,
        });
    }

    // gain xp
    ctx.accounts.character.gain_xp(
        ctx.accounts.config.get_config_variable(ConfigVar::SearchXpGain),
        &ctx.accounts.config,
    );

    account_realloc!(ctx, character, ctx.accounts.character.size());
    account_realloc!(ctx, config, ctx.accounts.config.size());
    ensure_rent_exempt!(ctx, signer, character);
    ensure_rent_exempt!(ctx, signer, config);


    session_reimburse!(ctx, session, signer);

    Ok(())
}
