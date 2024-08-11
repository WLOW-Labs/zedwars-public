use crate::{
    account_realloc,
    constants::OPERATOR_PUBKEY,
    ensure_rent_exempt,
    state::{Config, TileType},
};
use anchor_lang::prelude::*;
use solana_program::{program::invoke, system_instruction};

#[derive(Accounts)]
pub struct ConfigSetLootRegenRateAccounts<'info> {
    /// The operator of the program.
    #[account(mut,address=OPERATOR_PUBKEY)]
    pub operator: Signer<'info>,
    /// The config account.
    #[account(mut,seeds=[Config::SEED_PREFIX],bump)]
    pub config: Account<'info, Config>,
    /// The system program account
    pub system_program: Program<'info, System>,
}

pub fn handle_config_set_loot_regen_rate(
    ctx: Context<ConfigSetLootRegenRateAccounts>,
    tile_type: TileType,
    value: u32,
) -> Result<()> {
    // ensure the config variables vec is long enough
    if ctx.accounts.config.loot_regen_rates.len() < TileType::NUM_TILE_TYPES {
        ctx.accounts
            .config
            .loot_regen_rates
            .resize(TileType::NUM_TILE_TYPES, 0);
    }

    // set the success rate
    msg!("Set the success rate");
    ctx.accounts.config.loot_regen_rates[tile_type.to_usize()] = value;

    account_realloc!(ctx, config, ctx.accounts.config.size());
    ensure_rent_exempt!(ctx, operator, config);

    Ok(())
}
