use anchor_lang::prelude::*;
use arrayref::array_ref;

use bubblegum_cpi::get_asset_id;
use solana_program::{program::invoke, system_instruction};
use verify_player::VerifyPlayerArgs;

use crate::{
    account_realloc, ensure_rent_exempt,
    errors::ZedWarsError,
    is_authenticated,
    state::{Character, Config, ConfigVar, Session, WeeklyMission, WeeklyMissionType}, constants::PlayerVerifyArgs, ix::verify_player, session_reimburse,
};

use super::SplAccountCompression;

/// The accounts for the character barricade instruction
#[derive(Accounts)]
pub struct CharacterGenerateMissionsAccounts<'info> {
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
    pub config: Box<Account<'info, Config>>,
    /// The sysvar slot hashes account
    /// CHECK: Only the address needs to be checked
    #[account(address=solana_program::sysvar::slot_hashes::id())]
    pub sysvar_slot_hashes: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
    pub compression_program: Program<'info, SplAccountCompression>,
}

/// The handler for the character barricade instruction
pub fn handle_character_generate_missions<'info>(ctx: Context<'_, '_, '_, 'info, CharacterGenerateMissionsAccounts<'info>>, args: PlayerVerifyArgs) -> Result<()> {
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

    let zombie_missions = vec![
        WeeklyMissionType::DestroyBarricades,
        WeeklyMissionType::KillSurvivors,
        WeeklyMissionType::KillZombies,
        WeeklyMissionType::GainXP,
        WeeklyMissionType::DestroyGenerator,
        WeeklyMissionType::RansackTile,
    ];

    let survivor_missions = vec![
        WeeklyMissionType::BuildBarricades,
        WeeklyMissionType::KillZombies,
        WeeklyMissionType::GainXP,
        WeeklyMissionType::FindItems,
        WeeklyMissionType::InstallGenerator,
        WeeklyMissionType::CourierMission,
    ];

    let character = &mut ctx.accounts.character;
    let config = &ctx.accounts.config;
    let now = Clock::get()?.unix_timestamp;

    // check if the character is alive
    msg!("Checking if the character is alive");
    require_gt!(character.hp, 0, ZedWarsError::CharacterIsDead);

    msg!("Checking if they already got missions in the last 7 days");
    require_gt!(
        now - character.missions_generated_at,
        config.get_config_variable(ConfigVar::MissionCooldown) as i64,
        ZedWarsError::MissionsRecently
    );

    msg!("Checking if they have 5 or more active missions");
    require!(character.weekly_missions.len() < 5, ZedWarsError::TooManyActiveMissions);

    // random generator
    let recent_slothashes = &ctx.accounts.sysvar_slot_hashes;
    let data = recent_slothashes.data.borrow();
    let most_recent = array_ref![data, 12, 8];

    // seed for the random number is a combination of the slot_hash - timestamp
    let seed = u64::from_le_bytes(*most_recent).saturating_sub(now as u64);

    let rng = (seed >> 32) as u32;

    let digits: Vec<u32> = rng.to_string().chars().map(|d| d.to_digit(10).unwrap()).collect();

    let mission_count = 5 - character.weekly_missions.len();
    let mission_count = if mission_count > 3 { 3 } else { mission_count };
    let weekly_missions = if character.is_zombie {
        zombie_missions
    } else {
        survivor_missions
    };
    for idx in 0..mission_count {
        let mission_type = weekly_missions[digits[idx] as usize % weekly_missions.len()];
        character.weekly_missions.push(WeeklyMission {
            mission_type,
            required: Character::get_mission_requirement(mission_type, digits[idx] as u16),
            current: 0,
            reward: 500 + (digits[idx] * 50) as u16,
        })
    }

    character.missions_generated_at = now;
    
    account_realloc!(ctx, character, ctx.accounts.character.size());
    ensure_rent_exempt!(ctx, signer, character);

    session_reimburse!(ctx, session, signer);

    Ok(())
}
