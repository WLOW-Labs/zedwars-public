import { Box, Flex, Center, VStack, HStack, IconButton, Icon, Tooltip, useToast } from '@chakra-ui/react'
import { useConnection } from '@solana/wallet-adapter-react'
import React, { useCallback, useEffect, useState } from 'react'
import { useAnchorProvider } from '../providers/AnchorProviderProvider'
import { useCharacter } from '../providers/CharacterProvider'
import { usePlayerClient } from '../providers/usePlayerClient'
import { pdas } from '../sdk'
import { TileType } from "../sdk/arg_types";
import { Tile } from './GameScreen'

export interface MapTileProps {
  x: number
  y: number
  selectedTile?: Tile
  setSelectedTile: React.Dispatch<React.SetStateAction<Tile>>
}

interface MapTileData {
  name: string
  barricades: number
  zombies: number
  survivors: number
  tileType: TileType
  hasGenerator: boolean
}

export const TILE_SIZE = 150
const MapTile = ({ x, y, selectedTile, setSelectedTile }: MapTileProps) => {
  const { x: characterX, y: characterY, isZombie: characterIsZombie, characterMint, data, tile } = useCharacter()
  const [mapTileData, setMapTileData] = useState<MapTileData | null>(null)
  const { playerClient } = usePlayerClient()
  const { connection } = useConnection()
  const { anchorProvider } = useAnchorProvider()

  useEffect(() => {
    let mapTilePDA = pdas.mapTile(x, y)
    let tileSubscriptionId: number | null = null
    async function loadMapTile() {
      if (playerClient) {
        let mapTile = await playerClient.program.account.mapTile.fetchNullable(mapTilePDA, 'confirmed')
        if (mapTile) {
          setMapTileData({
            name: "test",
            barricades: mapTile.numBarricades,
            zombies: mapTile.numZombies,
            survivors: mapTile.numSurvivors,
            tileType: mapTile.tileType,
            hasGenerator: mapTile.hasGenerator
          })
        } else {
          setMapTileData(null)
        }
      }
    }

    loadMapTile()
    tileSubscriptionId = connection.onAccountChange(mapTilePDA, loadMapTile)
    return () => {
      if (tileSubscriptionId) {
        connection.removeAccountChangeListener(tileSubscriptionId)
      }
    }
  }, [connection, playerClient, x, y])
  function isAdjacent() {
    let result = false
    if (characterX !== null && characterY !== null) {
      let diffX = Math.abs(x - characterX)
      let diffY = Math.abs(y - characterY)
      if (diffX + diffY === 1) {
        result = true
      }
    }
    return result
  }
  function canMove() {
    let result = false
    if (isAdjacent() && mapTileData) {
      if (characterIsZombie && mapTileData.barricades === 0) {
        result = true
      }
      if (!characterIsZombie) {
        result = true
      }
    }
    return result
  }
  function canAttackBarricade() {
    let result = false
    if ((isAdjacent() || (x === characterX && y === characterY)) && mapTileData) {
      if (mapTileData.barricades > 0 && characterIsZombie) {
        result = true
      }
    }

    return result
  }

  function getTileImage(x: string, y: string) {
    x = x.padStart(4, '0');
    y = y.padStart(4, '0');
    if (mapTileData?.hasGenerator) {
      return `${x}${y}_powered.png`;
    }
    return `${x}${y}.png`;
  }

  function getBarricadeImage(barricades: number) {
    if (barricades >= 20) {
      return `barricade_10.png`;
    }
    if (barricades >= 10) {
      return `barricade_5.png`;
    }
    if (barricades >= 1) {
      return `barricade_1.png`;
    }
    return "";
  }

  function getZombies(zombies: number) {
    if (zombies >= 10) {
      return `zombie_10.png`;
    } else if (zombies > 0) {
      return `zombie_${zombies}.png`;
    }
    return "";
  }

  function getSurvivors(survivors: number) {
    if (survivors >= 10) {
      return `human_10.png`;
    } else if (survivors > 0) {
      return `human_${survivors}.png`;
    }
    return "";
  }

  function getDirection() {
    if (characterX! < x && characterY === y) {
      return <path fillRule="evenodd" d="M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z" clipRule="evenodd" />;
    }
    if (characterX! > x && characterY === y) {
      return <path fillRule="evenodd" d="M13.28 3.97a.75.75 0 010 1.06L6.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0zm6 0a.75.75 0 010 1.06L12.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />;
    }
    if (characterX === x && characterY! > y) {
      return <path fillRule="evenodd" d="M11.47 4.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 6.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5zm.53 7.59l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 12.31z" clipRule="evenodd" />;
    }
    if (characterX === x && characterY! < y) {
      return <path fillRule="evenodd" d="M20.03 4.72a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 11.69l6.97-6.97a.75.75 0 011.06 0zm0 6a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06L12 17.69l6.97-6.97a.75.75 0 011.06 0z" clipRule="evenodd" />;
    }

  }

  const toast = useToast()

  const move = useCallback(async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (playerClient && anchorProvider && characterMint && mapTileData) {
      let config = await playerClient.config;
      let barricadeLimit = 0;
      if (characterIsZombie) {
        barricadeLimit = config.configVariables[13];
      } else {
        barricadeLimit = config.configVariables[12];
      }
      if (characterIsZombie || !data.skills[0] || tile?.tileType.street) {

        if (mapTileData.barricades > barricadeLimit) {
          if (characterIsZombie) {
            toast({
              title: "This tile has too many barricades to move to directly, try unlocking the barricade destroyer skill and breaking through.",
              status: 'error',
              duration: 5000,
            })
          } else {
            toast({
              title: "This tile has too many barricades to move to directly, try unlocking parkour and entering from a non street tile.",
              status: 'error',
              duration: 5000,
            })
          }

          return;
        }
      }
      let tx = await playerClient.characterMove(x, y, characterMint)
      try {
        await playerClient.getProvider().sendAndConfirm(tx, [], { skipPreflight: true, commitment: 'confirmed' })
      } catch (e: any) {
        playerClient.handleTransactionError(e, toast);
      }
    }
  }, [anchorProvider, characterMint, mapTileData, playerClient, x, y, characterIsZombie, data, tile, toast])
  const attackBarricade = useCallback(async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (playerClient && anchorProvider && characterMint) {
      if (!data.skills[17]) {
        toast({
          title: "You need the barricade destroyer skill to destroy barricades.",
          status: 'error',
          duration: 5000,
        })
        return;
      }
      let tx = await playerClient.characterDestroyBarricade(characterMint, x, y)
      try {
        await playerClient.getProvider().sendAndConfirm(tx, [], { skipPreflight: true, commitment: 'confirmed' })
      } catch (e: any) {
        playerClient.handleTransactionError(e, toast);
      }
    }
  }, [anchorProvider, characterMint, playerClient, x, y, data, toast])
  return (
    <Box
      style={{ backgroundImage: mapTileData ? "url('https://cdn.zedwars.com/images/" + getSurvivors(mapTileData.survivors) + "'), url('https://cdn.zedwars.com/images/" + getZombies(mapTileData.zombies) + "'), url('https://cdn.zedwars.com/tiles/" + getBarricadeImage(mapTileData.barricades) + "'), url('https://cdn.zedwars.com/tiles/" + getTileImage(x.toString(), y.toString()) + "')" : "url('https://cdn.zedwars.com/tiles/inhospitable.png')" }}
      backgroundSize={'contain'}
      width={`${TILE_SIZE}px`}
      height={`${TILE_SIZE}px`}
      position={'absolute'}
      transform={`translate(${(characterX !== null && x !== null ? x - characterX : 0) * TILE_SIZE}px, ${(characterY !== null && y !== null ? y - characterY : 0) * TILE_SIZE
        }px)`}
      transition='all 0.3s ease-out'
      outline={x === selectedTile?.x && y === selectedTile?.y && (characterX !== x || characterY !== y) ? '3px solid red' : ''}
      outlineOffset={'-3px'}
      cursor={'pointer'}
      onClick={() => {
        setSelectedTile({ x, y })
      }}
    >
      {mapTileData && (
        <Flex justifyContent='space-between' flexDirection='column' h='100%'>
          <Center flex='1' textAlign='center'>
            <VStack>
              <HStack spacing={2}>
                {canMove() && (
                  <Tooltip label="Move here">
                    <IconButton onClick={move} width='20px' borderRadius='0' aria-label='Move to this tile' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} icon={<Icon viewBox="0 0 24 24" fill="white" stroke='white'>
                      {getDirection()}
                    </Icon>} />
                  </Tooltip>

                )}
                {canAttackBarricade() && (
                  <Tooltip label="Attack Barricade">
                    <IconButton onClick={attackBarricade} width='20px' borderRadius='0' aria-label='View Skills' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} icon={<Icon viewBox="0 0 24 24" fill="white" stroke='white'>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M19 1.48416e-05L23 0C23.2652 -9.53668e-07 23.5195 0.105355 23.7071 0.292891C23.8946 0.480426 24 0.73478 24 0.999997L24 5.00001C24 5.26523 23.8946 5.51958 23.7071 5.70712L11.9142 17.5L13.7071 19.2929C14.0976 19.6834 14.0976 20.3166 13.7071 20.7071C13.3166 21.0977 12.6834 21.0977 12.2929 20.7071L9.79289 18.2071L9.46376 17.878L5.9999 20.9955C6.00096 21.7635 5.70873 22.534 5.12132 23.1214C3.94975 24.293 2.05025 24.293 0.87868 23.1214C-0.292893 21.9498 -0.292893 20.0503 0.87868 18.8787C1.46607 18.2913 2.23647 17.9991 3.00451 18.0002L6.12202 14.5363L5.79287 14.2071L3.29289 11.7071C2.90237 11.3166 2.90237 10.6834 3.29289 10.2929C3.68342 9.90239 4.31658 9.90239 4.70711 10.2929L6.49998 12.0858L18.2929 0.292907C18.4804 0.105372 18.7348 1.57952e-05 19 1.48416e-05ZM7.91419 13.5L8.2071 13.7929L10.2071 15.7929L10.5 16.0858L22 4.5858L22 2L19.4142 2.00001L7.91419 13.5ZM7.53819 15.9524L5.00435 18.7678C5.0441 18.8035 5.08311 18.8405 5.12132 18.8787C5.15952 18.9169 5.19648 18.9559 5.23221 18.9957L8.04759 16.4618L7.53819 15.9524ZM3.20676 20.0214C2.88445 19.954 2.54009 20.0458 2.29289 20.293C1.90237 20.6835 1.90237 21.3166 2.29289 21.7072C2.68342 22.0977 3.31658 22.0977 3.70711 21.7072C3.95431 21.46 4.0461 21.1156 3.97862 20.7933C3.94032 20.6103 3.85075 20.4366 3.70711 20.293C3.56346 20.1493 3.3897 20.0597 3.20676 20.0214Z" fill="#FFFFFF" />
                    </Icon>} />
                  </Tooltip>
                )}
              </HStack>
            </VStack>
          </Center>

        </Flex>
      )}
    </Box>
  )
}

export default MapTile
