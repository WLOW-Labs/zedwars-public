use crate::{
    account_realloc,
    constants::PlayerVerifyArgs,
    ensure_rent_exempt,
    errors::ZedWarsError,
    is_authenticated,
    ix::{verify_player, VerifyPlayerArgs},
    session_reimburse,
    state::{Character, Config, MapTile, Session},
};
use anchor_lang::prelude::*;
use bubblegum_cpi::get_asset_id;
use solana_program::{program::invoke, system_instruction};

use super::SplAccountCompression;

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct CharacterReviveArgs {
    pub accept: bool,
    pub player_verify: PlayerVerifyArgs,
}


#[derive(Accounts)]
pub struct CharacterReviveAccounts<'info> {
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
    pub character: Account<'info, Character>,
    /// The tile account
    #[account(mut,seeds=[MapTile::SEED_PREFIX,tile.x.to_le_bytes().as_slice(),tile.y.to_le_bytes().as_slice()],bump)]
    pub tile: Account<'info, MapTile>,
    /// The config account
    #[account(seeds=[Config::SEED_PREFIX], bump)]
    pub config: Box<Account<'info, Config>>,
    /// The system program
    pub system_program: Program<'info, System>,
    pub compression_program: Program<'info, SplAccountCompression>,
}

pub fn handle_character_revive<'info>(
    ctx: Context<'_, '_, '_, 'info, CharacterReviveAccounts<'info>>,
    args: CharacterReviveArgs,
) -> Result<()> {
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

    require!(ctx.accounts.character.pending_revive, ZedWarsError::NoPendingRevive);

    // Check if the tile is valid
    msg!("Checking if the tile is valid");
    require!(
        ctx.accounts.character.x == ctx.accounts.tile.x && ctx.accounts.character.y == ctx.accounts.tile.y,
        ZedWarsError::InvalidTile
    );

    if args.accept {
        ctx.accounts.character.revive(&mut ctx.accounts.tile);
    } else { 
        ctx.accounts.character.pending_revive = false;
    }


    account_realloc!(ctx, character, ctx.accounts.character.size());
    ensure_rent_exempt!(ctx, signer, character);
    session_reimburse!(ctx, session, signer);

    Ok(())
}
