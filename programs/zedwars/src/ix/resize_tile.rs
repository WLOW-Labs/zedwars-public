use anchor_lang::prelude::*;

use solana_program::{program::invoke, system_instruction};

use crate::{account_realloc, constants::OPERATOR_PUBKEY, ensure_rent_exempt, errors::ZedWarsError, state::MapTile};

/// The accounts for the `config_register_sft` instruction.
#[derive(Accounts)]
pub struct ResizeTileAccounts<'info> {
    /// The program's authority.
    #[account(mut,address=OPERATOR_PUBKEY)]
    pub operator: Signer<'info>,
    /// CHECK: The character account, we 100% breaking things with this
    #[account(mut)]
    pub tile: AccountInfo<'info>,
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
pub fn handle_resize_tile(ctx: Context<ResizeTileAccounts>, size: u32) -> Result<()> {
    let resize_to = size as usize;
    require!(
        ctx.accounts.tile.to_account_info().data_len() <= resize_to,
        ZedWarsError::InvalidSize
    );
    msg!(
        "Resizing account from {} to {}",
        ctx.accounts.tile.to_account_info().data_len(),
        size
    );

    account_realloc!(ctx, tile, resize_to);

    let c = Account::<MapTile>::try_from(&ctx.accounts.tile).unwrap();

    account_realloc!(ctx, tile, c.size());
    ensure_rent_exempt!(ctx, operator, tile);

    c.exit(&crate::ID)?;

    Ok(())
}
