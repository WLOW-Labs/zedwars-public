import { Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { MatchMediaType, withMatchMedia } from '../hooks/withMatchMedia'
import { useCharacter } from '../providers/CharacterProvider'
import { Tile } from './GameScreen'
import MapTile, { TILE_SIZE } from './MapTile'

export interface MapProps {
  selectedTile?: Tile
  setSelectedTile: React.Dispatch<React.SetStateAction<Tile>>
}

const MAP_SIZE = {
  mobile: [
    [-1, 1],
    [-2, 2],
  ],
  desktop: [
    [-2, 2],
    [-2, 2],
  ],
}

const Map = ({ selectedTile, setSelectedTile, isMobile }: MapProps & MatchMediaType) => {
  const { x: characterX, y: characterY } = useCharacter()
  const [tiles, setTiles] = useState<Tile[]>([])
  const mapSize = isMobile ? MAP_SIZE.mobile : MAP_SIZE.desktop
  useEffect(() => {
    if (characterX === null || characterY === null) {
      setTiles([])
    } else {
      setSelectedTile({ x: characterX, y: characterY })
      let newTiles = []
      for (let x = mapSize[0][0]; x <= mapSize[0][1]; x++) {
        for (let y = mapSize[1][0]; y <= mapSize[1][1]; y++) {
          newTiles.push({ x: characterX + x, y: characterY + y })
        }
      }
      setTiles(newTiles)
    }
  }, [characterX, characterY, setSelectedTile, mapSize])
  return (
    <Flex
      width={TILE_SIZE * (mapSize[0][1] - mapSize[0][0] + 1)}
      justifyContent='center'
      alignItems='center'
      height={'100%'}
    >
      {tiles.map((tile) => (
        <MapTile x={tile.x} y={tile.y} key={`${tile.x}-${tile.y}`} selectedTile={selectedTile} setSelectedTile={setSelectedTile} />
      ))}
    </Flex>
  )
}

export default withMatchMedia(Map)
