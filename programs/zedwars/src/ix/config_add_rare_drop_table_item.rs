use anchor_lang::prelude::*;
use solana_program::{program::invoke, system_instruction};

use crate::{
    account_realloc,
    constants::OPERATOR_PUBKEY,
    ensure_rent_exempt,
    state::Config,
};

#[derive(Accounts)]
pub struct ConfigAddRareDropTableItemAccounts<'info> {
    /// The operator of the program.
    #[account(mut,address=OPERATOR_PUBKEY)]
    pub operator: Signer<'info>,
    /// The config account.
    #[account(mut,seeds=[Config::SEED_PREFIX],bump)]
    pub config: Account<'info, Config>,
    /// The system program account
    pub system_program: Program<'info, System>,
}

pub fn handle_config_add_rare_drop_table_item(
    ctx: Context<ConfigAddRareDropTableItemAccounts>,
    item_id: u32,
) -> Result<()> {
    // set the item random weights for the tile type
    msg!("Adding item to rare drop table");
    ctx.accounts.config.rare_drop_table.push(item_id);

    // realloc
    account_realloc!(ctx, config, ctx.accounts.config.size());

    // ensure rent exempt
    ensure_rent_exempt!(ctx, operator, config);

    Ok(())
}
