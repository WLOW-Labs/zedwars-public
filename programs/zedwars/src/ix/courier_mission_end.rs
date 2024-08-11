use anchor_lang::prelude::*;

use bubblegum_cpi::get_asset_id;
use solana_program::{program::invoke, system_instruction};

use crate::{
    account_realloc, constants::PlayerVerifyArgs, ensure_rent_exempt, errors::ZedWarsError, is_authenticated, ix::{verify_player, VerifyPlayerArgs}, session_reimburse, state::{
        Character, Config, Event, Item, MapTile, Session,
    }, Stat, WeeklyMissionType
};

use super::SplAccountCompression;

/// The accounts for the character barricade instruction
#[derive(Accounts)]
pub struct CourierMissionEndAccounts<'info> {
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

/// The handler for the character barricade instruction
pub fn handle_courier_mission_end<'info>(ctx: Context<'_, '_, '_, 'info, CourierMissionEndAccounts<'info>>, args: PlayerVerifyArgs) -> Result<()> {
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

    let tile = &mut ctx.accounts.tile;
    let now = Clock::get()?.unix_timestamp;
    let slot = Clock::get()?.slot;

    // check if the character is alive
    msg!("Checking if the character is alive");
    require_gt!(ctx.accounts.character.hp, 0, ZedWarsError::CharacterIsDead);

    msg!("Need to be on a courier mission");
    require!(ctx.accounts.character.courier_mission.is_some(), ZedWarsError::NotOnCourierMission);

    let mission = ctx.accounts.character.courier_mission.as_ref().unwrap().clone();

    // checks if the tile is valid
    msg!("Checking if the tile is valid");
    require!(
        tile.x == mission.destination.x && tile.y == mission.destination.y,
        ZedWarsError::InvalidTile
    );

    // The character cannot be a zombie
    msg!("Checking if the character is a zombie");
    require!(!ctx.accounts.character.is_zombie, ZedWarsError::CharacterIsAZombie);

    // Check that the character has the item still
    let item_index = ctx.accounts.character.inventory.iter().position(|x| x == &mission.item);
    require!(item_index.is_some(), ZedWarsError::MissingItem);

    // remove the item from the inventory
    ctx.accounts.character.inventory.remove(item_index.unwrap());

    // add reward to inventory
    ctx.accounts.character.inventory.push(mission.reward);
    ctx.accounts.character.gain_xp(100, &ctx.accounts.config);

    // reset courier mission
    ctx.accounts.character.courier_mission = None;
    
    ctx.accounts.character.progress_mission(WeeklyMissionType::CourierMission, 1, &ctx.accounts.config);
    ctx.accounts.character.update_stat(Stat::CouriersCompleted, 1);

    ctx.accounts.character.add_event(Event {
        message: "Successfully completed courier mission, your reward has been added to your inventory".to_string(),
        timestamp: now,
        severity: 4,
        block: slot,
    });

    account_realloc!(ctx, character, ctx.accounts.character.size());
    ensure_rent_exempt!(ctx, signer, character);
    session_reimburse!(ctx, session, signer);

    Ok(())
}
