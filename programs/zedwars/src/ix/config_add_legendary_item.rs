use anchor_lang::prelude::*;
use solana_program::{program::invoke, system_instruction};

use crate::{
    account_realloc,
    constants::OPERATOR_PUBKEY,
    ensure_rent_exempt,
    state::{Config, ItemKind},
};

#[derive(Accounts)]
pub struct ConfigAddLegendaryItemAccounts<'info> {
    /// The operator of the program.
    #[account(mut,address=OPERATOR_PUBKEY)]
    pub operator: Signer<'info>,
    /// The config account.
    #[account(mut,seeds=[Config::SEED_PREFIX],bump)]
    pub config: Account<'info, Config>,
    /// The system program account
    pub system_program: Program<'info, System>,
}

pub fn handle_config_add_legendary_item(
    ctx: Context<ConfigAddLegendaryItemAccounts>,
    item_kind: ItemKind,
    item_id: u32,
) -> Result<()> {
    // ensure the config legendary items variable vec is long enough
    if ctx.accounts.config.legendary_items.len() < ItemKind::NUM_ITEM_KIND {
        ctx.accounts
            .config
            .legendary_items
            .resize(ItemKind::NUM_ITEM_KIND, vec![]);
    }

    msg!("Adding legendary item");
    ctx.accounts.config.legendary_items[item_kind as usize].push(item_id);

    // realloc
    account_realloc!(ctx, config, ctx.accounts.config.size());

    // ensure rent exempt
    ensure_rent_exempt!(ctx, operator, config);

    Ok(())
}
