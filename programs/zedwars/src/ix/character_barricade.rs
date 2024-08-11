use anchor_lang::prelude::*;
use arrayref::array_ref;

use bubblegum_cpi::get_asset_id;
use solana_program::{log::sol_log_compute_units, program::invoke, system_instruction};
use verify_player::VerifyPlayerArgs;

use crate::{
    account_realloc, ensure_rent_exempt,
    errors::ZedWarsError,
    is_authenticated,
    state::{Character, Config, ConfigVar, Event, MapTile, Session, Skill, Stat, TileType, WeeklyMissionType}, constants::PlayerVerifyArgs, ix::verify_player, session_reimburse,
};

use super::SplAccountCompression;

/// The accounts for the character barricade instruction
#[derive(Accounts)]
pub struct CharacterBarricadeAccounts<'info> {
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
    /// The original tile account
    #[account(mut,seeds=[MapTile::SEED_PREFIX,tile.x.to_le_bytes().as_slice(),tile.y.to_le_bytes().as_slice()],bump)]
    pub tile: Account<'info, MapTile>,
    /// The config account
    #[account(seeds=[Config::SEED_PREFIX],bump)]
    pub config: Box<Account<'info, Config>>,
    /// The sysvar slot hashes account
    /// CHECK: Only the address needs to be checked
    #[account(address=solana_program::sysvar::slot_hashes::id())]
    pub sysvar_slot_hashes: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
    pub compression_program: Program<'info, SplAccountCompression>,
}

/// The handler for the character barricade instruction
pub fn handle_character_barricade<'info>(ctx: Context<'_, '_, '_, 'info, CharacterBarricadeAccounts<'info>>, args: PlayerVerifyArgs) -> Result<()> {
    sol_log_compute_units();
    is_authenticated!(ctx);

    let asset_id = get_asset_id(ctx.accounts.player_merkle_tree.key, args.index.into());

    //check if the proof matches the player
    require_eq!(asset_id, ctx.accounts.character.mint, ZedWarsError::NoAuthority);
    sol_log_compute_units();
    //check if the signer owns the player   
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
    let tile = &mut ctx.accounts.tile;
    let config = &ctx.accounts.config;
    let clock = Clock::get()?;
    let now = clock.unix_timestamp;
    let slot = clock.slot;

    require!(tile.tile_type != TileType::Street, ZedWarsError::CannotBarricadeTile);
    // check if the character is alive
    require_gt!(character.hp, 0, ZedWarsError::CharacterIsDead);

    // checks if the tile is valid
    require!(
        character.x == tile.x && character.y == tile.y,
        ZedWarsError::InvalidTile
    );

    // The character cannot be a zombie
    require!(!character.is_zombie, ZedWarsError::CharacterIsAZombie);

    // Must have barricade builder skill
    require!(
        character.has_skill(Skill::BarricadeBuilder),
        ZedWarsError::MissingBarricadeBuilderSkill
    );

    // update character
    character.use_energy(
        config.get_config_variable(ConfigVar::BarricadeEnergyCost) as u8,
        now,
        slot,
        config,
        tile,
    )?;
    sol_log_compute_units();
    // random generator
    let recent_slothashes = &ctx.accounts.sysvar_slot_hashes;
    let data = recent_slothashes.data.borrow();
    let most_recent = array_ref![data, 12, 8];

    // seed for the random number is a combination of the slot_hash - timestamp
    let seed = u64::from_le_bytes(*most_recent).saturating_sub(now as u64);

    let rng = (seed >> 32) as u32;
    // check if the barricade is successful
    if Character::is_action_successful(tile.barricade_success_rate(), rng) {
        // barricade the tile
        tile.num_barricades += 1;
        character.gain_xp(config.get_config_variable(ConfigVar::BarricadeXpGain) * 2, config);
        character.update_stat(Stat::BarricadesBuilt, 1);
        character.progress_mission(WeeklyMissionType::BuildBarricades, 1, config);

        ctx.accounts.character.add_event(Event {
            message: "Successfully barricaded the tile.".to_string(),
            timestamp: now,
            severity: 4,
            block: clock.slot,
        });
    } else {
        character.gain_xp(config.get_config_variable(ConfigVar::BarricadeXpGain), config);
        ctx.accounts.character.add_event(Event {
            message: "Failed to barricade the tile.".to_string(),
            timestamp: now,
            severity: 3,
            block: clock.slot,
        });
    }

    account_realloc!(ctx, character, ctx.accounts.character.size());
    ensure_rent_exempt!(ctx, signer, character);

    session_reimburse!(ctx, session, signer);

    Ok(())
}
