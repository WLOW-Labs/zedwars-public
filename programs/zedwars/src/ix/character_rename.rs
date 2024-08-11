use anchor_lang::prelude::*;

use bubblegum_cpi::get_asset_id;
use solana_program::{program::invoke, system_instruction};
use verify_player::VerifyPlayerArgs;

use crate::{
    account_realloc,
    ensure_rent_exempt,
    errors::ZedWarsError,
    state::{Character, Config, Event}, constants::PlayerVerifyArgs, ix::verify_player,
};

use super::SplAccountCompression;

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct CharacterRenameArgs {
    pub name: String,
    pub player_verify: PlayerVerifyArgs,
}


#[derive(Accounts)]
pub struct CharacterRenameAccounts<'info> {
    /// The signer
    /// It could be the delegate or the player.
    #[account(mut)]
    pub signer: Signer<'info>,
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

pub fn handle_character_rename<'info>(ctx: Context<'_, '_, '_, 'info, CharacterRenameAccounts<'info>>, args: CharacterRenameArgs) -> Result<()> {
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
        owner: ctx.accounts.signer.key(),
        delegate: ctx.accounts.signer.key(),
        proof_accounts: ctx.remaining_accounts.to_vec()
    });
    require!(res.is_ok(), ZedWarsError::NoAuthority);

    if !ctx.accounts.character.has_name_change_available {
        let lamports = ctx
            .accounts
            .config
            .get_config_variable(crate::state::ConfigVar::NameChangeCost) as u64;

        // Create the transfer instruction
        let transfer_instruction = system_instruction::transfer(ctx.accounts.signer.key, ctx.accounts.config.to_account_info().key, lamports);

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
    }
    require!(args.name.len() <= 12, ZedWarsError::NameTooLong);
    require!(args.name.len() >= 3, ZedWarsError::NameTooShort);

    ctx.accounts.character.name = args.name;
    ctx.accounts.character.has_name_change_available = false;

    ctx.accounts.character.add_event(Event {
        message: "Name changed successfully!".to_string(),
        timestamp: Clock::get()?.unix_timestamp,
        severity: 4,
        block: Clock::get()?.slot,
    });

    account_realloc!(ctx, character, ctx.accounts.character.size());
    ensure_rent_exempt!(ctx, signer, character);

    Ok(())
}
