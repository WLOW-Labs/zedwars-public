interface ItemRandomWeights {
  tileType: string
  baseSuccess: number
  itemIds: number[]
  weights: number[]
  regenRate: number
}
export const defaultItemRandomWeights: ItemRandomWeights[] = [
  {
    tileType: 'street',
    baseSuccess: 0,
    itemIds: [],
    weights: [],
    regenRate: 0,
  },
  {
    tileType: 'hospital',
    baseSuccess: 1000,
    itemIds: [
      1000, // First Aid Kit
    ],
    weights: [
      1000, // First Aid Kit
    ],
    regenRate: 3600,
  },
  {
    tileType: 'apartment',
    baseSuccess: 1300,
    itemIds: [
      5001,
      5002,
      5003,
      5004, //Pistol
      5601,
      5602,
      5603,
      5604, //Knife
      5501,
      5502,
      5503,
      5504, //Baseball Bat
      6001,
      6002,
      6003,
      6004, //Backpack
      5701,
      5702,
      5703,
      5704, //Rifle
    ],
    weights: [
      195,
      90,
      12,
      3, //Pistol
      195,
      90,
      12,
      3, //Knife
      195,
      90,
      12,
      3, //Baseball Bat
      195,
      90,
      12,
      3, //Backpack
      65,
      30,
      4,
      1, //Rifle
    ],
    regenRate: 3600,
  },
  {
    tileType: 'policeStation',
    baseSuccess: 1500,
    itemIds: [
      5101,
      5102,
      5103,
      5104, //Shotgun
      5001,
      5002,
      5003,
      5004, //Pistol
      5201,
      5202,
      5203,
      5204, //Body Armor
    ],
    weights: [
      325,
      150,
      20,
      5, //Shotgun
      325,
      150,
      20,
      5, //Pistol
      325,
      150,
      20,
      5, //Body Armor
    ],
    regenRate: 3600,
  },
  {
    tileType: 'warehouse',
    baseSuccess: 1800,
    itemIds: [
      1002, //Fuel Can
      6001,
      6002,
      6003,
      6004, //Backpack
    ],
    weights: [
      1500, //Fuel Can
      195,
      90,
      12,
      3, //Backpack
    ],
    regenRate: 3600,
  },
  {
    tileType: 'fireStation',
    baseSuccess: 1000,
    itemIds: [
      5301,
      5302,
      5303,
      5304, //Fire Axe
      1000, // First Aid Kit
    ],
    weights: [
      325,
      150,
      20,
      5, //Fire Axe
      500, // First Aid Kit
    ],
    regenRate: 3600,
  },
  {
    tileType: 'zedCorp',
    baseSuccess: 800,
    itemIds: [
      1000, // First Aid Kit
      1003, // Zombie Revival Syringe
    ],
    weights: [
      500, // First Aid Kit
      300, // Zombie Revival Syringe
    ],
    regenRate: 3600,
  },
  {
    tileType: 'factory',
    baseSuccess: 100,
    itemIds: [
      1001, // Generator
    ],
    weights: [
      100, // Generator
    ],
    regenRate: 3600,
  },
  {
    tileType: 'secretLocation',
    baseSuccess: 0,
    itemIds: [],
    weights: [],
    regenRate: 0,
  },
  {
    tileType: 'afk',
    baseSuccess: 0,
    itemIds: [],
    weights: [],
    regenRate: 0,
  },
  {
    tileType: 'courier',
    baseSuccess: 0,
    itemIds: [],
    weights: [],
    regenRate: 3600,
  },
  {
    tileType: 'arcade',
    baseSuccess: 300,
    itemIds: [
      1006,
      1007,
      1008,
      1009,
      1010
    ],
    weights: [
      5,
      215,
      50,
      25,
      5
    ],
    regenRate: 3600,
  },
]
