use anchor_lang::prelude::*;
use solana_program::{program::invoke, system_instruction};

use crate::state::Session;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy)]
pub struct SessionInitArgs {
    pub seconds: i64,
    pub lamports: u64,
}
#[derive(Accounts)]
pub struct SessionInitAccounts<'info> {
    #[account(mut)]
    pub player: Signer<'info>,
    pub delegate: Signer<'info>,
    #[account(init,payer=player,space=Session::INIT_SPACE,seeds=[Session::SEED_PREFIX,player.key().as_ref()],bump)]
    pub session: Account<'info, Session>,
    pub system_program: Program<'info, System>,
}

/// The handler for the `session_init` instruction.
pub fn handle_session_init(ctx: Context<SessionInitAccounts>, args: SessionInitArgs) -> Result<()> {
    // init session
    ctx.accounts.session.set_inner(Session {
        player: ctx.accounts.player.key(),
        delegate: ctx.accounts.delegate.key(),
        valid_until: Clock::get()?.unix_timestamp + args.seconds,
    });

    // transfer lamports
    msg!("Transferring lamports");
    let ix = system_instruction::transfer(&ctx.accounts.player.key(), &ctx.accounts.session.key(), args.lamports);
    invoke(
        &ix,
        &[
            ctx.accounts.player.to_account_info().clone(),
            ctx.accounts.session.to_account_info().clone(),
        ],
    )?;

    Ok(())
}
