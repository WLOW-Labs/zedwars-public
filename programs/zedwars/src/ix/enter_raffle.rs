use anchor_lang::prelude::*;

use bubblegum_cpi::get_asset_id;
use solana_program::{program::invoke, system_instruction};
use verify_player::VerifyPlayerArgs;

use crate::{
    account_realloc, constants::PlayerVerifyArgs, ensure_rent_exempt, errors::ZedWarsError, is_authenticated, ix::verify_player, session_reimburse, state::{Character, Config, Event, Session}, Raffle
};

use super::SplAccountCompression;

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct EnterRaffleArgs {
    pub quantity: u16,
    pub player_verify: PlayerVerifyArgs,
}

#[derive(Accounts)]
pub struct EnterRaffleAccounts<'info> {
    /// The signer
    /// It could be the delegate or the player.
    #[account(mut)]
    pub signer: Signer<'info>,
    /// The optional session account
    /// It is only present if the signer is the delegate.
    #[account(mut,seeds=[Session::SEED_PREFIX,player.key().as_ref()],bump)]
    pub session: Option<Account<'info, Session>>,
    /// The player wallet account
    /// CHECK: Checked in the handler.
    #[account(mut)]
    pub player: UncheckedAccount<'info>,
    /// CHECK: unsafe
    #[account(mut)]
    pub player_merkle_tree: UncheckedAccount<'info>,
    /// The character account
    #[account(mut,seeds=[Character::SEED_PREFIX,character.mint.as_ref()],bump)]
    pub character: Box<Account<'info, Character>>,

    /// The raffle account
    #[account(
        init_if_needed,
        payer = player,
        space = Raffle::INIT_SPACE,
        seeds = [Raffle::SEED_PREFIX,player.key().as_ref()],
        bump,
    )]
    pub raffle: Account<'info, Raffle>,

    /// The config account
    #[account(mut,seeds=[Config::SEED_PREFIX],bump)]
    pub config: Box<Account<'info, Config>>,
    pub system_program: Program<'info, System>,
    pub compression_program: Program<'info, SplAccountCompression>,
}

pub fn handle_enter_raffle<'info>(
    ctx: Context<'_, '_, '_, 'info, EnterRaffleAccounts<'info>>,
    args: EnterRaffleArgs,
) -> Result<()> {
    // Check if it is authorized
    is_authenticated!(ctx);
    let asset_id = get_asset_id(ctx.accounts.player_merkle_tree.key, args.player_verify.index.into());

    //check if the proof matches the player
    require_eq!(asset_id, ctx.accounts.character.mint, ZedWarsError::NoAuthority);

    //check if the signer owns the player
    msg!("Checking if signer owns the nft");
    let res = verify_player(VerifyPlayerArgs {
        data_hash: args.player_verify.data_hash,
        creator_hash: args.player_verify.creator_hash,
        root: args.player_verify.root,
        index: args.player_verify.index,
        compression_program: ctx.accounts.compression_program.to_account_info(),
        merkle_tree: ctx.accounts.player_merkle_tree.to_account_info(),
        owner: ctx.accounts.player.key(),
        delegate: ctx.accounts.player.key(),
        proof_accounts: ctx.remaining_accounts.to_vec(),
    });
    require!(res.is_ok(), ZedWarsError::NoAuthority);

    require_gte!(ctx.accounts.character.raffle_tickets, args.quantity, ZedWarsError::NotEnoughTickets);
    
    ctx.accounts.character.raffle_tickets = ctx.accounts.character.raffle_tickets.saturating_sub(args.quantity);

    let now = Clock::get()?.unix_timestamp;
    let monday = now - (now % (7 * 24 * 60 * 60));
    if ctx.accounts.raffle.last_updated < monday {
        ctx.accounts.raffle.entries = 0;
    }
    
    ctx.accounts.raffle.player = ctx.accounts.player.key();
    ctx.accounts.raffle.entries = ctx.accounts.raffle.entries.saturating_add(args.quantity);

    ctx.accounts.character.add_event(Event {
        message: format!("You have entered the raffle with {} tickets", args.quantity),
        timestamp: Clock::get()?.unix_timestamp,
        severity: 4,
        block: Clock::get()?.slot,
    });

    account_realloc!(ctx, character, ctx.accounts.character.size());
    ensure_rent_exempt!(ctx, signer, character);

    session_reimburse!(ctx, session, signer);

    Ok(())
}
