use anchor_lang::prelude::*;

use arrayref::array_ref;
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
    Stat, WeeklyMissionType,
};

use super::SplAccountCompression;

#[derive(Accounts)]
pub struct RansackTileAccounts<'info> {
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
    /// The original tile account
    #[account(mut,seeds=[MapTile::SEED_PREFIX,tile.x.to_le_bytes().as_slice(),tile.y.to_le_bytes().as_slice()],bump)]
    pub tile: Account<'info, MapTile>,
    /// The config account
    #[account(seeds=[Config::SEED_PREFIX],bump)]
    pub config: Box<Account<'info, Config>>,
    pub system_program: Program<'info, System>,
    /// CHECK: Only the address needs to be checked
    #[account(address=solana_program::sysvar::slot_hashes::id())]
    pub sysvar_slot_hashes: UncheckedAccount<'info>,
    pub compression_program: Program<'info, SplAccountCompression>,
}

pub fn handle_ransack_tile<'info>(
    ctx: Context<'_, '_, '_, 'info, RansackTileAccounts<'info>>,
    args: PlayerVerifyArgs,
) -> Result<()> {
    let now = Clock::get()?.unix_timestamp;
    let slot = Clock::get()?.slot;
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
    msg!("Checking if the character is in the tile");
    require!(
        ctx.accounts.character.x == ctx.accounts.tile.x && ctx.accounts.character.y == ctx.accounts.tile.y,
        ZedWarsError::CharacterNotOnSameTile
    );

    msg!("Checking if the character is a zombie");
    require!(ctx.accounts.character.is_zombie, ZedWarsError::ZombieAction);

    ctx.accounts.tile.update_tile_loot(&ctx.accounts.config);
    require_gt!(ctx.accounts.tile.lootable_items, 0, ZedWarsError::TileExhausted);

    ctx.accounts
        .character
        .progress_mission(WeeklyMissionType::RansackTile, 1, &ctx.accounts.config);
    ctx.accounts.character.update_stat(Stat::TilesRansacked, 1);

   

    // If there is more than 10 lootable items, randomly select one of the potential loot items from the tile and add to inventory       
    if ctx.accounts.tile.lootable_items > 10 {
        let random_weights = ctx
            .accounts
            .config
            .get_item_random_weight(ctx.accounts.tile.tile_type.clone())
            .clone();
        let mut item_ids = Vec::new();
        for weight in random_weights.iter() {
            item_ids.push(weight.item_id);
        }

        let recent_slothashes = &ctx.accounts.sysvar_slot_hashes;
        let data = recent_slothashes.data.borrow();
        let most_recent = array_ref![data, 12, 8];

        // seed for the random number is a combination of the slot_hash - timestamp
        let seed = u64::from_le_bytes(*most_recent).saturating_sub(now as u64);

        let rng = (seed >> 32) as u32;

        let random_index = rng as usize % item_ids.len();
        let found_item = item_ids[random_index];
        ctx.accounts.character.inventory.push(found_item);
        ctx.accounts.character.add_event(Event {
            message: format!("Successfully ransacked the tile and found a @{}@.", found_item),
            timestamp: now,
            severity: 4,
            block: slot,
        });
    } else {
        ctx.accounts.character.add_event(Event {
            message: "Successfully ransacked the tile.".to_string(),
            timestamp: now,
            severity: 4,
            block: slot,
        });
    }

    // use energy
    ctx.accounts.character.use_energy(
        25, //TODO: Move this into a config var
        now,
        slot,
        &ctx.accounts.config,
        &mut ctx.accounts.tile,
    )?;
    msg!("{} lootable items to destroy", ctx.accounts.tile.lootable_items);
    let xp = (ctx.accounts.tile.lootable_items as u32) * 3;
    //TODO: Grab this from config var
    ctx.accounts.character.gain_xp(xp, &ctx.accounts.config);
    ctx.accounts.tile.lootable_items = 0;
    ctx.accounts.tile.last_searched_at = now;
    ctx.accounts.tile.resupply_at = 0;

    account_realloc!(ctx, character, ctx.accounts.character.size());
    ensure_rent_exempt!(ctx, signer, character);

    session_reimburse!(ctx, session, signer);

    Ok(())
}
