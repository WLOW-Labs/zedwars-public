export type Zedwars = {
  "version": "0.2.0",
  "name": "zedwars",
  "instructions": [
    {
      "name": "characterAttack",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "targetCharacter",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The target character account"
          ]
        },
        {
          "name": "weapon",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "armor",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "targetTile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The target tile account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "sysvarSlotHashes",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The sysvar slot hashes account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "characterBarricade",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "sysvarSlotHashes",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The sysvar slot hashes account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "characterBury",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "targetCharacter",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The target character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "targetTile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The target tile account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "characterDestroyBarricade",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "sysvarSlotHashes",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The sysvar slot hashes account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "characterDestroyGenerator",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "sysvarSlotHashes",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The sysvar slot hashes account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "characterDrag",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "targetCharacter",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The target character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "targetTile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The target tile account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "characterGenerateMissions",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "sysvarSlotHashes",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The sysvar slot hashes account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "characterInit",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The player account. It's a regular wallet account that owns the character.",
            "mut because this account will fund the creation of the character account."
          ]
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account.",
            "It's the account that holds the character's state."
          ]
        },
        {
          "name": "mapTile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The map tile account",
            "The character will be placed on this tile."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The program's config account."
          ]
        },
        {
          "name": "treeConfig",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The tree config account"
          ]
        },
        {
          "name": "merkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referrer",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "collectionMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The items collection mint"
          ]
        },
        {
          "name": "collectionMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The items collection metadata"
          ]
        },
        {
          "name": "collectionMasterEdition",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The items collection master edition"
          ]
        },
        {
          "name": "collectionAuthorityRecord",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bubblegumSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "logWrapper",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bubblegumProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CharacterInitArgs"
          }
        }
      ]
    },
    {
      "name": "characterLoot",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "item",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The item account"
          ]
        },
        {
          "name": "targetCharacter",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The target character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program"
          ]
        },
        {
          "name": "sysvarSlotHashes",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CharacterLootArgs"
          }
        }
      ]
    },
    {
      "name": "characterMove",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "origTile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "destTile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The destination tile account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program"
          ]
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "characterResize",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The program's authority."
          ]
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "size",
          "type": "u32"
        }
      ]
    },
    {
      "name": "characterRename",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CharacterRenameArgs"
          }
        }
      ]
    },
    {
      "name": "characterRevive",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The tile account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program"
          ]
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CharacterReviveArgs"
          }
        }
      ]
    },
    {
      "name": "characterSearch",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The tile account"
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program"
          ]
        },
        {
          "name": "sysvarSlotHashes",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The sysvar slot hashes account"
          ]
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "characterStandBackUp",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "item",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The item account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The tile account"
          ]
        },
        {
          "name": "fromTile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The tile we are coming from"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program"
          ]
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "characterUnlockSkill",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program"
          ]
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CharacterUnlockSkillArgs"
          }
        }
      ]
    },
    {
      "name": "characterUpdate",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The operator of the program."
          ]
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CharacterUpdateArgs"
          }
        }
      ]
    },
    {
      "name": "characterUpgrade",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "referrer",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "characterUseItem",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "item",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The item account"
          ]
        },
        {
          "name": "targetCharacter",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The target character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program"
          ]
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CharacterUseItemArgs"
          }
        }
      ]
    },
    {
      "name": "configAddLegendaryItem",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The operator of the program."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program account"
          ]
        }
      ],
      "args": [
        {
          "name": "itemKind",
          "type": {
            "defined": "ItemKind"
          }
        },
        {
          "name": "itemId",
          "type": "u32"
        }
      ]
    },
    {
      "name": "configAddRareDropTableItem",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The operator of the program."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program account"
          ]
        }
      ],
      "args": [
        {
          "name": "itemId",
          "type": "u32"
        }
      ]
    },
    {
      "name": "configInit",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The operator of the program."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account for the program."
          ]
        },
        {
          "name": "itemsCollectionMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Items collection NFT mint."
          ]
        },
        {
          "name": "itemsCollectionMetadata",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Items collection NFT metadata."
          ]
        },
        {
          "name": "itemsCollectionMasterEdition",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Items collection NFT master edition."
          ]
        },
        {
          "name": "itemsCollectionAuthorityRecord",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Items collection NFT authority record."
          ]
        },
        {
          "name": "charactersCollectionMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Characters collection NFT mint."
          ]
        },
        {
          "name": "charactersCollectionMetadata",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Characters collection NFT metadata."
          ]
        },
        {
          "name": "charactersCollectionMasterEdition",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Characters collection NFT master edition."
          ]
        },
        {
          "name": "charactersCollectionAuthorityRecord",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Characters collection NFT authority record."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program."
          ]
        }
      ],
      "args": []
    },
    {
      "name": "configRegisterItem",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The program's authority."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account for the program."
          ]
        },
        {
          "name": "item",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The item account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program."
          ]
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The rent sysvar."
          ]
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "ConfigRegisterItemArgs"
          }
        }
      ]
    },
    {
      "name": "configResize",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The program's authority."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "size",
          "type": "u32"
        }
      ]
    },
    {
      "name": "configSetItemRandomWeights",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The operator of the program."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program account"
          ]
        }
      ],
      "args": [
        {
          "name": "tileType",
          "type": {
            "defined": "TileType"
          }
        },
        {
          "name": "weights",
          "type": {
            "vec": {
              "defined": "ItemRandomWeight"
            }
          }
        }
      ]
    },
    {
      "name": "configSetMerkleTree",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The program's authority."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merkleTree",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "treeConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bubblegumProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "logWrapper",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "ConfigSetMerkleTreeArgs"
          }
        }
      ]
    },
    {
      "name": "configSetSearchSuccessRate",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The operator of the program."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program account"
          ]
        }
      ],
      "args": [
        {
          "name": "tileType",
          "type": {
            "defined": "TileType"
          }
        },
        {
          "name": "value",
          "type": "u32"
        }
      ]
    },
    {
      "name": "configSetSkillPointsRequired",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The operator of the program."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program account"
          ]
        }
      ],
      "args": [
        {
          "name": "skill",
          "type": {
            "defined": "Skill"
          }
        },
        {
          "name": "value",
          "type": "u8"
        }
      ]
    },
    {
      "name": "configSetLootRegenRate",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The operator of the program."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program account"
          ]
        }
      ],
      "args": [
        {
          "name": "tileType",
          "type": {
            "defined": "TileType"
          }
        },
        {
          "name": "value",
          "type": "u32"
        }
      ]
    },
    {
      "name": "configSetVariables",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The operator of the program."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program account"
          ]
        }
      ],
      "args": [
        {
          "name": "key",
          "type": {
            "defined": "ConfigVar"
          }
        },
        {
          "name": "value",
          "type": "u32"
        }
      ]
    },
    {
      "name": "courierMissionEnd",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "item",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The item to courier"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "sysvarSlotHashes",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The sysvar slot hashes account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "courierMissionStart",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "item",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The item to courier"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "sysvarSlotHashes",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The sysvar slot hashes account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "itemAirdrop",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "destination",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "item",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The item account"
          ]
        },
        {
          "name": "itemMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treeConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "itemsCollectionMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The items collection mint"
          ]
        },
        {
          "name": "itemsCollectionMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The items collection metadata"
          ]
        },
        {
          "name": "itemsCollectionMasterEdition",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The items collection master edition"
          ]
        },
        {
          "name": "itemsCollectionAuthorityRecord",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bubblegumSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "logWrapper",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bubblegumProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "ItemAirdropArgs"
          }
        }
      ]
    },
    {
      "name": "itemCraft",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The tile account"
          ]
        },
        {
          "name": "item",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The item to craft"
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program"
          ]
        },
        {
          "name": "sysvarSlotHashes",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The sysvar slot hashes account"
          ]
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "itemDestroy",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "item",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The item account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program."
          ]
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "ItemDestroyArgs"
          }
        }
      ]
    },
    {
      "name": "itemEquip",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "item",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The item account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The tile account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "itemMint",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "item",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The item account"
          ]
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The tile account"
          ]
        },
        {
          "name": "itemMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treeConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "itemsCollectionMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The items collection mint"
          ]
        },
        {
          "name": "itemsCollectionMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The items collection metadata"
          ]
        },
        {
          "name": "itemsCollectionMasterEdition",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The items collection master edition"
          ]
        },
        {
          "name": "itemsCollectionAuthorityRecord",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bubblegumSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "logWrapper",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bubblegumProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "ItemMintArgs"
          }
        }
      ]
    },
    {
      "name": "itemRedeem",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "item",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The item account"
          ]
        },
        {
          "name": "itemMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "merkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treeConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "logWrapper",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bubblegumProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "ItemRedeemArgs"
          }
        }
      ]
    },
    {
      "name": "itemUnequip",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program."
          ]
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "ItemUnequipArgs"
          }
        }
      ]
    },
    {
      "name": "itemUpdate",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The program's authority."
          ]
        },
        {
          "name": "item",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The item account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "UpdateItemArgs"
          }
        }
      ]
    },
    {
      "name": "enterRaffle",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "raffle",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The raffle account"
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "EnterRaffleArgs"
          }
        }
      ]
    },
    {
      "name": "mapTileInit",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The operator of the program."
          ]
        },
        {
          "name": "mapTile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The map tile account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program."
          ]
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "MapTileInitArgs"
          }
        }
      ]
    },
    {
      "name": "mapTileUpdate",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The operator of the program."
          ]
        },
        {
          "name": "mapTile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The map tile account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "MapTileUpdateArgs"
          }
        }
      ]
    },
    {
      "name": "ransackTile",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sysvarSlotHashes",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "sessionClose",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "sessionInit",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "delegate",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "SessionInitArgs"
          }
        }
      ]
    },
    {
      "name": "itemResize",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The program's authority."
          ]
        },
        {
          "name": "item",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "size",
          "type": "u32"
        }
      ]
    },
    {
      "name": "resizeTile",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The program's authority."
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "size",
          "type": "u32"
        }
      ]
    },
    {
      "name": "withdrawTreasury",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The program's authority."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "character",
      "docs": [
        "The character account",
        "The character account is used to store the state of a character.",
        "PDA: [Character::SEED_PREFIX, mint]"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "docs": [
              "The mint of the character NFT."
            ],
            "type": "publicKey"
          },
          {
            "name": "x",
            "docs": [
              "The x coordinate of the character."
            ],
            "type": "i32"
          },
          {
            "name": "y",
            "docs": [
              "The y coordinate of the character."
            ],
            "type": "i32"
          },
          {
            "name": "hp",
            "docs": [
              "The HP of the character."
            ],
            "type": "u8"
          },
          {
            "name": "isZombie",
            "docs": [
              "The flag to determine if the character is a zombie."
            ],
            "type": "bool"
          },
          {
            "name": "xp",
            "docs": [
              "The XP of the character."
            ],
            "type": "u32"
          },
          {
            "name": "bonusXp",
            "docs": [
              "Bonus XP remaining"
            ],
            "type": "u32"
          },
          {
            "name": "level",
            "docs": [
              "The level of the character."
            ],
            "type": "u16"
          },
          {
            "name": "skillPoints",
            "docs": [
              "The skill points of the character."
            ],
            "type": "u16"
          },
          {
            "name": "lastAttackedAt",
            "docs": [
              "The time when the character last attacked."
            ],
            "type": "i64"
          },
          {
            "name": "lastActedAt",
            "docs": [
              "The time when the character last acted."
            ],
            "type": "i64"
          },
          {
            "name": "isInfected",
            "docs": [
              "The flag to determine if the character is infected and should take damage when doing actions that expend energy"
            ],
            "type": "bool"
          },
          {
            "name": "energy",
            "docs": [
              "The energy of the character."
            ],
            "type": "u8"
          },
          {
            "name": "energyUpdatedAt",
            "docs": [
              "The time when the energy value was last updated.",
              "Used to calculate the real energy value."
            ],
            "type": "i64"
          },
          {
            "name": "backpackSpace",
            "docs": [
              "Additional backpack space"
            ],
            "type": "u8"
          },
          {
            "name": "inventory",
            "docs": [
              "How many items the character has."
            ],
            "type": {
              "vec": "u32"
            }
          },
          {
            "name": "equippedItems",
            "docs": [
              "The equipped items of the character."
            ],
            "type": {
              "defined": "EquippedItems"
            }
          },
          {
            "name": "skills",
            "type": {
              "vec": "bool"
            }
          },
          {
            "name": "killedBy",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "killedAt",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "events",
            "type": {
              "vec": {
                "defined": "Event"
              }
            }
          },
          {
            "name": "stats",
            "type": {
              "vec": "u32"
            }
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "lastActedSlot",
            "type": "u64"
          },
          {
            "name": "lastAttackedSlot",
            "type": "u64"
          },
          {
            "name": "energyRegenRate",
            "type": "u32"
          },
          {
            "name": "hasNameChangeAvailable",
            "type": "bool"
          },
          {
            "name": "hasPremium",
            "type": "bool"
          },
          {
            "name": "lastX",
            "type": "i32"
          },
          {
            "name": "lastY",
            "type": "i32"
          },
          {
            "name": "weeklyMissions",
            "type": {
              "vec": {
                "defined": "WeeklyMission"
              }
            }
          },
          {
            "name": "missionsGeneratedAt",
            "type": "i64"
          },
          {
            "name": "raffleTickets",
            "type": "u16"
          },
          {
            "name": "courierMission",
            "type": {
              "option": {
                "defined": "CourierMission"
              }
            }
          },
          {
            "name": "layers",
            "type": "string"
          },
          {
            "name": "pendingRevive",
            "type": "bool"
          },
          {
            "name": "referredBy",
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "config",
      "docs": [
        "The config account for the program.",
        "This account is used to store the collection NFT mints and the number of SFTs and NFTs registered.",
        "The account is initialized by the operator.",
        "The account is owned by the program.",
        "PDA: [Config::SEED_PREFIX]"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "itemsCollectionMint",
            "docs": [
              "Items collection NFT mint."
            ],
            "type": "publicKey"
          },
          {
            "name": "charactersCollectionMint",
            "docs": [
              "Characters collection NFT mint."
            ],
            "type": "publicKey"
          },
          {
            "name": "numberOfItems",
            "docs": [
              "Number of items registered"
            ],
            "type": "u16"
          },
          {
            "name": "numberOfCharacters",
            "docs": [
              "Number of characters registered"
            ],
            "type": "u32"
          },
          {
            "name": "configVariables",
            "docs": [
              "Config variables"
            ],
            "type": {
              "vec": "u32"
            }
          },
          {
            "name": "itemRandomWeights",
            "docs": [
              "Item random weights"
            ],
            "type": {
              "vec": {
                "vec": {
                  "defined": "ItemRandomWeight"
                }
              }
            }
          },
          {
            "name": "searchSuccessRates",
            "docs": [
              "Search success rates"
            ],
            "type": {
              "vec": "u32"
            }
          },
          {
            "name": "skillPointsRequired",
            "docs": [
              "Skill points required"
            ],
            "type": "bytes"
          },
          {
            "name": "creators",
            "docs": [
              "Creators"
            ],
            "type": {
              "vec": {
                "defined": "Creator"
              }
            }
          },
          {
            "name": "maintenanceMode",
            "docs": [
              "Maintenance mode"
            ],
            "type": "bool"
          },
          {
            "name": "legendaryItems",
            "docs": [
              "List of potential legendary items that can be crafted"
            ],
            "type": {
              "vec": {
                "vec": "u32"
              }
            }
          },
          {
            "name": "rareDropTable",
            "docs": [
              "List of items available in the rare drop table"
            ],
            "type": {
              "vec": "u32"
            }
          },
          {
            "name": "merkleTree",
            "docs": [
              "The merkle tree used for minting item cnft"
            ],
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "merkleTreeItemsMinted",
            "type": "u64"
          },
          {
            "name": "lootRegenRates",
            "type": {
              "vec": "u32"
            }
          }
        ]
      }
    },
    {
      "name": "item",
      "docs": [
        "Item is an account that holds the information of an item.",
        "It corresponds to an NFT.",
        "PDA: [Item::SEED_PREFIX, mint.key().as_ref()]",
        "Mint Address: [Item::MINT_SEED_PREFIX, item_id]"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "docs": [
              "The mint of the item",
              "The id of the item.",
              "The mint of the corresponding NFT can be derived from this id."
            ],
            "type": "u32"
          },
          {
            "name": "itemType",
            "docs": [
              "Item type"
            ],
            "type": {
              "defined": "ItemType"
            }
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "rarity",
            "type": {
              "defined": "ItemRarity"
            }
          },
          {
            "name": "kind",
            "type": {
              "defined": "ItemKind"
            }
          },
          {
            "name": "convertsTo",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "itemMint",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "id",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "mapTile",
      "docs": [
        "MapTile is a struct that represents a tile on the map.",
        "It contains the number of zombies, survivors, barricades on the tile.",
        "It also contains the name of the tile.",
        "It also contains the item weights for the tile which is used to determine what items could be found on the tile.",
        "PDA: [MapTile::SEED_PREFIX,x.to_le_bytes().as_slice(),y.to_le_bytes().as_slice()]"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "x",
            "docs": [
              "The x coordinate of the map tile."
            ],
            "type": "i32"
          },
          {
            "name": "y",
            "docs": [
              "The y coordinate of the map tile."
            ],
            "type": "i32"
          },
          {
            "name": "numZombies",
            "docs": [
              "The number of zombies on the map tile."
            ],
            "type": "u32"
          },
          {
            "name": "numSurvivors",
            "docs": [
              "The number of survivors on the map tile."
            ],
            "type": "u32"
          },
          {
            "name": "numBarricades",
            "docs": [
              "The number of barricades on the map tile."
            ],
            "type": "u8"
          },
          {
            "name": "hasGenerator",
            "docs": [
              "Whether the map tile has a generator."
            ],
            "type": "bool"
          },
          {
            "name": "hasPowerUntil",
            "docs": [
              "The time until the generator has power."
            ],
            "type": "i64"
          },
          {
            "name": "tileType",
            "docs": [
              "The type of tile"
            ],
            "type": {
              "defined": "TileType"
            }
          },
          {
            "name": "canBeBarricaded",
            "docs": [
              "whether or not the tile can be barricaded"
            ],
            "type": "bool"
          },
          {
            "name": "canBeSearched",
            "docs": [
              "whether or not the tile can be searched"
            ],
            "type": "bool"
          },
          {
            "name": "lastSearchedAt",
            "docs": [
              "The time when the tile was last searched"
            ],
            "type": "i64"
          },
          {
            "name": "lootableItems",
            "docs": [
              "How many items there are that can be lootable"
            ],
            "type": "u8"
          },
          {
            "name": "resupplyAt",
            "docs": [
              "When the tile will be resupplied"
            ],
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "raffle",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "player",
            "docs": [
              "Pubkey of the player"
            ],
            "type": "publicKey"
          },
          {
            "name": "entries",
            "docs": [
              "Number of entries in this weeks raffle"
            ],
            "type": "u16"
          },
          {
            "name": "lastUpdated",
            "docs": [
              "Last time this pda was updated"
            ],
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "session",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "player",
            "type": "publicKey"
          },
          {
            "name": "delegate",
            "type": "publicKey"
          },
          {
            "name": "validUntil",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "PlayerVerifyArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "root",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "dataHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "creatorHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "nonce",
            "type": "u64"
          },
          {
            "name": "index",
            "type": "u32"
          },
          {
            "name": "merkle",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "CharacterInitArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isZombie",
            "type": "bool"
          },
          {
            "name": "layers",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "assetId",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "CharacterLootArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "itemId",
            "type": "u32"
          },
          {
            "name": "playerVerify",
            "type": {
              "defined": "PlayerVerifyArgs"
            }
          }
        ]
      }
    },
    {
      "name": "CharacterRenameArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "playerVerify",
            "type": {
              "defined": "PlayerVerifyArgs"
            }
          }
        ]
      }
    },
    {
      "name": "CharacterReviveArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "accept",
            "type": "bool"
          },
          {
            "name": "playerVerify",
            "type": {
              "defined": "PlayerVerifyArgs"
            }
          }
        ]
      }
    },
    {
      "name": "CharacterUnlockSkillArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "skill",
            "type": {
              "defined": "Skill"
            }
          },
          {
            "name": "playerVerify",
            "type": {
              "defined": "PlayerVerifyArgs"
            }
          }
        ]
      }
    },
    {
      "name": "CharacterUpdateArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "x",
            "docs": [
              "The x coordinate of the character."
            ],
            "type": "i32"
          },
          {
            "name": "y",
            "docs": [
              "The y coordinate of the character."
            ],
            "type": "i32"
          },
          {
            "name": "hp",
            "docs": [
              "The HP of the character."
            ],
            "type": "u8"
          },
          {
            "name": "isZombie",
            "docs": [
              "The flag to determine if the character is a zombie."
            ],
            "type": "bool"
          },
          {
            "name": "xp",
            "docs": [
              "The XP of the character."
            ],
            "type": "u32"
          },
          {
            "name": "bonusXp",
            "docs": [
              "Bonus xp"
            ],
            "type": "u32"
          },
          {
            "name": "level",
            "docs": [
              "The level of the character."
            ],
            "type": "u16"
          },
          {
            "name": "skillPoints",
            "docs": [
              "The skill points of the character."
            ],
            "type": "u16"
          },
          {
            "name": "lastAttackedAt",
            "docs": [
              "The time when the character last attacked."
            ],
            "type": "i64"
          },
          {
            "name": "lastActedAt",
            "docs": [
              "The time when the character last acted."
            ],
            "type": "i64"
          },
          {
            "name": "isInfected",
            "docs": [
              "The flag to determine if the character is infected and should take damage when doing actions that expend energy"
            ],
            "type": "bool"
          },
          {
            "name": "energy",
            "docs": [
              "The energy of the character."
            ],
            "type": "u8"
          },
          {
            "name": "energyUpdatedAt",
            "docs": [
              "The time when the energy value was last updated.",
              "Used to calculate the real energy value."
            ],
            "type": "i64"
          },
          {
            "name": "backpackSpace",
            "docs": [
              "Addtional backpack space"
            ],
            "type": "u8"
          },
          {
            "name": "inventory",
            "docs": [
              "How many items the character has."
            ],
            "type": {
              "vec": "u32"
            }
          },
          {
            "name": "equippedItems",
            "docs": [
              "The equipped items of the character."
            ],
            "type": {
              "defined": "EquippedItems"
            }
          },
          {
            "name": "skills",
            "type": {
              "vec": "bool"
            }
          },
          {
            "name": "killedBy",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "killedAt",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "hasPremium",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "CharacterUseItemArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "itemId",
            "type": "u32"
          },
          {
            "name": "playerVerify",
            "type": {
              "defined": "PlayerVerifyArgs"
            }
          }
        ]
      }
    },
    {
      "name": "ConfigRegisterItemArgs",
      "docs": [
        "The arguments for the `config_register_sft` instruction."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "itemId",
            "docs": [
              "The ID of the item"
            ],
            "type": "u32"
          },
          {
            "name": "name",
            "docs": [
              "The name of the item SFT."
            ],
            "type": "string"
          },
          {
            "name": "itemType",
            "docs": [
              "Item type"
            ],
            "type": {
              "defined": "ItemType"
            }
          },
          {
            "name": "rarity",
            "type": {
              "defined": "ItemRarity"
            }
          },
          {
            "name": "kind",
            "type": {
              "defined": "ItemKind"
            }
          },
          {
            "name": "convertsTo",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "ConfigSetMerkleTreeArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "maxDepth",
            "type": "u32"
          },
          {
            "name": "maxBufferSize",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "EnterRaffleArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "quantity",
            "type": "u16"
          },
          {
            "name": "playerVerify",
            "type": {
              "defined": "PlayerVerifyArgs"
            }
          }
        ]
      }
    },
    {
      "name": "ItemAirdropArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "assetId",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "ItemDestroyArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "itemId",
            "type": "u32"
          },
          {
            "name": "playerVerify",
            "type": {
              "defined": "PlayerVerifyArgs"
            }
          }
        ]
      }
    },
    {
      "name": "ItemMintArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "assetId",
            "type": "publicKey"
          },
          {
            "name": "playerVerify",
            "type": {
              "defined": "PlayerVerifyArgs"
            }
          }
        ]
      }
    },
    {
      "name": "ItemRedeemArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "root",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "dataHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "creatorHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "nonce",
            "type": "u64"
          },
          {
            "name": "index",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "ItemUnequipArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "slot",
            "type": {
              "defined": "EquipSlot"
            }
          },
          {
            "name": "playerVerify",
            "type": {
              "defined": "PlayerVerifyArgs"
            }
          }
        ]
      }
    },
    {
      "name": "UpdateItemArgs",
      "docs": [
        "The arguments for the `config_register_sft` instruction."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "itemId",
            "type": "u32"
          },
          {
            "name": "itemType",
            "type": {
              "defined": "ItemType"
            }
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "rarity",
            "type": {
              "defined": "ItemRarity"
            }
          },
          {
            "name": "kind",
            "type": {
              "defined": "ItemKind"
            }
          },
          {
            "name": "convertsTo",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "MapTileInitArgs",
      "docs": [
        "The arguments for the `map_tile_init` instruction."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "x",
            "docs": [
              "The x coordinate of the map tile."
            ],
            "type": "i32"
          },
          {
            "name": "y",
            "docs": [
              "The y coordinate of the map tile."
            ],
            "type": "i32"
          },
          {
            "name": "tileType",
            "docs": [
              "The type of tile"
            ],
            "type": {
              "defined": "TileType"
            }
          },
          {
            "name": "canBeBarricaded",
            "type": "bool"
          },
          {
            "name": "canBeSearched",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "MapTileUpdateArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "numZombies",
            "docs": [
              "The number of zombies on the map tile."
            ],
            "type": "u32"
          },
          {
            "name": "numSurvivors",
            "docs": [
              "The number of survivors on the map tile."
            ],
            "type": "u32"
          },
          {
            "name": "numBarricades",
            "docs": [
              "The number of barricades on the map tile."
            ],
            "type": "u8"
          },
          {
            "name": "hasGenerator",
            "docs": [
              "Whether the map tile has a generator."
            ],
            "type": "bool"
          },
          {
            "name": "hasPowerUntil",
            "docs": [
              "The time until the generator has power."
            ],
            "type": "i64"
          },
          {
            "name": "tileType",
            "docs": [
              "The type of tile"
            ],
            "type": {
              "defined": "TileType"
            }
          },
          {
            "name": "lootableItems",
            "docs": [
              "Number of lootable items to reset it to"
            ],
            "type": "u8"
          },
          {
            "name": "canBeSearched",
            "docs": [
              "Whether or not a tile can be searched"
            ],
            "type": "bool"
          },
          {
            "name": "canBeBarricaded",
            "docs": [
              "Whether or not a tile can be barricaded"
            ],
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "SessionInitArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seconds",
            "type": "i64"
          },
          {
            "name": "lamports",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "EquippedItems",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "weapon",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "armor",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "backpack",
            "type": {
              "option": "u32"
            }
          }
        ]
      }
    },
    {
      "name": "Event",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "message",
            "type": "string"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "severity",
            "type": "u8"
          },
          {
            "name": "block",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "WeeklyMission",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "missionType",
            "type": {
              "defined": "WeeklyMissionType"
            }
          },
          {
            "name": "required",
            "type": "u16"
          },
          {
            "name": "current",
            "type": "u16"
          },
          {
            "name": "reward",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "CourierMission",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "destination",
            "type": {
              "defined": "Point"
            }
          },
          {
            "name": "item",
            "type": "u32"
          },
          {
            "name": "reward",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "ItemRandomWeight",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "itemId",
            "type": "u32"
          },
          {
            "name": "weight",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "Creator",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "publicKey"
          },
          {
            "name": "verified",
            "type": "bool"
          },
          {
            "name": "share",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "Point",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "x",
            "type": "i32"
          },
          {
            "name": "y",
            "type": "i32"
          }
        ]
      }
    },
    {
      "name": "Stat",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "TotalXP"
          },
          {
            "name": "BarricadesBuilt"
          },
          {
            "name": "BarricadesDestroyed"
          },
          {
            "name": "GeneratorsDestroyed"
          },
          {
            "name": "ItemsCrafted"
          },
          {
            "name": "ItemsFound"
          },
          {
            "name": "ZombiesKilled"
          },
          {
            "name": "SurvivorsKilled"
          },
          {
            "name": "TilesRansacked"
          },
          {
            "name": "CouriersCompleted"
          }
        ]
      }
    },
    {
      "name": "Skill",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Parkour"
          },
          {
            "name": "BarricadeBuilder"
          },
          {
            "name": "UnarmedCombat"
          },
          {
            "name": "BodyBuilder"
          },
          {
            "name": "AdvancedUnarmedCombat"
          },
          {
            "name": "Looter"
          },
          {
            "name": "AdvancedLooter"
          },
          {
            "name": "ThickSkin"
          },
          {
            "name": "AdvancedMelee"
          },
          {
            "name": "PistolProficiency"
          },
          {
            "name": "LongGunProficiency"
          },
          {
            "name": "RangedAccuracy"
          },
          {
            "name": "AdvancedHealing"
          },
          {
            "name": "TechLooter"
          },
          {
            "name": "RevivalSyringeCrafter"
          },
          {
            "name": "AdrenalineSyringeCrafter"
          },
          {
            "name": "ExperienceSyringeCrafter"
          },
          {
            "name": "BarricadeDestroyer"
          },
          {
            "name": "InfectedBite"
          },
          {
            "name": "EnhancedBite"
          },
          {
            "name": "EnhancedClaws"
          },
          {
            "name": "HealingAttack"
          },
          {
            "name": "Drag"
          },
          {
            "name": "TankyFlesh"
          },
          {
            "name": "SpeedWalking"
          },
          {
            "name": "MutatedZombie"
          },
          {
            "name": "FirearmsTraining"
          },
          {
            "name": "AdvancedFirearmsTraining"
          },
          {
            "name": "WeaponMaintenance"
          },
          {
            "name": "ZombieAccuracy"
          },
          {
            "name": "AdvancedZombieAccuracy"
          }
        ]
      }
    },
    {
      "name": "WeeklyMissionType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "KillSurvivors"
          },
          {
            "name": "KillZombies"
          },
          {
            "name": "BuildBarricades"
          },
          {
            "name": "DestroyBarricades"
          },
          {
            "name": "GainXP"
          },
          {
            "name": "FindItems"
          },
          {
            "name": "InstallGenerator"
          },
          {
            "name": "DestroyGenerator"
          },
          {
            "name": "ReviveZombie"
          },
          {
            "name": "RansackTile"
          },
          {
            "name": "CourierMission"
          }
        ]
      }
    },
    {
      "name": "MissionRarity",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Rare"
          },
          {
            "name": "Epic"
          },
          {
            "name": "Legendary"
          },
          {
            "name": "Invalid"
          }
        ]
      }
    },
    {
      "name": "ConfigVar",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "UnarmedAttackSuccessRate"
          },
          {
            "name": "AttackEnergyCost"
          },
          {
            "name": "AttackCoolDown"
          },
          {
            "name": "AttackBaseXpGain"
          },
          {
            "name": "BaseUnarmedDamage"
          },
          {
            "name": "BarricadeEnergyCost"
          },
          {
            "name": "BarricadeXpGain"
          },
          {
            "name": "DestroyBarricadeEnergyCost"
          },
          {
            "name": "DestroyBarricadeXpGain"
          },
          {
            "name": "DestroyBarricadeSuccessRate"
          },
          {
            "name": "MoveEnergyCost"
          },
          {
            "name": "ZombieMoveExtraEnergyCost"
          },
          {
            "name": "HumanMoveBarricadeLimit"
          },
          {
            "name": "ZombieMoveBarricadeLimit"
          },
          {
            "name": "LootPrivilegeDuration"
          },
          {
            "name": "LootEnergyCost"
          },
          {
            "name": "SearchEnergyCost"
          },
          {
            "name": "SearchXpGain"
          },
          {
            "name": "SearchSuccessXpGain"
          },
          {
            "name": "EquipItemEnergyCost"
          },
          {
            "name": "MintItemEnergyCost"
          },
          {
            "name": "MintAttackCoolDown"
          },
          {
            "name": "UseItemEnergyCost"
          },
          {
            "name": "UseItemGeneratorXpGain"
          },
          {
            "name": "UseItemFirstAidXpGain"
          },
          {
            "name": "UseItemEnergyXpGain"
          },
          {
            "name": "UseItemRevivalSyringeXpGain"
          },
          {
            "name": "UseItemFuelCanXpGain"
          },
          {
            "name": "FuelCanPowerDuration"
          },
          {
            "name": "ZombieReviveHealth"
          },
          {
            "name": "DestroyItemEnergyCost"
          },
          {
            "name": "ActionCoolDown"
          },
          {
            "name": "EnergyRegenRate"
          },
          {
            "name": "StandingBackUpEnergyCost"
          },
          {
            "name": "StandingBackUpHealth"
          },
          {
            "name": "DragCharacterEnergyCost"
          },
          {
            "name": "ZombieDragMaxTargetHp"
          },
          {
            "name": "MaxHp"
          },
          {
            "name": "MaxEnergy"
          },
          {
            "name": "BaseInventorySize"
          },
          {
            "name": "InfectedDamageAmount"
          },
          {
            "name": "XpPerLevel"
          },
          {
            "name": "SkillPointsGainedPerLevel"
          },
          {
            "name": "UnarmedCombatSkillAttackBonus"
          },
          {
            "name": "AdvancedUnarmedCombatSkillAttackBonus"
          },
          {
            "name": "AdvancedHealingHpBonus"
          },
          {
            "name": "TechLooterSearchSuccessRateBonus"
          },
          {
            "name": "CraftEnergyCost"
          },
          {
            "name": "ThickSkinDamageReduction"
          },
          {
            "name": "AdvancedMeleeAttackBonus"
          },
          {
            "name": "PistolProficiencyAttackBonus"
          },
          {
            "name": "LongGunProficiencyAttackBonus"
          },
          {
            "name": "RangedAccuracyBonus"
          },
          {
            "name": "BodyBuilderMaxHpBonus"
          },
          {
            "name": "LooterSearchSuccessRateBonus"
          },
          {
            "name": "AdvancedLooterSearchSuccessRateBonus"
          },
          {
            "name": "InfectedBiteInfectionRate"
          },
          {
            "name": "TankyFleshDamageReduction"
          },
          {
            "name": "EnhancedBiteAttackBonus"
          },
          {
            "name": "EnhancedClawAttackBonus"
          },
          {
            "name": "DestroyGeneratorEnergyCost"
          },
          {
            "name": "DestroyGeneratorXpGain"
          },
          {
            "name": "LootBodySuccessRate"
          },
          {
            "name": "FirearmsTrainingAccuracyBonus"
          },
          {
            "name": "AdvancedFirearmsTrainingAccuracyBonus"
          },
          {
            "name": "ZombieAccuracyBonus"
          },
          {
            "name": "AdvancedZombieAccuracyBonus"
          },
          {
            "name": "PremiumCost"
          },
          {
            "name": "NameChangeCost"
          },
          {
            "name": "TicketsPerMission"
          },
          {
            "name": "MissionCooldown"
          },
          {
            "name": "PremiumRegenReduction"
          },
          {
            "name": "DoubleXPActive"
          },
          {
            "name": "MaxTileLoot"
          }
        ]
      }
    },
    {
      "name": "ItemRarity",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Special"
          },
          {
            "name": "Untradeable"
          },
          {
            "name": "Common"
          },
          {
            "name": "Uncommon"
          },
          {
            "name": "Rare"
          },
          {
            "name": "Epic"
          },
          {
            "name": "Legendary"
          }
        ]
      }
    },
    {
      "name": "ItemKind",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "None"
          },
          {
            "name": "Consumable"
          },
          {
            "name": "Armor"
          },
          {
            "name": "Axe"
          },
          {
            "name": "Backpack"
          },
          {
            "name": "BaseballBat"
          },
          {
            "name": "Crowbar"
          },
          {
            "name": "HeavyArmor"
          },
          {
            "name": "Knife"
          },
          {
            "name": "Machete"
          },
          {
            "name": "Pistol"
          },
          {
            "name": "Rifle"
          },
          {
            "name": "Shotgun"
          }
        ]
      }
    },
    {
      "name": "ItemType",
      "docs": [
        "The type of the item."
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Weapon",
            "fields": [
              {
                "name": "weaponType",
                "type": {
                  "defined": "WeaponType"
                }
              },
              {
                "name": "damage",
                "type": "u8"
              },
              {
                "name": "accuracy",
                "type": "u32"
              },
              {
                "name": "breakChance",
                "type": "u32"
              }
            ]
          },
          {
            "name": "Armor",
            "fields": [
              {
                "name": "armorType",
                "type": {
                  "defined": "ArmorType"
                }
              },
              {
                "name": "defense",
                "type": "u8"
              },
              {
                "name": "breakChance",
                "type": "u32"
              }
            ]
          },
          {
            "name": "Backpack",
            "fields": [
              {
                "name": "size",
                "type": "u8"
              }
            ]
          },
          {
            "name": "Consumable",
            "fields": [
              {
                "name": "consumableType",
                "type": {
                  "defined": "ConsumableType"
                }
              },
              {
                "name": "effectValue",
                "type": "u8"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "WeaponType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Melee"
          },
          {
            "name": "Pistol"
          },
          {
            "name": "LongGun"
          },
          {
            "name": "ZombieClaw"
          },
          {
            "name": "ZombieBite"
          },
          {
            "name": "Firearm"
          }
        ]
      }
    },
    {
      "name": "ArmorType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Heavy"
          },
          {
            "name": "Light"
          }
        ]
      }
    },
    {
      "name": "ConsumableType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Health"
          },
          {
            "name": "Energy"
          },
          {
            "name": "Fuel"
          },
          {
            "name": "Revive"
          },
          {
            "name": "Generator"
          },
          {
            "name": "Xp"
          },
          {
            "name": "Premium"
          },
          {
            "name": "Raffle"
          },
          {
            "name": "Part"
          }
        ]
      }
    },
    {
      "name": "EquipSlot",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Weapon"
          },
          {
            "name": "Armor"
          },
          {
            "name": "Backpack"
          }
        ]
      }
    },
    {
      "name": "TileType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Street"
          },
          {
            "name": "Hospital"
          },
          {
            "name": "Apartment"
          },
          {
            "name": "PoliceStation"
          },
          {
            "name": "Warehouse"
          },
          {
            "name": "FireStation"
          },
          {
            "name": "ZedCorp"
          },
          {
            "name": "Factory"
          },
          {
            "name": "SecretLocation"
          },
          {
            "name": "Afk"
          },
          {
            "name": "Courier",
            "fields": [
              {
                "name": "rare",
                "type": {
                  "vec": {
                    "defined": "Point"
                  }
                }
              },
              {
                "name": "epic",
                "type": {
                  "vec": {
                    "defined": "Point"
                  }
                }
              },
              {
                "name": "legendary",
                "type": {
                  "vec": {
                    "defined": "Point"
                  }
                }
              }
            ]
          },
          {
            "name": "Arcade"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "Attack",
      "fields": [
        {
          "name": "attacker",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "defender",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "damage",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "TileBarricadeUpdated",
      "fields": [
        {
          "name": "character",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "x",
          "type": "i32",
          "index": false
        },
        {
          "name": "y",
          "type": "i32",
          "index": false
        },
        {
          "name": "barricade",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "CharacterMoved",
      "fields": [
        {
          "name": "character",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "x",
          "type": "i32",
          "index": false
        },
        {
          "name": "y",
          "type": "i32",
          "index": false
        }
      ]
    },
    {
      "name": "ItemFound",
      "fields": [
        {
          "name": "character",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "itemId",
          "type": "u32",
          "index": false
        }
      ]
    },
    {
      "name": "CharacterItemRemoved",
      "fields": [
        {
          "name": "character",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "itemId",
          "type": "u32",
          "index": false
        }
      ]
    },
    {
      "name": "CharacterSkillUnlocked",
      "fields": [
        {
          "name": "character",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "skill",
          "type": {
            "defined": "Skill"
          },
          "index": false
        }
      ]
    },
    {
      "name": "ActionUnsuccessful",
      "fields": [
        {
          "name": "character",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "action",
          "type": "string",
          "index": false
        }
      ]
    },
    {
      "name": "ActionSuccessful",
      "fields": [
        {
          "name": "character",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "action",
          "type": "string",
          "index": false
        }
      ]
    },
    {
      "name": "EnterRaffle",
      "fields": [
        {
          "name": "wallet",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "quantity",
          "type": "u16",
          "index": false
        }
      ]
    },
    {
      "name": "CharacterKilled",
      "fields": [
        {
          "name": "killer",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "victim",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "victimInventory",
          "type": "string",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "UnknownError",
      "msg": "UnknownError"
    },
    {
      "code": 6001,
      "name": "NoAuthority",
      "msg": "The signer is not authorized"
    },
    {
      "code": 6002,
      "name": "InvalidSession",
      "msg": "The session account is invalid"
    },
    {
      "code": 6003,
      "name": "InsufficientFunds",
      "msg": "Insufficient funds in the session account"
    },
    {
      "code": 6004,
      "name": "MintNotInitialized",
      "msg": "The mint is not initialized"
    },
    {
      "code": 6005,
      "name": "NotCollectionNFT",
      "msg": "The mint is not a collection NFT mint"
    },
    {
      "code": 6006,
      "name": "InvalidCharacterNFT",
      "msg": "This NFT is not a valid character NFT"
    },
    {
      "code": 6007,
      "name": "InvalidTile",
      "msg": "The tile provided is not valid, are you moving too fast?"
    },
    {
      "code": 6008,
      "name": "InvalidCharacterState",
      "msg": "Invalid character state"
    },
    {
      "code": 6009,
      "name": "InvalidItem",
      "msg": "The item provided is not valid"
    },
    {
      "code": 6010,
      "name": "InvalidSearchResult",
      "msg": "The search result is invalid"
    },
    {
      "code": 6011,
      "name": "AttackCoolingDown",
      "msg": "The character cannot attack yet"
    },
    {
      "code": 6012,
      "name": "CannotBarricadeTile",
      "msg": "Street Tiles cannot be barricaded"
    },
    {
      "code": 6013,
      "name": "CannotAttackYourself",
      "msg": "Cannot attack yourself"
    },
    {
      "code": 6014,
      "name": "TileHeavilyBarricaded",
      "msg": "Tile is heavily barricaded and cannot be entered"
    },
    {
      "code": 6015,
      "name": "CharacterIsSearching",
      "msg": "Character cannot do any other actions while searching"
    },
    {
      "code": 6016,
      "name": "CharacterIsDead",
      "msg": "You cannot do any actions while dead"
    },
    {
      "code": 6017,
      "name": "CharacterOutOfEnergy",
      "msg": "You do not have enough stamina to complete the action"
    },
    {
      "code": 6018,
      "name": "CharacterNotOnSameTile",
      "msg": "You are not on the same tile as the target"
    },
    {
      "code": 6019,
      "name": "CharacterOnAttackCoolDown",
      "msg": "Character is not cooled down yet"
    },
    {
      "code": 6020,
      "name": "CharacterIsAZombie",
      "msg": "Character is a zombie"
    },
    {
      "code": 6021,
      "name": "TileNotBarricaded",
      "msg": "Tile is not barricaded"
    },
    {
      "code": 6022,
      "name": "InventoryFull",
      "msg": "Inventory is full"
    },
    {
      "code": 6023,
      "name": "NotEnoughSkillPoints",
      "msg": "Not enough skill points"
    },
    {
      "code": 6024,
      "name": "MissingItem",
      "msg": "The item is not in your inventory"
    },
    {
      "code": 6025,
      "name": "SkillAlreadyUnlocked",
      "msg": "The skill is already unlocked"
    },
    {
      "code": 6026,
      "name": "CharacterActionOnCooldown",
      "msg": "You can only do one action per block"
    },
    {
      "code": 6027,
      "name": "MissingBarricadeBuilderSkill",
      "msg": "Missing the build barricade skill"
    },
    {
      "code": 6028,
      "name": "TargetIsDead",
      "msg": "Target is dead"
    },
    {
      "code": 6029,
      "name": "MissingItemInInventory",
      "msg": "You do not have the item you are trying to use"
    },
    {
      "code": 6030,
      "name": "MintOnCooldown",
      "msg": "You have recently found an item or have been attacked. Please try again later"
    },
    {
      "code": 6031,
      "name": "WrongItem",
      "msg": "You are trying to add the wrong item to your inventory"
    },
    {
      "code": 6032,
      "name": "NoItemZombie",
      "msg": "Zombies cannot use items"
    },
    {
      "code": 6033,
      "name": "EquipItemZombie",
      "msg": "Zombies cannot equip items"
    },
    {
      "code": 6034,
      "name": "TargetIsNotDead",
      "msg": "Target is not dead"
    },
    {
      "code": 6035,
      "name": "LootPrivilegeNotExpired",
      "msg": "You cannot loot this character yet, killer privilege has not expired"
    },
    {
      "code": 6036,
      "name": "TargetDoesNotHaveItem",
      "msg": "Target does not have the item"
    },
    {
      "code": 6037,
      "name": "NoGeneratorInstaller",
      "msg": "Tile does not have a generator installed"
    },
    {
      "code": 6038,
      "name": "InvalidSize",
      "msg": "Trying to resize to a smaller size, please try again"
    },
    {
      "code": 6039,
      "name": "MissingBarricadeDestroyerSkill",
      "msg": "Missing the barricade destroyer skill"
    },
    {
      "code": 6040,
      "name": "NoRedeemZombie",
      "msg": "Zombies cannot redeem items"
    },
    {
      "code": 6041,
      "name": "MissingDragSkill",
      "msg": "Missing the drag skill"
    },
    {
      "code": 6042,
      "name": "CannotAttackAnotherHuman",
      "msg": "You cannot attack another human"
    },
    {
      "code": 6043,
      "name": "InvalidRangedTile",
      "msg": "This tile is not eligible for a ranged attack"
    },
    {
      "code": 6044,
      "name": "CannotBeHuman",
      "msg": "You cannot complete this action as a human"
    },
    {
      "code": 6045,
      "name": "CannotBeZombie",
      "msg": "You cannot complete this action as a zombie"
    },
    {
      "code": 6046,
      "name": "TargetCannotBeZombie",
      "msg": "The target cannot be a zombie"
    },
    {
      "code": 6047,
      "name": "InvalidDragHealth",
      "msg": "Target's health is too high to be dragged"
    },
    {
      "code": 6048,
      "name": "DestinationInvalid",
      "msg": "The destination tile is invalid"
    },
    {
      "code": 6049,
      "name": "SearchingWrongTile",
      "msg": "You are not on the tile you are trying to search"
    },
    {
      "code": 6050,
      "name": "WrongTileForCrafting",
      "msg": "The tile is not a valid tile for crafting"
    },
    {
      "code": 6051,
      "name": "MissingGenerator",
      "msg": "The tile does not have a generator installed"
    },
    {
      "code": 6052,
      "name": "TileNotPowered",
      "msg": "The tile does not have a generator with fuel"
    },
    {
      "code": 6053,
      "name": "UnequipEmptySlot",
      "msg": "Trying to unequip an empty slot"
    },
    {
      "code": 6054,
      "name": "NameTooLong",
      "msg": "Name must be no longer than 12 characters"
    },
    {
      "code": 6055,
      "name": "NoNameChangeAvailable",
      "msg": "Name change is unavailable, please unlock it"
    },
    {
      "code": 6056,
      "name": "MissionsRecently",
      "msg": "Missions can only be generated once every 7 days"
    },
    {
      "code": 6057,
      "name": "TooManyActiveMissions",
      "msg": "You have too many active missions, please complete some before getting more"
    },
    {
      "code": 6058,
      "name": "AlreadyHasPremium",
      "msg": "The character already has premium applied to it."
    },
    {
      "code": 6059,
      "name": "AlreadyOnCourierMission",
      "msg": "The character is already on a courier mission, please cancel or complete the currently active one"
    },
    {
      "code": 6060,
      "name": "InvalidItemForMission",
      "msg": "Invalid item for a courier mission"
    },
    {
      "code": 6061,
      "name": "NotOnCourierMission",
      "msg": "You are not on a courier mission"
    },
    {
      "code": 6062,
      "name": "NoActionCourier",
      "msg": "You cannot do this action while having an active courier mission"
    },
    {
      "code": 6063,
      "name": "InsufficientBlueprints",
      "msg": "You do not have enough blueprints to craft the item"
    },
    {
      "code": 6064,
      "name": "InvalidCraftingItem",
      "msg": "This item cannot be crafted"
    },
    {
      "code": 6065,
      "name": "NoLegendaryAvailable",
      "msg": "There is no legendary items available for that item kind, please try again later"
    },
    {
      "code": 6066,
      "name": "PremiumMint",
      "msg": "You need premium in order to turn an item into an NFT"
    },
    {
      "code": 6067,
      "name": "InvalidLayers",
      "msg": "Invalid layer combination provided, please check and try again"
    },
    {
      "code": 6068,
      "name": "MismatchAsset",
      "msg": "Mismatching asset id"
    },
    {
      "code": 6069,
      "name": "UnsupportedTreeAccountSize",
      "msg": "Invalid merkle tree size"
    },
    {
      "code": 6070,
      "name": "NotEnoughTickets",
      "msg": "Not enough tickets"
    },
    {
      "code": 6071,
      "name": "NameTooShort",
      "msg": "Name must be 3 or more characters in length"
    },
    {
      "code": 6072,
      "name": "InvalidStartingTile",
      "msg": "Starting tile must not have any barricades on it"
    },
    {
      "code": 6073,
      "name": "TileExhausted",
      "msg": "The tile has no lootable items on it, please wait a while before trying again."
    },
    {
      "code": 6074,
      "name": "ZombieAction",
      "msg": "This action can only be completed by a zombie"
    },
    {
      "code": 6075,
      "name": "RevivePending",
      "msg": "You are not able to complete any actions while a revive is pending"
    },
    {
      "code": 6076,
      "name": "GamePaused",
      "msg": "Game is paused, please try again later"
    },
    {
      "code": 6077,
      "name": "NoPendingRevive",
      "msg": "No revive pending"
    },
    {
      "code": 6078,
      "name": "AlreadyReviving",
      "msg": "This zombie already has a revive pending"
    }
  ]
};

export const IDL: Zedwars = {
  "version": "0.2.0",
  "name": "zedwars",
  "instructions": [
    {
      "name": "characterAttack",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "targetCharacter",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The target character account"
          ]
        },
        {
          "name": "weapon",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "armor",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "targetTile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The target tile account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "sysvarSlotHashes",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The sysvar slot hashes account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "characterBarricade",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "sysvarSlotHashes",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The sysvar slot hashes account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "characterBury",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "targetCharacter",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The target character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "targetTile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The target tile account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "characterDestroyBarricade",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "sysvarSlotHashes",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The sysvar slot hashes account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "characterDestroyGenerator",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "sysvarSlotHashes",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The sysvar slot hashes account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "characterDrag",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "targetCharacter",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The target character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "targetTile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The target tile account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "characterGenerateMissions",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "sysvarSlotHashes",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The sysvar slot hashes account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "characterInit",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The player account. It's a regular wallet account that owns the character.",
            "mut because this account will fund the creation of the character account."
          ]
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account.",
            "It's the account that holds the character's state."
          ]
        },
        {
          "name": "mapTile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The map tile account",
            "The character will be placed on this tile."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The program's config account."
          ]
        },
        {
          "name": "treeConfig",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The tree config account"
          ]
        },
        {
          "name": "merkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referrer",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "collectionMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The items collection mint"
          ]
        },
        {
          "name": "collectionMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The items collection metadata"
          ]
        },
        {
          "name": "collectionMasterEdition",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The items collection master edition"
          ]
        },
        {
          "name": "collectionAuthorityRecord",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bubblegumSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "logWrapper",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bubblegumProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CharacterInitArgs"
          }
        }
      ]
    },
    {
      "name": "characterLoot",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "item",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The item account"
          ]
        },
        {
          "name": "targetCharacter",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The target character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program"
          ]
        },
        {
          "name": "sysvarSlotHashes",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CharacterLootArgs"
          }
        }
      ]
    },
    {
      "name": "characterMove",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "origTile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "destTile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The destination tile account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program"
          ]
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "characterResize",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The program's authority."
          ]
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "size",
          "type": "u32"
        }
      ]
    },
    {
      "name": "characterRename",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CharacterRenameArgs"
          }
        }
      ]
    },
    {
      "name": "characterRevive",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The tile account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program"
          ]
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CharacterReviveArgs"
          }
        }
      ]
    },
    {
      "name": "characterSearch",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The tile account"
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program"
          ]
        },
        {
          "name": "sysvarSlotHashes",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The sysvar slot hashes account"
          ]
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "characterStandBackUp",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "item",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The item account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The tile account"
          ]
        },
        {
          "name": "fromTile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The tile we are coming from"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program"
          ]
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "characterUnlockSkill",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program"
          ]
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CharacterUnlockSkillArgs"
          }
        }
      ]
    },
    {
      "name": "characterUpdate",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The operator of the program."
          ]
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CharacterUpdateArgs"
          }
        }
      ]
    },
    {
      "name": "characterUpgrade",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "referrer",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "characterUseItem",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "item",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The item account"
          ]
        },
        {
          "name": "targetCharacter",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The target character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program"
          ]
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CharacterUseItemArgs"
          }
        }
      ]
    },
    {
      "name": "configAddLegendaryItem",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The operator of the program."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program account"
          ]
        }
      ],
      "args": [
        {
          "name": "itemKind",
          "type": {
            "defined": "ItemKind"
          }
        },
        {
          "name": "itemId",
          "type": "u32"
        }
      ]
    },
    {
      "name": "configAddRareDropTableItem",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The operator of the program."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program account"
          ]
        }
      ],
      "args": [
        {
          "name": "itemId",
          "type": "u32"
        }
      ]
    },
    {
      "name": "configInit",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The operator of the program."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account for the program."
          ]
        },
        {
          "name": "itemsCollectionMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Items collection NFT mint."
          ]
        },
        {
          "name": "itemsCollectionMetadata",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Items collection NFT metadata."
          ]
        },
        {
          "name": "itemsCollectionMasterEdition",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Items collection NFT master edition."
          ]
        },
        {
          "name": "itemsCollectionAuthorityRecord",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Items collection NFT authority record."
          ]
        },
        {
          "name": "charactersCollectionMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Characters collection NFT mint."
          ]
        },
        {
          "name": "charactersCollectionMetadata",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Characters collection NFT metadata."
          ]
        },
        {
          "name": "charactersCollectionMasterEdition",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Characters collection NFT master edition."
          ]
        },
        {
          "name": "charactersCollectionAuthorityRecord",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Characters collection NFT authority record."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program."
          ]
        }
      ],
      "args": []
    },
    {
      "name": "configRegisterItem",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The program's authority."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account for the program."
          ]
        },
        {
          "name": "item",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The item account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program."
          ]
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The rent sysvar."
          ]
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "ConfigRegisterItemArgs"
          }
        }
      ]
    },
    {
      "name": "configResize",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The program's authority."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "size",
          "type": "u32"
        }
      ]
    },
    {
      "name": "configSetItemRandomWeights",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The operator of the program."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program account"
          ]
        }
      ],
      "args": [
        {
          "name": "tileType",
          "type": {
            "defined": "TileType"
          }
        },
        {
          "name": "weights",
          "type": {
            "vec": {
              "defined": "ItemRandomWeight"
            }
          }
        }
      ]
    },
    {
      "name": "configSetMerkleTree",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The program's authority."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merkleTree",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "treeConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bubblegumProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "logWrapper",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "ConfigSetMerkleTreeArgs"
          }
        }
      ]
    },
    {
      "name": "configSetSearchSuccessRate",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The operator of the program."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program account"
          ]
        }
      ],
      "args": [
        {
          "name": "tileType",
          "type": {
            "defined": "TileType"
          }
        },
        {
          "name": "value",
          "type": "u32"
        }
      ]
    },
    {
      "name": "configSetSkillPointsRequired",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The operator of the program."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program account"
          ]
        }
      ],
      "args": [
        {
          "name": "skill",
          "type": {
            "defined": "Skill"
          }
        },
        {
          "name": "value",
          "type": "u8"
        }
      ]
    },
    {
      "name": "configSetLootRegenRate",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The operator of the program."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program account"
          ]
        }
      ],
      "args": [
        {
          "name": "tileType",
          "type": {
            "defined": "TileType"
          }
        },
        {
          "name": "value",
          "type": "u32"
        }
      ]
    },
    {
      "name": "configSetVariables",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The operator of the program."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program account"
          ]
        }
      ],
      "args": [
        {
          "name": "key",
          "type": {
            "defined": "ConfigVar"
          }
        },
        {
          "name": "value",
          "type": "u32"
        }
      ]
    },
    {
      "name": "courierMissionEnd",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "item",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The item to courier"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "sysvarSlotHashes",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The sysvar slot hashes account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "courierMissionStart",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "item",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The item to courier"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "sysvarSlotHashes",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The sysvar slot hashes account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "itemAirdrop",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "destination",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "item",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The item account"
          ]
        },
        {
          "name": "itemMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treeConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "itemsCollectionMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The items collection mint"
          ]
        },
        {
          "name": "itemsCollectionMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The items collection metadata"
          ]
        },
        {
          "name": "itemsCollectionMasterEdition",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The items collection master edition"
          ]
        },
        {
          "name": "itemsCollectionAuthorityRecord",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bubblegumSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "logWrapper",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bubblegumProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "ItemAirdropArgs"
          }
        }
      ]
    },
    {
      "name": "itemCraft",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The tile account"
          ]
        },
        {
          "name": "item",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The item to craft"
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program"
          ]
        },
        {
          "name": "sysvarSlotHashes",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The sysvar slot hashes account"
          ]
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "itemDestroy",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "item",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The item account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program."
          ]
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "ItemDestroyArgs"
          }
        }
      ]
    },
    {
      "name": "itemEquip",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "item",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The item account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The tile account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "itemMint",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "item",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The item account"
          ]
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The tile account"
          ]
        },
        {
          "name": "itemMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treeConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "itemsCollectionMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The items collection mint"
          ]
        },
        {
          "name": "itemsCollectionMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The items collection metadata"
          ]
        },
        {
          "name": "itemsCollectionMasterEdition",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The items collection master edition"
          ]
        },
        {
          "name": "itemsCollectionAuthorityRecord",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bubblegumSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "logWrapper",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bubblegumProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "ItemMintArgs"
          }
        }
      ]
    },
    {
      "name": "itemRedeem",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "item",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The item account"
          ]
        },
        {
          "name": "itemMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "merkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treeConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "logWrapper",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bubblegumProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "ItemRedeemArgs"
          }
        }
      ]
    },
    {
      "name": "itemUnequip",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program."
          ]
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "ItemUnequipArgs"
          }
        }
      ]
    },
    {
      "name": "itemUpdate",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The program's authority."
          ]
        },
        {
          "name": "item",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The item account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "UpdateItemArgs"
          }
        }
      ]
    },
    {
      "name": "enterRaffle",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "raffle",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The raffle account"
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "EnterRaffleArgs"
          }
        }
      ]
    },
    {
      "name": "mapTileInit",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The operator of the program."
          ]
        },
        {
          "name": "mapTile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The map tile account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program."
          ]
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "MapTileInitArgs"
          }
        }
      ]
    },
    {
      "name": "mapTileUpdate",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The operator of the program."
          ]
        },
        {
          "name": "mapTile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The map tile account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "MapTileUpdateArgs"
          }
        }
      ]
    },
    {
      "name": "ransackTile",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer",
            "It could be the delegate or the player."
          ]
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The optional session account",
            "It is only present if the signer is the delegate."
          ]
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The player wallet account"
          ]
        },
        {
          "name": "playerMerkleTree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "character",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The character account"
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The original tile account"
          ]
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sysvarSlotHashes",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "compressionProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "PlayerVerifyArgs"
          }
        }
      ]
    },
    {
      "name": "sessionClose",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "sessionInit",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "delegate",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "session",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "SessionInitArgs"
          }
        }
      ]
    },
    {
      "name": "itemResize",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The program's authority."
          ]
        },
        {
          "name": "item",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "size",
          "type": "u32"
        }
      ]
    },
    {
      "name": "resizeTile",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The program's authority."
          ]
        },
        {
          "name": "tile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "size",
          "type": "u32"
        }
      ]
    },
    {
      "name": "withdrawTreasury",
      "accounts": [
        {
          "name": "operator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The program's authority."
          ]
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The config account"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "character",
      "docs": [
        "The character account",
        "The character account is used to store the state of a character.",
        "PDA: [Character::SEED_PREFIX, mint]"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "docs": [
              "The mint of the character NFT."
            ],
            "type": "publicKey"
          },
          {
            "name": "x",
            "docs": [
              "The x coordinate of the character."
            ],
            "type": "i32"
          },
          {
            "name": "y",
            "docs": [
              "The y coordinate of the character."
            ],
            "type": "i32"
          },
          {
            "name": "hp",
            "docs": [
              "The HP of the character."
            ],
            "type": "u8"
          },
          {
            "name": "isZombie",
            "docs": [
              "The flag to determine if the character is a zombie."
            ],
            "type": "bool"
          },
          {
            "name": "xp",
            "docs": [
              "The XP of the character."
            ],
            "type": "u32"
          },
          {
            "name": "bonusXp",
            "docs": [
              "Bonus XP remaining"
            ],
            "type": "u32"
          },
          {
            "name": "level",
            "docs": [
              "The level of the character."
            ],
            "type": "u16"
          },
          {
            "name": "skillPoints",
            "docs": [
              "The skill points of the character."
            ],
            "type": "u16"
          },
          {
            "name": "lastAttackedAt",
            "docs": [
              "The time when the character last attacked."
            ],
            "type": "i64"
          },
          {
            "name": "lastActedAt",
            "docs": [
              "The time when the character last acted."
            ],
            "type": "i64"
          },
          {
            "name": "isInfected",
            "docs": [
              "The flag to determine if the character is infected and should take damage when doing actions that expend energy"
            ],
            "type": "bool"
          },
          {
            "name": "energy",
            "docs": [
              "The energy of the character."
            ],
            "type": "u8"
          },
          {
            "name": "energyUpdatedAt",
            "docs": [
              "The time when the energy value was last updated.",
              "Used to calculate the real energy value."
            ],
            "type": "i64"
          },
          {
            "name": "backpackSpace",
            "docs": [
              "Additional backpack space"
            ],
            "type": "u8"
          },
          {
            "name": "inventory",
            "docs": [
              "How many items the character has."
            ],
            "type": {
              "vec": "u32"
            }
          },
          {
            "name": "equippedItems",
            "docs": [
              "The equipped items of the character."
            ],
            "type": {
              "defined": "EquippedItems"
            }
          },
          {
            "name": "skills",
            "type": {
              "vec": "bool"
            }
          },
          {
            "name": "killedBy",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "killedAt",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "events",
            "type": {
              "vec": {
                "defined": "Event"
              }
            }
          },
          {
            "name": "stats",
            "type": {
              "vec": "u32"
            }
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "lastActedSlot",
            "type": "u64"
          },
          {
            "name": "lastAttackedSlot",
            "type": "u64"
          },
          {
            "name": "energyRegenRate",
            "type": "u32"
          },
          {
            "name": "hasNameChangeAvailable",
            "type": "bool"
          },
          {
            "name": "hasPremium",
            "type": "bool"
          },
          {
            "name": "lastX",
            "type": "i32"
          },
          {
            "name": "lastY",
            "type": "i32"
          },
          {
            "name": "weeklyMissions",
            "type": {
              "vec": {
                "defined": "WeeklyMission"
              }
            }
          },
          {
            "name": "missionsGeneratedAt",
            "type": "i64"
          },
          {
            "name": "raffleTickets",
            "type": "u16"
          },
          {
            "name": "courierMission",
            "type": {
              "option": {
                "defined": "CourierMission"
              }
            }
          },
          {
            "name": "layers",
            "type": "string"
          },
          {
            "name": "pendingRevive",
            "type": "bool"
          },
          {
            "name": "referredBy",
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "config",
      "docs": [
        "The config account for the program.",
        "This account is used to store the collection NFT mints and the number of SFTs and NFTs registered.",
        "The account is initialized by the operator.",
        "The account is owned by the program.",
        "PDA: [Config::SEED_PREFIX]"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "itemsCollectionMint",
            "docs": [
              "Items collection NFT mint."
            ],
            "type": "publicKey"
          },
          {
            "name": "charactersCollectionMint",
            "docs": [
              "Characters collection NFT mint."
            ],
            "type": "publicKey"
          },
          {
            "name": "numberOfItems",
            "docs": [
              "Number of items registered"
            ],
            "type": "u16"
          },
          {
            "name": "numberOfCharacters",
            "docs": [
              "Number of characters registered"
            ],
            "type": "u32"
          },
          {
            "name": "configVariables",
            "docs": [
              "Config variables"
            ],
            "type": {
              "vec": "u32"
            }
          },
          {
            "name": "itemRandomWeights",
            "docs": [
              "Item random weights"
            ],
            "type": {
              "vec": {
                "vec": {
                  "defined": "ItemRandomWeight"
                }
              }
            }
          },
          {
            "name": "searchSuccessRates",
            "docs": [
              "Search success rates"
            ],
            "type": {
              "vec": "u32"
            }
          },
          {
            "name": "skillPointsRequired",
            "docs": [
              "Skill points required"
            ],
            "type": "bytes"
          },
          {
            "name": "creators",
            "docs": [
              "Creators"
            ],
            "type": {
              "vec": {
                "defined": "Creator"
              }
            }
          },
          {
            "name": "maintenanceMode",
            "docs": [
              "Maintenance mode"
            ],
            "type": "bool"
          },
          {
            "name": "legendaryItems",
            "docs": [
              "List of potential legendary items that can be crafted"
            ],
            "type": {
              "vec": {
                "vec": "u32"
              }
            }
          },
          {
            "name": "rareDropTable",
            "docs": [
              "List of items available in the rare drop table"
            ],
            "type": {
              "vec": "u32"
            }
          },
          {
            "name": "merkleTree",
            "docs": [
              "The merkle tree used for minting item cnft"
            ],
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "merkleTreeItemsMinted",
            "type": "u64"
          },
          {
            "name": "lootRegenRates",
            "type": {
              "vec": "u32"
            }
          }
        ]
      }
    },
    {
      "name": "item",
      "docs": [
        "Item is an account that holds the information of an item.",
        "It corresponds to an NFT.",
        "PDA: [Item::SEED_PREFIX, mint.key().as_ref()]",
        "Mint Address: [Item::MINT_SEED_PREFIX, item_id]"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "docs": [
              "The mint of the item",
              "The id of the item.",
              "The mint of the corresponding NFT can be derived from this id."
            ],
            "type": "u32"
          },
          {
            "name": "itemType",
            "docs": [
              "Item type"
            ],
            "type": {
              "defined": "ItemType"
            }
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "rarity",
            "type": {
              "defined": "ItemRarity"
            }
          },
          {
            "name": "kind",
            "type": {
              "defined": "ItemKind"
            }
          },
          {
            "name": "convertsTo",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "itemMint",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "id",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "mapTile",
      "docs": [
        "MapTile is a struct that represents a tile on the map.",
        "It contains the number of zombies, survivors, barricades on the tile.",
        "It also contains the name of the tile.",
        "It also contains the item weights for the tile which is used to determine what items could be found on the tile.",
        "PDA: [MapTile::SEED_PREFIX,x.to_le_bytes().as_slice(),y.to_le_bytes().as_slice()]"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "x",
            "docs": [
              "The x coordinate of the map tile."
            ],
            "type": "i32"
          },
          {
            "name": "y",
            "docs": [
              "The y coordinate of the map tile."
            ],
            "type": "i32"
          },
          {
            "name": "numZombies",
            "docs": [
              "The number of zombies on the map tile."
            ],
            "type": "u32"
          },
          {
            "name": "numSurvivors",
            "docs": [
              "The number of survivors on the map tile."
            ],
            "type": "u32"
          },
          {
            "name": "numBarricades",
            "docs": [
              "The number of barricades on the map tile."
            ],
            "type": "u8"
          },
          {
            "name": "hasGenerator",
            "docs": [
              "Whether the map tile has a generator."
            ],
            "type": "bool"
          },
          {
            "name": "hasPowerUntil",
            "docs": [
              "The time until the generator has power."
            ],
            "type": "i64"
          },
          {
            "name": "tileType",
            "docs": [
              "The type of tile"
            ],
            "type": {
              "defined": "TileType"
            }
          },
          {
            "name": "canBeBarricaded",
            "docs": [
              "whether or not the tile can be barricaded"
            ],
            "type": "bool"
          },
          {
            "name": "canBeSearched",
            "docs": [
              "whether or not the tile can be searched"
            ],
            "type": "bool"
          },
          {
            "name": "lastSearchedAt",
            "docs": [
              "The time when the tile was last searched"
            ],
            "type": "i64"
          },
          {
            "name": "lootableItems",
            "docs": [
              "How many items there are that can be lootable"
            ],
            "type": "u8"
          },
          {
            "name": "resupplyAt",
            "docs": [
              "When the tile will be resupplied"
            ],
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "raffle",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "player",
            "docs": [
              "Pubkey of the player"
            ],
            "type": "publicKey"
          },
          {
            "name": "entries",
            "docs": [
              "Number of entries in this weeks raffle"
            ],
            "type": "u16"
          },
          {
            "name": "lastUpdated",
            "docs": [
              "Last time this pda was updated"
            ],
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "session",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "player",
            "type": "publicKey"
          },
          {
            "name": "delegate",
            "type": "publicKey"
          },
          {
            "name": "validUntil",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "PlayerVerifyArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "root",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "dataHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "creatorHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "nonce",
            "type": "u64"
          },
          {
            "name": "index",
            "type": "u32"
          },
          {
            "name": "merkle",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "CharacterInitArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isZombie",
            "type": "bool"
          },
          {
            "name": "layers",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "assetId",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "CharacterLootArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "itemId",
            "type": "u32"
          },
          {
            "name": "playerVerify",
            "type": {
              "defined": "PlayerVerifyArgs"
            }
          }
        ]
      }
    },
    {
      "name": "CharacterRenameArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "playerVerify",
            "type": {
              "defined": "PlayerVerifyArgs"
            }
          }
        ]
      }
    },
    {
      "name": "CharacterReviveArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "accept",
            "type": "bool"
          },
          {
            "name": "playerVerify",
            "type": {
              "defined": "PlayerVerifyArgs"
            }
          }
        ]
      }
    },
    {
      "name": "CharacterUnlockSkillArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "skill",
            "type": {
              "defined": "Skill"
            }
          },
          {
            "name": "playerVerify",
            "type": {
              "defined": "PlayerVerifyArgs"
            }
          }
        ]
      }
    },
    {
      "name": "CharacterUpdateArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "x",
            "docs": [
              "The x coordinate of the character."
            ],
            "type": "i32"
          },
          {
            "name": "y",
            "docs": [
              "The y coordinate of the character."
            ],
            "type": "i32"
          },
          {
            "name": "hp",
            "docs": [
              "The HP of the character."
            ],
            "type": "u8"
          },
          {
            "name": "isZombie",
            "docs": [
              "The flag to determine if the character is a zombie."
            ],
            "type": "bool"
          },
          {
            "name": "xp",
            "docs": [
              "The XP of the character."
            ],
            "type": "u32"
          },
          {
            "name": "bonusXp",
            "docs": [
              "Bonus xp"
            ],
            "type": "u32"
          },
          {
            "name": "level",
            "docs": [
              "The level of the character."
            ],
            "type": "u16"
          },
          {
            "name": "skillPoints",
            "docs": [
              "The skill points of the character."
            ],
            "type": "u16"
          },
          {
            "name": "lastAttackedAt",
            "docs": [
              "The time when the character last attacked."
            ],
            "type": "i64"
          },
          {
            "name": "lastActedAt",
            "docs": [
              "The time when the character last acted."
            ],
            "type": "i64"
          },
          {
            "name": "isInfected",
            "docs": [
              "The flag to determine if the character is infected and should take damage when doing actions that expend energy"
            ],
            "type": "bool"
          },
          {
            "name": "energy",
            "docs": [
              "The energy of the character."
            ],
            "type": "u8"
          },
          {
            "name": "energyUpdatedAt",
            "docs": [
              "The time when the energy value was last updated.",
              "Used to calculate the real energy value."
            ],
            "type": "i64"
          },
          {
            "name": "backpackSpace",
            "docs": [
              "Addtional backpack space"
            ],
            "type": "u8"
          },
          {
            "name": "inventory",
            "docs": [
              "How many items the character has."
            ],
            "type": {
              "vec": "u32"
            }
          },
          {
            "name": "equippedItems",
            "docs": [
              "The equipped items of the character."
            ],
            "type": {
              "defined": "EquippedItems"
            }
          },
          {
            "name": "skills",
            "type": {
              "vec": "bool"
            }
          },
          {
            "name": "killedBy",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "killedAt",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "hasPremium",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "CharacterUseItemArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "itemId",
            "type": "u32"
          },
          {
            "name": "playerVerify",
            "type": {
              "defined": "PlayerVerifyArgs"
            }
          }
        ]
      }
    },
    {
      "name": "ConfigRegisterItemArgs",
      "docs": [
        "The arguments for the `config_register_sft` instruction."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "itemId",
            "docs": [
              "The ID of the item"
            ],
            "type": "u32"
          },
          {
            "name": "name",
            "docs": [
              "The name of the item SFT."
            ],
            "type": "string"
          },
          {
            "name": "itemType",
            "docs": [
              "Item type"
            ],
            "type": {
              "defined": "ItemType"
            }
          },
          {
            "name": "rarity",
            "type": {
              "defined": "ItemRarity"
            }
          },
          {
            "name": "kind",
            "type": {
              "defined": "ItemKind"
            }
          },
          {
            "name": "convertsTo",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "ConfigSetMerkleTreeArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "maxDepth",
            "type": "u32"
          },
          {
            "name": "maxBufferSize",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "EnterRaffleArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "quantity",
            "type": "u16"
          },
          {
            "name": "playerVerify",
            "type": {
              "defined": "PlayerVerifyArgs"
            }
          }
        ]
      }
    },
    {
      "name": "ItemAirdropArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "assetId",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "ItemDestroyArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "itemId",
            "type": "u32"
          },
          {
            "name": "playerVerify",
            "type": {
              "defined": "PlayerVerifyArgs"
            }
          }
        ]
      }
    },
    {
      "name": "ItemMintArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "assetId",
            "type": "publicKey"
          },
          {
            "name": "playerVerify",
            "type": {
              "defined": "PlayerVerifyArgs"
            }
          }
        ]
      }
    },
    {
      "name": "ItemRedeemArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "root",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "dataHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "creatorHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "nonce",
            "type": "u64"
          },
          {
            "name": "index",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "ItemUnequipArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "slot",
            "type": {
              "defined": "EquipSlot"
            }
          },
          {
            "name": "playerVerify",
            "type": {
              "defined": "PlayerVerifyArgs"
            }
          }
        ]
      }
    },
    {
      "name": "UpdateItemArgs",
      "docs": [
        "The arguments for the `config_register_sft` instruction."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "itemId",
            "type": "u32"
          },
          {
            "name": "itemType",
            "type": {
              "defined": "ItemType"
            }
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "rarity",
            "type": {
              "defined": "ItemRarity"
            }
          },
          {
            "name": "kind",
            "type": {
              "defined": "ItemKind"
            }
          },
          {
            "name": "convertsTo",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "MapTileInitArgs",
      "docs": [
        "The arguments for the `map_tile_init` instruction."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "x",
            "docs": [
              "The x coordinate of the map tile."
            ],
            "type": "i32"
          },
          {
            "name": "y",
            "docs": [
              "The y coordinate of the map tile."
            ],
            "type": "i32"
          },
          {
            "name": "tileType",
            "docs": [
              "The type of tile"
            ],
            "type": {
              "defined": "TileType"
            }
          },
          {
            "name": "canBeBarricaded",
            "type": "bool"
          },
          {
            "name": "canBeSearched",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "MapTileUpdateArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "numZombies",
            "docs": [
              "The number of zombies on the map tile."
            ],
            "type": "u32"
          },
          {
            "name": "numSurvivors",
            "docs": [
              "The number of survivors on the map tile."
            ],
            "type": "u32"
          },
          {
            "name": "numBarricades",
            "docs": [
              "The number of barricades on the map tile."
            ],
            "type": "u8"
          },
          {
            "name": "hasGenerator",
            "docs": [
              "Whether the map tile has a generator."
            ],
            "type": "bool"
          },
          {
            "name": "hasPowerUntil",
            "docs": [
              "The time until the generator has power."
            ],
            "type": "i64"
          },
          {
            "name": "tileType",
            "docs": [
              "The type of tile"
            ],
            "type": {
              "defined": "TileType"
            }
          },
          {
            "name": "lootableItems",
            "docs": [
              "Number of lootable items to reset it to"
            ],
            "type": "u8"
          },
          {
            "name": "canBeSearched",
            "docs": [
              "Whether or not a tile can be searched"
            ],
            "type": "bool"
          },
          {
            "name": "canBeBarricaded",
            "docs": [
              "Whether or not a tile can be barricaded"
            ],
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "SessionInitArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seconds",
            "type": "i64"
          },
          {
            "name": "lamports",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "EquippedItems",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "weapon",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "armor",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "backpack",
            "type": {
              "option": "u32"
            }
          }
        ]
      }
    },
    {
      "name": "Event",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "message",
            "type": "string"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "severity",
            "type": "u8"
          },
          {
            "name": "block",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "WeeklyMission",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "missionType",
            "type": {
              "defined": "WeeklyMissionType"
            }
          },
          {
            "name": "required",
            "type": "u16"
          },
          {
            "name": "current",
            "type": "u16"
          },
          {
            "name": "reward",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "CourierMission",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "destination",
            "type": {
              "defined": "Point"
            }
          },
          {
            "name": "item",
            "type": "u32"
          },
          {
            "name": "reward",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "ItemRandomWeight",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "itemId",
            "type": "u32"
          },
          {
            "name": "weight",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "Creator",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "publicKey"
          },
          {
            "name": "verified",
            "type": "bool"
          },
          {
            "name": "share",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "Point",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "x",
            "type": "i32"
          },
          {
            "name": "y",
            "type": "i32"
          }
        ]
      }
    },
    {
      "name": "Stat",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "TotalXP"
          },
          {
            "name": "BarricadesBuilt"
          },
          {
            "name": "BarricadesDestroyed"
          },
          {
            "name": "GeneratorsDestroyed"
          },
          {
            "name": "ItemsCrafted"
          },
          {
            "name": "ItemsFound"
          },
          {
            "name": "ZombiesKilled"
          },
          {
            "name": "SurvivorsKilled"
          },
          {
            "name": "TilesRansacked"
          },
          {
            "name": "CouriersCompleted"
          }
        ]
      }
    },
    {
      "name": "Skill",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Parkour"
          },
          {
            "name": "BarricadeBuilder"
          },
          {
            "name": "UnarmedCombat"
          },
          {
            "name": "BodyBuilder"
          },
          {
            "name": "AdvancedUnarmedCombat"
          },
          {
            "name": "Looter"
          },
          {
            "name": "AdvancedLooter"
          },
          {
            "name": "ThickSkin"
          },
          {
            "name": "AdvancedMelee"
          },
          {
            "name": "PistolProficiency"
          },
          {
            "name": "LongGunProficiency"
          },
          {
            "name": "RangedAccuracy"
          },
          {
            "name": "AdvancedHealing"
          },
          {
            "name": "TechLooter"
          },
          {
            "name": "RevivalSyringeCrafter"
          },
          {
            "name": "AdrenalineSyringeCrafter"
          },
          {
            "name": "ExperienceSyringeCrafter"
          },
          {
            "name": "BarricadeDestroyer"
          },
          {
            "name": "InfectedBite"
          },
          {
            "name": "EnhancedBite"
          },
          {
            "name": "EnhancedClaws"
          },
          {
            "name": "HealingAttack"
          },
          {
            "name": "Drag"
          },
          {
            "name": "TankyFlesh"
          },
          {
            "name": "SpeedWalking"
          },
          {
            "name": "MutatedZombie"
          },
          {
            "name": "FirearmsTraining"
          },
          {
            "name": "AdvancedFirearmsTraining"
          },
          {
            "name": "WeaponMaintenance"
          },
          {
            "name": "ZombieAccuracy"
          },
          {
            "name": "AdvancedZombieAccuracy"
          }
        ]
      }
    },
    {
      "name": "WeeklyMissionType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "KillSurvivors"
          },
          {
            "name": "KillZombies"
          },
          {
            "name": "BuildBarricades"
          },
          {
            "name": "DestroyBarricades"
          },
          {
            "name": "GainXP"
          },
          {
            "name": "FindItems"
          },
          {
            "name": "InstallGenerator"
          },
          {
            "name": "DestroyGenerator"
          },
          {
            "name": "ReviveZombie"
          },
          {
            "name": "RansackTile"
          },
          {
            "name": "CourierMission"
          }
        ]
      }
    },
    {
      "name": "MissionRarity",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Rare"
          },
          {
            "name": "Epic"
          },
          {
            "name": "Legendary"
          },
          {
            "name": "Invalid"
          }
        ]
      }
    },
    {
      "name": "ConfigVar",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "UnarmedAttackSuccessRate"
          },
          {
            "name": "AttackEnergyCost"
          },
          {
            "name": "AttackCoolDown"
          },
          {
            "name": "AttackBaseXpGain"
          },
          {
            "name": "BaseUnarmedDamage"
          },
          {
            "name": "BarricadeEnergyCost"
          },
          {
            "name": "BarricadeXpGain"
          },
          {
            "name": "DestroyBarricadeEnergyCost"
          },
          {
            "name": "DestroyBarricadeXpGain"
          },
          {
            "name": "DestroyBarricadeSuccessRate"
          },
          {
            "name": "MoveEnergyCost"
          },
          {
            "name": "ZombieMoveExtraEnergyCost"
          },
          {
            "name": "HumanMoveBarricadeLimit"
          },
          {
            "name": "ZombieMoveBarricadeLimit"
          },
          {
            "name": "LootPrivilegeDuration"
          },
          {
            "name": "LootEnergyCost"
          },
          {
            "name": "SearchEnergyCost"
          },
          {
            "name": "SearchXpGain"
          },
          {
            "name": "SearchSuccessXpGain"
          },
          {
            "name": "EquipItemEnergyCost"
          },
          {
            "name": "MintItemEnergyCost"
          },
          {
            "name": "MintAttackCoolDown"
          },
          {
            "name": "UseItemEnergyCost"
          },
          {
            "name": "UseItemGeneratorXpGain"
          },
          {
            "name": "UseItemFirstAidXpGain"
          },
          {
            "name": "UseItemEnergyXpGain"
          },
          {
            "name": "UseItemRevivalSyringeXpGain"
          },
          {
            "name": "UseItemFuelCanXpGain"
          },
          {
            "name": "FuelCanPowerDuration"
          },
          {
            "name": "ZombieReviveHealth"
          },
          {
            "name": "DestroyItemEnergyCost"
          },
          {
            "name": "ActionCoolDown"
          },
          {
            "name": "EnergyRegenRate"
          },
          {
            "name": "StandingBackUpEnergyCost"
          },
          {
            "name": "StandingBackUpHealth"
          },
          {
            "name": "DragCharacterEnergyCost"
          },
          {
            "name": "ZombieDragMaxTargetHp"
          },
          {
            "name": "MaxHp"
          },
          {
            "name": "MaxEnergy"
          },
          {
            "name": "BaseInventorySize"
          },
          {
            "name": "InfectedDamageAmount"
          },
          {
            "name": "XpPerLevel"
          },
          {
            "name": "SkillPointsGainedPerLevel"
          },
          {
            "name": "UnarmedCombatSkillAttackBonus"
          },
          {
            "name": "AdvancedUnarmedCombatSkillAttackBonus"
          },
          {
            "name": "AdvancedHealingHpBonus"
          },
          {
            "name": "TechLooterSearchSuccessRateBonus"
          },
          {
            "name": "CraftEnergyCost"
          },
          {
            "name": "ThickSkinDamageReduction"
          },
          {
            "name": "AdvancedMeleeAttackBonus"
          },
          {
            "name": "PistolProficiencyAttackBonus"
          },
          {
            "name": "LongGunProficiencyAttackBonus"
          },
          {
            "name": "RangedAccuracyBonus"
          },
          {
            "name": "BodyBuilderMaxHpBonus"
          },
          {
            "name": "LooterSearchSuccessRateBonus"
          },
          {
            "name": "AdvancedLooterSearchSuccessRateBonus"
          },
          {
            "name": "InfectedBiteInfectionRate"
          },
          {
            "name": "TankyFleshDamageReduction"
          },
          {
            "name": "EnhancedBiteAttackBonus"
          },
          {
            "name": "EnhancedClawAttackBonus"
          },
          {
            "name": "DestroyGeneratorEnergyCost"
          },
          {
            "name": "DestroyGeneratorXpGain"
          },
          {
            "name": "LootBodySuccessRate"
          },
          {
            "name": "FirearmsTrainingAccuracyBonus"
          },
          {
            "name": "AdvancedFirearmsTrainingAccuracyBonus"
          },
          {
            "name": "ZombieAccuracyBonus"
          },
          {
            "name": "AdvancedZombieAccuracyBonus"
          },
          {
            "name": "PremiumCost"
          },
          {
            "name": "NameChangeCost"
          },
          {
            "name": "TicketsPerMission"
          },
          {
            "name": "MissionCooldown"
          },
          {
            "name": "PremiumRegenReduction"
          },
          {
            "name": "DoubleXPActive"
          },
          {
            "name": "MaxTileLoot"
          }
        ]
      }
    },
    {
      "name": "ItemRarity",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Special"
          },
          {
            "name": "Untradeable"
          },
          {
            "name": "Common"
          },
          {
            "name": "Uncommon"
          },
          {
            "name": "Rare"
          },
          {
            "name": "Epic"
          },
          {
            "name": "Legendary"
          }
        ]
      }
    },
    {
      "name": "ItemKind",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "None"
          },
          {
            "name": "Consumable"
          },
          {
            "name": "Armor"
          },
          {
            "name": "Axe"
          },
          {
            "name": "Backpack"
          },
          {
            "name": "BaseballBat"
          },
          {
            "name": "Crowbar"
          },
          {
            "name": "HeavyArmor"
          },
          {
            "name": "Knife"
          },
          {
            "name": "Machete"
          },
          {
            "name": "Pistol"
          },
          {
            "name": "Rifle"
          },
          {
            "name": "Shotgun"
          }
        ]
      }
    },
    {
      "name": "ItemType",
      "docs": [
        "The type of the item."
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Weapon",
            "fields": [
              {
                "name": "weaponType",
                "type": {
                  "defined": "WeaponType"
                }
              },
              {
                "name": "damage",
                "type": "u8"
              },
              {
                "name": "accuracy",
                "type": "u32"
              },
              {
                "name": "breakChance",
                "type": "u32"
              }
            ]
          },
          {
            "name": "Armor",
            "fields": [
              {
                "name": "armorType",
                "type": {
                  "defined": "ArmorType"
                }
              },
              {
                "name": "defense",
                "type": "u8"
              },
              {
                "name": "breakChance",
                "type": "u32"
              }
            ]
          },
          {
            "name": "Backpack",
            "fields": [
              {
                "name": "size",
                "type": "u8"
              }
            ]
          },
          {
            "name": "Consumable",
            "fields": [
              {
                "name": "consumableType",
                "type": {
                  "defined": "ConsumableType"
                }
              },
              {
                "name": "effectValue",
                "type": "u8"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "WeaponType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Melee"
          },
          {
            "name": "Pistol"
          },
          {
            "name": "LongGun"
          },
          {
            "name": "ZombieClaw"
          },
          {
            "name": "ZombieBite"
          },
          {
            "name": "Firearm"
          }
        ]
      }
    },
    {
      "name": "ArmorType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Heavy"
          },
          {
            "name": "Light"
          }
        ]
      }
    },
    {
      "name": "ConsumableType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Health"
          },
          {
            "name": "Energy"
          },
          {
            "name": "Fuel"
          },
          {
            "name": "Revive"
          },
          {
            "name": "Generator"
          },
          {
            "name": "Xp"
          },
          {
            "name": "Premium"
          },
          {
            "name": "Raffle"
          },
          {
            "name": "Part"
          }
        ]
      }
    },
    {
      "name": "EquipSlot",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Weapon"
          },
          {
            "name": "Armor"
          },
          {
            "name": "Backpack"
          }
        ]
      }
    },
    {
      "name": "TileType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Street"
          },
          {
            "name": "Hospital"
          },
          {
            "name": "Apartment"
          },
          {
            "name": "PoliceStation"
          },
          {
            "name": "Warehouse"
          },
          {
            "name": "FireStation"
          },
          {
            "name": "ZedCorp"
          },
          {
            "name": "Factory"
          },
          {
            "name": "SecretLocation"
          },
          {
            "name": "Afk"
          },
          {
            "name": "Courier",
            "fields": [
              {
                "name": "rare",
                "type": {
                  "vec": {
                    "defined": "Point"
                  }
                }
              },
              {
                "name": "epic",
                "type": {
                  "vec": {
                    "defined": "Point"
                  }
                }
              },
              {
                "name": "legendary",
                "type": {
                  "vec": {
                    "defined": "Point"
                  }
                }
              }
            ]
          },
          {
            "name": "Arcade"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "Attack",
      "fields": [
        {
          "name": "attacker",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "defender",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "damage",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "TileBarricadeUpdated",
      "fields": [
        {
          "name": "character",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "x",
          "type": "i32",
          "index": false
        },
        {
          "name": "y",
          "type": "i32",
          "index": false
        },
        {
          "name": "barricade",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "CharacterMoved",
      "fields": [
        {
          "name": "character",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "x",
          "type": "i32",
          "index": false
        },
        {
          "name": "y",
          "type": "i32",
          "index": false
        }
      ]
    },
    {
      "name": "ItemFound",
      "fields": [
        {
          "name": "character",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "itemId",
          "type": "u32",
          "index": false
        }
      ]
    },
    {
      "name": "CharacterItemRemoved",
      "fields": [
        {
          "name": "character",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "itemId",
          "type": "u32",
          "index": false
        }
      ]
    },
    {
      "name": "CharacterSkillUnlocked",
      "fields": [
        {
          "name": "character",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "skill",
          "type": {
            "defined": "Skill"
          },
          "index": false
        }
      ]
    },
    {
      "name": "ActionUnsuccessful",
      "fields": [
        {
          "name": "character",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "action",
          "type": "string",
          "index": false
        }
      ]
    },
    {
      "name": "ActionSuccessful",
      "fields": [
        {
          "name": "character",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "action",
          "type": "string",
          "index": false
        }
      ]
    },
    {
      "name": "EnterRaffle",
      "fields": [
        {
          "name": "wallet",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "quantity",
          "type": "u16",
          "index": false
        }
      ]
    },
    {
      "name": "CharacterKilled",
      "fields": [
        {
          "name": "killer",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "victim",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "victimInventory",
          "type": "string",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "UnknownError",
      "msg": "UnknownError"
    },
    {
      "code": 6001,
      "name": "NoAuthority",
      "msg": "The signer is not authorized"
    },
    {
      "code": 6002,
      "name": "InvalidSession",
      "msg": "The session account is invalid"
    },
    {
      "code": 6003,
      "name": "InsufficientFunds",
      "msg": "Insufficient funds in the session account"
    },
    {
      "code": 6004,
      "name": "MintNotInitialized",
      "msg": "The mint is not initialized"
    },
    {
      "code": 6005,
      "name": "NotCollectionNFT",
      "msg": "The mint is not a collection NFT mint"
    },
    {
      "code": 6006,
      "name": "InvalidCharacterNFT",
      "msg": "This NFT is not a valid character NFT"
    },
    {
      "code": 6007,
      "name": "InvalidTile",
      "msg": "The tile provided is not valid, are you moving too fast?"
    },
    {
      "code": 6008,
      "name": "InvalidCharacterState",
      "msg": "Invalid character state"
    },
    {
      "code": 6009,
      "name": "InvalidItem",
      "msg": "The item provided is not valid"
    },
    {
      "code": 6010,
      "name": "InvalidSearchResult",
      "msg": "The search result is invalid"
    },
    {
      "code": 6011,
      "name": "AttackCoolingDown",
      "msg": "The character cannot attack yet"
    },
    {
      "code": 6012,
      "name": "CannotBarricadeTile",
      "msg": "Street Tiles cannot be barricaded"
    },
    {
      "code": 6013,
      "name": "CannotAttackYourself",
      "msg": "Cannot attack yourself"
    },
    {
      "code": 6014,
      "name": "TileHeavilyBarricaded",
      "msg": "Tile is heavily barricaded and cannot be entered"
    },
    {
      "code": 6015,
      "name": "CharacterIsSearching",
      "msg": "Character cannot do any other actions while searching"
    },
    {
      "code": 6016,
      "name": "CharacterIsDead",
      "msg": "You cannot do any actions while dead"
    },
    {
      "code": 6017,
      "name": "CharacterOutOfEnergy",
      "msg": "You do not have enough stamina to complete the action"
    },
    {
      "code": 6018,
      "name": "CharacterNotOnSameTile",
      "msg": "You are not on the same tile as the target"
    },
    {
      "code": 6019,
      "name": "CharacterOnAttackCoolDown",
      "msg": "Character is not cooled down yet"
    },
    {
      "code": 6020,
      "name": "CharacterIsAZombie",
      "msg": "Character is a zombie"
    },
    {
      "code": 6021,
      "name": "TileNotBarricaded",
      "msg": "Tile is not barricaded"
    },
    {
      "code": 6022,
      "name": "InventoryFull",
      "msg": "Inventory is full"
    },
    {
      "code": 6023,
      "name": "NotEnoughSkillPoints",
      "msg": "Not enough skill points"
    },
    {
      "code": 6024,
      "name": "MissingItem",
      "msg": "The item is not in your inventory"
    },
    {
      "code": 6025,
      "name": "SkillAlreadyUnlocked",
      "msg": "The skill is already unlocked"
    },
    {
      "code": 6026,
      "name": "CharacterActionOnCooldown",
      "msg": "You can only do one action per block"
    },
    {
      "code": 6027,
      "name": "MissingBarricadeBuilderSkill",
      "msg": "Missing the build barricade skill"
    },
    {
      "code": 6028,
      "name": "TargetIsDead",
      "msg": "Target is dead"
    },
    {
      "code": 6029,
      "name": "MissingItemInInventory",
      "msg": "You do not have the item you are trying to use"
    },
    {
      "code": 6030,
      "name": "MintOnCooldown",
      "msg": "You have recently found an item or have been attacked. Please try again later"
    },
    {
      "code": 6031,
      "name": "WrongItem",
      "msg": "You are trying to add the wrong item to your inventory"
    },
    {
      "code": 6032,
      "name": "NoItemZombie",
      "msg": "Zombies cannot use items"
    },
    {
      "code": 6033,
      "name": "EquipItemZombie",
      "msg": "Zombies cannot equip items"
    },
    {
      "code": 6034,
      "name": "TargetIsNotDead",
      "msg": "Target is not dead"
    },
    {
      "code": 6035,
      "name": "LootPrivilegeNotExpired",
      "msg": "You cannot loot this character yet, killer privilege has not expired"
    },
    {
      "code": 6036,
      "name": "TargetDoesNotHaveItem",
      "msg": "Target does not have the item"
    },
    {
      "code": 6037,
      "name": "NoGeneratorInstaller",
      "msg": "Tile does not have a generator installed"
    },
    {
      "code": 6038,
      "name": "InvalidSize",
      "msg": "Trying to resize to a smaller size, please try again"
    },
    {
      "code": 6039,
      "name": "MissingBarricadeDestroyerSkill",
      "msg": "Missing the barricade destroyer skill"
    },
    {
      "code": 6040,
      "name": "NoRedeemZombie",
      "msg": "Zombies cannot redeem items"
    },
    {
      "code": 6041,
      "name": "MissingDragSkill",
      "msg": "Missing the drag skill"
    },
    {
      "code": 6042,
      "name": "CannotAttackAnotherHuman",
      "msg": "You cannot attack another human"
    },
    {
      "code": 6043,
      "name": "InvalidRangedTile",
      "msg": "This tile is not eligible for a ranged attack"
    },
    {
      "code": 6044,
      "name": "CannotBeHuman",
      "msg": "You cannot complete this action as a human"
    },
    {
      "code": 6045,
      "name": "CannotBeZombie",
      "msg": "You cannot complete this action as a zombie"
    },
    {
      "code": 6046,
      "name": "TargetCannotBeZombie",
      "msg": "The target cannot be a zombie"
    },
    {
      "code": 6047,
      "name": "InvalidDragHealth",
      "msg": "Target's health is too high to be dragged"
    },
    {
      "code": 6048,
      "name": "DestinationInvalid",
      "msg": "The destination tile is invalid"
    },
    {
      "code": 6049,
      "name": "SearchingWrongTile",
      "msg": "You are not on the tile you are trying to search"
    },
    {
      "code": 6050,
      "name": "WrongTileForCrafting",
      "msg": "The tile is not a valid tile for crafting"
    },
    {
      "code": 6051,
      "name": "MissingGenerator",
      "msg": "The tile does not have a generator installed"
    },
    {
      "code": 6052,
      "name": "TileNotPowered",
      "msg": "The tile does not have a generator with fuel"
    },
    {
      "code": 6053,
      "name": "UnequipEmptySlot",
      "msg": "Trying to unequip an empty slot"
    },
    {
      "code": 6054,
      "name": "NameTooLong",
      "msg": "Name must be no longer than 12 characters"
    },
    {
      "code": 6055,
      "name": "NoNameChangeAvailable",
      "msg": "Name change is unavailable, please unlock it"
    },
    {
      "code": 6056,
      "name": "MissionsRecently",
      "msg": "Missions can only be generated once every 7 days"
    },
    {
      "code": 6057,
      "name": "TooManyActiveMissions",
      "msg": "You have too many active missions, please complete some before getting more"
    },
    {
      "code": 6058,
      "name": "AlreadyHasPremium",
      "msg": "The character already has premium applied to it."
    },
    {
      "code": 6059,
      "name": "AlreadyOnCourierMission",
      "msg": "The character is already on a courier mission, please cancel or complete the currently active one"
    },
    {
      "code": 6060,
      "name": "InvalidItemForMission",
      "msg": "Invalid item for a courier mission"
    },
    {
      "code": 6061,
      "name": "NotOnCourierMission",
      "msg": "You are not on a courier mission"
    },
    {
      "code": 6062,
      "name": "NoActionCourier",
      "msg": "You cannot do this action while having an active courier mission"
    },
    {
      "code": 6063,
      "name": "InsufficientBlueprints",
      "msg": "You do not have enough blueprints to craft the item"
    },
    {
      "code": 6064,
      "name": "InvalidCraftingItem",
      "msg": "This item cannot be crafted"
    },
    {
      "code": 6065,
      "name": "NoLegendaryAvailable",
      "msg": "There is no legendary items available for that item kind, please try again later"
    },
    {
      "code": 6066,
      "name": "PremiumMint",
      "msg": "You need premium in order to turn an item into an NFT"
    },
    {
      "code": 6067,
      "name": "InvalidLayers",
      "msg": "Invalid layer combination provided, please check and try again"
    },
    {
      "code": 6068,
      "name": "MismatchAsset",
      "msg": "Mismatching asset id"
    },
    {
      "code": 6069,
      "name": "UnsupportedTreeAccountSize",
      "msg": "Invalid merkle tree size"
    },
    {
      "code": 6070,
      "name": "NotEnoughTickets",
      "msg": "Not enough tickets"
    },
    {
      "code": 6071,
      "name": "NameTooShort",
      "msg": "Name must be 3 or more characters in length"
    },
    {
      "code": 6072,
      "name": "InvalidStartingTile",
      "msg": "Starting tile must not have any barricades on it"
    },
    {
      "code": 6073,
      "name": "TileExhausted",
      "msg": "The tile has no lootable items on it, please wait a while before trying again."
    },
    {
      "code": 6074,
      "name": "ZombieAction",
      "msg": "This action can only be completed by a zombie"
    },
    {
      "code": 6075,
      "name": "RevivePending",
      "msg": "You are not able to complete any actions while a revive is pending"
    },
    {
      "code": 6076,
      "name": "GamePaused",
      "msg": "Game is paused, please try again later"
    },
    {
      "code": 6077,
      "name": "NoPendingRevive",
      "msg": "No revive pending"
    },
    {
      "code": 6078,
      "name": "AlreadyReviving",
      "msg": "This zombie already has a revive pending"
    }
  ]
};
