use crate::{
    account_realloc,
    constants::OPERATOR_PUBKEY,
    ensure_rent_exempt,
    state::{Config, TileType},
};
use anchor_lang::prelude::*;
use solana_program::{program::invoke, system_instruction};

#[derive(Accounts)]
pub struct ConfigSetSearchSuccessRateAccounts<'info> {
    /// The operator of the program.
    #[account(mut,address=OPERATOR_PUBKEY)]
    pub operator: Signer<'info>,
    /// The config account.
    #[account(mut,seeds=[Config::SEED_PREFIX],bump)]
    pub config: Account<'info, Config>,
    /// The system program account
    pub system_program: Program<'info, System>,
}

pub fn handle_config_set_search_success_rate(
    ctx: Context<ConfigSetSearchSuccessRateAccounts>,
    tile_type: TileType,
    value: u32,
) -> Result<()> {
    // ensure the config variables vec is long enough
    if ctx.accounts.config.search_success_rates.len() < TileType::NUM_TILE_TYPES {
        ctx.accounts
            .config
            .search_success_rates
            .resize(TileType::NUM_TILE_TYPES, 0);
    }

    // set the success rate
    msg!("Set the success rate");
    ctx.accounts.config.search_success_rates[tile_type.to_usize()] = value;

    account_realloc!(ctx, config, ctx.accounts.config.size());
    ensure_rent_exempt!(ctx, operator, config);

    Ok(())
}
