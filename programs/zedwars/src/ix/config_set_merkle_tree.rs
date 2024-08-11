use crate::{
    constants::OPERATOR_PUBKEY,
    state::Config, account_realloc, ensure_rent_exempt,
};
use anchor_lang::prelude::*;
use mpl_bubblegum::instructions::CreateTreeConfigCpiBuilder;
use solana_program::sysvar::Sysvar;
use solana_program::{program::invoke, system_instruction};

use super::{MplBubblegum, Noop, SplAccountCompression};

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct ConfigSetMerkleTreeArgs {
    pub max_depth: u32,
    pub max_buffer_size: u32,
}

/// The accounts for the `config_register_sft` instruction.
#[derive(Accounts)]
pub struct ConfigSetMerkleTreeAccounts<'info> {
    /// The program's authority.
    #[account(mut,address=OPERATOR_PUBKEY)]
    pub operator: Signer<'info>,

    #[account(mut,seeds=[Config::SEED_PREFIX],bump)]
    pub config: Account<'info, Config>,

    /// CHECK: This account must be all zeros
    #[account(zero, signer)]
    pub merkle_tree: AccountInfo<'info>,

    /// CHECK: This account is checked in the instruction
    #[account(mut)]
    pub tree_config: UncheckedAccount<'info>,

    // program
    pub bubblegum_program: Program<'info, MplBubblegum>,
    pub system_program: Program<'info, System>,
    pub log_wrapper: Program<'info, Noop>,
    pub compression_program: Program<'info, SplAccountCompression>,
}

/// The handler for the `config_register_item` instruction.
/// This instruction creates a new item account.
///
/// # Arguments
/// * `ctx` - The instruction context.
/// * `args` - The arguments for the instruction.
///
/// # Returns
/// * `Result<()>` - The result of the instruction.
pub fn handle_config_set_merkle_tree(
    ctx: Context<ConfigSetMerkleTreeAccounts>,
    args: ConfigSetMerkleTreeArgs
) -> Result<()> {
    msg!("Initializing merkle tree");

    let bump_seed = *ctx.bumps.get("config").unwrap();
    let signer_seeds: &[&[&[u8]]] = &[&[Config::SEED_PREFIX, &[bump_seed]]];

    CreateTreeConfigCpiBuilder::new(&ctx.accounts.bubblegum_program.to_account_info())
        .merkle_tree(&ctx.accounts.merkle_tree.to_account_info())
        .tree_config(&ctx.accounts.tree_config.to_account_info())
        .payer(&ctx.accounts.operator.to_account_info())
        .tree_creator(&ctx.accounts.config.to_account_info())
        .log_wrapper(&ctx.accounts.log_wrapper.to_account_info())
        .compression_program(&ctx.accounts.compression_program.to_account_info())
        .system_program(&ctx.accounts.system_program.to_account_info())
        .max_depth(args.max_depth)
        .max_buffer_size(args.max_buffer_size)
        .invoke_signed(signer_seeds)?;

    ctx.accounts.config.merkle_tree = Some(ctx.accounts.merkle_tree.key());
    ctx.accounts.config.merkle_tree_items_minted = 0;

    account_realloc!(ctx, config, ctx.accounts.config.size());
    ensure_rent_exempt!(ctx, operator, config);


    Ok(())
}
