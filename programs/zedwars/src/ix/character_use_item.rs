use bubblegum_cpi::get_asset_id;
use solana_program::{program::invoke, system_instruction};

use crate::{
    account_realloc,
    ensure_rent_exempt,
    errors::ZedWarsError,
    events::ActionSuccessful,
    is_authenticated,
    state::{Character, Config, ConfigVar, ConsumableType, Event, Item, ItemType, MapTile, Session, Skill, TileType, WeeklyMissionType}, constants::PlayerVerifyArgs, ix::{VerifyPlayerArgs, verify_player}, session_reimburse,
};
use anchor_lang::prelude::*;
use anchor_spl::token::Token;

use super::SplAccountCompression;

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct CharacterUseItemArgs {
    pub item_id: u32,
    pub player_verify: PlayerVerifyArgs,
}


#[derive(Accounts)]
#[instruction(args: CharacterUseItemArgs)]
pub struct CharacterUseItemAccounts<'info> {
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
    #[account(seeds=[Config::SEED_PREFIX],bump)]
    pub config: Box<Account<'info, Config>>,
    /// The token program
    pub token_program: Program<'info, Token>,
    /// The system program
    pub system_program: Program<'info, System>,
    pub compression_program: Program<'info, SplAccountCompression>,
}

/// The `handle_character_use_item` function is responsible for managing the use of an item by a character in the game.
/// It first authenticates the context and checks if the player owns the character.
/// It then checks if the character is alive and not a zombie, and if the tile is valid.
/// The function also checks if the target character is in the same tile as the character and if the character has the item in its inventory.
/// It ensures that the item is not equippable and then applies the item effects.
/// If the item is a consumable, it applies the effect based on the type of consumable.
/// The function also handles the case where the target character is the acting character to avoid overwriting changes.
/// Finally, it reallocates the accounts and ensures they are rent exempt.
pub fn handle_character_use_item<'info>(ctx: Context<'_, '_, '_, 'info, CharacterUseItemAccounts<'info>>, args: CharacterUseItemArgs) -> Result<()> {
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

    let now = Clock::get()?.unix_timestamp;
    // check if the character is alive
    msg!("Checking if the character is alive");
    require_gt!(ctx.accounts.character.hp, 0, ZedWarsError::CharacterIsDead);

    // checks if the tile is valid
    msg!("Checking if the tile is valid");
    require!(
        ctx.accounts.character.x == ctx.accounts.tile.x && ctx.accounts.character.y == ctx.accounts.tile.y,
        ZedWarsError::InvalidTile
    );

    // The target character must be in the same tile as the character
    msg!("Checking if the target character is in the same tile as the character");
    require!(
        ctx.accounts.character.x == ctx.accounts.target_character.x
            && ctx.accounts.character.y == ctx.accounts.target_character.y,
        ZedWarsError::InvalidCharacterState
    );

    msg!("Trying to find {} in {:?}", ctx.accounts.item.id, ctx.accounts.character.inventory);
    // The character must have the item in its inventory
    let item_index = ctx.accounts.character.inventory.iter().position(|x| x == &ctx.accounts.item.id);
    require!(item_index.is_some(), ZedWarsError::MissingItemInInventory);

    // The item cannot be an equiptable item
    msg!("Checking if the item is equippable");
    require!(
        matches!(ctx.accounts.item.item_type, ItemType::Consumable { .. }),
        ZedWarsError::InvalidItem
    );

    // apply item effects
    msg!("Applying item effects");
    let mut xp_gain = 0;
    if let ItemType::Consumable {
        effect_value,
        consumable_type,
    } = ctx.accounts.item.item_type
    {
        match consumable_type {
            ConsumableType::Health => {
                // Character using the item must be a survivor
                msg!("Checking if the character is a zombie");
                require!(!ctx.accounts.character.is_zombie, ZedWarsError::CannotBeZombie);
                // target must be a human
                msg!("Checking if the target character is a human");
                require!(
                    !ctx.accounts.target_character.is_zombie,
                    ZedWarsError::TargetCannotBeZombie
                );
                let mut healing_val = effect_value;
                if ctx.accounts.character.has_skill(Skill::AdvancedHealing) {
                    healing_val +=
                        ctx.accounts
                            .config
                            .get_config_variable(ConfigVar::AdvancedHealingHpBonus) as u8;
                }
                if ctx.accounts.character.mint != ctx.accounts.target_character.mint {
                    ctx.accounts.target_character.heal(healing_val, &ctx.accounts.config);
                    ctx.accounts.target_character.is_infected = false;
                    ctx.accounts.target_character.add_event(Event {
                        message: format!(
                            "You were healed for {}hp by {}.",
                            healing_val, ctx.accounts.character.name
                        ),
                        timestamp: now,
                        severity: 4,
                        block: Clock::get()?.slot,
                    });
                } else {
                    ctx.accounts.character.heal(healing_val, &ctx.accounts.config);
                    ctx.accounts.character.is_infected = false;
                    ctx.accounts.character.add_event(Event {
                        message: format!(
                            "You healed yourself for {}hp.",
                            healing_val
                        ),
                        timestamp: now,
                        severity: 4,
                        block: Clock::get()?.slot,
                    });
                }
                xp_gain = ctx
                    .accounts
                    .config
                    .get_config_variable(ConfigVar::UseItemFirstAidXpGain);
            }
            ConsumableType::Energy => {
                // Character using the item must be a survivor
                msg!("Checking if the character is a zombie");
                require!(!ctx.accounts.character.is_zombie, ZedWarsError::CannotBeZombie);

                ctx.accounts.character.refill_energy(effect_value, &ctx.accounts.config);
                xp_gain = ctx.accounts.config.get_config_variable(ConfigVar::UseItemEnergyXpGain);
            }
            ConsumableType::Fuel => {
                // Character using the item must be a survivor
                msg!("Checking if the character is a zombie");
                require!(!ctx.accounts.character.is_zombie, ZedWarsError::CannotBeZombie);

                // check if the tile has a generator
                require!(ctx.accounts.tile.has_generator, ZedWarsError::InvalidTile);
                // check if the tile already has power
                if ctx.accounts.tile.has_power_until > now {
                    // add 24 hours to the power
                    ctx.accounts.tile.has_power_until += effect_value as i64 * 60 * 60;
                } else {
                    // set the power to 24 hours
                    ctx.accounts.tile.has_power_until = now + effect_value as i64 * 60 * 60;
                }
                xp_gain = ctx.accounts.config.get_config_variable(ConfigVar::UseItemFuelCanXpGain);
            }
            ConsumableType::Revive => {
                // the target character must be a zombie
                msg!("Checking if the target character is a zombie");
                require!(ctx.accounts.target_character.is_zombie && !ctx.accounts.target_character.pending_revive, ZedWarsError::CannotBeHuman);
                require!(!ctx.accounts.target_character.pending_revive, ZedWarsError::AlreadyReviving);
                // apply the effect
                ctx.accounts.target_character.pending_revive = true;
                ctx.accounts.target_character.killed_by = Some(ctx.accounts.character.key());

                xp_gain = ctx
                    .accounts
                    .config
                    .get_config_variable(ConfigVar::UseItemRevivalSyringeXpGain);
            }
            ConsumableType::Generator => {
                // Character using the item must be a survivor
                msg!("Checking if the character is a zombie");
                require!(!ctx.accounts.character.is_zombie, ZedWarsError::CannotBeZombie);

                // check if the tile is a street
                msg!("Checking if the tile is a street");
                require!(
                    ctx.accounts.tile.tile_type != TileType::Street,
                    ZedWarsError::InvalidTile
                );
                // check if the tile already has a generator
                msg!("Checking if the tile already has a generator");
                require!(!ctx.accounts.tile.has_generator, ZedWarsError::InvalidTile);
                // set the tile as having a generator
                ctx.accounts.tile.has_generator = true;
                ctx.accounts.character.progress_mission(WeeklyMissionType::InstallGenerator, 1, &ctx.accounts.config);

                xp_gain = ctx
                    .accounts
                    .config
                    .get_config_variable(ConfigVar::UseItemGeneratorXpGain);
            }
            ConsumableType::Xp => {
                // Character using the item must be a survivor
                msg!("Checking if the character is a zombie");
                require!(!ctx.accounts.character.is_zombie, ZedWarsError::CannotBeZombie);

                if ctx.accounts.character.mint != ctx.accounts.target_character.mint {
                    ctx.accounts.target_character.bonus_xp += effect_value as u32;
                } else {
                    ctx.accounts.character.bonus_xp += effect_value as u32;
                }
            }
            ConsumableType::Premium => {
                msg!("Checking if the target already has premium");
                require!(!ctx.accounts.target_character.has_premium, ZedWarsError::AlreadyHasPremium); 
                ctx.accounts.target_character.has_premium = true;
                ctx.accounts.target_character.energy_regen_rate = ctx.accounts.target_character.energy_regen_rate.saturating_sub(ctx.accounts.config.get_config_variable(ConfigVar::PremiumRegenReduction));
                ctx.accounts.target_character.add_event(Event {
                    message:  "Your character now has premium.".to_string(),
                    timestamp: now,
                    severity: 4,
                    block: Clock::get()?.slot,
                });
            }
            ConsumableType::Raffle => {
                ctx.accounts.character.raffle_tickets = ctx.accounts.character.raffle_tickets.saturating_add(effect_value as u16);
                ctx.accounts.character.add_event(Event {
                    message:  format!("{} raffle ticket(s) have been added to your character", effect_value),
                    timestamp: now,
                    severity: 3,
                    block: Clock::get()?.slot,
                });
            }
            ConsumableType::Part => todo!(),
        }
    }

    // remove the item from the inventory
    msg!("Removing the item from the inventory");
    ctx.accounts.character.inventory.remove(item_index.unwrap());

    emit!(ActionSuccessful {
        character: ctx.accounts.character.key(),
        action: "Successfully used the item.".to_string(),
    });

    ctx.accounts.character.add_event(Event {
        message: format!("Successfully used {}.", ctx.accounts.item.name),
        timestamp: now,
        severity: 4,
        block: Clock::get()?.slot,
    });

    // gain xp
    ctx.accounts.character.gain_xp(xp_gain, &ctx.accounts.config);

    let slot = Clock::get()?.slot;
    // use energy
    ctx.accounts.character.use_energy(
        ctx.accounts.config.get_config_variable(ConfigVar::UseItemEnergyCost) as u8,
        now,
        slot,
        &ctx.accounts.config,
        &mut ctx.accounts.tile,
    )?;

    // if target character is the acting character
    // Anchor will first serialize the acting character
    // then the target character
    // causing the changes to the acting character to be overwritten
    // so we need to update the target character with the values from the acting character
    // when the target character is the acting character
    if ctx.accounts.target_character.mint == ctx.accounts.character.mint {
        ctx.accounts
            .target_character
            .set_inner(ctx.accounts.character.clone().into_inner());
    }

    account_realloc!(ctx, character, ctx.accounts.character.size());
    account_realloc!(ctx, target_character, ctx.accounts.target_character.size());
    ensure_rent_exempt!(ctx, signer, character);
    ensure_rent_exempt!(ctx, signer, target_character);
    session_reimburse!(ctx, session, signer);

    Ok(())
}
