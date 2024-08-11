import { Center, Wrap, WrapItem, Box, IconButton, Icon, useToast, Text } from '@chakra-ui/react'
import { Metadata, Nft } from '@metaplex-foundation/js'
import { Keypair, PublicKey } from '@solana/web3.js'
import { useCallback, useEffect, useState } from 'react'
import { useAnchorProvider } from '../providers/AnchorProviderProvider'
import { useDelegateKeypair } from '../providers/useDelegateKeypair'
import { usePlayerClient } from '../providers/usePlayerClient'
import { pdas } from '../sdk'
import CharacterSelectionCard from './CharacterSelectionCard'

interface Props {
  closeSelection: () => void
  openSelection: boolean
}
const CharacterSelection = ({ closeSelection, openSelection }: Props) => {
  const [characters, setCharacters] = useState<PublicKey[]>([])
  const { playerClient } = usePlayerClient()
  const { anchorProvider } = useAnchorProvider()
  const { delegateKeypair } = useDelegateKeypair()
  const toast = useToast()

  const getCharacters = useCallback(async () => {
    console.log('getCharacters')
    let config = await playerClient?.program.account.config.fetchNullable(pdas.config())
    let result = await playerClient?.metaplex.nfts().findAllByOwner({ owner: playerClient.playerPubkey })
    let mints: PublicKey[] = []
    if (result && config) {
      for (let i = 0; i < result.length; i++) {
        if (
          result[i].collection?.verified &&
          result[i].collection?.address.toBase58() === config.charactersCollectionMint.toBase58()
        ) {
          if (result[i].model === 'metadata') {
            mints.push((result[i] as Metadata).mintAddress)
          } else if (result[i].model === 'nft') {
            mints.push((result[i] as Nft).address)
          }
        }
      }
    }
    setCharacters(mints.sort())
  }, [playerClient])

  useEffect(() => {
    if (playerClient) {
      getCharacters()
    }
  }, [playerClient, openSelection, getCharacters])

  const mintCharacter = useCallback(async () => {
    if (playerClient && anchorProvider && !delegateKeypair) {
      const lamports = await anchorProvider.connection.getBalance(playerClient.playerPubkey);
      if (lamports < 25_000_000) {
        toast({
          title: 'You do not have enough SOL in your wallet to mint a character',
          status: 'error',
          duration: 5000,
        })
        return;
      }
      let mint = Keypair.generate()
      let tx = await playerClient.newCharacter(mint)
      try {
        await anchorProvider.sendAndConfirm(tx, [mint], { skipPreflight: true, commitment: 'confirmed' })
      } catch (e: any) {
        playerClient.handleTransactionError(e, toast)
      }
      getCharacters()
    }
  }, [anchorProvider, playerClient, delegateKeypair, getCharacters, toast])

  return (
    <Center height={'100%'} padding={'30px'}>
      <Box
        width={'100%'}
        height={'100%'}
        borderColor={'#A8B5B2'}
        borderWidth={'10px'}
        overflow='scroll'
        overflowX={'hidden'}
        padding='10px'
        sx={{ '-MsOverflowStyle': 'none', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}
      >
        <Center>
          <IconButton
            onClick={closeSelection}
            mb='2'
            borderRadius='0'
            aria-label='View Settings'
            backgroundColor='#577277'
            borderColor='#A8B5B2'
            borderWidth={'3px'}
            _hover={{ borderColor: '#394A50' }}
            icon={
              <Icon viewBox='0 0 24 24' stroke='white' fill='white'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </Icon>
            }
          />
        </Center>

        <Center>
          {characters.length === 0 && (
            <Text color={'white'}>
              It looks like you don't have any characters in your wallet, mint one below to start playing!
            </Text>
          )}
        </Center>

        <Center>
          <Wrap justify={'center'}>
            {characters.map((character) => {
              return (
                <WrapItem key={character.toBase58()}>
                  <CharacterSelectionCard size={'225px'} mint={character} closeSelection={closeSelection} />
                </WrapItem>
              )
            })}
            {process.env.REACT_APP_STAGE && process.env.REACT_APP_STAGE === 'dev' && (
              <WrapItem>
                <Center
                  onClick={mintCharacter}
                  borderColor={'#A8B5B2'}
                  borderWidth={'10px'}
                  width={'225px'}
                  height='267px'
                  ml={1}
                  _hover={{
                    borderColor: '#394A50',
                    cursor: 'pointer',
                  }}
                >
                  <Icon viewBox='0 0 24 24' fill='white' stroke='#A8B5B2'>
                    <path
                      fillRule='evenodd'
                      d='M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z'
                      clipRule='evenodd'
                    />
                  </Icon>
                </Center>
              </WrapItem>
            )}
          </Wrap>
        </Center>
      </Box>
    </Center>
  )
}

export default CharacterSelection
