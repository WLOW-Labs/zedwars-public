use anchor_lang::prelude::*;

use bubblegum_cpi::get_asset_id;
use solana_program::{program::invoke, system_instruction};
use verify_player::VerifyPlayerArgs;

use crate::{
    account_realloc,
    constants::PlayerVerifyArgs,
    ensure_rent_exempt,
    errors::ZedWarsError,
    is_authenticated,
    ix::verify_player,
    session_reimburse,
    state::{Character, Config, Event, MapTile, Session},
    TileType,
};

use super::SplAccountCompression;

#[derive(Accounts)]
pub struct CharacterBuryAccounts<'info> {
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
    /// The target character account
    #[account(mut,seeds=[Character::SEED_PREFIX,target_character.mint.as_ref()],bump)]
    pub target_character: Account<'info, Character>,
    /// The original tile account
    #[account(mut,seeds=[MapTile::SEED_PREFIX,tile.x.to_le_bytes().as_slice(),tile.y.to_le_bytes().as_slice()],bump)]
    pub tile: Account<'info, MapTile>,
    /// The target tile account
    #[account(mut,seeds=[MapTile::SEED_PREFIX,target_tile.x.to_le_bytes().as_slice(),target_tile.y.to_le_bytes().as_slice()],bump)]
    pub target_tile: Account<'info, MapTile>,
    /// The config account
    #[account(seeds=[Config::SEED_PREFIX],bump)]
    pub config: Box<Account<'info, Config>>,
    pub system_program: Program<'info, System>,
    pub compression_program: Program<'info, SplAccountCompression>,
}

pub fn handle_character_bury<'info>(
    ctx: Context<'_, '_, '_, 'info, CharacterBuryAccounts<'info>>,
    args: PlayerVerifyArgs,
) -> Result<()> {
    // Check if it is authorized
    is_authenticated!(ctx);

    let asset_id = get_asset_id(ctx.accounts.player_merkle_tree.key, args.index.into());

    //check if the proof matches the player
    require_eq!(asset_id, ctx.accounts.character.mint, ZedWarsError::NoAuthority);

    //check if the signer owns the player
    msg!("Checking if signer owns the nft");
    let res = verify_player(VerifyPlayerArgs {
        data_hash: args.data_hash,
        creator_hash: args.creator_hash,
        root: args.root,
        index: args.index,
        compression_program: ctx.accounts.compression_program.to_account_info(),
        merkle_tree: ctx.accounts.player_merkle_tree.to_account_info(),
        owner: ctx.accounts.player.key(),
        delegate: ctx.accounts.player.key(),
        proof_accounts: ctx.remaining_accounts.to_vec(),
    });
    require!(res.is_ok(), ZedWarsError::NoAuthority);

    // Check if the character is in the tile
    require!(
        ctx.accounts.character.x == ctx.accounts.tile.x && ctx.accounts.character.y == ctx.accounts.tile.y,
        ZedWarsError::CharacterNotOnSameTile
    );

    // Require destination tile to be the afk tile
    require!(
        ctx.accounts.target_tile.tile_type == TileType::Afk,
        ZedWarsError::DestinationInvalid
    );

    // The target character must be in the same tile
    require!(
        ctx.accounts.target_character.x == ctx.accounts.tile.x
            && ctx.accounts.target_character.y == ctx.accounts.tile.y,
        ZedWarsError::CharacterNotOnSameTile
    );

    // The target character must be dead
    require!(
        ctx.accounts.target_character.hp == 0,
        ZedWarsError::InvalidCharacterState
    );

    // Burier must be a survivor
    require!(!ctx.accounts.character.is_zombie, ZedWarsError::InvalidCharacterState);

    // The current tile must be a street
    // TODO: Allow for burying at graveyard tiles
    require!(
        ctx.accounts.tile.tile_type == TileType::Street,
        ZedWarsError::InvalidTile
    );

    // Move the character
    ctx.accounts.target_character.x = ctx.accounts.target_tile.x;
    ctx.accounts.target_character.y = ctx.accounts.target_tile.y;

    ctx.accounts.target_character.last_x = ctx.accounts.tile.x;
    ctx.accounts.target_character.last_y = ctx.accounts.tile.y;

    // update tile
    msg!("Updating the tile");
    ctx.accounts.tile.num_zombies = ctx.accounts.tile.num_zombies.saturating_sub(1);
    ctx.accounts.target_tile.num_zombies = ctx.accounts.target_tile.num_zombies.saturating_add(1);

    ctx.accounts.target_character.add_event(Event {
        message: format!("Your body was buried by {}", ctx.accounts.character.name),
        timestamp: Clock::get()?.unix_timestamp,
        severity: 2,
        block: Clock::get()?.slot,
    });

    ctx.accounts.character.add_event(Event {
        message: "Successfully buried the zombie corpse.".to_string(),
        timestamp: Clock::get()?.unix_timestamp,
        severity: 4,
        block: Clock::get()?.slot,
    });

    let slot = Clock::get()?.slot;

    // use energy
    ctx.accounts.character.use_energy(
        10, //TODO: Config variable
        Clock::get()?.unix_timestamp,
        slot,
        &ctx.accounts.config,
        &mut ctx.accounts.target_tile,
    )?;

    ctx.accounts
        .character
        .gain_xp(ctx.accounts.target_character.level as u32 * 10, &ctx.accounts.config);

    account_realloc!(ctx, character, ctx.accounts.character.size());
    account_realloc!(ctx, target_character, ctx.accounts.target_character.size());
    ensure_rent_exempt!(ctx, signer, target_character);
    ensure_rent_exempt!(ctx, signer, character);

    session_reimburse!(ctx, session, signer);

    Ok(())
}
