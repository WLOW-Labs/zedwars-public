use anchor_lang::prelude::*;

use super::{Creator, TileType};

#[account]
/// The config account for the program.
/// This account is used to store the collection NFT mints and the number of SFTs and NFTs registered.
/// The account is initialized by the operator.
/// The account is owned by the program.
/// PDA: [Config::SEED_PREFIX]
pub struct Config {
    /// Items collection NFT mint.
    pub items_collection_mint: Pubkey,
    /// Characters collection NFT mint.
    pub characters_collection_mint: Pubkey,
    /// Number of items registered
    pub number_of_items: u16,
    /// Number of characters registered
    pub number_of_characters: u32,
    /// Config variables
    pub config_variables: Vec<u32>,
    /// Item random weights
    pub item_random_weights: Vec<Vec<ItemRandomWeight>>,
    /// Search success rates
    pub search_success_rates: Vec<u32>,
    /// Skill points required
    pub skill_points_required: Vec<u8>,
    /// Creators
    pub creators: Vec<Creator>,
    /// Maintenance mode
    pub maintenance_mode: bool,
    /// List of potential legendary items that can be crafted
    pub legendary_items: Vec<Vec<u32>>,
    /// List of items available in the rare drop table
    pub rare_drop_table: Vec<u32>,
    /// The merkle tree used for minting item cnft
    pub merkle_tree: Option<Pubkey>,
    pub merkle_tree_items_minted: u64,
    pub loot_regen_rates: Vec<u32>,
}

impl Config {
    /// The seed prefix for the config account.
    pub const SEED_PREFIX: &'static [u8; 6] = b"Config";
    /// Init space for the config account.
    pub const INIT_SPACE: usize = 8 + 32 + 32 + 2 + 4 + 4 + 4 + 4 + 4 + 4 + 4 + 4 + 1 + 1 + 8 + 4;
    /// calculate size
    pub fn size(&self) -> usize {
        let mut size = 8 + 32 + 32 + 2 + 4 + 1 + 1 + 8;
        // config variables
        size += 4 + self.config_variables.len() * 4;
        // item random weights
        size += 4;
        for item_random_weight in &self.item_random_weights {
            size += 4 + item_random_weight.len() * ItemRandomWeight::SIZE;
        }
        // legendary items
        size += 4;
        for legendary_item in &self.legendary_items {
            size += 4 + (legendary_item.len() * 4);
        }
        // search success rates
        size += 4 + self.search_success_rates.len() * 4;
        // skill points required
        size += 4 + self.skill_points_required.len();
        // creators
        size += 4 + self.creators.len() * 34;
        // rare drop table
        size += 4 + self.rare_drop_table.len() * 4;
        // merkle tree check
        if self.merkle_tree.is_some() {
            size += 32;
        }
        // Loot regen rates
        size += 4 + self.loot_regen_rates.len() * 4;

        size
    }
    /// Get config variable
    pub fn get_config_variable(&self, var: ConfigVar) -> u32 {
        self.config_variables[var as usize]
    }
    /// Get item random weight for a tile type
    pub fn get_item_random_weight(&self, tile_type: TileType) -> &Vec<ItemRandomWeight> {
        &self.item_random_weights[tile_type.to_usize()]
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy)]
pub enum ConfigVar {
    UnarmedAttackSuccessRate,
    AttackEnergyCost,
    AttackCoolDown,
    AttackBaseXpGain,
    BaseUnarmedDamage,
    BarricadeEnergyCost,
    BarricadeXpGain,
    DestroyBarricadeEnergyCost,
    DestroyBarricadeXpGain,
    DestroyBarricadeSuccessRate,
    MoveEnergyCost,
    ZombieMoveExtraEnergyCost,
    HumanMoveBarricadeLimit,
    ZombieMoveBarricadeLimit,
    LootPrivilegeDuration,
    LootEnergyCost,
    SearchEnergyCost,
    // SearchSuccessRate,
    SearchXpGain,
    SearchSuccessXpGain,
    EquipItemEnergyCost,
    MintItemEnergyCost,
    MintAttackCoolDown,
    UseItemEnergyCost,
    UseItemGeneratorXpGain,
    UseItemFirstAidXpGain,
    UseItemEnergyXpGain,
    UseItemRevivalSyringeXpGain,
    UseItemFuelCanXpGain,
    FuelCanPowerDuration,
    ZombieReviveHealth,
    DestroyItemEnergyCost,
    ActionCoolDown,
    EnergyRegenRate,
    StandingBackUpEnergyCost,
    StandingBackUpHealth,
    DragCharacterEnergyCost,
    ZombieDragMaxTargetHp,
    MaxHp,
    MaxEnergy,
    BaseInventorySize,
    InfectedDamageAmount,
    XpPerLevel,
    SkillPointsGainedPerLevel,
    UnarmedCombatSkillAttackBonus,
    AdvancedUnarmedCombatSkillAttackBonus,
    AdvancedHealingHpBonus,
    TechLooterSearchSuccessRateBonus,
    CraftEnergyCost,
    ThickSkinDamageReduction,
    AdvancedMeleeAttackBonus,
    PistolProficiencyAttackBonus,
    LongGunProficiencyAttackBonus,
    RangedAccuracyBonus,
    BodyBuilderMaxHpBonus,
    LooterSearchSuccessRateBonus,
    AdvancedLooterSearchSuccessRateBonus,
    InfectedBiteInfectionRate,
    TankyFleshDamageReduction,
    EnhancedBiteAttackBonus,
    EnhancedClawAttackBonus,
    DestroyGeneratorEnergyCost,
    DestroyGeneratorXpGain,
    LootBodySuccessRate,
    FirearmsTrainingAccuracyBonus,
    AdvancedFirearmsTrainingAccuracyBonus,
    ZombieAccuracyBonus,
    AdvancedZombieAccuracyBonus,
    PremiumCost,
    NameChangeCost,
    TicketsPerMission,
    MissionCooldown,
    PremiumRegenReduction,
    DoubleXPActive,
    MaxTileLoot,
}
impl ConfigVar {
    /// Number of variables in the config account.
    pub const NUM_VARS: usize = 74;
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct ItemRandomWeight {
    pub item_id: u32,
    pub weight: u32,
}
impl ItemRandomWeight {
    /// Size
    pub const SIZE: usize = 4 + 4;
}

#[cfg(test)]
mod test {
    use crate::state::Skill;

    use super::*;

    #[test]
    fn test_config_account_size() {
        let creator = Creator {
            address: Pubkey::new_unique(),
            verified: false,
            share: 100,
        };
        let config = Config {
            items_collection_mint: Pubkey::new_unique(),
            characters_collection_mint: Pubkey::new_unique(),
            number_of_items: 0,
            number_of_characters: 0,
            config_variables: vec![0; ConfigVar::NUM_VARS],
            search_success_rates: vec![0; TileType::NUM_TILE_TYPES],
            item_random_weights: vec![vec![ItemRandomWeight { item_id: 0, weight: 0 }]],
            skill_points_required: vec![0; Skill::NUM_SKILLS],
            creators: vec![creator],
            maintenance_mode: false,
            legendary_items: vec![vec![]],
            rare_drop_table: vec![],
            merkle_tree: None,
            merkle_tree_items_minted: 0,
            loot_regen_rates: vec![]
        };
        let mut data = Vec::new();
        config.try_serialize(&mut data).unwrap();
        assert_eq!(data.len(), config.size());
    }
}
