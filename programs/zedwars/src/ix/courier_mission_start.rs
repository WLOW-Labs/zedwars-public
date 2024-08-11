use anchor_lang::prelude::*;
use arrayref::array_ref;

use bubblegum_cpi::get_asset_id;
use solana_program::{program::invoke, system_instruction};

use crate::{
    account_realloc, ensure_rent_exempt,
    errors::ZedWarsError,
    is_authenticated,
    state::{Character, Config, Item, ItemRarity, MapTile, Session, TileType, Point, CourierMission, Event, MissionRarity}, constants::PlayerVerifyArgs, ix::{VerifyPlayerArgs, verify_player}, session_reimburse,
};

use super::SplAccountCompression;

/// The accounts for the character barricade instruction
#[derive(Accounts)]
pub struct CourierMissionStartAccounts<'info> {
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
    #[account(mut,seeds=[MapTile::SEED_PREFIX,tile.x.to_le_bytes().as_slice(),tile.y.to_le_bytes().as_slice()],bump)]
    pub tile: Account<'info, MapTile>,
    /// The item to courier
    #[account(mut,seeds=[Item::SEED_PREFIX,item.id.to_le_bytes().as_slice()],bump)]
    pub item: Account<'info, Item>,
    /// The config account
    #[account(seeds=[Config::SEED_PREFIX],bump)]
    pub config: Box<Account<'info, Config>>,
    /// The sysvar slot hashes account
    /// CHECK: Only the address needs to be checked
    #[account(address=solana_program::sysvar::slot_hashes::id())]
    pub sysvar_slot_hashes: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
    pub compression_program: Program<'info, SplAccountCompression>,
}

pub fn get_courier_mission_rarity(item_rarity: ItemRarity) -> MissionRarity {
    match item_rarity {
        ItemRarity::Uncommon => MissionRarity::Rare,
        ItemRarity::Rare => MissionRarity::Epic,
        ItemRarity::Epic => MissionRarity::Legendary,
        _ => MissionRarity::Invalid,
    }
}

/// The handler for the character barricade instruction
pub fn handle_courier_mission_start<'info>(ctx: Context<'_, '_, '_, 'info, CourierMissionStartAccounts<'info>>, args: PlayerVerifyArgs) -> Result<()> {
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
    let tile = &mut ctx.accounts.tile;
    let now = Clock::get()?.unix_timestamp;
    let slot = Clock::get()?.slot;
    let mission_rarity = get_courier_mission_rarity(ctx.accounts.item.rarity);

    msg!("Require non invalid mission rarity");
    require!(!matches!(mission_rarity, MissionRarity::Invalid), ZedWarsError::InvalidItemForMission);

    msg!("Require item to convert to something");
    require_gt!(ctx.accounts.item.converts_to, 0, ZedWarsError::InvalidItemForMission);

    // check if the character is alive
    msg!("Checking if the character is alive");
    require_gt!(character.hp, 0, ZedWarsError::CharacterIsDead);

    // checks if the tile is valid
    msg!("Checking if the tile is valid");
    require!(
        matches!(tile.tile_type, TileType::Courier { .. }),
        ZedWarsError::InvalidTile
    );

    // The character cannot be a zombie
    msg!("Checking if the character is a zombie");
    require!(!character.is_zombie, ZedWarsError::CharacterIsAZombie);

    msg!("Must not already be on a courier mission");
    require!(
        character.courier_mission.is_none(),
        ZedWarsError::AlreadyOnCourierMission
    );

    // random generator
    let recent_slothashes = &ctx.accounts.sysvar_slot_hashes;
    let data = recent_slothashes.data.borrow();
    let most_recent = array_ref![data, 12, 8];

    // seed for the random number is a combination of the slot_hash - timestamp
    let seed = u64::from_le_bytes(*most_recent).saturating_sub(now as u64);

    let rng = (seed >> 32) as u32;

    let destination = match &tile.tile_type {
        TileType::Courier { rare, epic, legendary} => {
            let destinations = match mission_rarity {
                MissionRarity::Rare => rare,
                MissionRarity::Epic => epic,
                MissionRarity::Legendary => legendary,
                _ => epic,
            };
            destinations[(rng % destinations.len() as u32) as usize]
        }
        _ => {
            Point { x: -1, y: -1 } // handle other variants
        }
    };

    character.courier_mission = Some(CourierMission {
        destination,
        item: ctx.accounts.item.id,
        reward: ctx.accounts.item.converts_to,
    });

    ctx.accounts.character.add_event(Event {
        message: format!("Courier mission started, deliver {} to {}, {}", ctx.accounts.item.name, destination.x, destination.y),
        timestamp: now,
        severity: 3,
        block: slot,
    });

    account_realloc!(ctx, character, ctx.accounts.character.size());
    ensure_rent_exempt!(ctx, signer, character);
    session_reimburse!(ctx, session, signer);

    Ok(())
}
