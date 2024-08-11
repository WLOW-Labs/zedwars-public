use anchor_lang::prelude::*;
use solana_program::{program::invoke, system_instruction};

use crate::{
    account_realloc,
    constants::OPERATOR_PUBKEY,
    ensure_rent_exempt,
    state::{Config, ConfigVar},
};

#[derive(Accounts)]
pub struct ConfigSetVariablesAccounts<'info> {
    /// The operator of the program.
    #[account(mut,address=OPERATOR_PUBKEY)]
    pub operator: Signer<'info>,
    /// The config account.
    #[account(mut,seeds=[Config::SEED_PREFIX],bump)]
    pub config: Account<'info, Config>,
    /// The system program account
    pub system_program: Program<'info, System>,
}

pub fn handle_config_set_variables(ctx: Context<ConfigSetVariablesAccounts>, key: ConfigVar, value: u32) -> Result<()> {
    // ensure the config variables vec is long enough
    if ctx.accounts.config.config_variables.len() < ConfigVar::NUM_VARS {
        ctx.accounts.config.config_variables.resize(ConfigVar::NUM_VARS, 0);
    }

    // set the variables
    msg!("Set the variable");
    ctx.accounts.config.config_variables[key as usize] = value;

    // realloc
    account_realloc!(ctx, config, ctx.accounts.config.size());

    // ensure rent exempt
    ensure_rent_exempt!(ctx, operator, config);

    Ok(())
}
