import * as anchor from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'

/**
 * The arguments for the registerSFT instruction
 */
export interface RegisterItemArgs {
  // The ID of the item
  itemId: number
  // The URI of the SFT
  name: string
  // The type of the item
  itemType: ItemType
  rarity: ItemRarity,
  kind: ItemKind,
  convertsTo: number,
}

export interface ItemRarity {
  special?: {},
  untradeable?: {},
  common?: {},
  uncommon?: {},
  rare?: {},
  epic?: {},
  legendary?: {},
}

export interface ItemKind {
  none?: {},
  consumable?: {}
  armor?: {},
  axe?: {},
  backpack?: {},
  baseballBat?: {},
  crowbar?: {},
  heavyArmor?: {},
  knife?: {},
  machete?: {},
  pistol?: {},
  rifle?: {},
  shotgun?: {},
}

export interface ItemType {
  weapon?: {
    weaponType: WeaponType
    damage: number
    accuracy: number
    breakChance: number
  }
  armor?: {
    armorType: ArmorType
    defense: number
    breakChance: number
  }
  backpack?: {
    size: number
  }
  consumable?: {
    consumableType: ConsumableType
    effectValue: number
  }
}

export function isWeapon(itemType: ItemType): itemType is ItemType {
  if (itemType.weapon) {
    return true;
  }
  return false;
}

export function isConsumable(itemType: ItemType): itemType is ItemType {
  if (itemType.consumable) {
    return true;
  }
  return false;
}

export function isArmor(itemType: ItemType): itemType is ItemType {
  if (itemType.armor) {
    return true;
  }
  return false;
}

export interface WeaponType {
  melee?: {}
  pistol?: {}
  longGun?: {}
  zombieBite?: {}
  zombieClaw?: {}
  firearm?: {}
}
export interface ArmorType {
  light?: {}
  heavy?: {}
}
export interface ConsumableType {
  health?: {}
  energy?: {}
  fuel?: {}
  generator?: {}
  revive?: {}
  xp?: {}
  premium?: {}
  raffle?: {}
  part?: {}
}

export interface ConfigVariable {
  unarmedAttackSuccessRate?: {}
  attackEnergyCost?: {}
  attackCoolDown?: {}
  attackBaseXpGain?: {}
  baseUnarmedDamage?: {}
  barricadeEnergyCost?: {}
  barricadeXpGain?: {}
  destroyBarricadeEnergyCost?: {}
  destroyBarricadeXpGain?: {}
  destroyBarricadeSuccessRate?: {}
  moveEnergyCost?: {}
  zombieMoveExtraEnergyCost?: {}
  humanMoveBarricadeLimit?: {}
  zombieMoveBarricadeLimit?: {}
  lootPrivilegeDuration?: {}
  lootEnergyCost?: {}
  searchEnergyCost?: {}
  // searchSuccessRate?: {},
  searchXpGain?: {}
  searchSuccessXpGain?: {}
  equipItemEnergyCost?: {}
  mintItemEnergyCost?: {}
  mintAttackCoolDown?: {}
  useItemEnergyCost?: {}
  useItemGeneratorXpGain?: {}
  useItemFirstAidXpGain?: {}
  useItemEnergyXpGain?: {}
  useItemRevivalSyringeXpGain?: {}
  useItemFuelCanXpGain?: {}
  fuelCanPowerDuration?: {}
  zombieReviveHealth?: {}
  destroyItemEnergyCost?: {}
  actionCoolDown?: {}
  energyRegenRate?: {}
  standingBackUpEnergyCost?: {}
  standingBackUpHealth?: {}
  dragCharacterEnergyCost?: {}
  zombieDragMaxTargetHp?: {}
  maxHp?: {}
  maxEnergy?: {}
  baseInventorySize?: {}
  infectedDamageAmount?: {}
  xpPerLevel?: {}
  skillPointsGainedPerLevel?: {}
  unarmedCombatSkillAttackBonus?: {}
  advancedUnarmedCombatSkillAttackBonus?: {}
  advancedHealingHpBonus?: {}
  techLooterSearchSuccessRateBonus?: {}
  craftEnergyCost?: {}
  thickSkinDamageReduction?: {}
  advancedMeleeAttackBonus?: {}
  pistolProficiencyAttackBonus?: {}
  longGunProficiencyAttackBonus?: {}
  rangedAccuracyBonus?: {}
  bodyBuilderMaxHpBonus?: {}
  looterSearchSuccessRateBonus?: {}
  advancedLooterSearchSuccessRateBonus?: {}
  infectedBiteInfectionRate?: {}
  tankyFleshDamageReduction?: {}
  enhancedBiteAttackBonus?: {}
  enhancedClawAttackBonus?: {}
  destroyGeneratorEnergyCost?: {}
  destroyGeneratorXpGain?: {}
  lootBodySuccessRate?: {}
  firearmsTrainingAccuracyBonus?: {}
  advancedFirearmsTrainingAccuracyBonus?: {}
  zombieAccuracyBonus?: {}
  advancedZombieAccuracyBonus?: {}
  premiumCost?: {}
  nameChangeCost?: {}
  ticketsPerMission?: {}
  missionCooldown?: {}
  premiumRegenReduction?: {}
  doubleXpActive?: {}
  maxTileLoot?: {}
}

/**
 * The arguments for the mapTileInit instruction
 */
export interface MapTileInitArgs {
  // The x coordinate of the map tile
  x: number
  // The y coordinate of the map tile
  y: number
  // The type of tile
  tileType: TileType
  canBeBarricaded: boolean,
  canBeSearched: boolean,
}

/**
 * Where an item can be equipped
 */
export interface EquipSlot {
  weapon?: {}
  armor?: {}
  backpack?: {}
}
export interface MapTileUpdateArgs {
  numZombies: number
  numSurvivors: number
  numBarricades: number
  hasGenerator: boolean
  hasPowerUntil: anchor.BN
  tileType: TileType
}

export interface Point {
  x: number,
  y: number,
}


export interface TileType {
  street?: {}
  hospital?: {}
  apartment?: {}
  policeStation?: {}
  warehouse?: {}
  fireStation?: {}
  zedCorp?: {}
  factory?: {}
  secretLocation?: {}
  courier?: {
    mythic: Point[]
    legendary: Point[]
    epic: Point[]
  }
  arcade?: {}
}

export interface Skill {
  parkour?: {}
  barricadeBuilder?: {}
  unarmedCombat?: {}
  bodyBuilder?: {}
  advancedUnarmedCombat?: {}
  looter?: {}
  advancedLooter?: {}
  thickSkin?: {}
  advancedMelee?: {}
  pistolProficiency?: {}
  longGunProficiency?: {}
  rangedAccuracy?: {}
  advancedHealing?: {}
  techLooter?: {}
  revivalSyringeCrafter?: {}
  adrenalineSyringeCrafter?: {}
  experienceSyringeCrafter?: {}
  infectedBite?: {}
  enhancedBite?: {}
  enhancedClaws?: {}
  healingAttack?: {}
  drag?: {}
  tankyFlesh?: {}
  speedWalking?: {}
  barricadeDestroyer?: {}
  mutatedZombie?: {}
  firearmsTraining?: {}
  advancedFirearmsTraining?: {}
}
export interface CharacterUpdateArgs {
  x?: number
  y?: number
  hp?: number
  name?: string
  isZombie?: boolean
  xp?: number
  bonusXp?: number
  level?: number
  skillPoints?: number
  lastAttackedAt?: anchor.BN
  lastActedAt?: anchor.BN
  isInfected?: boolean
  energy?: number
  energyUpdatedAt?: anchor.BN
  backpackSpace?: number
  inventory?: number[]
  equippedItems?: EquippedItems
  skills?: boolean[]
  killedBy?: null | PublicKey
  killedAt?: null | anchor.BN
  hasPremium?: boolean
}
export interface EquippedItems {
  weapon: number | null
  armor: number | null
}
/**
 * The attribute of an item
 */
export interface ItemAttribute {
  damage?: { 0: number }
  health?: { 0: number }
  energy?: { 0: number }
  reviveZombie?: { 0: number }
}

/**
 * The random weight for an item on a tile
 */
export interface ItemRandomWeight {
  // The item id
  itemId: anchor.BN
  // The random weight of the item
  weight: number
}
