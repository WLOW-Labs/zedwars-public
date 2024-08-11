use anchor_lang::prelude::*;

use bubblegum_cpi::get_asset_id;
use solana_program::{program::invoke, system_instruction};
use verify_player::VerifyPlayerArgs;

use crate::{
    account_realloc,
    constants::PlayerVerifyArgs,
    ensure_rent_exempt,
    errors::ZedWarsError,
    ix::verify_player,
    state::{Character, Config, ConfigVar, Event},
};

use super::SplAccountCompression;

#[derive(Accounts)]
pub struct CharacterUpgradeAccounts<'info> {
    /// The signer
    /// It could be the delegate or the player.
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(mut)]
    /// CHECK: unsafe
    pub referrer: Option<AccountInfo<'info>>,
    /// CHECK: unsafe
    #[account(mut)]
    pub player_merkle_tree: UncheckedAccount<'info>,
    /// The character account
    #[account(mut,seeds=[Character::SEED_PREFIX,character.mint.as_ref()],bump)]
    pub character: Box<Account<'info, Character>>,
    /// The config account
    #[account(mut,seeds=[Config::SEED_PREFIX],bump)]
    pub config: Box<Account<'info, Config>>,
    pub system_program: Program<'info, System>,
    pub compression_program: Program<'info, SplAccountCompression>,
}

pub fn handle_character_upgrade<'info>(
    ctx: Context<'_, '_, '_, 'info, CharacterUpgradeAccounts<'info>>,
    args: PlayerVerifyArgs,
) -> Result<()> {
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
        owner: ctx.accounts.signer.key(),
        delegate: ctx.accounts.signer.key(),
        proof_accounts: ctx.remaining_accounts.to_vec(),
    });
    require!(res.is_ok(), ZedWarsError::NoAuthority);

    require!(!ctx.accounts.character.has_premium, ZedWarsError::AlreadyHasPremium);

    let lamports = ctx
        .accounts
        .config
        .get_config_variable(crate::state::ConfigVar::PremiumCost) as u64;

        let referrer_lamports = (lamports * 20) / 100;
        let config_lamports = lamports - referrer_lamports;

    // Create the transfer instruction
    let transfer_instruction = system_instruction::transfer(
        ctx.accounts.signer.key,
        ctx.accounts.config.to_account_info().key,
        if ctx.accounts.character.referred_by.is_some() { config_lamports } else { lamports },
    );

    msg!("Transferring {} lamports", lamports);
    // Invoke the transfer instruction
    anchor_lang::solana_program::program::invoke_signed(
        &transfer_instruction,
        &[
            ctx.accounts.signer.to_account_info(),
            ctx.accounts.config.to_account_info().clone(),
            ctx.accounts.system_program.to_account_info(),
        ],
        &[],
    )?;

    if ctx.accounts.referrer.is_some() {
        let transfer_instruction = system_instruction::transfer(
            ctx.accounts.signer.key,
            ctx.accounts.referrer.as_ref().unwrap().to_account_info().key,
            referrer_lamports,
        );

        msg!("Transferring {} lamports", 10_000_000);
        // Invoke the transfer instruction
        anchor_lang::solana_program::program::invoke_signed(
            &transfer_instruction,
            &[
                ctx.accounts.signer.to_account_info().clone(),
                ctx.accounts.referrer.as_ref().unwrap().to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
            &[],
        )?;
    }

    
    ctx.accounts.character.has_premium = true;
    ctx.accounts.character.energy_regen_rate = ctx.accounts.character.energy_regen_rate.saturating_sub(
        ctx.accounts
            .config
            .get_config_variable(ConfigVar::PremiumRegenReduction),
    );

    ctx.accounts.character.add_event(Event {
        message: "Premium unlocked!".to_string(),
        timestamp: Clock::get()?.unix_timestamp,
        severity: 4,
        block: Clock::get()?.slot,
    });

    account_realloc!(ctx, character, ctx.accounts.character.size());
    ensure_rent_exempt!(ctx, signer, character);

    Ok(())
}
