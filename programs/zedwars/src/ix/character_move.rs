use anchor_lang::prelude::*;

use bubblegum_cpi::get_asset_id;
use solana_program::{program::invoke, system_instruction};
use verify_player::VerifyPlayerArgs;

use crate::{
    account_realloc, ensure_rent_exempt,
    errors::ZedWarsError,
    is_authenticated,
    state::{Character, Config, ConfigVar, Event, MapTile, Session, Skill, TileType}, constants::PlayerVerifyArgs, ix::verify_player, session_reimburse,
};

use super::SplAccountCompression;

/// The accounts for the `character_move` instruction.
#[derive(Accounts)]
pub struct CharacterMoveAccounts<'info> {
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
    /// The original tile account
    #[account(mut,seeds=[MapTile::SEED_PREFIX,orig_tile.x.to_le_bytes().as_slice(),orig_tile.y.to_le_bytes().as_slice()],bump)]
    pub orig_tile: Account<'info, MapTile>,
    /// The destination tile account
    #[account(mut,seeds=[MapTile::SEED_PREFIX,dest_tile.x.to_le_bytes().as_slice(),dest_tile.y.to_le_bytes().as_slice()],bump)]
    pub dest_tile: Account<'info, MapTile>,
    /// The config account
    #[account(seeds=[Config::SEED_PREFIX],bump)]
    pub config: Box<Account<'info, Config>>,
    /// The system program
    pub system_program: Program<'info, System>,
    pub compression_program: Program<'info, SplAccountCompression>,
}

pub fn handle_character_move<'info>(ctx: Context<'_, '_, '_, 'info, CharacterMoveAccounts<'info>>, args: PlayerVerifyArgs) -> Result<()> {
    is_authenticated!(ctx);

    let asset_id = get_asset_id(ctx.accounts.player_merkle_tree.key, args.index.into());

    //check if the proof matches the player
    require_eq!(asset_id, ctx.accounts.character.mint, ZedWarsError::NoAuthority);
    
    //check if the signer owns the player
    msg!("Checking if signer owns the nft");    
    let res = verify_player(VerifyPlayerArgs{
        data_hash: args.data_hash,
        creator_hash: args.creator_hash,
        root: args.root,
        index: args.index,
        compression_program: ctx.accounts.compression_program.to_account_info(),
        merkle_tree: ctx.accounts.player_merkle_tree.to_account_info(),
        owner: ctx.accounts.player.key(),
        delegate: ctx.accounts.player.key(),
        proof_accounts: ctx.remaining_accounts.to_vec()
    });
    require!(res.is_ok(), ZedWarsError::NoAuthority);

    let character = &mut ctx.accounts.character;
    let from_tile = &mut ctx.accounts.orig_tile;
    let to_tile = &mut ctx.accounts.dest_tile;
    let config = &ctx.accounts.config;
    let now = Clock::get()?.unix_timestamp;
    let slot = Clock::get()?.slot;

    // check if the character is alive
    require!(character.hp > 0 || from_tile.tile_type == TileType::Afk, ZedWarsError::CharacterIsDead);

    // checks if the original tile is valid
    require!(
        character.x == from_tile.x && character.y == from_tile.y,
        ZedWarsError::InvalidTile
    );

    // checks if the destination tile is valid
    require!(from_tile.is_adjacent(&to_tile.x, &to_tile.y) || (from_tile.tile_type == TileType::Afk && (to_tile.x == character.last_x && to_tile.y == character.last_y)), ZedWarsError::DestinationInvalid);

    // check if the destination tile is not too heavily barricaded
    let barricade_limit = if character.is_zombie {
        config.get_config_variable(ConfigVar::ZombieMoveBarricadeLimit)
    } else {
        config.get_config_variable(ConfigVar::HumanMoveBarricadeLimit)
    } as u8;
    if character.is_zombie || !character.has_skill(Skill::Parkour) || from_tile.tile_type == TileType::Street {
        require!(
            to_tile.num_barricades < barricade_limit,
            ZedWarsError::TileHeavilyBarricaded
        );
    }

    // move the character
    character.character_move(to_tile.x, to_tile.y);

    // use energy
    let mut energy_cost = config.get_config_variable(ConfigVar::MoveEnergyCost) as u8;
    if character.is_zombie && !character.has_skill(Skill::SpeedWalking) {
        energy_cost += config.get_config_variable(ConfigVar::ZombieMoveExtraEnergyCost) as u8;
    }
    character.use_energy(energy_cost, now, slot, config, to_tile)?;

    // update the tiles
    if character.is_zombie {
        from_tile.num_zombies = from_tile.num_zombies.saturating_sub(1);
        to_tile.num_zombies = to_tile.num_zombies.saturating_add(1);
    } else {
        from_tile.num_survivors = from_tile.num_survivors.saturating_sub(1);
        to_tile.num_survivors = to_tile.num_survivors.saturating_add(1);
    }

    ctx.accounts.character.add_event(Event {
        message: "Successfully moved.".to_string(),
        timestamp: now,
        severity: 3,
        block: Clock::get()?.slot,
    });

    account_realloc!(ctx, character, ctx.accounts.character.size());
    ensure_rent_exempt!(ctx, signer, character);
    session_reimburse!(ctx, session, signer);

    Ok(())
}
