use crate::{
    account_realloc, ensure_rent_exempt,
    errors::ZedWarsError,
    is_authenticated,
    state::{Character, Config, ConfigVar, Event, Item, ItemType, MapTile, Session, Skill, Stat, WeaponType, WeeklyMissionType}, ix::verify_player, constants::PlayerVerifyArgs, session_reimburse,
};
use anchor_lang::prelude::*;
use arrayref::array_ref;
use bubblegum_cpi::get_asset_id;
use solana_program::{program::invoke, system_instruction};
use verify_player::VerifyPlayerArgs;
use super::SplAccountCompression;

/// The accounts for the `character_attack` instruction.
#[derive(Accounts)]
pub struct CharacterAttackAccounts<'info> {
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
    // The weapon of the attacker
    #[account(seeds=[Item::SEED_PREFIX,character.equipped_items.weapon.unwrap().to_le_bytes().as_slice()],bump)]
    pub weapon: Option<Account<'info, Item>>,
    // The armor of the defender
    #[account(seeds=[Item::SEED_PREFIX,target_character.equipped_items.armor.unwrap().to_le_bytes().as_slice()],bump)]
    pub armor: Option<Account<'info, Item>>,
    /// The original tile account
    #[account(mut,seeds=[MapTile::SEED_PREFIX,tile.x.to_le_bytes().as_slice(),tile.y.to_le_bytes().as_slice()],bump)]
    pub tile: Box<Account<'info, MapTile>>,
    /// The target tile account
    #[account(mut,seeds=[MapTile::SEED_PREFIX,target_character.x.to_le_bytes().as_slice(),target_character.y.to_le_bytes().as_slice()],bump)]
    pub target_tile: Box<Account<'info, MapTile>>,
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

pub fn handle_character_attack<'info>(ctx: Context<'_, '_, '_, 'info, CharacterAttackAccounts<'info>>, args: PlayerVerifyArgs) -> Result<()> {
    // Check if it is authorized
    is_authenticated!(ctx);

    let asset_id = get_asset_id(ctx.accounts.player_merkle_tree.key, args.index.into());

    //check if the proof matches the player
    require_eq!(asset_id, ctx.accounts.character.mint, ZedWarsError::NoAuthority);
    
    //check if the signer owns the player    
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
    let config = &ctx.accounts.config;
    let now = Clock::get()?.unix_timestamp;
    let slot = Clock::get()?.slot;
    let target_was_zombie = ctx.accounts.target_character.is_zombie;

    require_keys_neq!(
        ctx.accounts.character.key(),
        ctx.accounts.target_character.key(),
        ZedWarsError::CannotAttackYourself
    );

    // check if the character is alive
    require_gt!(ctx.accounts.character.hp, 0, ZedWarsError::CharacterIsDead);

    //check if target is alive
    require_gt!(ctx.accounts.target_character.hp, 0, ZedWarsError::TargetIsDead);

    // check if the character is equipped with the weapon provided in the ctx
    require!(
        ctx.accounts.character.equipped_items.weapon == ctx.accounts.weapon.as_ref().map(|item| item.id),
        ZedWarsError::InvalidCharacterState
    );
    // check if the target character is equipped with the armor provided in the ctx
    require!(
        ctx.accounts.target_character.equipped_items.armor == ctx.accounts.armor.as_ref().map(|item| item.id),
        ZedWarsError::InvalidCharacterState
    );

    // humans cannot attack another human
    if !ctx.accounts.character.is_zombie {
        require!(
            ctx.accounts.target_character.is_zombie,
            ZedWarsError::CannotAttackAnotherHuman
        );
    }

    // checks if the tile is valid
    require!(
        (ctx.accounts.character.x == tile.x) && (ctx.accounts.character.y == tile.y),
        ZedWarsError::InvalidTile
    );

    // if ranged weapon, ensure target tile is adjacent or same tile as character tile
    if let Some(ItemType::Weapon { weapon_type, .. }) = ctx.accounts.weapon.as_ref().map(|w| &w.item_type) {
        if *weapon_type == WeaponType::Firearm {
            // checks if the tile is valid
            require!(
                (ctx.accounts.target_character.x == ctx.accounts.target_tile.x)
                    && (ctx.accounts.target_character.y == ctx.accounts.target_tile.y),
                ZedWarsError::InvalidTile
            );
            // checks if the tile is valid
            require!(
                ((ctx.accounts.character.x == ctx.accounts.target_character.x)
                    && (ctx.accounts.character.y == ctx.accounts.target_character.y))
                    || ctx
                        .accounts
                        .tile
                        .is_adjacent(&ctx.accounts.target_tile.x, &ctx.accounts.target_tile.y),
                ZedWarsError::InvalidRangedTile
            );
        } else {
            // The target character must be in the same tile as the character
            require!(
                (ctx.accounts.character.x == ctx.accounts.target_character.x)
                    && (ctx.accounts.character.y == ctx.accounts.target_character.y),
                ZedWarsError::CharacterNotOnSameTile
            );
        }
    } else {
        require!(
            (ctx.accounts.character.x == ctx.accounts.target_character.x)
                && (ctx.accounts.character.y == ctx.accounts.target_character.y),
            ZedWarsError::CharacterNotOnSameTile
        );
    }

    // Check if the defender can be attacked, can only be attacked once per second
    require!(
        ctx.accounts.target_character.can_be_attacked(slot, config),
        ZedWarsError::CharacterOnAttackCoolDown
    );

    // update character
    ctx.accounts.target_character.last_attacked_at = now;
    ctx.accounts.target_character.last_attacked_slot = slot;

    //Random number
    let recent_slothashes = &ctx.accounts.sysvar_slot_hashes;
    let data = recent_slothashes.data.borrow();
    let most_recent = array_ref![data, 12, 8];

    // seed for the random number is a combination of the slot_hash - timestamp
    let seed = u64::from_le_bytes(*most_recent).saturating_sub(now as u64);

    let rng = (seed >> 32) as u32;

    // base xp gain
    ctx.accounts
        .character
        .gain_xp(config.get_config_variable(ConfigVar::AttackBaseXpGain), config);

    // check if the attack is successful
    let mut attack_success_rate =
        if let Some(ItemType::Weapon { accuracy, .. }) = ctx.accounts.weapon.as_ref().map(|w| &w.item_type) {
            *accuracy
        } else {
            config.get_config_variable(ConfigVar::UnarmedAttackSuccessRate)
        };
    if ctx.accounts.character.has_skill(Skill::FirearmsTraining) {
        if let Some(ItemType::Weapon { weapon_type, .. }) = ctx.accounts.weapon.as_ref().map(|w| &w.item_type) {
            if *weapon_type == WeaponType::Firearm {
                attack_success_rate += config.get_config_variable(ConfigVar::FirearmsTrainingAccuracyBonus);
            }
        }
    }
    if ctx.accounts.character.has_skill(Skill::AdvancedFirearmsTraining) {
        if let Some(ItemType::Weapon { weapon_type, .. }) = ctx.accounts.weapon.as_ref().map(|w| &w.item_type) {
            if *weapon_type == WeaponType::Firearm {
                attack_success_rate += config.get_config_variable(ConfigVar::AdvancedFirearmsTrainingAccuracyBonus);
            }
        }
    }
    if ctx.accounts.character.has_skill(Skill::AdvancedMelee) {
        if let Some(ItemType::Weapon { weapon_type, .. }) = ctx.accounts.weapon.as_ref().map(|w| &w.item_type) {
            if *weapon_type == WeaponType::Melee {
                attack_success_rate += config.get_config_variable(ConfigVar::AdvancedMeleeAttackBonus);
            }
        }
    }
    if ctx.accounts.character.has_skill(Skill::ZombieAccuracy) {
        if let Some(ItemType::Weapon { weapon_type, .. }) = ctx.accounts.weapon.as_ref().map(|w| &w.item_type) {
            if *weapon_type == WeaponType::ZombieBite || *weapon_type == WeaponType::ZombieClaw {
                attack_success_rate += config.get_config_variable(ConfigVar::ZombieAccuracyBonus);
            }
        }
    }
    if ctx.accounts.character.has_skill(Skill::AdvancedZombieAccuracy) {
        if let Some(ItemType::Weapon { weapon_type, .. }) = ctx.accounts.weapon.as_ref().map(|w| &w.item_type) {
            if *weapon_type == WeaponType::ZombieBite || *weapon_type == WeaponType::ZombieClaw {
                attack_success_rate += config.get_config_variable(ConfigVar::AdvancedZombieAccuracyBonus);
            }
        }
    }
    if Character::is_action_successful(attack_success_rate, rng) {
        // get attack damage
        let mut dmg = if let Some(ItemType::Weapon { damage, .. }) = ctx.accounts.weapon.as_ref().map(|w| &w.item_type)
        {
            *damage
        } else {
            ctx.accounts.character.get_unarmed_damage(config)
        };
        if let Some(ItemType::Weapon { weapon_type, .. }) = ctx.accounts.weapon.as_ref().map(|w| &w.item_type) {
            match weapon_type {
                WeaponType::ZombieBite => {
                    if ctx.accounts.character.has_skill(Skill::EnhancedBite) {
                        dmg += ctx
                            .accounts
                            .config
                            .get_config_variable(ConfigVar::EnhancedBiteAttackBonus)
                            as u8;
                    }
                }
                WeaponType::ZombieClaw => {
                    if ctx.accounts.character.has_skill(Skill::EnhancedClaws) {
                        dmg += ctx
                            .accounts
                            .config
                            .get_config_variable(ConfigVar::EnhancedClawAttackBonus)
                            as u8;
                    }
                }
                //No bonus damage for the rest of them
                _ => {}
            }
        }
        // get defense
        let defense = if let Some(ItemType::Armor { defense, .. }) = ctx.accounts.armor.as_ref().map(|a| &a.item_type) {
            *defense
        } else {
            0
        };
        let damage_dealt = ctx.accounts.target_character.take_damage(
            dmg,
            defense,
            Some(ctx.accounts.character.key()),
            now,
            &mut ctx.accounts.target_tile,
            config,
        );
        // gain xp
        ctx.accounts.character.gain_xp(damage_dealt as u32, config);
        // heal if is zombie and has healing attack skill
        if ctx.accounts.character.is_zombie && ctx.accounts.character.has_skill(Skill::HealingAttack) {
            ctx.accounts.character.heal(damage_dealt, config);
        }

        if damage_dealt == 0 {
            ctx.accounts.character.add_event(Event {
                message: "Your target appears to be too tanky for you to do damage".to_string(),
                timestamp: now,
                severity: 4,
                block: slot,
            });

            ctx.accounts.target_character.add_event(Event {
                message: format!(
                    "You were attacked for {} damage by {}!",
                    damage_dealt, ctx.accounts.character.name
                ),
                timestamp: now,
                severity: 2,
                block: slot,
            });
        } else {
            ctx.accounts.character.add_event(Event {
                message: format!("You attacked for {} damage!", damage_dealt),
                timestamp: now,
                severity: 4,
                block: slot,
            });

            ctx.accounts.target_character.add_event(Event {
                message: format!(
                    "You were attacked for {} damage by {}!",
                    damage_dealt, ctx.accounts.character.name
                ),
                timestamp: now,
                severity: 2,
                block: slot,
            });
        }
    } else {

        ctx.accounts.character.add_event(Event {
            message: "Your attack missed!".to_string(),
            timestamp: now,
            severity: 3,
            block: slot,
        });

        ctx.accounts.target_character.add_event(Event {
            message: format!("An attack at you by {} missed!", ctx.accounts.character.name),
            timestamp: now,
            severity: 3,
            block: slot,
        });
    }

    if ctx.accounts.target_character.hp == 0 {
        ctx.accounts.target_character.add_event(Event {
            message: format!("You were killed by {}", ctx.accounts.character.name),
            timestamp: now,
            severity: 2,
            block: slot,
        });

        ctx.accounts.character.add_event(Event {
            message: format!("You killed {}", ctx.accounts.target_character.name),
            timestamp: now,
            severity: 3,
            block: slot,
        });
    }

    let break_random_data = array_ref![data, 16, 8];

    // seed for the random number is a combination of the slot_hash - timestamp
    let break_seed = u64::from_le_bytes(*break_random_data).saturating_sub(now as u64);

    let break_armor_rng = (break_seed >> 32) as u32;
    let break_weapon_rng = (break_seed & 0xFFFFFFFF) as u32;

    // weapon break chance should only happen if they do not have the weapon maintenance skill unlocked
    if !ctx.accounts.character.has_skill(Skill::WeaponMaintenance) {
        // should the weapon break?
        if let Some(ItemType::Weapon { break_chance, .. }) = ctx.accounts.weapon.as_ref().map(|w| &w.item_type) {
            if Character::is_action_successful(*break_chance, break_weapon_rng) {
                ctx.accounts.character.add_event(Event {
                    message: format!("Your {} broke during the attack!", ctx.accounts.weapon.as_ref().unwrap().name),
                    timestamp: now,
                    severity: 2,
                    block: slot,
                });
                ctx.accounts.character.equipped_items.weapon = None;
            }
        }
    }

    // should the armor break?
    if let Some(ItemType::Armor { break_chance, .. }) = ctx.accounts.armor.as_ref().map(|a| &a.item_type) {
        if Character::is_action_successful(*break_chance, break_armor_rng) {
            ctx.accounts.target_character.add_event(Event {
                message: format!("Your {} broke during the attack!", ctx.accounts.armor.as_ref().unwrap().name),
                timestamp: now,
                severity: 2,
                block: slot,
            });
            ctx.accounts.target_character.equipped_items.armor = None;
        }
    }

    let infect_rng = (seed & 0xFFFFFFFF) as u32;

    // should the target be infected?
    if should_infect_target(&ctx, infect_rng, config) {
        if !ctx.accounts.target_character.is_infected {
            ctx.accounts.target_character.add_event(Event {
                message: format!("You were infected by {}!", ctx.accounts.character.name),
                timestamp: now,
                severity: 2,
                block: slot,
            });
            ctx.accounts.character.add_event(Event {
                message: format!("You infected {}!", ctx.accounts.target_character.name),
                timestamp: now,
                severity: 4,
                block: slot,
            });
        }
        ctx.accounts.target_character.is_infected = true;
    }

    // use energy
    ctx.accounts.character.use_energy(
        config.get_config_variable(ConfigVar::AttackEnergyCost) as u8,
        now,
        slot,
        config,
        &mut ctx.accounts.tile,
    )?;

    if ctx.accounts.target_character.hp == 0 {
        if target_was_zombie {
            ctx.accounts.character.update_stat(Stat::ZombiesKilled, 1);
            ctx.accounts.character.progress_mission(WeeklyMissionType::KillZombies, 1, config)
        } else {
            ctx.accounts.character.update_stat(Stat::SurvivorsKilled, 1);
            ctx.accounts.character.progress_mission(WeeklyMissionType::KillSurvivors, 1, config)
        }
        
    }

    account_realloc!(ctx, character, ctx.accounts.character.size());
    account_realloc!(ctx, target_character, ctx.accounts.target_character.size());
    ensure_rent_exempt!(ctx, signer, target_character);
    ensure_rent_exempt!(ctx, signer, character);

    session_reimburse!(ctx, session, signer);

    Ok(())
}

fn should_infect_target(ctx: &Context<CharacterAttackAccounts>, rng: u32, config: &Config) -> bool {
    match ctx.accounts.weapon.as_ref().map(|w| &w.item_type) {
        Some(ItemType::Weapon { weapon_type, .. }) if *weapon_type == WeaponType::ZombieBite => {}
        _ => return false,
    };

    if !ctx.accounts.character.is_zombie
        || ctx.accounts.target_character.is_zombie
        || !ctx.accounts.character.has_skill(Skill::InfectedBite)
    {
        return false;
    }

    Character::is_action_successful(config.get_config_variable(ConfigVar::InfectedBiteInfectionRate), rng)
}
