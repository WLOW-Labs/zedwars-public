use anchor_lang::prelude::*;

use crate::state::Session;

#[derive(Accounts)]
pub struct SessionCloseAccounts<'info> {
    #[account(mut)]
    pub player: Signer<'info>,
    #[account(mut,has_one=player,close=player,seeds=[Session::SEED_PREFIX,player.key().as_ref()],bump)]
    pub session: Account<'info, Session>,
}

/// The handler for the `session_close` instruction.
pub fn handle_session_close(_ctx: Context<SessionCloseAccounts>) -> Result<()> {
    Ok(())
}
