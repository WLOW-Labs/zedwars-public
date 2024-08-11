import { useConnection } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import React, { createContext, useState, useEffect, useContext } from 'react'
import { pdas } from '../sdk'
import { usePlayerClient } from './usePlayerClient'
import { useToast } from '@chakra-ui/react'
import { itemNames } from '../data/itemNames'
import { TileType } from '../sdk/arg_types'

// Define the type for the context values
interface CharacterContextType {
  characterMint: PublicKey | null
  x: number
  y: number
  name: string
  hp: number
  xp: number | null
  energy: number | null
  isZombie: boolean | null
  equippedArmor: number | null
  equippedWeapon: number | null
  equippedBackpack: number | null
  unlockedSkills: boolean[]
  level: number | null
  data: any
  energyUpdatedAt: number
  tile: Tile | null
  hasRangedWeapon: boolean,
  changeCharacter: (newMint: PublicKey) => void
}

interface Tile {
  name: string,
  barricades: number
  zombies: number
  survivors: number
  generatorInstalled: boolean
  poweredUntil: Date
  tileType: TileType
}

export const getNameFromTileType = (tileType: TileType) => {
  if (tileType.hospital) return 'Hospital';
  if (tileType.policeStation) return 'Police Station';
  if (tileType.factory) return 'Factory';
  if (tileType.street) return 'Street';
  if (tileType.apartment) return 'House';
  if (tileType.fireStation) return 'Fire Station';
  if (tileType.warehouse) return 'Warehouse';
  if (tileType.zedCorp) return 'Zed Corp';
  if (tileType.courier) return 'Pony Express';
  return 'Unknown';
}

// Create the context
export const CharacterContext = createContext<CharacterContextType>({} as CharacterContextType)

interface CharacterProviderProps {
  children: React.ReactNode
}
// Define the provider component
export const CharacterProvider: React.FC<CharacterProviderProps> = ({ children }) => {
  const [mint, setMint] = useState<PublicKey | null>(null)
  const toast = useToast();
  const { connection } = useConnection()
  const { playerClient } = usePlayerClient()
  const [contextVal, setContextVal] = useState<CharacterContextType>({} as CharacterContextType)

  // Define the function to change the mint value
  const changeMint = (newMint: PublicKey) => {
    console.log('Changing mint to', newMint.toBase58());
    setMint(newMint)
  }

  // Update x and y with an async function when the mint changes
  useEffect(() => {
    async function updateCharacter() {
      let shouldBeNull = true
      let tile: Tile | null = null
      if (mint && playerClient) {
        const character = await playerClient.program.account.character.fetchNullable(pdas.character(mint))
        if (character) {
          shouldBeNull = false
          const mapTile = await playerClient.program.account.mapTile.fetchNullable(pdas.mapTile(character.x, character.y))
          if (mapTile) {
            let x = new Date(0);
            x.setUTCSeconds(mapTile.hasPowerUntil.toNumber())
            tile = {
              barricades: mapTile.numBarricades,
              survivors: mapTile.numSurvivors,
              zombies: mapTile.numZombies,
              generatorInstalled: mapTile.hasGenerator,
              poweredUntil: x,
              tileType: mapTile.tileType,
              name: getNameFromTileType(mapTile.tileType)
            }
          }

          let config = await playerClient.config
          let regenRate = config.configVariables[32] * 1000;
          let timeDiff = Date.now() - (character.energyUpdatedAt.toNumber() * 1000)
          let energyToAdd = Math.floor(timeDiff / regenRate);
          let stamina = Math.min(100, character.energy + energyToAdd)

          let rangedWeapon = false;

          if (character.equippedItems.weapon) {
            let weapon = await playerClient.program.account.item.fetchNullable(pdas.item(character.equippedItems.weapon))
            if (weapon && weapon.itemType.weapon && weapon.itemType.weapon.weaponType.firearm) {
              rangedWeapon = true;
            }
          }

          console.log(character.weeklyMissions);

          setContextVal({
            characterMint: mint,
            name: character.name,
            x: character.x,
            y: character.y,
            hp: character.hp,
            energy: stamina,
            isZombie: character.isZombie,
            xp: character.xp,
            equippedArmor: character.equippedItems.armor,
            equippedWeapon: character.equippedItems.weapon,
            equippedBackpack: character.equippedItems.backpack,
            unlockedSkills: character.skills,
            level: character.level,
            data: character,
            energyUpdatedAt: character.energyUpdatedAt.toNumber(),
            tile: tile,
            hasRangedWeapon: rangedWeapon,
            changeCharacter: changeMint,
          })
          console.log(character.weeklyMissions);

          let lastBlock = localStorage.getItem(mint.toBase58());
          let currentBlock = await connection.getSlot();
          if (lastBlock && character.events.length > 0) {
            let lastBlockNum = parseInt(lastBlock);
            for (let i = 0; i < character.events.length; i++) {
              if (character.events[i].block.toNumber() > lastBlockNum) {
                let message = character.events[i].message;
                let item_id = message.substring(
                  message.indexOf("@") + 1,
                  message.lastIndexOf("@")
                );

                if (item_id.length > 0) {
                  message = message.replace(`@${item_id}@`, itemNames[item_id]);
                }

                let status: 'info' | 'warning' | 'success' | 'error' = 'info';
                switch (character.events[i].severity) {
                  case 1:
                    status = 'error';
                    break;
                  case 2:
                    status = 'warning';
                    break;
                  case 3:
                    status = 'info';
                    break;
                  case 4:
                    status = 'success';
                    break;
                  default:
                    status = 'info';
                    break;
                };

                toast({
                  title: message,
                  status: status,
                  duration: 5000,
                })
              }
            }
          }

          localStorage.setItem(mint.toBase58(), currentBlock.toString());
        }
      }
      if (shouldBeNull) {
        setContextVal({
          characterMint: null,
          x: 0,
          y: 0,
          name: '',
          hp: 0,
          energy: null,
          isZombie: null,
          xp: null,
          equippedArmor: null,
          equippedWeapon: null,
          equippedBackpack: null,
          unlockedSkills: [],
          level: null,
          data: null,
          energyUpdatedAt: 0,
          tile: tile,
          hasRangedWeapon: false,
          changeCharacter: changeMint,
        })
      }
    }

    updateCharacter()

    let characterSubscriptionId: number = -1
    if (mint) {
      characterSubscriptionId = connection.onAccountChange(pdas.character(mint), updateCharacter, 'confirmed')
    }
    return () => {
      if (characterSubscriptionId > -1) {
        connection.removeProgramAccountChangeListener(characterSubscriptionId)
      }
    }
  }, [mint, playerClient, connection, toast])

  // Return the context provider with the provided values and functions
  return <CharacterContext.Provider value={contextVal}>{children}</CharacterContext.Provider>
}
// Define the hook to use the context values
export const useCharacter = () => {
  const val = useContext(CharacterContext)
  return val
}
