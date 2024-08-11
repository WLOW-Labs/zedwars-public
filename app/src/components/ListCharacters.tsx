import { Box, Button, Center } from '@chakra-ui/react'
import { useConnection } from '@solana/wallet-adapter-react'
import React, { useCallback } from 'react'
import { ZWCharacter } from '../interfaces/ZWCharacter'
import { useCharacter } from '../providers/CharacterProvider'
import { usePlayerClient } from '../providers/usePlayerClient'
import { pdas } from '../sdk'
import CharactersList from './CharactersList'
import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes'
import { Tile } from './GameScreen'

export interface ListCharactersProps {
    selectedTile?: Tile
}

const ListCharacters = ({ selectedTile }: ListCharactersProps) => {
    const [zombies, setZombies] = React.useState<ZWCharacter[]>([])
    const [survivors, setSurvivors] = React.useState<ZWCharacter[]>([])
    const [selection, setSelection] = React.useState<Boolean>(true)
    const { x: characterX, y: characterY, characterMint } = useCharacter()
    const { playerClient } = usePlayerClient()
    const { connection } = useConnection()

    const tileIndexFilter = useCallback((x: number, y: number) => {
        if (selectedTile) {
            let buffer = Buffer.alloc(8)
            buffer.writeInt32LE(selectedTile.x, 0)
            buffer.writeInt32LE(selectedTile.y, 4)
            return ({
                memcmp: {
                    offset: 8 + 32,
                    bytes: bs58.encode(buffer)
                }
            })
        } else {
            let buffer = Buffer.alloc(8)
            buffer.writeInt32LE(x, 0)
            buffer.writeInt32LE(y, 4)
            return ({
                memcmp: {
                    offset: 8 + 32,
                    bytes: bs58.encode(buffer)
                }
            })
        }

    }, [selectedTile])

    React.useEffect(() => {
        async function loadCharacters() {
            if (playerClient && characterX !== null && characterY !== null && connection) {
                let characters = await playerClient.program.account.character.all([tileIndexFilter(characterX, characterY)]);
                let newZombies: ZWCharacter[] = []
                let newSurvivors: ZWCharacter[] = []
                for (let i = 0; i < characters.length; i++) {
                    if (characters[i].account.mint.toBase58() !== characterMint?.toBase58()) {
                        if (characters[i].account.isZombie) {
                            newZombies.push(characters[i].account)
                        } else {
                            newSurvivors.push(characters[i].account)
                        }
                    }
                }
                newZombies.sort((a, b) => {
                    return b.hp - a.hp
                });
                newSurvivors.sort((a, b) => {
                    return b.hp - a.hp
                });
                setZombies(newZombies)
                setSurvivors(newSurvivors)
            }
        }
        loadCharacters()

        let tileSubscriptionId: number | null = null
        if (connection && characterX !== null && characterY !== null) {
            tileSubscriptionId = connection.onAccountChange(pdas.mapTile(characterX, characterY), loadCharacters)
        }
        return () => {
            if (tileSubscriptionId) {
                connection.removeAccountChangeListener(tileSubscriptionId)
            }
        }
    }, [characterMint, characterX, characterY, connection, playerClient, selectedTile, tileIndexFilter])

    return (
        <Box mt='2'>
            <Center>
                <Button size='md' color='white' borderRadius='0' aria-label='List Survivors' backgroundColor={selection ? '#A8B5B2' : '#577277'} borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: (selection ? '#A8B5B2' : '#394A50') }} onClick={() => {
                    setSelection(true)
                }}>
                    Survivors
                </Button>
                <Button ml='1' size='md' color='white' borderRadius='0' aria-label='List Zombies' backgroundColor={!selection ? '#A8B5B2' : '#577277'} borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: (!selection ? '#A8B5B2' : '#394A50') }} onClick={() => {
                    setSelection(false)
                }}>
                    Zombies
                </Button>
            </Center>
            <CharactersList characters={selection ? survivors : zombies} />
        </Box>

    )
}

export default ListCharacters
