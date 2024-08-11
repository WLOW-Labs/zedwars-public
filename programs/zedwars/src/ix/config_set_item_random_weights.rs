use anchor_lang::prelude::*;
use solana_program::{program::invoke, system_instruction};

use crate::{
    account_realloc,
    constants::OPERATOR_PUBKEY,
    ensure_rent_exempt,
    state::{Config, ItemRandomWeight, TileType},
};

#[derive(Accounts)]
pub struct ConfigSetItemRandomWeightsAccounts<'info> {
    /// The operator of the program.
    #[account(mut,address=OPERATOR_PUBKEY)]
    pub operator: Signer<'info>,
    /// The config account.
    #[account(mut,seeds=[Config::SEED_PREFIX],bump)]
    pub config: Account<'info, Config>,
    /// The system program account
    pub system_program: Program<'info, System>,
}

pub fn handle_config_set_item_random_weights(
    ctx: Context<ConfigSetItemRandomWeightsAccounts>,
    tile_type: TileType,
    weights: Vec<ItemRandomWeight>,
) -> Result<()> {
    // ensure the item random weights vec is long enough
    if ctx.accounts.config.item_random_weights.len() < TileType::NUM_TILE_TYPES {
        ctx.accounts
            .config
            .item_random_weights
            .resize(TileType::NUM_TILE_TYPES, vec![]);
    }

    // set the item random weights for the tile type
    msg!("Set the variable");
    ctx.accounts.config.item_random_weights[tile_type.to_usize()] = weights;

    // realloc
    account_realloc!(ctx, config, ctx.accounts.config.size());

    // ensure rent exempt
    ensure_rent_exempt!(ctx, operator, config);

    Ok(())
}
