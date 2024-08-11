use anchor_lang::prelude::*;

use solana_program::{program::invoke, system_instruction};

use crate::{constants::OPERATOR_PUBKEY, state::Config};

use crate::ensure_rent_exempt;

/// The accounts for the `config_register_sft` instruction.
#[derive(Accounts)]
pub struct WithdrawTreasuryAccounts<'info> {
    /// The program's authority.
    #[account(mut,address=OPERATOR_PUBKEY)]
    pub operator: Signer<'info>,
    /// The config account
    #[account(mut,seeds=[Config::SEED_PREFIX],bump)]
    pub config: Account<'info, Config>,
    pub system_program: Program<'info, System>,
}

/// The handler for the `config_register_sft` instruction.
/// This instruction registers a new SFT.
/// It creates the SFT mint, metadata, and item account.
///
/// The mint authority will be the config account.
/// Because the program needs to create new items.
///
/// The update authority will be the operator account.
/// The operator account is a regular wallet account that has a private key.
/// It will be easier to update the metadata of the SFTs.
/// Otherwise we will have to implement a new instruction to update the metadata.
///
/// # Arguments
/// * `ctx` - The instruction context.
/// * `args` - The arguments for the instruction.
///
/// # Returns
/// * `Result<()>` - The result of the instruction.
pub fn handle_withdraw_treasury(ctx: Context<WithdrawTreasuryAccounts>) -> Result<()> {
    let lamports = ctx.accounts.config.to_account_info().lamports();


    msg!("Transferring {} lamports", lamports);

    let payer_account_info = ctx.accounts.config.to_account_info();
    let target_account_info = ctx.accounts.operator.to_account_info();
    // Invoke the transfer instruction
    let payer_lamports = payer_account_info.lamports();
    let target_lamports = target_account_info.lamports();

    **payer_account_info.lamports.borrow_mut() = payer_lamports.checked_sub(lamports).unwrap();
    **target_account_info.lamports.borrow_mut() = target_lamports.checked_add(lamports).unwrap();

    ensure_rent_exempt!(ctx, operator, config);

    Ok(())
}
