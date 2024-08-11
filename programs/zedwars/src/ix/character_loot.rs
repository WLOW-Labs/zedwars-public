use anchor_lang::prelude::*;
use arrayref::array_ref;
use bubblegum_cpi::get_asset_id;
use solana_program::{program::invoke, system_instruction};
use verify_player::VerifyPlayerArgs;

use crate::{
    account_realloc, constants::PlayerVerifyArgs, ensure_rent_exempt, errors::ZedWarsError, is_authenticated, ix::verify_player, session_reimburse, state::{Character, Config, ConfigVar, Event, Item, MapTile, Session}, Skill
};

use super::SplAccountCompression;

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct CharacterLootArgs {
    pub item_id: u32,
    pub player_verify: PlayerVerifyArgs,
}

#[derive(Accounts)]
#[instruction(args: CharacterLootArgs)]
pub struct CharacterLootAccounts<'info> {
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
    /// The item account
    #[account(mut,seeds=[Item::SEED_PREFIX,args.item_id.to_le_bytes().as_slice()],bump)]
    pub item: Account<'info, Item>,
    /// The target character account
    #[account(mut,seeds=[Character::SEED_PREFIX,target_character.mint.as_ref()],bump)]
    pub target_character: Account<'info, Character>,
    /// The original tile account
    #[account(mut,seeds=[MapTile::SEED_PREFIX,tile.x.to_le_bytes().as_slice(),tile.y.to_le_bytes().as_slice()],bump)]
    pub tile: Account<'info, MapTile>,
    /// The config account
    #[account(seeds=[Config::SEED_PREFIX], bump)]
    pub config: Box<Account<'info, Config>>,
    /// The system program
    pub system_program: Program<'info, System>,
    /// CHECK: Only the address needs to be checked
    #[account(address=solana_program::sysvar::slot_hashes::id())]
    pub sysvar_slot_hashes: UncheckedAccount<'info>,
    pub compression_program: Program<'info, SplAccountCompression>,
}

pub fn handle_character_loot<'info>(ctx: Context<'_, '_, '_, 'info, CharacterLootAccounts<'info>>, args: CharacterLootArgs) -> Result<()> {
    is_authenticated!(ctx);

    let asset_id = get_asset_id(ctx.accounts.player_merkle_tree.key, args.player_verify.index.into());

    //check if the proof matches the player
    require_eq!(asset_id, ctx.accounts.character.mint, ZedWarsError::NoAuthority);
    
    //check if the signer owns the player
    msg!("Checking if signer owns the nft");    
    let res = verify_player(VerifyPlayerArgs{
        data_hash: args.player_verify.data_hash,
        creator_hash: args.player_verify.creator_hash,
        root: args.player_verify.root,
        index: args.player_verify.index,
        compression_program: ctx.accounts.compression_program.to_account_info(),
        merkle_tree: ctx.accounts.player_merkle_tree.to_account_info(),
        owner: ctx.accounts.player.key(),
        delegate: ctx.accounts.player.key(),
        proof_accounts: ctx.remaining_accounts.to_vec()
    });
    require!(res.is_ok(), ZedWarsError::NoAuthority);

    // The character must be alive
    require_gt!(ctx.accounts.character.hp, 0, ZedWarsError::CharacterIsDead);

    // The character must be on the tile
    msg!("Checking if the character is on the tile");
    require!(
        ctx.accounts.character.x == ctx.accounts.tile.x && ctx.accounts.character.y == ctx.accounts.tile.y,
        ZedWarsError::InvalidTile
    );
    // The character must be in the same tile as the target character
    msg!("Checking if the character is in the same tile as the target character");
    require_eq!(
        ctx.accounts.character.x,
        ctx.accounts.target_character.x,
        ZedWarsError::CharacterNotOnSameTile
    );
    require_eq!(
        ctx.accounts.character.y,
        ctx.accounts.target_character.y,
        ZedWarsError::CharacterNotOnSameTile
    );

    // The target character must be dead
    msg!("Checking if the target character is dead");
    require_eq!(ctx.accounts.target_character.hp, 0, ZedWarsError::TargetIsNotDead);

    // The character must have enough energy
    msg!("Checking if the character has enough energy");
    require_gte!(
        ctx.accounts.character.energy,
        ctx.accounts.config.config_variables[ConfigVar::LootEnergyCost as usize] as u8,
        ZedWarsError::CharacterOutOfEnergy
    );
    // if the loot privilege duration has not passed,
    // the looted character must be killed by the looting character
    let now = Clock::get()?.unix_timestamp;
    if let Some(killed_at) = ctx.accounts.target_character.killed_at {
        if let Some(killed_by) = ctx.accounts.target_character.killed_by {
            if killed_at + ctx.accounts.config.config_variables[ConfigVar::LootPrivilegeDuration as usize] as i64 > now
            {
                msg!("Checking if the target was killed by the character");
                require_keys_eq!(
                    killed_by,
                    ctx.accounts.character.key(),
                    ZedWarsError::LootPrivilegeNotExpired
                );
            }
        }
    }

    // The target must have the item
    msg!("Checking if the target has the item");
    require!(
        ctx.accounts.target_character.inventory.contains(&args.item_id),
        ZedWarsError::TargetDoesNotHaveItem
    );

    let recent_slothashes = &ctx.accounts.sysvar_slot_hashes;
    let data = recent_slothashes.data.borrow();
    let most_recent = array_ref![data, 12, 8];

    let clock = Clock::get()?;
    let slot = Clock::get()?.slot;
    // seed for the random number is a combination of the slot_hash - timestamp
    let seed = u64::from_le_bytes(*most_recent).saturating_sub(clock.unix_timestamp as u64);
    let rng = (seed >> 32) as u32;

    if Character::is_action_successful(
        ctx.accounts.config.get_config_variable(ConfigVar::LootBodySuccessRate),
        rng,
    ) || ctx.accounts.character.has_skill(Skill::MutatedZombie) {
        // add the item to the character's inventory
        ctx.accounts.character.inventory.push(args.item_id);

        ctx.accounts.character.add_event(Event {
            message: format!("Successfully looted {} from the body!", ctx.accounts.item.name),
            timestamp: now,
            severity: 4,
            block: Clock::get()?.slot,
        });
    } else {
        ctx.accounts.character.add_event(Event {
            message: format!(
                "Failed to loot {} from the body, it was destroyed in the process.",
                ctx.accounts.item.name
            ),
            timestamp: now,
            severity: 3,
            block: Clock::get()?.slot,
        });
    }

    // remove the first item that matches the item_id from the target's inventory
    if let Some(pos) = ctx
        .accounts
        .target_character
        .inventory
        .iter()
        .position(|&x| x == args.item_id)
    {
        ctx.accounts.target_character.inventory.remove(pos);
    }

    // cost energy
    ctx.accounts.character.use_energy(
        ctx.accounts.config.get_config_variable(ConfigVar::LootEnergyCost) as u8,
        now,
        slot,
        &ctx.accounts.config,
        &mut ctx.accounts.tile,
    )?;

    account_realloc!(ctx, character, ctx.accounts.character.size());
    account_realloc!(ctx, target_character, ctx.accounts.target_character.size());

    ensure_rent_exempt!(ctx, signer, character);
    ensure_rent_exempt!(ctx, signer, target_character);
    
    session_reimburse!(ctx, session, signer);

    Ok(())
}
