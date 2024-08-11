use anchor_lang::prelude::*;

use crate::{
    constants::{SUCCESS_RATE_DENOMINATOR, ZOMBIE_START_WEAPON},
    errors::ZedWarsError,
    events::{ActionUnsuccessful, CharacterKilled},
};

use super::{Config, ConfigVar, EquipSlot, Item, ItemType, MapTile, Point};

/// The character account
/// The character account is used to store the state of a character.
/// PDA: [Character::SEED_PREFIX, mint]
#[account]
pub struct Character {
    /// The mint of the character NFT.
    pub mint: Pubkey,
    /// The x coordinate of the character.
    pub x: i32,
    /// The y coordinate of the character.
    pub y: i32,
    /// The HP of the character.
    pub hp: u8,
    /// The flag to determine if the character is a zombie.
    pub is_zombie: bool,
    /// The XP of the character.
    pub xp: u32,
    /// Bonus XP remaining
    pub bonus_xp: u32,
    /// The level of the character.
    pub level: u16,
    /// The skill points of the character.
    pub skill_points: u16,
    /// The time when the character last attacked.
    pub last_attacked_at: i64,
    /// The time when the character last acted.
    pub last_acted_at: i64,
    /// The flag to determine if the character is infected and should take damage when doing actions that expend energy
    pub is_infected: bool,
    /// The energy of the character.
    pub energy: u8,
    /// The time when the energy value was last updated.
    /// Used to calculate the real energy value.
    pub energy_updated_at: i64,
    /// Additional backpack space
    pub backpack_space: u8,
    /// How many items the character has.
    pub inventory: Vec<u32>,
    /// The equipped items of the character.
    pub equipped_items: EquippedItems,
    // Skills
    pub skills: Vec<bool>,
    // Pubkey of the character that killed this character
    pub killed_by: Option<Pubkey>,
    // Time when they were killed
    pub killed_at: Option<i64>,
    // List of events
    pub events: Vec<Event>,
    // List of stats
    pub stats: Vec<u32>,
    // Name of the player
    pub name: String,
    // slot for the time they last did an action
    pub last_acted_slot: u64,
    // slot for the time they were last attacked
    pub last_attacked_slot: u64,
    // Rate at which energy regenerates
    pub energy_regen_rate: u32,
    // Whether or not they have a name change available, get a free one upon mint
    pub has_name_change_available: bool,
    // If they have a premium account or not
    pub has_premium: bool,
    // The last x location they were at, used to return a returning player to the map
    pub last_x: i32,
    // the last y location they were at, used to return a returning player to the map
    pub last_y: i32,
    // list of active missions
    pub weekly_missions: Vec<WeeklyMission>,
    // last time missions were generated, used to ensure missions can only be created once every 7 days
    pub missions_generated_at: i64,
    // raffle tickets this character has available to enter raffles with
    pub raffle_tickets: u16,
    // current courier mission they are on
    pub courier_mission: Option<CourierMission>,
    // The layers used to make up their nft image
    pub layers: String,
    // Used to confirm they should stand back up when a revival syringe is used on them
    pub pending_revive: bool,
    // The key of the wallet that referred them
    pub referred_by: Option<Pubkey>,
}

impl Character {
    /// The seed prefix for the PDA.
    pub const SEED_PREFIX: &'static [u8; 9] = b"Character";
    /// The initial space for the account.
    pub const INIT_SPACE: usize = 8 // Account discriminator
        + 32 // mint
        + 4 // x
        + 4 // y
        + 1 // hp
        + 1 // is_zombie
        + 4 // xp
        + 4 // bonus_xp
        + 2 // level
        + 2 // skill_points
        + 8 // last_attacked_at
        + 8 // last_acted_at
        + 1 // is_infected
        + 1 // energy
        + 8 // energy_updated_at
        + 1 // backpack_space
        + 4 // Items
        + 4 + Skill::NUM_SKILLS  // Skills
        + 3 // equipped_items'
        + 1 // killer
        + 1 // killed_at
        + 4 // events
        + 4 // stats
        + 1 // name
        + 8 // last acted slot 
        + 4 // last attacked slot
        + 1 // has name change available
        + 1 // is premium
        + 4 // last x
        + 4 // last y
        + 4 // weekly missions
        + 8 // missions generated at
        + 2 // raffle tickets
        + 1 // courier mission
        + 27 // layers
        + 33 // referred by
        + 1 // pending revive
        ;

    /// The size of the account.
    pub fn size(&self) -> usize {
        let mut s = 8
            + 32
            + 4
            + 4
            + 1
            + 1
            + 4
            + 4
            + 2
            + 2
            + 8
            + 8
            + 1
            + 1
            + 8
            + 1
            + 4
            + self.inventory.len() * 4
            + self.equipped_items.size()
            + 4
            + Skill::NUM_SKILLS
            + 1
            + 1
            + 4
            + 8
            + 8
            + 4
            + 4
            + 4
            + 1
            + 1
            + 8
            + 2
            + 27
            + 1
            + 1
            + self.name.len();
        if self.killed_by.is_some() {
            s += 32;
        }
        if self.killed_at.is_some() {
            s += 8;
        }
        if self.referred_by.is_some() {
            s += 32;
        }
        s += 4;
        for event in self.events.iter() {
            s += event.size();
        }
        s += 4 + self.stats.len() * 4;
        s += 4;
        for mission in self.weekly_missions.iter() {
            s += mission.size();
        }
        s += 1;
        if self.courier_mission.is_some() {
            s += 20;
        }
        s
    }

    /// Create a new character.
    /// The character will be created at the given x and y coordinates.
    /// The character will be a zombie if the is_zombie flag is set to true.
    ///
    /// # Arguments
    /// * `mint` - The mint of the character NFT.
    /// * `x` - The x coordinate of the character.
    /// * `y` - The y coordinate of the character.
    /// * `is_zombie` - The flag to determine if the character is a zombie.
    /// * `name` - The name of the character
    /// * `layers` - A list of layers to be used to generate an image. Format is 000_000_000_000_000
    pub fn new(
        mint: Pubkey,
        referred_by: Option<Pubkey>,
        x: i32,
        y: i32,
        is_zombie: bool,
        config: &Config,
        name: String,
        layers: String,
    ) -> Self {
        Self {
            mint,
            x,
            y,
            hp: config.get_config_variable(ConfigVar::MaxHp) as u8,
            is_zombie,
            xp: 0,
            bonus_xp: 0,
            level: 1,
            skill_points: 0,
            last_attacked_at: 0,
            last_acted_at: 0,
            is_infected: false,
            energy: config.get_config_variable(ConfigVar::MaxEnergy) as u8,
            energy_updated_at: 0,
            backpack_space: 0,
            inventory: Vec::with_capacity(10),
            equipped_items: EquippedItems {
                weapon: if is_zombie { Some(ZOMBIE_START_WEAPON) } else { None },
                armor: None,
                backpack: None,
            },
            skills: vec![false; Skill::NUM_SKILLS],
            killed_by: None,
            killed_at: None,
            events: vec![],
            stats: vec![0; Stat::NUM_STATS],
            name,
            last_acted_slot: 0,
            last_attacked_slot: 0,
            energy_regen_rate: 1200,
            has_name_change_available: true,
            has_premium: false,
            last_x: x,
            last_y: y,
            weekly_missions: vec![],
            missions_generated_at: 0,
            raffle_tickets: 0,
            courier_mission: None,
            layers,
            pending_revive: false,
            referred_by,
        }
    }

    pub fn has_skill(&self, skill: Skill) -> bool {
        // if the skills array isn't long enough, return false for any skill checks over current length of skills array
        if self.skills.len() <= (skill as usize) {
            return false;
        }
        self.skills[skill as usize]
    }
    pub fn unlock_skill(&mut self, skill: Skill) {
        // ensure the skills array is long enough
        if self.skills.len() < Skill::NUM_SKILLS {
            self.skills.resize(Skill::NUM_SKILLS, false);
        }
        self.skills[skill as usize] = true;
    }

    /// Gets current energy, updating if necessary
    pub fn update_energy(&mut self, current_time: i64, config: &Config) {
        let time_diff = current_time - self.energy_updated_at;

        // Get base energy regen rate
        let mut energy_regen_rate = config.get_config_variable(ConfigVar::EnergyRegenRate);

        // Reduce regen rate for premium
        if self.has_premium {
            energy_regen_rate =
                energy_regen_rate.saturating_sub(config.get_config_variable(ConfigVar::PremiumRegenReduction));
        }
        let energy_diff = time_diff / energy_regen_rate as i64;
        //Make sure we don't send any extra time into the ether when calculating how much energy to give a player
        let leftover_time = time_diff % energy_regen_rate as i64;
        if energy_diff > 0 {
            self.energy =
                (self.energy as i64 + energy_diff).min(config.get_config_variable(ConfigVar::MaxEnergy) as i64) as u8;
        }
        self.energy_updated_at = current_time - leftover_time;
    }

    pub fn use_energy(
        &mut self,
        energy: u8,
        current_time: i64,
        current_slot: u64,
        config: &Config,
        tile: &mut MapTile,
    ) -> Result<()> {
        // update energy
        self.update_energy(current_time, config);
        // check if there's enough energy
        require!(self.energy >= energy, ZedWarsError::CharacterOutOfEnergy);

        require!(!self.pending_revive, ZedWarsError::RevivePending);

        // check if last acted at is not too recent
        require!(
            current_slot - self.last_acted_slot >= config.get_config_variable(ConfigVar::ActionCoolDown) as u64,
            ZedWarsError::CharacterActionOnCooldown
        );

        // update last acted at
        self.last_acted_at = current_time;
        self.last_acted_slot = current_slot;

        // if we're infected, take damage
        if self.is_infected {
            let damage_taken = self.take_damage(
                config.get_config_variable(ConfigVar::InfectedDamageAmount) as u8,
                0,
                None,
                current_time,
                tile,
                config,
            );

            let clock = Clock::get();

            self.add_event(Event {
                message: format!("You are infected and take {} damage", damage_taken),
                timestamp: current_time,
                severity: 2,
                block: clock.unwrap_or_default().slot,
            });
        }

        // use energy
        self.energy -= energy;

        Ok(())
    }

    pub fn kill(&mut self, killer: Option<Pubkey>, current_time: i64) {
        // Only remove equipped items if not a zombie, otherwise people can loot zombie "weapons"
        if !self.is_zombie {
            // put weapon into inventory, so others can loot it
            if let Some(weapon_id) = self.equipped_items.weapon {
                self.inventory.push(weapon_id);
                self.equipped_items.weapon = None;
            }
            // put armor into inventory, so others can loot it
            if let Some(armor_id) = self.equipped_items.armor {
                self.inventory.push(armor_id);
                self.equipped_items.armor = None;
            }
            // pub backpack into inventory, so others can loot it
            if let Some(backpack_id) = self.equipped_items.backpack {
                self.inventory.push(backpack_id);
                self.backpack_space = 0;
                self.equipped_items.backpack = None;
            }
        }
        // if there's a killer, save killer pubkey and time of death
        if let Some(killer) = killer {
            self.killed_by = Some(killer);
            self.killed_at = Some(current_time);
        }
        self.is_infected = false;
        self.is_zombie = true;
        self.energy = 0;
        self.energy_updated_at = current_time;
        self.pending_revive = false;
        let victim_inventory = self
            .inventory
            .iter()
            .map(|i| i.to_string())
            .collect::<Vec<String>>()
            .join(",");

        if killer.is_some() {
            emit!(CharacterKilled {
                killer: killer.unwrap().key(),
                victim: self.mint.key(),
                victim_inventory
            });
        } else {
            emit!(CharacterKilled {
                killer: self.mint.key(),
                victim: self.mint.key(),
                victim_inventory
            });
        }
        emit!(ActionUnsuccessful {
            character: self.mint.key(),
            action: "You were killed".to_string(),
        });
    }

    /// Check if an action should be successful.
    ///
    /// # Arguments
    /// * `action_success_rate` - The success rate of the action. Defined in constants.rs
    /// * `random_number` - The random number used to determine if the action is successful.
    ///
    /// # Returns
    /// * `bool` - True if the action is successful, false otherwise.
    pub fn is_action_successful(action_success_rate: u32, random_number: u32) -> bool {
        let val = random_number % SUCCESS_RATE_DENOMINATOR;
        val < action_success_rate
    }

    pub fn get_mission_requirement(mission: WeeklyMissionType, n: u16) -> u16 {
        match mission {
            WeeklyMissionType::KillSurvivors => 3 + (n % 4),
            WeeklyMissionType::KillZombies => 5 + (n % 4),
            WeeklyMissionType::BuildBarricades => 50 + n,
            WeeklyMissionType::DestroyBarricades => 25 + n,
            WeeklyMissionType::GainXP => 1500 + (n * 50),
            WeeklyMissionType::FindItems => 20 + n,
            WeeklyMissionType::InstallGenerator => 1 + (n % 3),
            WeeklyMissionType::DestroyGenerator => 1 + (n % 3),
            WeeklyMissionType::ReviveZombie => 2 + (n % 3),
            WeeklyMissionType::RansackTile => 4 + (n % 5),
            WeeklyMissionType::CourierMission => 3 + (n % 3),
        }
    }

    /// Move the character
    ///
    /// # Arguments
    pub fn character_move(&mut self, to_x: i32, to_y: i32) {
        // update the character position
        self.last_x = self.x;
        self.last_y = self.y;
        self.x = to_x;
        self.y = to_y;
    }
    /// Check if the character can attack.
    /// A character can attack if the last time they attacked was more ATTACK_COOL_DOWN seconds ago
    ///
    /// # Arguments
    /// * `current_slot` - The current slot
    pub fn can_be_attacked(&self, current_slot: u64, config: &Config) -> bool {
        current_slot.saturating_sub(self.last_attacked_slot)
            >= config.get_config_variable(ConfigVar::AttackCoolDown) as u64
    }

    /// Attack this character with an attack
    ///
    /// # Arguments
    /// * `damage` - The damage of the attack.
    pub fn take_damage(
        &mut self,
        damage: u8,
        armor: u8,
        attacker: Option<Pubkey>,
        current_time: i64,
        tile: &mut MapTile,
        config: &Config,
    ) -> u8 {
        let was_dead = self.hp == 0;
        let was_zombie = self.is_zombie;
        let mut new_damage = damage.saturating_sub(armor);
        if self.has_skill(Skill::ThickSkin) {
            new_damage =
                new_damage.saturating_sub(config.get_config_variable(ConfigVar::ThickSkinDamageReduction) as u8);
        }
        if self.has_skill(Skill::TankyFlesh) && self.is_zombie {
            new_damage =
                new_damage.saturating_sub(config.get_config_variable(ConfigVar::TankyFleshDamageReduction) as u8);
        }
        let current_hp = self.hp;
        self.hp = self.hp.saturating_sub(new_damage);
        if self.hp == 0 {
            new_damage = current_hp;
            self.kill(attacker, current_time);
            if !was_dead && !was_zombie {
                tile.num_survivors = tile.num_survivors.saturating_sub(1);
                tile.num_zombies = tile.num_zombies.saturating_add(1);
            }
        }
        new_damage
    }

    /// Heal this character.
    ///
    /// # Arguments
    /// * `heal_amount` - The amount of hp to heal.
    pub fn heal(&mut self, heal_amount: u8, config: &Config) {
        let mut max_hp = config.get_config_variable(ConfigVar::MaxHp) as u8;
        if self.has_skill(Skill::BodyBuilder) {
            max_hp += config.get_config_variable(ConfigVar::BodyBuilderMaxHpBonus) as u8;
        }
        if self.is_zombie && self.has_skill(Skill::MutatedZombie) {
            max_hp *= 2;
        }
        self.hp = std::cmp::min(self.hp.saturating_add(heal_amount), max_hp);
    }

    /// Refill the energy of the character.
    ///
    /// # Arguments
    /// * `energy_amount` - The amount of energy to refill.
    pub fn refill_energy(&mut self, energy_amount: u8, config: &Config) {
        self.energy = std::cmp::min(
            self.energy.saturating_add(energy_amount),
            config.get_config_variable(ConfigVar::MaxEnergy) as u8,
        );
    }

    /// Equip an item
    ///
    /// # Arguments
    /// * `item` - The item to equip.
    ///
    /// # Returns
    /// * `Result<()>` - An error if the item cannot be equipped.
    pub fn equip_item(&mut self, item: &Item) {
        // equip item
        match item.item_type {
            ItemType::Weapon { .. } => {
                if self.equipped_items.weapon.is_some() {
                    // unequip old weapon
                    self.unequip_item(EquipSlot::Weapon);
                }
                self.equipped_items.weapon = Some(item.id)
            }
            ItemType::Armor { .. } => {
                if self.equipped_items.armor.is_some() {
                    // unequip old armor
                    self.unequip_item(EquipSlot::Armor);
                }
                self.equipped_items.armor = Some(item.id)
            }
            ItemType::Backpack { size } => {
                if self.equipped_items.backpack.is_some() {
                    // unequip old backpack
                    self.unequip_item(EquipSlot::Backpack);
                    self.backpack_space = 0;
                }
                self.equipped_items.backpack = Some(item.id);
                self.backpack_space = size;
            }
            _ => {}
        }
    }

    /// Get unarmed damage
    /// unarmed damage is 5 + 1 if the character has unarmed combat unlocked and + 3 if the character has advanced unarmed combat unlocked
    /// # Returns
    /// * `u8` - The unarmed damage of the character.
    pub fn get_unarmed_damage(&self, config: &Config) -> u8 {
        let mut damage = config.get_config_variable(ConfigVar::BaseUnarmedDamage) as u8;
        if self.has_skill(Skill::UnarmedCombat) {
            damage += config.get_config_variable(ConfigVar::UnarmedCombatSkillAttackBonus) as u8;
        }
        if self.has_skill(Skill::AdvancedUnarmedCombat) {
            damage += config.get_config_variable(ConfigVar::AdvancedUnarmedCombatSkillAttackBonus) as u8;
        }
        damage
    }

    /// Gain xp
    pub fn gain_xp(&mut self, xp: u32, config: &Config) {
        msg!("Gaining {}xp", xp);
        let mut xp = xp;
        //Check if double XP is active
        if config.get_config_variable(ConfigVar::DoubleXPActive) == 1 {
            xp *= 2;
        }
        self.update_stat(Stat::TotalXP, xp);
        self.progress_mission(WeeklyMissionType::GainXP, xp as u16, config);
        // If there's bonus xp remaining, add the same amount of bonus xp
        if self.bonus_xp > 0 {
            let xp_to_add = std::cmp::min(self.bonus_xp, xp);
            self.bonus_xp -= xp_to_add;
            xp += xp_to_add;
        }

        if self.is_zombie && self.has_skill(Skill::MutatedZombie) {
            xp *= 2;
        }
        // Add XP with saturation to prevent overflow
        self.xp = self.xp.saturating_add(xp);

        // Get configuration variables
        let xp_per_level = config.get_config_variable(ConfigVar::XpPerLevel);
        let skill_points_gained_per_level = config.get_config_variable(ConfigVar::SkillPointsGainedPerLevel) as u16;

        // Calculate next level requirement
        let mut next_level_requirement = self.level as u32 * xp_per_level;
        let clock = Clock::get();
        // While we have enough XP for the next level, level up and adjust XP and skill points
        while self.xp >= next_level_requirement {
            self.level += 1;
            self.skill_points += skill_points_gained_per_level;
            self.add_event(Event {
                message: format!(
                    "You gained a level! You are now level {} and gained {} skill point(s). Your stamina has been replenished.",
                    self.level, skill_points_gained_per_level
                ),
                timestamp: clock.clone().unwrap_or_default().unix_timestamp,
                severity: 3,
                block: clock.clone().unwrap_or_default().slot,
            });

            //Restore stamina/hp to max
            self.energy = config.get_config_variable(ConfigVar::MaxEnergy) as u8;
            //self.heal(100, config);

            // Deduct the required XP for the leveled up
            self.xp = self.xp.saturating_sub(next_level_requirement);

            // Recalculate next level requirement
            next_level_requirement = self.level as u32 * xp_per_level;
        }
    }

    /// Unequip an item
    ///
    /// # Arguments
    /// * `item` - The item to unequip.
    ///
    /// # Returns
    /// * `Result<()>` - An error if the item cannot be unequipped.
    pub fn unequip_item(&mut self, slot: EquipSlot) {
        // unequip item
        let item_id = match slot {
            EquipSlot::Weapon => {
                let id = self.equipped_items.weapon.unwrap();
                self.equipped_items.weapon = None;
                id
            }
            EquipSlot::Armor => {
                let id = self.equipped_items.armor.unwrap();
                self.equipped_items.armor = None;
                id
            }
            EquipSlot::Backpack => {
                let id = self.equipped_items.backpack.unwrap();
                self.equipped_items.backpack = None;
                self.backpack_space = 0;
                id
            }
        };
        if !self.is_zombie {
            // put item in inventory (only if not a zombie)
            self.inventory.push(item_id);
        }
    }

    pub fn add_event(&mut self, event: Event) {
        // If more than 25 events, remove the oldest one
        if self.events.len() > 24 {
            self.events.remove(0);
        }
        self.events.push(event);
    }

    // Adds the given value to the stat
    pub fn update_stat(&mut self, key: Stat, value: u32) {
        if self.stats.len() < Stat::NUM_STATS {
            self.stats.resize(Stat::NUM_STATS, 0);
        }

        self.stats[key as usize] = self.stats[key as usize].saturating_add(value);
    }

    pub fn progress_mission(&mut self, mission_type: WeeklyMissionType, amount: u16, config: &Config) {
        let mut rewards = Vec::new();
        let mut to_remove = Vec::new();
        for (idx, mission) in self.weekly_missions.iter_mut().enumerate() {
            if mission.mission_type == mission_type {
                mission.current = mission.current.saturating_add(amount);
                if mission.current >= mission.required {
                    rewards.push(mission.reward as u32);
                    to_remove.push(idx);
                }
                // break out of the loop so you can't gain progress towards multiple missions at once
                break;
            }
        }
        for idx in to_remove.iter().rev() {
            self.weekly_missions.remove(*idx);
        }
        let clock = Clock::get();
        for reward in rewards {
            self.add_event(Event {
                message: format!(
                    "You have completed a weekly mission and gained {}xp and {} raffle ticket(s).",
                    reward,
                    config.get_config_variable(ConfigVar::TicketsPerMission)
                ),
                timestamp: clock.clone().unwrap_or_default().unix_timestamp,
                severity: 3,
                block: clock.clone().unwrap_or_default().slot,
            });
            self.gain_xp(reward, config);
            self.raffle_tickets = self
                .raffle_tickets
                .saturating_add(config.get_config_variable(ConfigVar::TicketsPerMission) as u16)
        }
    }

    pub fn revive(&mut self, tile: &mut MapTile) {
        self.is_zombie = false;
        self.pending_revive = false;
        self.add_event(Event {
            message: "You were turned back into a survivor.".to_string(),
            timestamp: Clock::get().unwrap().unix_timestamp,
            severity: 4,
            block: Clock::get().unwrap().slot,
        });
        tile.num_zombies = tile.num_zombies.saturating_sub(1);
        tile.num_survivors = tile.num_survivors.saturating_add(1);

        self.equipped_items.backpack = None;
        self.equipped_items.armor = None;
        self.equipped_items.weapon = None;

        self.killed_by = None;

        self.inventory = vec![];
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy)]
pub enum Stat {
    TotalXP,
    BarricadesBuilt,
    BarricadesDestroyed,
    GeneratorsDestroyed,
    ItemsCrafted,
    ItemsFound,
    ZombiesKilled,
    SurvivorsKilled,
    TilesRansacked,
    CouriersCompleted,
}
impl Stat {
    /// Number of variables in the config account.
    pub const NUM_STATS: usize = 10;
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct EquippedItems {
    pub weapon: Option<u32>,
    pub armor: Option<u32>,
    pub backpack: Option<u32>,
}

impl EquippedItems {
    pub fn size(&self) -> usize {
        let mut size = 3;
        if self.weapon.is_some() {
            size += 4;
        }
        if self.armor.is_some() {
            size += 4;
        }
        if self.backpack.is_some() {
            size += 4;
        }
        size
    }
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct Event {
    pub message: String,
    pub timestamp: i64,
    pub severity: u8,
    pub block: u64,
}

impl Event {
    pub fn size(&self) -> usize {
        let mut size = 0;
        size += self.message.len();
        size += 21;

        size
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq, AnchorSerialize, AnchorDeserialize)]
pub enum Skill {
    Parkour,
    BarricadeBuilder,
    UnarmedCombat,
    BodyBuilder,
    AdvancedUnarmedCombat,
    Looter,
    AdvancedLooter,
    ThickSkin,
    AdvancedMelee,
    PistolProficiency,
    LongGunProficiency,
    RangedAccuracy,
    AdvancedHealing,
    TechLooter,
    RevivalSyringeCrafter,
    AdrenalineSyringeCrafter,
    ExperienceSyringeCrafter,
    BarricadeDestroyer,
    InfectedBite,
    EnhancedBite,
    EnhancedClaws,
    HealingAttack,
    Drag,
    TankyFlesh,
    SpeedWalking,
    MutatedZombie,
    FirearmsTraining,
    AdvancedFirearmsTraining,
    WeaponMaintenance,
    ZombieAccuracy,
    AdvancedZombieAccuracy,
}

impl Skill {
    pub const NUM_SKILLS: usize = 31;
}

#[derive(Clone, Copy, Debug, PartialEq, Eq, AnchorSerialize, AnchorDeserialize)]
pub enum WeeklyMissionType {
    KillSurvivors,
    KillZombies,
    BuildBarricades,
    DestroyBarricades,
    GainXP,
    FindItems,
    InstallGenerator,
    DestroyGenerator,
    ReviveZombie,
    RansackTile,
    CourierMission,
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct WeeklyMission {
    pub mission_type: WeeklyMissionType,
    pub required: u16,
    pub current: u16,
    pub reward: u16,
}

impl WeeklyMission {
    pub fn size(&self) -> usize {
        7
    }
}

pub enum MissionRarity {
    Rare,
    Epic,
    Legendary,
    Invalid,
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct CourierMission {
    pub destination: Point,
    pub item: u32,
    pub reward: u32,
}

#[cfg(test)]
mod test {

    use crate::state::{ConfigVar, Creator, TileType};

    use super::*;
    #[test]
    fn test_equipped_items_size() {
        let equipped_items = EquippedItems {
            weapon: Some(0),
            armor: Some(0),
            backpack: Some(0),
        };
        let data = equipped_items.try_to_vec().unwrap();
        assert_eq!(data.len(), equipped_items.size());
    }

    #[test]
    fn test_character_size() {
        let creator = Creator {
            address: Pubkey::new_unique(),
            verified: false,
            share: 5,
        };
        let config = Config {
            items_collection_mint: Pubkey::new_unique(),
            characters_collection_mint: Pubkey::new_unique(),
            number_of_items: 0,
            number_of_characters: 0,
            search_success_rates: vec![0; TileType::NUM_TILE_TYPES],
            config_variables: vec![0; ConfigVar::NUM_VARS],
            item_random_weights: vec![],
            skill_points_required: vec![],
            creators: vec![creator],
            maintenance_mode: false,
            legendary_items: vec![vec![]],
            rare_drop_table: vec![],
            merkle_tree: Some(Pubkey::new_unique()),
            merkle_tree_items_minted: 0,
            loot_regen_rates: vec![],
        };
        let mut character = Character::new(
            Pubkey::new_unique(),
            Some(Pubkey::new_unique()),
            0,
            0,
            false,
            &config,
            "Player 1001".to_string(),
            "001_001_001_001_001_001".to_string(),
        );
        character.equipped_items = EquippedItems {
            weapon: None,
            armor: None,
            backpack: None,
        };
        let mut data = Vec::new();
        character.try_serialize(&mut data).unwrap();
        assert_eq!(data.len(), character.size());
    }

    #[test]
    fn test_character_size_with_events() {
        let creator = Creator {
            address: Pubkey::new_unique(),
            verified: false,
            share: 5,
        };
        let config = Config {
            items_collection_mint: Pubkey::new_unique(),
            characters_collection_mint: Pubkey::new_unique(),
            number_of_items: 0,
            number_of_characters: 0,
            search_success_rates: vec![0; TileType::NUM_TILE_TYPES],
            config_variables: vec![0; ConfigVar::NUM_VARS],
            item_random_weights: vec![],
            skill_points_required: vec![],
            creators: vec![creator],
            maintenance_mode: false,
            legendary_items: vec![vec![]],
            rare_drop_table: vec![],
            merkle_tree: Some(Pubkey::new_unique()),
            merkle_tree_items_minted: 0,
            loot_regen_rates: vec![],
        };
        let mut character = Character::new(
            Pubkey::new_unique(),
            None,
            0,
            0,
            false,
            &config,
            "Player 1001".to_string(),
            "001_001_001_001_001_001".to_string(),
        );
        character.inventory = vec![1, 2, 3];
        character.equipped_items = EquippedItems {
            weapon: None,
            armor: None,
            backpack: None,
        };
        character.add_event(Event {
            message: "asdfasdf".to_string(),
            timestamp: 0,
            severity: 0,
            block: 0,
        });
        character.add_event(Event {
            message: "asdfasdf".to_string(),
            timestamp: 0,
            severity: 0,
            block: 0,
        });
        character.add_event(Event {
            message: "asdfasdf".to_string(),
            timestamp: 0,
            severity: 0,
            block: 0,
        });
        character.add_event(Event {
            message: "asdfasdfasdf".to_string(),
            timestamp: 0,
            severity: 0,
            block: 0,
        });
        character.add_event(Event {
            message: "asdfasdf".to_string(),
            timestamp: 0,
            severity: 0,
            block: 0,
        });
        character.add_event(Event {
            message: "asdfasdf".to_string(),
            timestamp: 0,
            severity: 0,
            block: 0,
        });
        character.add_event(Event {
            message: "asdfasdf".to_string(),
            timestamp: 0,
            severity: 0,
            block: 0,
        });
        character.add_event(Event {
            message: "asdfasdfasdf".to_string(),
            timestamp: 0,
            severity: 0,
            block: 0,
        });
        character.add_event(Event {
            message: "more action more action".to_string(),
            timestamp: 0,
            severity: 0,
            block: 0,
        });
        character.add_event(Event {
            message: "action action action".to_string(),
            timestamp: 0,
            severity: 0,
            block: 0,
        });
        character.add_event(Event {
            message: "te".to_string(),
            timestamp: 0,
            severity: 0,
            block: 0,
        });
        character.add_event(Event {
            message: "testing".to_string(),
            timestamp: 0,
            severity: 0,
            block: 0,
        });
        character.add_event(Event {
            message: "test123".to_string(),
            timestamp: 0,
            severity: 0,
            block: 0,
        });
        character.add_event(Event {
            message: "more action more action".to_string(),
            timestamp: 0,
            severity: 0,
            block: 0,
        });
        character.add_event(Event {
            message: "action action action".to_string(),
            timestamp: 0,
            severity: 0,
            block: 0,
        });
        character.add_event(Event {
            message: "te".to_string(),
            timestamp: 0,
            severity: 0,
            block: 0,
        });
        character.add_event(Event {
            message: "testing".to_string(),
            timestamp: 0,
            severity: 0,
            block: 0,
        });
        character.add_event(Event {
            message: "test123".to_string(),
            timestamp: 0,
            severity: 0,
            block: 0,
        });

        let mut data = Vec::new();
        character.try_serialize(&mut data).unwrap();
        assert_eq!(data.len(), character.size());
    }

    #[test]
    fn test_character_update_energy() {
        let mut config = Config {
            items_collection_mint: Pubkey::new_unique(),
            characters_collection_mint: Pubkey::new_unique(),
            number_of_items: 0,
            number_of_characters: 0,
            search_success_rates: vec![0; TileType::NUM_TILE_TYPES],
            config_variables: vec![0; ConfigVar::NUM_VARS],
            item_random_weights: vec![],
            skill_points_required: vec![],
            creators: vec![],
            maintenance_mode: false,
            legendary_items: vec![vec![]],
            rare_drop_table: vec![],
            merkle_tree: Some(Pubkey::new_unique()),
            merkle_tree_items_minted: 0,
            loot_regen_rates: vec![],
        };
        config.config_variables[ConfigVar::EnergyRegenRate as usize] = 10;
        config.config_variables[ConfigVar::MaxEnergy as usize] = 100;

        let mut character = Character::new(
            Pubkey::new_unique(),
            None,
            0,
            0,
            false,
            &config,
            "Player 1001".to_string(),
            "001_001_001_001_001_001".to_string(),
        );

        character.energy = 0;

        let regen_rate = config.get_config_variable(ConfigVar::EnergyRegenRate) as i64;
        let max_energy = config.get_config_variable(ConfigVar::MaxEnergy) as u8;
        character.update_energy(0, &config);
        assert_eq!(character.energy, 0);
        character.update_energy(regen_rate, &config);
        assert_eq!(character.energy, 1);
        character.update_energy(regen_rate * 2, &config);
        assert_eq!(character.energy, 2);

        character.energy = max_energy;
        character.update_energy(regen_rate * 100, &config);
        assert_eq!(character.energy, max_energy);

        character.hp = 0;
        character.energy = 0;
        character.update_energy(regen_rate * 1000, &config);
        assert_eq!(character.energy, max_energy);

        character.update_energy(12345, &config);
        assert_eq!(character.energy, max_energy);
    }

    #[test]
    fn test_character_move() {
        let mut config = Config {
            items_collection_mint: Pubkey::new_unique(),
            characters_collection_mint: Pubkey::new_unique(),
            number_of_items: 0,
            number_of_characters: 0,
            search_success_rates: vec![0; TileType::NUM_TILE_TYPES],
            config_variables: vec![0; ConfigVar::NUM_VARS],
            item_random_weights: vec![],
            skill_points_required: vec![],
            creators: vec![],
            maintenance_mode: false,
            legendary_items: vec![vec![]],
            rare_drop_table: vec![],
            merkle_tree: Some(Pubkey::new_unique()),
            merkle_tree_items_minted: 0,
            loot_regen_rates: vec![],
        };
        config.config_variables[ConfigVar::MaxEnergy as usize] = 100;
        config.config_variables[ConfigVar::MoveEnergyCost as usize] = 1;
        let mut character = Character::new(
            Pubkey::new_unique(),
            None,
            0,
            0,
            false,
            &config,
            "Player 1001".to_string(),
            "001_001_001_001_001".to_string(),
        );

        character.character_move(1, 0);
        assert_eq!(character.x, 1);
        assert_eq!(character.y, 0);
        // assert_eq!(character.energy, 100 - 1);
    }
    #[test]
    fn test_character_attack_cool_down() {
        let mut config = Config {
            items_collection_mint: Pubkey::new_unique(),
            characters_collection_mint: Pubkey::new_unique(),
            number_of_items: 0,
            number_of_characters: 0,
            search_success_rates: vec![0; TileType::NUM_TILE_TYPES],
            config_variables: vec![0; ConfigVar::NUM_VARS],
            item_random_weights: vec![],
            skill_points_required: vec![],
            creators: vec![],
            maintenance_mode: false,
            legendary_items: vec![vec![]],
            rare_drop_table: vec![],
            merkle_tree: Some(Pubkey::new_unique()),
            merkle_tree_items_minted: 0,
            loot_regen_rates: vec![],
        };
        config.config_variables[ConfigVar::AttackCoolDown as usize] = 1;

        let mut character = Character::new(
            Pubkey::new_unique(),
            None,
            0,
            0,
            false,
            &config,
            "Player 1001".to_string(),
            "001_001_001_001_001".to_string(),
        );

        let attack_cool_down = config.get_config_variable(ConfigVar::AttackCoolDown) as u64;
        character.last_attacked_slot = 1;
        assert!(!character.can_be_attacked(attack_cool_down, &config));
        assert!(character.can_be_attacked(attack_cool_down + 1, &config));
    }

    #[test]
    fn test_character_take_damage_melee() {
        let mut config = Config {
            items_collection_mint: Pubkey::new_unique(),
            characters_collection_mint: Pubkey::new_unique(),
            number_of_items: 0,
            number_of_characters: 0,
            search_success_rates: vec![0; TileType::NUM_TILE_TYPES],
            config_variables: vec![0; ConfigVar::NUM_VARS],
            item_random_weights: vec![],
            skill_points_required: vec![],
            creators: vec![],
            maintenance_mode: false,
            legendary_items: vec![vec![]],
            rare_drop_table: vec![],
            merkle_tree: Some(Pubkey::new_unique()),
            merkle_tree_items_minted: 0,
            loot_regen_rates: vec![],
        };
        let mut tile = MapTile::new(0, 0, TileType::Street);
        config.config_variables[ConfigVar::MaxHp as usize] = 100;
        let mut character = Character::new(
            Pubkey::new_unique(),
            None,
            0,
            0,
            false,
            &config,
            "Player 1001".to_string(),
            "001_001_001_001_001".to_string(),
        );
        character.take_damage(10, 0, Some(Pubkey::new_unique()), 0, &mut tile, &config);
        assert_eq!(character.hp, 100 - 10);
        character.take_damage(11, 0, None, 0, &mut tile, &config);
        assert_eq!(character.hp, 100 - 21);
    }

    #[test]
    fn test_character_heal() {
        let mut config = Config {
            items_collection_mint: Pubkey::new_unique(),
            characters_collection_mint: Pubkey::new_unique(),
            number_of_items: 0,
            number_of_characters: 0,
            search_success_rates: vec![0; TileType::NUM_TILE_TYPES],
            config_variables: vec![0; ConfigVar::NUM_VARS],
            item_random_weights: vec![],
            skill_points_required: vec![],
            creators: vec![],
            maintenance_mode: false,
            legendary_items: vec![vec![]],
            rare_drop_table: vec![],
            merkle_tree: Some(Pubkey::new_unique()),
            merkle_tree_items_minted: 0,
            loot_regen_rates: vec![],
        };
        config.config_variables[ConfigVar::MaxHp as usize] = 100;

        let mut character = Character::new(
            Pubkey::new_unique(),
            None,
            0,
            0,
            false,
            &config,
            "Player 1001".to_string(),
            "001_001_001_001_001".to_string(),
        );
        character.hp = 0;
        character.heal(10, &config);
        assert_eq!(character.hp, 10);
        character.hp = 100;
        character.heal(10, &config);
        assert_eq!(character.hp, 100);
    }

    #[test]
    fn test_character_refill_energy() {
        let mut config = Config {
            items_collection_mint: Pubkey::new_unique(),
            characters_collection_mint: Pubkey::new_unique(),
            number_of_items: 0,
            number_of_characters: 0,
            search_success_rates: vec![0; TileType::NUM_TILE_TYPES],
            config_variables: vec![0; ConfigVar::NUM_VARS],
            item_random_weights: vec![],
            skill_points_required: vec![],
            creators: vec![],
            maintenance_mode: false,
            legendary_items: vec![vec![]],
            rare_drop_table: vec![],
            merkle_tree: Some(Pubkey::new_unique()),
            merkle_tree_items_minted: 0,
            loot_regen_rates: vec![],
        };
        config.config_variables[ConfigVar::MaxEnergy as usize] = 100;

        let mut character = Character::new(
            Pubkey::new_unique(),
            None,
            0,
            0,
            false,
            &config,
            "Player 1001".to_string(),
            "001_001_001_001_001".to_string(),
        );
        character.energy = 0;
        character.refill_energy(10, &config);
        assert_eq!(character.energy, 10);
        character.energy = 100;
        character.refill_energy(10, &config);
        assert_eq!(character.energy, 100);
    }
}
