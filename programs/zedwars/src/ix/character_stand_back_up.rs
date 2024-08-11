use crate::{
    account_realloc,
    constants::{PlayerVerifyArgs, ZOMBIE_START_WEAPON},
    ensure_rent_exempt,
    errors::ZedWarsError,
    events::ActionSuccessful,
    is_authenticated,
    ix::{verify_player, VerifyPlayerArgs},
    session_reimburse,
    state::{Character, Config, ConfigVar, Event, Item, MapTile, Session}, TileType,
};
use anchor_lang::prelude::*;
use bubblegum_cpi::get_asset_id;
use solana_program::{program::invoke, system_instruction};

use super::SplAccountCompression;

#[derive(Accounts)]
pub struct CharacterStandBackUpAccounts<'info> {
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
    /// The item account
    #[account(seeds=[Item::SEED_PREFIX,ZOMBIE_START_WEAPON.to_le_bytes().as_slice()],bump)]
    pub item: Account<'info, Item>,
    /// The tile account
    #[account(mut,seeds=[MapTile::SEED_PREFIX,tile.x.to_le_bytes().as_slice(),tile.y.to_le_bytes().as_slice()],bump)]
    pub tile: Account<'info, MapTile>,
    /// The tile we are coming from
    #[account(mut,seeds=[MapTile::SEED_PREFIX,from_tile.x.to_le_bytes().as_slice(),from_tile.y.to_le_bytes().as_slice()],bump)]
    pub from_tile: Account<'info, MapTile>,
    /// The config account
    #[account(seeds=[Config::SEED_PREFIX], bump)]
    pub config: Box<Account<'info, Config>>,
    /// The system program
    pub system_program: Program<'info, System>,
    pub compression_program: Program<'info, SplAccountCompression>,
}

pub fn handle_character_stand_back_up<'info>(
    ctx: Context<'_, '_, '_, 'info, CharacterStandBackUpAccounts<'info>>,
    args: PlayerVerifyArgs,
) -> Result<()> {
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

    let now = Clock::get()?.unix_timestamp;
    let slot = Clock::get()?.slot;
    // The character must be dead
    msg!("Checking if the character is alive");
    require_eq!(ctx.accounts.character.hp, 0, ZedWarsError::CharacterIsDead);

    // Check if the tile is valid
    if ctx.accounts.from_tile.tile_type == TileType::Afk {
        msg!("Checking if the tile is valid");
        require!(
            ctx.accounts.character.last_x == ctx.accounts.tile.x
                && ctx.accounts.character.last_y == ctx.accounts.tile.y,
            ZedWarsError::InvalidTile
        );

        //
        ctx.accounts.from_tile.num_zombies = ctx.accounts.from_tile.num_zombies.saturating_sub(1);
        ctx.accounts.tile.num_zombies = ctx.accounts.tile.num_zombies.saturating_add(1);

        ctx.accounts.character.x = ctx.accounts.tile.x;
        ctx.accounts.character.y = ctx.accounts.tile.y;
    } else {
        msg!("Checking if the tile is valid");
        require!(
            ctx.accounts.character.x == ctx.accounts.tile.x
                && ctx.accounts.character.y == ctx.accounts.tile.y,
            ZedWarsError::InvalidTile
        );
    }

    // stand the character back up
    msg!("Standing the character back up");
    ctx.accounts.character.hp = ctx.accounts.config.get_config_variable(ConfigVar::StandingBackUpHealth) as u8;

    // spend energy
    msg!("Spending energy");
    ctx.accounts.character.use_energy(
        ctx.accounts
            .config
            .get_config_variable(ConfigVar::StandingBackUpEnergyCost) as u8,
        now,
        slot,
        &ctx.accounts.config,
        &mut ctx.accounts.tile,
    )?;

    // clear inventory
    msg!("Clearing inventory");
    ctx.accounts.character.inventory.clear();

    msg!("Equipping bite by default");
    ctx.accounts.character.equip_item(&ctx.accounts.item);

    emit!(ActionSuccessful {
        character: ctx.accounts.character.key(),
        action: "Successfully stood back up.".to_string(),
    });

    ctx.accounts.character.add_event(Event {
        message: "Successfully stood back up!".to_string(),
        timestamp: now,
        severity: 4,
        block: Clock::get()?.slot,
    });

    account_realloc!(ctx, character, ctx.accounts.character.size());
    ensure_rent_exempt!(ctx, signer, character);
    session_reimburse!(ctx, session, signer);

    Ok(())
}
