import { IDL, Zedwars } from './zedwars'
import * as anchor from '@coral-xyz/anchor'

/**
 * The default tiles on the game map
 */
export const defaultTiles: anchor.IdlTypes<Zedwars>["MapTileInitArgs"][] = [
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 1,
        "y": 1
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 1
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 3,
        "y": 1
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 4,
        "y": 1
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 5,
        "y": 1
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 6,
        "y": 1
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 7,
        "y": 1
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 8,
        "y": 1
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 9,
        "y": 1
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 10,
        "y": 1
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 11,
        "y": 1
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 12,
        "y": 1
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 13,
        "y": 1
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 14,
        "y": 1
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 15,
        "y": 1
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 16,
        "y": 1
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "arcade": {}
        },
        "x": 17,
        "y": 1
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 18,
        "y": 1
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 19,
        "y": 1
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 20,
        "y": 1
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 21,
        "y": 1
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 22,
        "y": 1
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 23,
        "y": 1
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 24,
        "y": 1
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 25,
        "y": 1
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 26,
        "y": 1
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 27,
        "y": 1
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 28,
        "y": 1
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 29,
        "y": 1
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "zedCorp": {}
        },
        "x": 30,
        "y": 1
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "zedCorp": {}
        },
        "x": 1,
        "y": 2
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 2
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 3,
        "y": 2
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 4,
        "y": 2
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 5,
        "y": 2
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 6,
        "y": 2
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 7,
        "y": 2
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 8,
        "y": 2
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 9,
        "y": 2
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 10,
        "y": 2
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 11,
        "y": 2
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 12,
        "y": 2
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 13,
        "y": 2
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 14,
        "y": 2
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 15,
        "y": 2
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 16,
        "y": 2
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 17,
        "y": 2
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 18,
        "y": 2
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 19,
        "y": 2
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": false,
        "tileType": {
            "courier": {
                "epic": [
                    {
                        "x": 30,
                        "y": 2
                    },
                    {
                        "x": 29,
                        "y": 2
                    }
                ],
                "legendary": [
                    {
                        "x": 8,
                        "y": 2
                    },
                    {
                        "x": 7,
                        "y": 2
                    }
                ],
                "rare": [
                    {
                        "x": 20,
                        "y": 6
                    },
                    {
                        "x": 23,
                        "y": 1
                    },
                    {
                        "x": 15,
                        "y": 2
                    }
                ]
            }
        },
        "x": 20,
        "y": 2
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 21,
        "y": 2
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 22,
        "y": 2
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 23,
        "y": 2
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 24,
        "y": 2
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 25,
        "y": 2
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 26,
        "y": 2
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": false,
        "tileType": {
            "courier": {
                "epic": [
                    {
                        "x": 30,
                        "y": 8
                    },
                    {
                        "x": 19,
                        "y": 2
                    }
                ],
                "legendary": [
                    {
                        "x": 27,
                        "y": 16
                    },
                    {
                        "x": 27,
                        "y": 17
                    },
                    {
                        "x": 14,
                        "y": 2
                    }
                ],
                "rare": [
                    {
                        "x": 24,
                        "y": 2
                    },
                    {
                        "x": 27,
                        "y": 6
                    }
                ]
            }
        },
        "x": 27,
        "y": 2
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 28,
        "y": 2
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 29,
        "y": 2
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 30,
        "y": 2
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 1,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 3,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 4,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 5,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 6,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 7,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 8,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 9,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 10,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 11,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 12,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 13,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 14,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 15,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 16,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 17,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 18,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 19,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 20,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 21,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 22,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 23,
        "y": 3
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 24,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 25,
        "y": 3
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 26,
        "y": 3
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 27,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 28,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 29,
        "y": 3
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 30,
        "y": 3
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 1,
        "y": 4
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 4
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 3,
        "y": 4
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": false,
        "tileType": {
            "courier": {
                "epic": [
                    {
                        "x": 14,
                        "y": 4
                    }
                ],
                "legendary": [
                    {
                        "x": 18,
                        "y": 4
                    }
                ],
                "rare": [
                    {
                        "x": 8,
                        "y": 4
                    },
                    {
                        "x": 7,
                        "y": 1
                    }
                ]
            }
        },
        "x": 4,
        "y": 4
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 5,
        "y": 4
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 6,
        "y": 4
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 7,
        "y": 4
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 8,
        "y": 4
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 9,
        "y": 4
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 10,
        "y": 4
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 11,
        "y": 4
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 12,
        "y": 4
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 13,
        "y": 4
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "zedCorp": {}
        },
        "x": 14,
        "y": 4
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 15,
        "y": 4
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 16,
        "y": 4
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 17,
        "y": 4
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 18,
        "y": 4
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 19,
        "y": 4
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 20,
        "y": 4
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 21,
        "y": 4
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 22,
        "y": 4
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 23,
        "y": 4
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 24,
        "y": 4
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 25,
        "y": 4
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 26,
        "y": 4
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 27,
        "y": 4
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 28,
        "y": 4
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 29,
        "y": 4
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 30,
        "y": 4
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 1,
        "y": 5
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 5
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 3,
        "y": 5
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 4,
        "y": 5
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 5,
        "y": 5
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 6,
        "y": 5
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 7,
        "y": 5
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 8,
        "y": 5
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 9,
        "y": 5
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 10,
        "y": 5
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 11,
        "y": 5
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 12,
        "y": 5
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 13,
        "y": 5
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 14,
        "y": 5
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 15,
        "y": 5
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 16,
        "y": 5
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 17,
        "y": 5
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 18,
        "y": 5
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 19,
        "y": 5
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 20,
        "y": 5
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 21,
        "y": 5
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 22,
        "y": 5
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 23,
        "y": 5
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 24,
        "y": 5
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 25,
        "y": 5
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 26,
        "y": 5
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 27,
        "y": 5
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 28,
        "y": 5
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 29,
        "y": 5
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 30,
        "y": 5
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 1,
        "y": 6
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 6
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 3,
        "y": 6
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 4,
        "y": 6
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 5,
        "y": 6
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 6,
        "y": 6
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 7,
        "y": 6
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 8,
        "y": 6
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 9,
        "y": 6
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 10,
        "y": 6
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 11,
        "y": 6
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": false,
        "tileType": {
            "courier": {
                "epic": [
                    {
                        "x": 5,
                        "y": 6
                    }
                ],
                "legendary": [
                    {
                        "x": 27,
                        "y": 6
                    }
                ],
                "rare": [
                    {
                        "x": 8,
                        "y": 6
                    },
                    {
                        "x": 12,
                        "y": 11
                    }
                ]
            }
        },
        "x": 12,
        "y": 6
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 13,
        "y": 6
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 14,
        "y": 6
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 15,
        "y": 6
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 16,
        "y": 6
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 17,
        "y": 6
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 18,
        "y": 6
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 19,
        "y": 6
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 20,
        "y": 6
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 21,
        "y": 6
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 22,
        "y": 6
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 23,
        "y": 6
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 24,
        "y": 6
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "zedCorp": {}
        },
        "x": 25,
        "y": 6
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": false,
        "tileType": {
            "courier": {
                "epic": [
                    {
                        "x": 16,
                        "y": 6
                    },
                    {
                        "x": 20,
                        "y": 12
                    },
                    {
                        "x": 26,
                        "y": 16
                    }
                ],
                "legendary": [
                    {
                        "x": 12,
                        "y": 6
                    }
                ],
                "rare": [
                    {
                        "x": 30,
                        "y": 6
                    },
                    {
                        "x": 26,
                        "y": 9
                    }
                ]
            }
        },
        "x": 26,
        "y": 6
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 27,
        "y": 6
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 28,
        "y": 6
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 29,
        "y": 6
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 30,
        "y": 6
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 1,
        "y": 7
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 7
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 3,
        "y": 7
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 4,
        "y": 7
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 5,
        "y": 7
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 6,
        "y": 7
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 7,
        "y": 7
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 8,
        "y": 7
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 9,
        "y": 7
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 10,
        "y": 7
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 11,
        "y": 7
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 12,
        "y": 7
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 13,
        "y": 7
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 14,
        "y": 7
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 15,
        "y": 7
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 16,
        "y": 7
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 17,
        "y": 7
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 18,
        "y": 7
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 19,
        "y": 7
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 20,
        "y": 7
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 21,
        "y": 7
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 22,
        "y": 7
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 23,
        "y": 7
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 24,
        "y": 7
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 25,
        "y": 7
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 26,
        "y": 7
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 27,
        "y": 7
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 28,
        "y": 7
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 29,
        "y": 7
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 30,
        "y": 7
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 1,
        "y": 8
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 8
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 3,
        "y": 8
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "arcade": {}
        },
        "x": 4,
        "y": 8
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 5,
        "y": 8
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": false,
        "tileType": {
            "courier": {
                "epic": [
                    {
                        "x": 16,
                        "y": 8
                    },
                    {
                        "x": 6,
                        "y": 1
                    }
                ],
                "legendary": [
                    {
                        "x": 6,
                        "y": 22
                    }
                ],
                "rare": [
                    {
                        "x": 6,
                        "y": 5
                    },
                    {
                        "x": 3,
                        "y": 5
                    },
                    {
                        "x": 1,
                        "y": 8
                    }
                ]
            }
        },
        "x": 6,
        "y": 8
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 7,
        "y": 8
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "zedCorp": {}
        },
        "x": 8,
        "y": 8
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 9,
        "y": 8
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 10,
        "y": 8
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 11,
        "y": 8
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 12,
        "y": 8
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 13,
        "y": 8
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 14,
        "y": 8
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 15,
        "y": 8
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "zedCorp": {}
        },
        "x": 16,
        "y": 8
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 17,
        "y": 8
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 18,
        "y": 8
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 19,
        "y": 8
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 20,
        "y": 8
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 21,
        "y": 8
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 22,
        "y": 8
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 23,
        "y": 8
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 24,
        "y": 8
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 25,
        "y": 8
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "arcade": {}
        },
        "x": 26,
        "y": 8
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 27,
        "y": 8
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 28,
        "y": 8
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 29,
        "y": 8
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 30,
        "y": 8
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 1,
        "y": 9
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 9
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 3,
        "y": 9
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 4,
        "y": 9
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 5,
        "y": 9
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 6,
        "y": 9
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 7,
        "y": 9
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 8,
        "y": 9
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 9,
        "y": 9
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 10,
        "y": 9
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 11,
        "y": 9
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 12,
        "y": 9
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 13,
        "y": 9
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 14,
        "y": 9
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 15,
        "y": 9
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": false,
        "tileType": {
            "courier": {
                "epic": [
                    {
                        "x": 16,
                        "y": 2
                    }
                ],
                "legendary": [
                    {
                        "x": 16,
                        "y": 21
                    }
                ],
                "rare": [
                    {
                        "x": 13,
                        "y": 12
                    },
                    {
                        "x": 16,
                        "y": 4
                    }
                ]
            }
        },
        "x": 16,
        "y": 9
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 17,
        "y": 9
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 18,
        "y": 9
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 19,
        "y": 9
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "zedCorp": {}
        },
        "x": 20,
        "y": 9
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 21,
        "y": 9
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 22,
        "y": 9
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 23,
        "y": 9
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 24,
        "y": 9
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 25,
        "y": 9
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 26,
        "y": 9
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 27,
        "y": 9
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 28,
        "y": 9
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 29,
        "y": 9
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 30,
        "y": 9
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 1,
        "y": 10
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 10
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 3,
        "y": 10
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 4,
        "y": 10
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 5,
        "y": 10
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 6,
        "y": 10
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 7,
        "y": 10
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 8,
        "y": 10
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 9,
        "y": 10
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 10,
        "y": 10
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 11,
        "y": 10
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 12,
        "y": 10
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 13,
        "y": 10
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 14,
        "y": 10
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 15,
        "y": 10
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 16,
        "y": 10
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 17,
        "y": 10
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 18,
        "y": 10
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 19,
        "y": 10
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 20,
        "y": 10
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 21,
        "y": 10
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 22,
        "y": 10
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 23,
        "y": 10
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 24,
        "y": 10
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 25,
        "y": 10
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 26,
        "y": 10
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 27,
        "y": 10
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 28,
        "y": 10
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 29,
        "y": 10
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 30,
        "y": 10
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 1,
        "y": 11
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 11
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 3,
        "y": 11
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 4,
        "y": 11
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 5,
        "y": 11
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 6,
        "y": 11
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 7,
        "y": 11
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 8,
        "y": 11
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 9,
        "y": 11
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 10,
        "y": 11
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 11,
        "y": 11
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 12,
        "y": 11
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 13,
        "y": 11
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 14,
        "y": 11
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 15,
        "y": 11
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 16,
        "y": 11
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 17,
        "y": 11
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 18,
        "y": 11
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 19,
        "y": 11
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 20,
        "y": 11
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 21,
        "y": 11
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 22,
        "y": 11
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 23,
        "y": 11
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 24,
        "y": 11
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 25,
        "y": 11
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 26,
        "y": 11
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 27,
        "y": 11
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 28,
        "y": 11
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 29,
        "y": 11
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": false,
        "tileType": {
            "courier": {
                "epic": [
                    {
                        "x": 30,
                        "y": 18
                    },
                    {
                        "x": 30,
                        "y": 5
                    },
                    {
                        "x": 30,
                        "y": 3
                    }
                ],
                "legendary": [
                    {
                        "x": 16,
                        "y": 11
                    },
                    {
                        "x": 30,
                        "y": 26
                    }
                ],
                "rare": [
                    {
                        "x": 30,
                        "y": 14
                    }
                ]
            }
        },
        "x": 30,
        "y": 11
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 1,
        "y": 12
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 12
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 3,
        "y": 12
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 4,
        "y": 12
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 5,
        "y": 12
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 6,
        "y": 12
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 7,
        "y": 12
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 8,
        "y": 12
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 9,
        "y": 12
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 10,
        "y": 12
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 11,
        "y": 12
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 12,
        "y": 12
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 13,
        "y": 12
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 14,
        "y": 12
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 15,
        "y": 12
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 16,
        "y": 12
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 17,
        "y": 12
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 18,
        "y": 12
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "zedCorp": {}
        },
        "x": 19,
        "y": 12
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 20,
        "y": 12
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 21,
        "y": 12
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 22,
        "y": 12
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 23,
        "y": 12
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 24,
        "y": 12
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 25,
        "y": 12
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 26,
        "y": 12
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 27,
        "y": 12
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 28,
        "y": 12
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 29,
        "y": 12
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 30,
        "y": 12
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 1,
        "y": 13
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 13
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "zedCorp": {}
        },
        "x": 3,
        "y": 13
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 4,
        "y": 13
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 5,
        "y": 13
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 6,
        "y": 13
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 7,
        "y": 13
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 8,
        "y": 13
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 9,
        "y": 13
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 10,
        "y": 13
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 11,
        "y": 13
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 12,
        "y": 13
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 13,
        "y": 13
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 14,
        "y": 13
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 15,
        "y": 13
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 16,
        "y": 13
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 17,
        "y": 13
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 18,
        "y": 13
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 19,
        "y": 13
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 20,
        "y": 13
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 21,
        "y": 13
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 22,
        "y": 13
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 23,
        "y": 13
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 24,
        "y": 13
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 25,
        "y": 13
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 26,
        "y": 13
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 27,
        "y": 13
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 28,
        "y": 13
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 29,
        "y": 13
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 30,
        "y": 13
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 1,
        "y": 14
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 14
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 3,
        "y": 14
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 4,
        "y": 14
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 5,
        "y": 14
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 6,
        "y": 14
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 7,
        "y": 14
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 8,
        "y": 14
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 9,
        "y": 14
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 10,
        "y": 14
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 11,
        "y": 14
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 12,
        "y": 14
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 13,
        "y": 14
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 14,
        "y": 14
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 15,
        "y": 14
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": false,
        "tileType": {
            "courier": {
                "epic": [
                    {
                        "x": 16,
                        "y": 8
                    }
                ],
                "legendary": [
                    {
                        "x": 2,
                        "y": 14
                    }
                ],
                "rare": [
                    {
                        "x": 16,
                        "y": 11
                    },
                    {
                        "x": 19,
                        "y": 11
                    }
                ]
            }
        },
        "x": 16,
        "y": 14
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 17,
        "y": 14
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 18,
        "y": 14
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 19,
        "y": 14
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 20,
        "y": 14
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 21,
        "y": 14
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 22,
        "y": 14
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 23,
        "y": 14
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 24,
        "y": 14
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 25,
        "y": 14
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 26,
        "y": 14
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 27,
        "y": 14
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 28,
        "y": 14
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 29,
        "y": 14
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 30,
        "y": 14
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 1,
        "y": 15
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 15
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 3,
        "y": 15
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 4,
        "y": 15
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 5,
        "y": 15
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 6,
        "y": 15
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "zedCorp": {}
        },
        "x": 7,
        "y": 15
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 8,
        "y": 15
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 9,
        "y": 15
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 10,
        "y": 15
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 11,
        "y": 15
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 12,
        "y": 15
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 13,
        "y": 15
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "arcade": {}
        },
        "x": 14,
        "y": 15
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 15,
        "y": 15
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 16,
        "y": 15
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 17,
        "y": 15
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 18,
        "y": 15
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 19,
        "y": 15
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 20,
        "y": 15
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 21,
        "y": 15
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 22,
        "y": 15
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "zedCorp": {}
        },
        "x": 23,
        "y": 15
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 24,
        "y": 15
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 25,
        "y": 15
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 26,
        "y": 15
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 27,
        "y": 15
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 28,
        "y": 15
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 29,
        "y": 15
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "zedCorp": {}
        },
        "x": 30,
        "y": 15
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 1,
        "y": 16
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 16
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 3,
        "y": 16
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 4,
        "y": 16
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 5,
        "y": 16
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": false,
        "tileType": {
            "courier": {
                "epic": [
                    {
                        "x": 13,
                        "y": 9
                    },
                    {
                        "x": 15,
                        "y": 16
                    },
                    {
                        "x": 13,
                        "y": 16
                    }
                ],
                "legendary": [
                    {
                        "x": 6,
                        "y": 30
                    },
                    {
                        "x": 6,
                        "y": 4
                    },
                    {
                        "x": 6,
                        "y": 1
                    }
                ],
                "rare": [
                    {
                        "x": 6,
                        "y": 12
                    }
                ]
            }
        },
        "x": 6,
        "y": 16
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 7,
        "y": 16
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 8,
        "y": 16
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 9,
        "y": 16
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 10,
        "y": 16
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 11,
        "y": 16
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": false,
        "tileType": {
            "courier": {
                "epic": [
                    {
                        "x": 6,
                        "y": 16
                    },
                    {
                        "x": 5,
                        "y": 23
                    },
                    {
                        "x": 22,
                        "y": 16
                    },
                    {
                        "x": 6,
                        "y": 10
                    }
                ],
                "legendary": [
                    {
                        "x": 27,
                        "y": 16
                    },
                    {
                        "x": 12,
                        "y": 1
                    }
                ],
                "rare": [
                    {
                        "x": 12,
                        "y": 13
                    }
                ]
            }
        },
        "x": 12,
        "y": 16
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 13,
        "y": 16
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "zedCorp": {}
        },
        "x": 14,
        "y": 16
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 15,
        "y": 16
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 16,
        "y": 16
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 17,
        "y": 16
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 18,
        "y": 16
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 19,
        "y": 16
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 20,
        "y": 16
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 21,
        "y": 16
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 22,
        "y": 16
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 23,
        "y": 16
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": false,
        "tileType": {
            "courier": {
                "epic": [
                    {
                        "x": 17,
                        "y": 16
                    },
                    {
                        "x": 15,
                        "y": 16
                    },
                    {
                        "x": 14,
                        "y": 16
                    }
                ],
                "legendary": [
                    {
                        "x": 12,
                        "y": 16
                    },
                    {
                        "x": 24,
                        "y": 2
                    }
                ],
                "rare": [
                    {
                        "x": 24,
                        "y": 19
                    }
                ]
            }
        },
        "x": 24,
        "y": 16
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 25,
        "y": 16
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 26,
        "y": 16
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 27,
        "y": 16
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 28,
        "y": 16
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 29,
        "y": 16
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 30,
        "y": 16
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 1,
        "y": 17
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 17
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 3,
        "y": 17
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 4,
        "y": 17
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 5,
        "y": 17
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 6,
        "y": 17
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 7,
        "y": 17
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 8,
        "y": 17
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 9,
        "y": 17
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 10,
        "y": 17
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 11,
        "y": 17
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 12,
        "y": 17
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 13,
        "y": 17
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 14,
        "y": 17
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 15,
        "y": 17
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 16,
        "y": 17
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 17,
        "y": 17
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 18,
        "y": 17
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 19,
        "y": 17
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 20,
        "y": 17
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 21,
        "y": 17
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 22,
        "y": 17
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 23,
        "y": 17
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 24,
        "y": 17
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 25,
        "y": 17
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 26,
        "y": 17
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 27,
        "y": 17
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 28,
        "y": 17
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 29,
        "y": 17
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 30,
        "y": 17
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "arcade": {}
        },
        "x": 1,
        "y": 18
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 18
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 3,
        "y": 18
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 4,
        "y": 18
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 5,
        "y": 18
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 6,
        "y": 18
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 7,
        "y": 18
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 8,
        "y": 18
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 9,
        "y": 18
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 10,
        "y": 18
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 11,
        "y": 18
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 12,
        "y": 18
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "zedCorp": {}
        },
        "x": 13,
        "y": 18
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 14,
        "y": 18
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 15,
        "y": 18
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 16,
        "y": 18
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 17,
        "y": 18
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 18,
        "y": 18
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 19,
        "y": 18
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 20,
        "y": 18
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 21,
        "y": 18
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 22,
        "y": 18
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 23,
        "y": 18
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 24,
        "y": 18
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 25,
        "y": 18
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 26,
        "y": 18
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 27,
        "y": 18
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "arcade": {}
        },
        "x": 28,
        "y": 18
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 29,
        "y": 18
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 30,
        "y": 18
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 1,
        "y": 19
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 19
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 3,
        "y": 19
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 4,
        "y": 19
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 5,
        "y": 19
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 6,
        "y": 19
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 7,
        "y": 19
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 8,
        "y": 19
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 9,
        "y": 19
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 10,
        "y": 19
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 11,
        "y": 19
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 12,
        "y": 19
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 13,
        "y": 19
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 14,
        "y": 19
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 15,
        "y": 19
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 16,
        "y": 19
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 17,
        "y": 19
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 18,
        "y": 19
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 19,
        "y": 19
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 20,
        "y": 19
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 21,
        "y": 19
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 22,
        "y": 19
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 23,
        "y": 19
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 24,
        "y": 19
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 25,
        "y": 19
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 26,
        "y": 19
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 27,
        "y": 19
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 28,
        "y": 19
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 29,
        "y": 19
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 30,
        "y": 19
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 1,
        "y": 20
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 20
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": false,
        "tileType": {
            "courier": {
                "epic": [
                    {
                        "x": 1,
                        "y": 13
                    },
                    {
                        "x": 3,
                        "y": 14
                    },
                    {
                        "x": 12,
                        "y": 20
                    }
                ],
                "legendary": [
                    {
                        "x": 17,
                        "y": 20
                    }
                ],
                "rare": [
                    {
                        "x": 6,
                        "y": 17
                    },
                    {
                        "x": 8,
                        "y": 20
                    },
                    {
                        "x": 7,
                        "y": 20
                    }
                ]
            }
        },
        "x": 3,
        "y": 20
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 4,
        "y": 20
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 5,
        "y": 20
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 6,
        "y": 20
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 7,
        "y": 20
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 8,
        "y": 20
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 9,
        "y": 20
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 10,
        "y": 20
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 11,
        "y": 20
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 12,
        "y": 20
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 13,
        "y": 20
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 14,
        "y": 20
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 15,
        "y": 20
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 16,
        "y": 20
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 17,
        "y": 20
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 18,
        "y": 20
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 19,
        "y": 20
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 20,
        "y": 20
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 21,
        "y": 20
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 22,
        "y": 20
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 23,
        "y": 20
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 24,
        "y": 20
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 25,
        "y": 20
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 26,
        "y": 20
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": false,
        "tileType": {
            "courier": {
                "epic": [
                    {
                        "x": 20,
                        "y": 13
                    },
                    {
                        "x": 27,
                        "y": 26
                    }
                ],
                "legendary": [
                    {
                        "x": 12,
                        "y": 20
                    }
                ],
                "rare": [
                    {
                        "x": 30,
                        "y": 20
                    },
                    {
                        "x": 24,
                        "y": 23
                    },
                    {
                        "x": 30,
                        "y": 23
                    }
                ]
            }
        },
        "x": 27,
        "y": 20
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 28,
        "y": 20
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 29,
        "y": 20
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 30,
        "y": 20
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 1,
        "y": 21
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 21
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 3,
        "y": 21
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 4,
        "y": 21
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 5,
        "y": 21
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 6,
        "y": 21
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 7,
        "y": 21
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 8,
        "y": 21
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 9,
        "y": 21
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 10,
        "y": 21
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 11,
        "y": 21
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 12,
        "y": 21
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 13,
        "y": 21
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 14,
        "y": 21
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 15,
        "y": 21
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 16,
        "y": 21
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "zedCorp": {}
        },
        "x": 17,
        "y": 21
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 18,
        "y": 21
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 19,
        "y": 21
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 20,
        "y": 21
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 21,
        "y": 21
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 22,
        "y": 21
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 23,
        "y": 21
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 24,
        "y": 21
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 25,
        "y": 21
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 26,
        "y": 21
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 27,
        "y": 21
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 28,
        "y": 21
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 29,
        "y": 21
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 30,
        "y": 21
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 1,
        "y": 22
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 22
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 3,
        "y": 22
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 4,
        "y": 22
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 5,
        "y": 22
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 6,
        "y": 22
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 7,
        "y": 22
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 8,
        "y": 22
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "zedCorp": {}
        },
        "x": 9,
        "y": 22
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 10,
        "y": 22
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 11,
        "y": 22
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 12,
        "y": 22
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 13,
        "y": 22
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 14,
        "y": 22
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 15,
        "y": 22
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 16,
        "y": 22
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 17,
        "y": 22
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 18,
        "y": 22
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 19,
        "y": 22
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 20,
        "y": 22
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 21,
        "y": 22
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 22,
        "y": 22
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 23,
        "y": 22
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 24,
        "y": 22
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 25,
        "y": 22
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 26,
        "y": 22
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 27,
        "y": 22
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 28,
        "y": 22
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 29,
        "y": 22
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 30,
        "y": 22
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 1,
        "y": 23
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 23
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 3,
        "y": 23
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 4,
        "y": 23
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 5,
        "y": 23
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 6,
        "y": 23
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 7,
        "y": 23
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 8,
        "y": 23
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 9,
        "y": 23
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 10,
        "y": 23
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 11,
        "y": 23
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 12,
        "y": 23
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 13,
        "y": 23
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 14,
        "y": 23
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 15,
        "y": 23
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 16,
        "y": 23
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": false,
        "tileType": {
            "courier": {
                "epic": [
                    {
                        "x": 23,
                        "y": 23
                    },
                    {
                        "x": 17,
                        "y": 30
                    },
                    {
                        "x": 17,
                        "y": 13
                    }
                ],
                "legendary": [
                    {
                        "x": 29,
                        "y": 23
                    },
                    {
                        "x": 2,
                        "y": 23
                    }
                ],
                "rare": [
                    {
                        "x": 17,
                        "y": 27
                    },
                    {
                        "x": 20,
                        "y": 20
                    }
                ]
            }
        },
        "x": 17,
        "y": 23
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 18,
        "y": 23
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 19,
        "y": 23
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 20,
        "y": 23
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 21,
        "y": 23
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 22,
        "y": 23
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 23,
        "y": 23
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 24,
        "y": 23
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 25,
        "y": 23
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 26,
        "y": 23
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 27,
        "y": 23
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 28,
        "y": 23
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 29,
        "y": 23
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 30,
        "y": 23
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 1,
        "y": 24
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 24
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 3,
        "y": 24
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 4,
        "y": 24
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 5,
        "y": 24
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 6,
        "y": 24
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 7,
        "y": 24
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 8,
        "y": 24
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": false,
        "tileType": {
            "courier": {
                "epic": [
                    {
                        "x": 3,
                        "y": 30
                    },
                    {
                        "x": 19,
                        "y": 24
                    },
                    {
                        "x": 2,
                        "y": 30
                    },
                    {
                        "x": 1,
                        "y": 24
                    }
                ],
                "legendary": [
                    {
                        "x": 21,
                        "y": 24
                    }
                ],
                "rare": [
                    {
                        "x": 9,
                        "y": 29
                    },
                    {
                        "x": 12,
                        "y": 27
                    }
                ]
            }
        },
        "x": 9,
        "y": 24
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 10,
        "y": 24
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 11,
        "y": 24
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 12,
        "y": 24
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 13,
        "y": 24
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 14,
        "y": 24
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "zedCorp": {}
        },
        "x": 15,
        "y": 24
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 16,
        "y": 24
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 17,
        "y": 24
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 18,
        "y": 24
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 19,
        "y": 24
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 20,
        "y": 24
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 21,
        "y": 24
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 22,
        "y": 24
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 23,
        "y": 24
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 24,
        "y": 24
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 25,
        "y": 24
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 26,
        "y": 24
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 27,
        "y": 24
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 28,
        "y": 24
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 29,
        "y": 24
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 30,
        "y": 24
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 1,
        "y": 25
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 25
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 3,
        "y": 25
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 4,
        "y": 25
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 5,
        "y": 25
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 6,
        "y": 25
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 7,
        "y": 25
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 8,
        "y": 25
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 9,
        "y": 25
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 10,
        "y": 25
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 11,
        "y": 25
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 12,
        "y": 25
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 13,
        "y": 25
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 14,
        "y": 25
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "arcade": {}
        },
        "x": 15,
        "y": 25
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 16,
        "y": 25
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 17,
        "y": 25
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 18,
        "y": 25
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 19,
        "y": 25
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 20,
        "y": 25
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 21,
        "y": 25
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 22,
        "y": 25
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 23,
        "y": 25
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 24,
        "y": 25
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 25,
        "y": 25
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 26,
        "y": 25
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 27,
        "y": 25
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 28,
        "y": 25
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 29,
        "y": 25
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 30,
        "y": 25
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 1,
        "y": 26
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 26
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": false,
        "tileType": {
            "courier": {
                "epic": [
                    {
                        "x": 10,
                        "y": 26
                    }
                ],
                "legendary": [
                    {
                        "x": 15,
                        "y": 26
                    }
                ],
                "rare": [
                    {
                        "x": 3,
                        "y": 23
                    },
                    {
                        "x": 6,
                        "y": 23
                    }
                ]
            }
        },
        "x": 3,
        "y": 26
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 4,
        "y": 26
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 5,
        "y": 26
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "zedCorp": {}
        },
        "x": 6,
        "y": 26
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 7,
        "y": 26
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 8,
        "y": 26
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 9,
        "y": 26
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 10,
        "y": 26
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 11,
        "y": 26
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 12,
        "y": 26
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 13,
        "y": 26
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 14,
        "y": 26
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 15,
        "y": 26
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 16,
        "y": 26
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 17,
        "y": 26
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 18,
        "y": 26
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 19,
        "y": 26
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 20,
        "y": 26
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 21,
        "y": 26
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 22,
        "y": 26
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": false,
        "tileType": {
            "courier": {
                "epic": [
                    {
                        "x": 17,
                        "y": 20
                    }
                ],
                "legendary": [
                    {
                        "x": 23,
                        "y": 11
                    }
                ],
                "rare": [
                    {
                        "x": 23,
                        "y": 30
                    },
                    {
                        "x": 23,
                        "y": 23
                    },
                    {
                        "x": 26,
                        "y": 23
                    }
                ]
            }
        },
        "x": 23,
        "y": 26
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 24,
        "y": 26
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 25,
        "y": 26
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 26,
        "y": 26
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 27,
        "y": 26
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 28,
        "y": 26
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "zedCorp": {}
        },
        "x": 29,
        "y": 26
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 30,
        "y": 26
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 1,
        "y": 27
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 27
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 3,
        "y": 27
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 4,
        "y": 27
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 5,
        "y": 27
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 6,
        "y": 27
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 7,
        "y": 27
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 8,
        "y": 27
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 9,
        "y": 27
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 10,
        "y": 27
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 11,
        "y": 27
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 12,
        "y": 27
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 13,
        "y": 27
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 14,
        "y": 27
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 15,
        "y": 27
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 16,
        "y": 27
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 17,
        "y": 27
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 18,
        "y": 27
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 19,
        "y": 27
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 20,
        "y": 27
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 21,
        "y": 27
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 22,
        "y": 27
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 23,
        "y": 27
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 24,
        "y": 27
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 25,
        "y": 27
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 26,
        "y": 27
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 27,
        "y": 27
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 28,
        "y": 27
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 29,
        "y": 27
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 30,
        "y": 27
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 1,
        "y": 28
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 28
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "zedCorp": {}
        },
        "x": 3,
        "y": 28
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 4,
        "y": 28
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 5,
        "y": 28
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 6,
        "y": 28
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 7,
        "y": 28
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 8,
        "y": 28
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 9,
        "y": 28
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 10,
        "y": 28
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 11,
        "y": 28
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 12,
        "y": 28
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 13,
        "y": 28
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": false,
        "tileType": {
            "courier": {
                "epic": [
                    {
                        "x": 14,
                        "y": 20
                    },
                    {
                        "x": 4,
                        "y": 28
                    },
                    {
                        "x": 8,
                        "y": 30
                    },
                    {
                        "x": 8,
                        "y": 22
                    }
                ],
                "legendary": [
                    {
                        "x": 14,
                        "y": 13
                    },
                    {
                        "x": 2,
                        "y": 28
                    }
                ],
                "rare": [
                    {
                        "x": 14,
                        "y": 25
                    },
                    {
                        "x": 14,
                        "y": 23
                    }
                ]
            }
        },
        "x": 14,
        "y": 28
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 15,
        "y": 28
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 16,
        "y": 28
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 17,
        "y": 28
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 18,
        "y": 28
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 19,
        "y": 28
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 20,
        "y": 28
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 21,
        "y": 28
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 22,
        "y": 28
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 23,
        "y": 28
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "arcade": {}
        },
        "x": 24,
        "y": 28
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 25,
        "y": 28
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 26,
        "y": 28
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 27,
        "y": 28
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 28,
        "y": 28
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 29,
        "y": 28
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 30,
        "y": 28
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 1,
        "y": 29
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 29
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 3,
        "y": 29
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 4,
        "y": 29
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 5,
        "y": 29
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 6,
        "y": 29
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 7,
        "y": 29
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 8,
        "y": 29
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 9,
        "y": 29
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 10,
        "y": 29
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 11,
        "y": 29
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 12,
        "y": 29
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 13,
        "y": 29
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 14,
        "y": 29
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 15,
        "y": 29
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 16,
        "y": 29
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 17,
        "y": 29
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 18,
        "y": 29
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 19,
        "y": 29
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 20,
        "y": 29
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 21,
        "y": 29
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 22,
        "y": 29
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 23,
        "y": 29
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 24,
        "y": 29
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 25,
        "y": 29
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "fireStation": {}
        },
        "x": 26,
        "y": 29
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 27,
        "y": 29
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 28,
        "y": 29
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 29,
        "y": 29
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 30,
        "y": 29
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 1,
        "y": 30
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 2,
        "y": 30
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 3,
        "y": 30
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 4,
        "y": 30
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 5,
        "y": 30
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "arcade": {}
        },
        "x": 6,
        "y": 30
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 7,
        "y": 30
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 8,
        "y": 30
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 9,
        "y": 30
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 10,
        "y": 30
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 11,
        "y": 30
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 12,
        "y": 30
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 13,
        "y": 30
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 14,
        "y": 30
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 15,
        "y": 30
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 16,
        "y": 30
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "apartment": {}
        },
        "x": 17,
        "y": 30
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 18,
        "y": 30
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 19,
        "y": 30
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 20,
        "y": 30
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 21,
        "y": 30
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 22,
        "y": 30
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 23,
        "y": 30
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "factory": {}
        },
        "x": 24,
        "y": 30
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 25,
        "y": 30
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "warehouse": {}
        },
        "x": 26,
        "y": 30
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "hospital": {}
        },
        "x": 27,
        "y": 30
    },
    {
        "canBeBarricaded": false,
        "canBeSearched": false,
        "tileType": {
            "street": {}
        },
        "x": 28,
        "y": 30
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": false,
        "tileType": {
            "courier": {
                "epic": [
                    {
                        "x": 23,
                        "y": 30
                    },
                    {
                        "x": 22,
                        "y": 30
                    }
                ],
                "legendary": [
                    {
                        "x": 16,
                        "y": 30
                    }
                ],
                "rare": [
                    {
                        "x": 30,
                        "y": 27
                    }
                ]
            }
        },
        "x": 29,
        "y": 30
    },
    {
        "canBeBarricaded": true,
        "canBeSearched": true,
        "tileType": {
            "policeStation": {}
        },
        "x": 30,
        "y": 30
    }
]