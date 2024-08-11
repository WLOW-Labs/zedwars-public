use anchor_lang::prelude::*;
use bubblegum_cpi::get_asset_id;
use solana_program::{program::invoke, system_instruction};
use verify_player::VerifyPlayerArgs;

use crate::{
    account_realloc, ensure_rent_exempt,
    errors::ZedWarsError,
    events::{ActionSuccessful, CharacterSkillUnlocked},
    is_authenticated,
    state::{Character, Config, Event, Session, Skill}, constants::PlayerVerifyArgs, ix::verify_player, session_reimburse,
};

use super::SplAccountCompression;

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct CharacterUnlockSkillArgs {
    pub skill: Skill,
    pub player_verify: PlayerVerifyArgs,
}


/// The accounts for the `character_skill_unlock` instruction.
#[derive(Accounts)]
pub struct CharacterUnlockSkillAccounts<'info> {
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
    /// The system program
    pub system_program: Program<'info, System>,
    pub compression_program: Program<'info, SplAccountCompression>,
}

/// handle the `character_skill_unlock` instruction
pub fn handle_character_skill_unlock<'info>(ctx: Context<'_, '_, '_, 'info, CharacterUnlockSkillAccounts<'info>>, args: CharacterUnlockSkillArgs) -> Result<()> {
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

    // The player must have enough skill points
    require!(
        ctx.accounts.character.skill_points >= ctx.accounts.config.skill_points_required[args.skill as usize] as u16,
        ZedWarsError::NotEnoughSkillPoints
    );

    // The skill must not be already unlocked
    require!(
        !ctx.accounts.character.has_skill(args.skill),
        ZedWarsError::SkillAlreadyUnlocked
    );

    let character = &mut ctx.accounts.character;
    // use the skill points
    character.skill_points -= ctx.accounts.config.skill_points_required[args.skill as usize] as u16;
    // unlock the skill
    character.unlock_skill(args.skill);

    let now = Clock::get()?.unix_timestamp;
    ctx.accounts.character.add_event(Event {
        message: "Skill unlocked!".to_string(),
        timestamp: now,
        severity: 4,
        block: Clock::get()?.slot,
    });

    account_realloc!(ctx, character, ctx.accounts.character.size());
    ensure_rent_exempt!(ctx, signer, character);

    // emit event
    emit!(CharacterSkillUnlocked {
        character: ctx.accounts.character.key(),
        skill: args.skill
    });

    emit!(ActionSuccessful {
        character: ctx.accounts.character.key(),
        action: "Successfully unlocked.".to_string(),
    });

    session_reimburse!(ctx, session, signer);

    Ok(())
}
