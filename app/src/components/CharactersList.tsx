import { Box } from '@chakra-ui/react'
import React from 'react'
import { ZWCharacter } from '../interfaces/ZWCharacter'
import CharacterListItem from './CharacterListItem'

interface Props {
  characters: ZWCharacter[]
}

const CharactersList: React.FC<Props> = ({ characters }) => {
  return (
    <Box paddingTop={'1'}>
      {characters.map((character) => {
        return <CharacterListItem character={character} key={character.mint.toBase58()} />
      })}
      {characters.length === 0 && <Box color='white' textAlign='center'>No characters found</Box>}
    </Box>
  )
}

export default CharactersList
