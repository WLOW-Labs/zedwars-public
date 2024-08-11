import { ConfigVariable } from './arg_types'

export interface ConfigItem {
  name: string,
  key: ConfigVariable,
  value: number,
}

export const defaultConfig: ConfigItem[] = [
  { name: 'Unarmed Attack Success Rate', key: { unarmedAttackSuccessRate: {} }, value: 5000 },
  { name: 'Attack Energy Cost', key: { attackEnergyCost: {} }, value: 1 },
  { name: 'Attack Cooldown', key: { attackCoolDown: {} }, value: 1 },
  { name: 'Attack XP Rate', key: { attackBaseXpGain: {} }, value: 10 },
  { name: 'Base Unarmed Damage', key: { baseUnarmedDamage: {} }, value: 1 },
  { name: 'Barricade Energy Cost', key: { barricadeEnergyCost: {} }, value: 1 },
  { name: 'Barricade XP Gain', key: { barricadeXpGain: {} }, value: 10 },
  { name: 'Destroy Barricade Energy Cost', key: { destroyBarricadeEnergyCost: {} }, value: 1 },
  { name: 'Destroy Barricade XP Gain', key: { destroyBarricadeXpGain: {} }, value: 15 },
  { name: 'Destroy Barricade Success Rate', key: { destroyBarricadeSuccessRate: {} }, value: 3500 },
  { name: 'Move Energy Cost', key: { moveEnergyCost: {} }, value: 1 },
  { name: 'Zombie Move Extra Energy Cost', key: { zombieMoveExtraEnergyCost: {} }, value: 1 },
  { name: 'Human Move Barricade Limit', key: { humanMoveBarricadeLimit: {} }, value: 10 },
  { name: 'Zombie Move Barricade Limit', key: { zombieMoveBarricadeLimit: {} }, value: 1 },
  { name: 'Loot Privilege Duration', key: { lootPrivilegeDuration: {} }, value: 3600 },
  { name: 'Loot Energy Cost', key: { lootEnergyCost: {} }, value: 1 },
  { name: 'Search Energy Cost', key: { searchEnergyCost: {} }, value: 1 },
  { name: 'Search XP Gain', key: { searchXpGain: {} }, value: 10 },
  { name: 'Search Success XP Gain', key: { searchSuccessXpGain: {} }, value: 25 },
  { name: 'Equip Item Energy Cost', key: { equipItemEnergyCost: {} }, value: 1 },
  { name: 'Mint Item Energy Cost', key: { mintItemEnergyCost: {} }, value: 1 },
  { name: 'Mint Attack Cool Down', key: { mintAttackCoolDown: {} }, value: 3600 },
  { name: 'Use Item Energy Cost', key: { useItemEnergyCost: {} }, value: 1 },
  { name: 'Install Generator XP Gain', key: { useItemGeneratorXpGain: {} }, value: 100 },
  { name: 'Use First Aid Kit XP Gain', key: { useItemFirstAidXpGain: {} }, value: 10 },
  { name: 'Use Item Energy XP Gain', key: { useItemEnergyXpGain: {} }, value: 10 },
  { name: 'Use Revival Syringe XP Gain', key: { useItemRevivalSyringeXpGain: {} }, value: 25 },
  { name: 'Use Fuel Can XP Gain', key: { useItemFuelCanXpGain: {} }, value: 25 },
  { name: 'Fuel Can Power Duration', key: { fuelCanPowerDuration: {} }, value: 3600 },
  { name: 'Zombie Revive Health', key: { zombieReviveHealth: {} }, value: 25 },
  { name: 'Destroy Item Energy Cost', key: { destroyItemEnergyCost: {} }, value: 1 },
  { name: 'Action Cooldown', key: { actionCoolDown: {} }, value: 1 },
  { name: 'Stamina Regen Rate', key: { energyRegenRate: {} }, value: 1800 },
  { name: 'Stand Back Up Energy Cost', key: { standingBackUpEnergyCost: {} }, value: 10 },
  { name: 'Stand Back Up Health', key: { standingBackUpHealth: {} }, value: 25 },
  { name: 'Drag Character Energy Cost', key: { dragCharacterEnergyCost: {} }, value: 1 },
  { name: 'Zombie Drag Max Target HP', key: { zombieDragMaxTargetHp: {} }, value: 25 },
  { name: 'Max HP', key: { maxHp: {} }, value: 50 },
  { name: 'Max Stamina', key: { maxEnergy: {} }, value: 100 },
  { name: 'Base Inventory Size', key: { baseInventorySize: {} }, value: 5 },
  { name: 'Infected Damage Amount', key: { infectedDamageAmount: {} }, value: 1 },
  { name: 'XP Per Level', key: { xpPerLevel: {} }, value: 100 },
  { name: 'Skill Points Gained Per Level', key: { skillPointsGainedPerLevel: {} }, value: 1 },
  { name: 'Unarmed Combat Skill Attack Damage Bonus', key: { unarmedCombatSkillAttackBonus: {} }, value: 1 },
  { name: 'Advanced Unarmed Combat Skill Attack Bonus', key: { advancedUnarmedCombatSkillAttackBonus: {} }, value: 2 },
  { name: 'Advanced Healing Bonus', key: { advancedHealingHpBonus: {} }, value: 5 },
  { name: 'Tech Looter Search Success Rate Bonus', key: { techLooterSearchSuccessRateBonus: {} }, value: 1000 },
  { name: 'Craft Energy Cost', key: { craftEnergyCost: {} }, value: 3 },
  { name: 'Thick Skin Damage Reduction', key: { thickSkinDamageReduction: {} }, value: 1 },
  { name: 'Advanced Melee Attack Bonus', key: { advancedMeleeAttackBonus: {} }, value: 2 },
  { name: 'Pistol Proficiency Attack Bonus', key: { pistolProficiencyAttackBonus: {} }, value: 1 },
  { name: 'Long Gun Proficiency Attack Bonus', key: { longGunProficiencyAttackBonus: {} }, value: 1 },
  { name: 'Ranged Accuracy Bonus', key: { rangedAccuracyBonus: {} }, value: 1500 },
  { name: 'Body Builder Max HP Bonus', key: { bodyBuilderMaxHpBonus: {} }, value: 10 },
  { name: 'Looter Search Success Rate Bonus', key: { looterSearchSuccessRateBonus: {} }, value: 500 },
  { name: 'Advanced Looter Search Success Rate Bonus', key: { advancedLooterSearchSuccessRateBonus: {} }, value: 1000 },
  { name: 'Infected Bite Infection Rate', key: { infectedBiteInfectionRate: {} }, value: 2500 },
  { name: 'Tanky Flesh Damage Reduction', key: { tankyFleshDamageReduction: {} }, value: 1 },
  { name: 'Enhanced Bite Attack Bonus', key: { enhancedBiteAttackBonus: {} }, value: 3 },
  { name: 'Enhanced Claw Attack Bonus', key: { enhancedClawAttackBonus: {} }, value: 5 },
  { name: 'Destroy Generator Energy Cost', key: { destroyGeneratorEnergyCost: {} }, value: 10 },
  { name: 'Destroy Generator XP Gain', key: { destroyGeneratorXpGain: {} }, value: 125 },
  { name: 'Loot Body Success Rate', key: { lootBodySuccessRate: {} }, value: 5000 },
  { name: 'Firearms Training Accuracy Bonus', key: { firearmsTrainingAccuracyBonus: {} }, value: 2500 },
  { name: 'Advanced Firearms Training Accuracy Bonus', key: { advancedFirearmsTrainingAccuracyBonus: {} }, value: 1500 },
  { name: 'Zombie Accuracy Bonus', key: { zombieAccuracyBonus: {} }, value: 2500 },
  { name: 'Advanced Zombie Accuracy Bonus', key: { advancedZombieAccuracyBonus: {} }, value: 1500 },
  { name: 'Premium Cost', key: { premiumCost: {} }, value: 2000000000 },
  { name: 'Name Change Cost', key: { nameChangeCost: {} }, value: 250000 },
  { name: '# of tickets per mission', key: { ticketsPerMission: {} }, value: 1 },
  { name: 'Mission Cooldown', key: { missionCooldown: {} }, value: 604800 },
  { name: 'Premium Stamina Regen Reduction', key: { premiumRegenReduction: {} }, value: 900 },
  { name: 'Double XP Active (1=active, 0=not)', key: { doubleXpActive: {} }, value: 0 },
  { name: 'Max Loot Drop per Tile', key: { maxTileLoot: {} }, value: 100 },
]