use anchor_lang::prelude::*;
use arrayref::array_ref;

use bubblegum_cpi::get_asset_id;
use solana_program::{program::invoke, system_instruction};
use verify_player::VerifyPlayerArgs;

use crate::{
    account_realloc, ensure_rent_exempt,
    errors::ZedWarsError,
    events::{ActionSuccessful, ActionUnsuccessful, TileBarricadeUpdated},
    is_authenticated,
    state::{Character, Config, ConfigVar, Event, MapTile, Session, Skill, Stat, WeeklyMissionType}, constants::PlayerVerifyArgs, ix::verify_player, session_reimburse,
};

use super::SplAccountCompression;

/// the accounts for the character destroy barricade instruction
#[derive(Accounts)]
pub struct CharacterDestroyBarricadeAccounts<'info> {
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

/// the handler for the character destroy barricade instruction
pub fn handle_character_destroy_barricade<'info>( ctx: Context<'_, '_, '_, 'info, CharacterDestroyBarricadeAccounts<'info>>, args: PlayerVerifyArgs) -> Result<()> {
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
    let tile = &mut ctx.accounts.tile;
    let config = &ctx.accounts.config;
    let now = Clock::get()?.unix_timestamp;
    let slot = Clock::get()?.slot;

    // check if the character is alive
    msg!("Checking if the character is alive");
    require_gt!(character.hp, 0, ZedWarsError::CharacterIsDead);

    // the character cannot be human
    msg!("Checking if the character is zombie");
    require!(character.is_zombie, ZedWarsError::CannotBeHuman);

    // checks if the original tile is valid
    msg!("Checking if the original tile is valid");
    require!(
        (character.x == tile.x && character.y == tile.y) || (tile.is_adjacent(&character.x, &character.y)),
        ZedWarsError::InvalidTile
    );

    msg!("Checking if the player has the barricade destroyer skill");
    require!(
        character.has_skill(Skill::BarricadeDestroyer),
        ZedWarsError::MissingBarricadeDestroyerSkill
    );

    require_gte!(tile.num_barricades, 1, ZedWarsError::TileNotBarricaded);

    // update character
    character.use_energy(
        config.get_config_variable(ConfigVar::DestroyBarricadeEnergyCost) as u8,
        now,
        slot,
        config,
        tile,
    )?;

    // random generator
    let recent_slothashes = &ctx.accounts.sysvar_slot_hashes;
    let data = recent_slothashes.data.borrow();
    let most_recent = array_ref![data, 12, 8];

    // seed for the random number is a combination of the slot_hash - timestamp
    let seed = u64::from_le_bytes(*most_recent).saturating_sub(now as u64);

    let rng = (seed >> 32) as u32;
    msg!("rng: {}", rng);
    // check if the barricade is successful
    if Character::is_action_successful(config.get_config_variable(ConfigVar::DestroyBarricadeSuccessRate), rng) {
        // barricade the tile
        let barricades_destroyed = if character.has_skill(Skill::MutatedZombie) { 2 } else { 1 };
        tile.num_barricades = tile.num_barricades.saturating_sub(barricades_destroyed);
        character.update_stat(Stat::BarricadesDestroyed, barricades_destroyed as u32);
        character.progress_mission(WeeklyMissionType::DestroyBarricades, 1, config);
        character.gain_xp(config.get_config_variable(ConfigVar::DestroyBarricadeXpGain) * 2, config);
        // emit event
        emit!(TileBarricadeUpdated {
            character: character.key(),
            x: tile.x,
            y: tile.y,
            barricade: tile.num_barricades,
        });
        emit!(ActionSuccessful {
            character: ctx.accounts.character.key(),
            action: format!("Successfully destroyed a barricade, {} left.", tile.num_barricades).to_string(),
        });
        ctx.accounts.character.add_event(Event {
            message: format!("Successfully destroyed a barricade, {} left.", tile.num_barricades),
            timestamp: now,
            severity: 4,
            block: Clock::get()?.slot,
        });
    } else {
        character.gain_xp(config.get_config_variable(ConfigVar::DestroyBarricadeXpGain), config);
        emit!(ActionUnsuccessful {
            character: ctx.accounts.character.key(),
            action: "Failed to destroy the barricade".to_string(),
        });
        ctx.accounts.character.add_event(Event {
            message: "Failed to destroy the barricade.".to_string(),
            timestamp: now,
            severity: 3,
            block: Clock::get()?.slot,
        });
    }

    account_realloc!(ctx, character, ctx.accounts.character.size());
    ensure_rent_exempt!(ctx, signer, character);

    session_reimburse!(ctx, session, signer);

    Ok(())
}
