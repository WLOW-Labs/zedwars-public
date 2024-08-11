use anchor_lang::prelude::*;

use solana_program::{program::invoke, system_instruction};

use crate::{account_realloc, constants::OPERATOR_PUBKEY, ensure_rent_exempt, errors::ZedWarsError, state::Character};

/// The accounts for the `config_register_sft` instruction.
#[derive(Accounts)]
pub struct ResizeCharacterAccounts<'info> {
    /// The program's authority.
    #[account(mut,address=OPERATOR_PUBKEY)]
    pub operator: Signer<'info>,
    /// CHECK: The character account, we 100% breaking things with this
    #[account(mut)]
    pub character: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handle_resize_character(ctx: Context<ResizeCharacterAccounts>, size: u32) -> Result<()> {
    let resize_to = size as usize;
    require!(
        ctx.accounts.character.to_account_info().data_len() <= resize_to,
        ZedWarsError::InvalidSize
    );
    msg!(
        "Resizing account from {} to {}",
        ctx.accounts.character.to_account_info().data_len(),
        size
    );

    account_realloc!(ctx, character, resize_to);

    let c = &mut Account::<Character>::try_from(&ctx.accounts.character).unwrap();
    c.referred_by = None;
    c.pending_revive = false;

    account_realloc!(ctx, character, c.size());
    ensure_rent_exempt!(ctx, operator, character);

    c.exit(&crate::ID)?;

    Ok(())
}
