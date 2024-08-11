import * as anchor from '@coral-xyz/anchor'
import { IDL, Zedwars } from './zedwars'

export const defaultItems: anchor.IdlTypes<Zedwars>["UpdateItemArgs"][] = [
  {
    itemId: 1000,
    name: 'First Aid Kit',
    itemType: {
      consumable: {
        effectValue: 10,
        consumableType: {
          health: {},
        },
      },
    },
    rarity: {
      common: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 1001,
    name: 'Generator',
    itemType: {
      consumable: {
        consumableType: {
          generator: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      rare: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 1002,
    name: 'Fuel Can',
    itemType: {
      consumable: {
        consumableType: {
          fuel: {},
        },
        effectValue: 24,
      },
    },
    rarity: {
      common: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 1003,
    name: 'Zombie Revival Syringe',
    itemType: {
      consumable: {
        consumableType: {
          revive: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      rare: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 1004,
    name: 'Adrenaline Syringe',
    itemType: {
      consumable: {
        consumableType: {
          energy: {},
        },
        effectValue: 25,
      },
    },
    rarity: {
      rare: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 1005,
    name: 'Bonus Experience Syringe',
    itemType: {
      consumable: {
        consumableType: {
          xp: {},
        },
        effectValue: 250,
      },
    },
    rarity: {
      rare: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 1006,
    name: 'Premium Token',
    itemType: {
      consumable: {
        consumableType: {
          premium: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      special: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 1007,
    name: 'Raffle Ticket',
    itemType: {
      consumable: {
        consumableType: {
          raffle: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      untradeable: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 1008,
    name: 'Small Bundle of Raffle Tickets',
    itemType: {
      consumable: {
        consumableType: {
          raffle: {},
        },
        effectValue: 3,
      },
    },
    rarity: {
      untradeable: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 1009,
    name: 'Medium Bundle of Raffle Tickets',
    itemType: {
      consumable: {
        consumableType: {
          raffle: {},
        },
        effectValue: 5,
      },
    },
    rarity: {
      untradeable: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 1010,
    name: 'Large Bundle of Raffle Tickets',
    itemType: {
      consumable: {
        consumableType: {
          raffle: {},
        },
        effectValue: 10,
      },
    },
    rarity: {
      untradeable: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5001,
    name: 'Common Pistol',
    itemType: {
      weapon: {
        weaponType: {
          firearm: {},
        },
        damage: 1,
        breakChance: 200,
        accuracy: 2500,
      },
    },
    rarity: {
      common: {}
    },
    kind: {
      pistol: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5002,
    name: 'Uncommon Pistol',
    itemType: {
      weapon: {
        weaponType: {
          firearm: {},
        },
        damage: 2,
        breakChance: 100,
        accuracy: 2500,
      },
    },
    rarity: {
      uncommon: {}
    },
    kind: {
      pistol: {}
    },
    convertsTo: 5012,
  },
  {
    itemId: 5003,
    name: 'Rare Pistol',
    itemType: {
      weapon: {
        weaponType: {
          firearm: {},
        },
        damage: 3,
        breakChance: 50,
        accuracy: 2500,
      },
    },
    rarity: {
      rare: {}
    },
    kind: {
      pistol: {}
    },
    convertsTo: 5013,
  },
  {
    itemId: 5004,
    name: 'Epic Pistol',
    itemType: {
      weapon: {
        weaponType: {
          firearm: {},
        },
        damage: 4,
        breakChance: 10,
        accuracy: 2500,
      },
    },
    rarity: {
      epic: {}
    },
    kind: {
      pistol: {}
    },
    convertsTo: 5014,
  },
  {
    itemId: 5005,
    name: 'Legendary Pistol',
    itemType: {
      weapon: {
        weaponType: {
          firearm: {},
        },
        damage: 5,
        breakChance: 0,
        accuracy: 3000,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      pistol: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5012,
    name: 'Rare Pistol Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      rare: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5013,
    name: 'Epic Pistol Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      epic: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5014,
    name: 'Legendary Pistol Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5101,
    itemType: {
      weapon: {
        weaponType: {
          firearm: {},
        },
        damage: 2,
        breakChance: 200,
        accuracy: 2000,
      },
    },
    name: 'Common Shotgun',
    rarity: {
      common: {}
    },
    kind: {
      shotgun: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5102,
    itemType: {
      weapon: {
        weaponType: {
          firearm: {},
        },
        damage: 3,
        breakChance: 100,
        accuracy: 2000,
      },
    },
    name: 'Uncommon Shotgun',
    rarity: {
      uncommon: {}
    },
    kind: {
      shotgun: {}
    },
    convertsTo: 5112,
  },
  {
    itemId: 5103,
    itemType: {
      weapon: {
        weaponType: {
          firearm: {},
        },
        damage: 4,
        breakChance: 50,
        accuracy: 2000,
      },
    },
    name: 'Rare Shotgun',
    rarity: {
      rare: {}
    },
    kind: {
      shotgun: {}
    },
    convertsTo: 5113,
  },
  {
    itemId: 5104,
    itemType: {
      weapon: {
        weaponType: {
          firearm: {},
        },
        damage: 5,
        breakChance: 10,
        accuracy: 2000,
      },
    },
    name: 'Epic Shotgun',
    rarity: {
      epic: {}
    },
    kind: {
      shotgun: {}
    },
    convertsTo: 5114,
  },
  {
    itemId: 5105,
    name: 'Legendary Shotgun',
    itemType: {
      weapon: {
        weaponType: {
          firearm: {},
        },
        damage: 6,
        breakChance: 0,
        accuracy: 2250,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      shotgun: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5112,
    name: 'Rare Shotgun Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      rare: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5113,
    name: 'Epic Shotgun Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      epic: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5114,
    name: 'Legendary Shotgun Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5201,
    itemType: {
      armor: {
        armorType: {
          light: {},
        },
        defense: 1,
        breakChance: 200,
      },
    },
    rarity: {
      common: {}
    },
    name: 'Common Armor',
    kind: {
      armor: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5202,
    itemType: {
      armor: {
        armorType: {
          light: {},
        },
        defense: 2,
        breakChance: 100,
      },
    },
    rarity: {
      uncommon: {}
    },
    name: 'Uncommon Armor',
    kind: {
      armor: {}
    },
    convertsTo: 5212,
  },
  {
    itemId: 5203,
    itemType: {
      armor: {
        armorType: {
          light: {},
        },
        defense: 3,
        breakChance: 50,
      },
    },
    name: 'Rare Armor',
    rarity: {
      rare: {}
    },
    kind: {
      armor: {}
    },
    convertsTo: 5213,
  },
  {
    itemId: 5204,
    itemType: {
      armor: {
        armorType: {
          light: {},
        },
        defense: 4,
        breakChance: 10,
      },
    },
    name: 'Epic Armor',
    rarity: {
      epic: {}
    },
    kind: {
      armor: {}
    },
    convertsTo: 5214,
  },
  {
    itemId: 5205,
    name: 'Legendary Armor',
    itemType: {
      armor: {
        armorType: {
          light: {},
        },
        defense: 5,
        breakChance: 0,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      armor: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5212,
    name: 'Rare Armor Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      rare: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5213,
    name: 'Epic Armor Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      epic: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5214,
    name: 'Legendary Armor Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5251,
    itemType: {
      armor: {
        armorType: {
          light: {},
        },
        defense: 2,
        breakChance: 200,
      },
    },
    rarity: {
      common: {}
    },
    name: 'Common Heavy Armor',
    kind: {
      armor: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5252,
    itemType: {
      armor: {
        armorType: {
          light: {},
        },
        defense: 3,
        breakChance: 100,
      },
    },
    rarity: {
      uncommon: {}
    },
    name: 'Uncommon Heavy Armor',
    kind: {
      armor: {}
    },
    convertsTo: 5262,
  },
  {
    itemId: 5253,
    itemType: {
      armor: {
        armorType: {
          light: {},
        },
        defense: 4,
        breakChance: 50,
      },
    },
    name: 'Rare Heavy Armor',
    rarity: {
      rare: {}
    },
    kind: {
      armor: {}
    },
    convertsTo: 5263,
  },
  {
    itemId: 5254,
    itemType: {
      armor: {
        armorType: {
          light: {},
        },
        defense: 5,
        breakChance: 10,
      },
    },
    name: 'Epic Heavy Armor',
    rarity: {
      epic: {}
    },
    kind: {
      armor: {}
    },
    convertsTo: 5264,
  },
  {
    itemId: 5255,
    name: 'Legendary Heavy Armor',
    itemType: {
      armor: {
        armorType: {
          light: {},
        },
        defense: 6,
        breakChance: 0,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      armor: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5262,
    name: 'Rare Heavy Armor Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      rare: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5263,
    name: 'Epic Heavy Armor Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      epic: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5264,
    name: 'Legendary Heavy Armor Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5301,
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 3,
        breakChance: 200,
        accuracy: 2500,
      },
    },
    name: 'Common Fire Axe',
    rarity: {
      common: {}
    },
    kind: {
      axe: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5302,
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 4,
        breakChance: 100,
        accuracy: 2500,
      },
    },
    name: 'Uncommon Fire Axe',
    rarity: {
      uncommon: {}
    },
    kind: {
      axe: {}
    },
    convertsTo: 5312,
  },
  {
    itemId: 5303,
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 5,
        breakChance: 50,
        accuracy: 2500,
      },
    },
    name: 'Rare Fire Axe',
    rarity: {
      rare: {}
    },
    kind: {
      axe: {}
    },
    convertsTo: 5313,
  },
  {
    itemId: 5304,
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 6,
        breakChance: 10,
        accuracy: 2500,
      },
    },
    name: 'Epic Fire Axe',
    rarity: {
      epic: {}
    },
    kind: {
      axe: {}
    },
    convertsTo: 5314,
  },
  {
    itemId: 5305,
    name: 'Legendary Fire Axe',
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 8,
        breakChance: 0,
        accuracy: 2500,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      axe: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5312,
    name: 'Rare Fire Axe Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      rare: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5313,
    name: 'Epic Fire Axe Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      epic: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5314,
    name: 'Legendary Fire Axe Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5401,
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 3,
        breakChance: 200,
        accuracy: 2750,
      },
    },
    name: 'Common Machete',
    rarity: {
      common: {}
    },
    kind: {
      machete: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5402,
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 4,
        breakChance: 100,
        accuracy: 2750,
      },
    },
    name: 'Uncommon Machete',
    rarity: {
      uncommon: {}
    },
    kind: {
      machete: {}
    },
    convertsTo: 5412,
  },
  {
    itemId: 5403,
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 5,
        breakChance: 50,
        accuracy: 2750,
      },
    },
    name: 'Rare Machete',
    rarity: {
      rare: {}
    },
    kind: {
      machete: {}
    },
    convertsTo: 5413,
  },
  {
    itemId: 5404,
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 6,
        breakChance: 10,
        accuracy: 2750,
      },
    },
    name: 'Epic Machete',
    rarity: {
      epic: {}
    },
    kind: {
      machete: {}
    },
    convertsTo: 5414,
  },
  {
    itemId: 5405,
    name: 'Legendary Machete',
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 7,
        breakChance: 0,
        accuracy: 2750,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      machete: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5412,
    name: 'Rare Machete Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      rare: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5413,
    name: 'Epic Machete Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      epic: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5414,
    name: 'Legendary Machete Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5501,
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 1,
        breakChance: 200,
        accuracy: 2500,
      },
    },
    name: 'Common Baseball Bat',
    rarity: {
      common: {}
    },
    kind: {
      baseballBat: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5502,
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 2,
        breakChance: 100,
        accuracy: 2500,
      },
    },
    name: 'Uncommon Baseball Bat',
    rarity: {
      uncommon: {}
    },
    kind: {
      baseballBat: {}
    },
    convertsTo: 5512,
  },
  {
    itemId: 5503,
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 3,
        breakChance: 50,
        accuracy: 2500,
      },
    },
    name: 'Rare Baseball Bat',
    rarity: {
      rare: {}
    },
    kind: {
      baseballBat: {}
    },
    convertsTo: 5513,
  },
  {
    itemId: 5504,
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 4,
        breakChance: 10,
        accuracy: 2500,
      },
    },
    name: 'Epic Baseball Bat',
    rarity: {
      epic: {}
    },
    kind: {
      baseballBat: {}
    },
    convertsTo: 5514,
  },
  {
    itemId: 5505,
    name: 'Legendary Baseball Bat',
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 6,
        breakChance: 0,
        accuracy: 2500,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      baseballBat: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5512,
    name: 'Rare Baseball Bat Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      rare: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5513,
    name: 'Epic Baseball Bat Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      epic: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5514,
    name: 'Legendary Baseball Bat Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5801,
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 1,
        breakChance: 200,
        accuracy: 2500,
      },
    },
    name: 'Common Crowbar',
    rarity: {
      common: {}
    },
    kind: {
      crowbar: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5802,
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 2,
        breakChance: 100,
        accuracy: 2500,
      },
    },
    name: 'Uncommon Crowbar',
    rarity: {
      uncommon: {}
    },
    kind: {
      crowbar: {}
    },
    convertsTo: 5812,
  },
  {
    itemId: 5803,
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 3,
        breakChance: 50,
        accuracy: 2500,
      },
    },
    name: 'Rare Crowbar',
    rarity: {
      rare: {}
    },
    kind: {
      crowbar: {}
    },
    convertsTo: 5813,
  },
  {
    itemId: 5804,
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 4,
        breakChance: 10,
        accuracy: 2500,
      },
    },
    name: 'Epic Crowbar',
    rarity: {
      epic: {}
    },
    kind: {
      crowbar: {}
    },
    convertsTo: 5814,
  },
  {
    itemId: 5805,
    name: 'Legendary Crowbar',
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 6,
        breakChance: 0,
        accuracy: 2500,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      crowbar: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5512,
    name: 'Rare Crowbar Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      rare: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5513,
    name: 'Epic Crowbar Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      epic: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5514,
    name: 'Legendary Crowbar Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5601,
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 1,
        breakChance: 200,
        accuracy: 3000,
      },
    },
    name: 'Common Knife',
    rarity: {
      common: {}
    },
    kind: {
      knife: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5602,
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 2,
        breakChance: 100,
        accuracy: 3000,
      },
    },
    name: 'Uncommon Knife',
    rarity: {
      uncommon: {}
    },
    kind: {
      knife: {}
    },
    convertsTo: 5612,
  },
  {
    itemId: 5603,
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 3,
        breakChance: 50,
        accuracy: 3000,
      },
    },
    name: 'Rare Knife',
    rarity: {
      rare: {}
    },
    kind: {
      knife: {}
    },
    convertsTo: 5613,
  },
  {
    itemId: 5604,
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 4,
        breakChance: 10,
        accuracy: 3000,
      },
    },
    name: 'Epic Knife',
    rarity: {
      epic: {}
    }
    ,
    kind: {
      knife: {}
    },
    convertsTo: 5614,
  },
  {
    itemId: 5605,
    name: 'Legendary Knife',
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 5,
        breakChance: 0,
        accuracy: 3000,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      knife: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5612,
    name: 'Rare Knife Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      rare: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5613,
    name: 'Epic Knife Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      epic: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5614,
    name: 'Legendary Knife Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5701,
    itemType: {
      weapon: {
        weaponType: {
          firearm: {},
        },
        damage: 2,
        breakChance: 200,
        accuracy: 2500,
      },
    },
    name: 'Common Hunting Rifle',
    rarity: {
      common: {}
    },
    kind: {
      rifle: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5702,
    itemType: {
      weapon: {
        weaponType: {
          firearm: {},
        },
        damage: 3,
        breakChance: 100,
        accuracy: 2500,
      },
    },
    name: 'Uncommon Hunting Rifle',
    rarity: {
      uncommon: {}
    },
    kind: {
      rifle: {}
    },
    convertsTo: 5712,
  },
  {
    itemId: 5703,
    itemType: {
      weapon: {
        weaponType: {
          firearm: {},
        },
        damage: 4,
        breakChance: 50,
        accuracy: 2500,
      },
    },
    name: 'Rare Hunting Rifle',
    rarity: {
      rare: {}
    },
    kind: {
      rifle: {}
    },
    convertsTo: 5713,
  },
  {
    itemId: 5704,
    itemType: {
      weapon: {
        weaponType: {
          firearm: {},
        },
        damage: 6,
        breakChance: 10,
        accuracy: 2500,
      },
    },
    name: 'Epic Hunting Rifle',
    rarity: {
      epic: {}
    },
    kind: {
      rifle: {}
    },
    convertsTo: 5714,
  },
  {
    itemId: 5705,
    name: 'Legendary Hunting Rifle',
    itemType: {
      weapon: {
        weaponType: {
          firearm: {},
        },
        damage: 8,
        breakChance: 0,
        accuracy: 2750,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      rifle: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5712,
    name: 'Rare Hunting Rifle Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      rare: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5713,
    name: 'Epic Hunting Rifle Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      epic: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 5714,
    name: 'Legendary Hunting Rifle Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 6001,
    name: 'Common Backpack',
    itemType: {
      backpack: {
        size: 2,
      },
    },
    rarity: {
      common: {}
    },
    kind: {
      backpack: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 6002,
    name: 'Uncommon Backpack',
    itemType: {
      backpack: {
        size: 3,
      },
    },
    rarity: {
      uncommon: {}
    },
    kind: {
      backpack: {}
    },
    convertsTo: 6012,
  },
  {
    itemId: 6003,
    name: 'Rare Backpack',
    itemType: {
      backpack: {
        size: 4,
      },
    },
    rarity: {
      rare: {}
    },
    kind: {
      backpack: {}
    },
    convertsTo: 6013,
  },
  {
    itemId: 6004,
    name: 'Epic Backpack',
    itemType: {
      backpack: {
        size: 5,
      },
    },
    rarity: {
      epic: {}
    },
    kind: {
      backpack: {}
    },
    convertsTo: 6014,
  },
  {
    itemId: 6005,
    name: 'Legendary Backpack',
    itemType: {
      backpack: {
        size: 7,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      backpack: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 6012,
    name: 'Rare Backpack Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      rare: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 6013,
    name: 'Epic Backpack Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      epic: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 6014,
    name: 'Legendary Backpack Part',
    itemType: {
      consumable: {
        consumableType: {
          part: {},
        },
        effectValue: 1,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      consumable: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 500,
    name: 'Zombie Bite',
    itemType: {
      weapon: {
        weaponType: {
          zombieBite: {},
        },
        damage: 4,
        accuracy: 2500,
        breakChance: 0,
      },
    },
    rarity: {
      untradeable: {}
    },
    kind: {
      none: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 501,
    name: 'Zombie Claws',
    itemType: {
      weapon: {
        weaponType: {
          zombieClaw: {},
        },
        damage: 6,
        accuracy: 1500,
        breakChance: 0,
      },
    },
    rarity: {
      untradeable: {}
    }
    ,
    kind: {
      none: {}
    },
    convertsTo: 0,
  },

  //CUSTOM PARTS
  {
    itemId: 16000,
    name: 'Scrap Pistol',
    itemType: {
      weapon: {
        weaponType: {
          firearm: {},
        },
        damage: 6,
        breakChance: 0,
        accuracy: 3000,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      pistol: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 16001,
    name: 'Poison Shotgun',
    itemType: {
      weapon: {
        weaponType: {
          firearm: {},
        },
        damage: 6,
        breakChance: 0,
        accuracy: 2250,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      shotgun: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 16002,
    name: 'Zombie Skin Armor',
    itemType: {
      armor: {
        armorType: {
          light: {},
        },
        defense: 5,
        breakChance: 0,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      armor: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 16003,
    name: 'Bandit Leader Heavy Armor',
    itemType: {
      armor: {
        armorType: {
          light: {},
        },
        defense: 6,
        breakChance: 0,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      armor: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 16004,
    name: 'Flame Axe',
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 8,
        breakChance: 0,
        accuracy: 2500,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      axe: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 16005,
    name: 'Electric Machete',
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 7,
        breakChance: 0,
        accuracy: 2800,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      machete: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 16006,
    name: 'Metal Baseball Bat',
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 6,
        breakChance: 0,
        accuracy: 2500,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      baseballBat: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 16007,
    name: 'Rusty Crowbar',
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 6,
        breakChance: 0,
        accuracy: 2750,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      crowbar: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 16008,
    name: 'Bone Knife',
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 6,
        breakChance: 0,
        accuracy: 3000,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      knife: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 16009,
    name: 'Desert Army Rifle',
    itemType: {
      weapon: {
        weaponType: {
          firearm: {},
        },
        damage: 8,
        breakChance: 0,
        accuracy: 2750,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      rifle: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 16010,
    name: 'Bomb Backpack',
    itemType: {
      backpack: {
        size: 7,
      },
    },
    rarity: {
      legendary: {}
    },
    kind: {
      backpack: {}
    },
    convertsTo: 0,
  },
  {
    itemId: 16011,
    itemType: {
      armor: {
        armorType: {
          light: {},
        },
        defense: 5,
        breakChance: 50,
      },
    },
    name: 'General Heavy Armor',
    rarity: {
      rare: {}
    },
    kind: {
      armor: {}
    },
    convertsTo: 5263,
  },
  {
    itemId: 16012,
    itemType: {
      weapon: {
        weaponType: {
          melee: {},
        },
        damage: 5,
        breakChance: 50,
        accuracy: 2750,
      },
    },
    name: 'Cutlass',
    rarity: {
      rare: {}
    },
    kind: {
      machete: {}
    },
    convertsTo: 5413,
  },
  {
    itemId: 16013,
    name: 'Galactic Space Pistol',
    itemType: {
      weapon: {
        weaponType: {
          firearm: {},
        },
        damage: 4,
        breakChance: 50,
        accuracy: 2500,
      },
    },
    rarity: {
      rare: {}
    },
    kind: {
      pistol: {}
    },
    convertsTo: 5013,
  },
  {
    itemId: 16014,
    name: 'NANA Gun',
    itemType: {
      weapon: {
        weaponType: {
          firearm: {},
        },
        damage: 4,
        breakChance: 50,
        accuracy: 2500,
      },
    },
    rarity: {
      rare: {}
    },
    kind: {
      pistol: {}
    },
    convertsTo: 5013,
  },
  {
    itemId: 16015,
    name: 'xBackpack',
    itemType: {
      backpack: {
        size: 5,
      },
    },
    rarity: {
      rare: {}
    },
    kind: {
      backpack: {}
    },
    convertsTo: 6013,
  },
]
