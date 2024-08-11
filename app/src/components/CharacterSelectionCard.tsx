import {
  Text, Box, Image, Flex, Modal, Button,
  useDisclosure,
  ModalOverlay,
  Center,
  ModalBody,
  HStack,
  ModalContent, useToast, VStack, StackDivider, Link, Input, ModalHeader, ModalFooter
} from '@chakra-ui/react'
import { Nft } from '@metaplex-foundation/js'
import { PublicKey, Transaction } from '@solana/web3.js'
import React, { useCallback, useEffect, useMemo } from 'react'
import { usePlayerClient } from '../providers/usePlayerClient'
import { pdas } from '../sdk'
import { useCharacter } from '../providers/CharacterProvider'
import { useAnchorProvider } from '../providers/AnchorProviderProvider'

interface Props {
  size: string
  mint: PublicKey
  closeSelection: () => void
}

interface CharacterData {
  name: string
  x: number | null
  y: number | null
  hp: number | null
  energy: number | null
  isZombie: boolean | null
  joinedGame: boolean
  skills: boolean[]
  nameChangeAvailable: boolean
}
const CharacterSelectionCard: React.FC<Props> = ({ size, mint, closeSelection }) => {
  const [characterData, setCharacterData] = React.useState<CharacterData>({} as CharacterData)
  const [configuration, setConfiguration] = React.useState<any>(null)
  const [characterName, setCharacterName] = React.useState<string>(characterData.name)
  const { isOpen: isRenameOpen, onOpen: onRenameOpen, onClose: onRenameClose } = useDisclosure()
  const { playerClient } = usePlayerClient()
  const { changeCharacter } = useCharacter()
  const { anchorProvider } = useAnchorProvider()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()


  useEffect(() => {
    async function loadCharacter() {
      if (playerClient) {
        let character = await playerClient.program.account.character.fetchNullable(pdas.character(mint))

        let data = {} as CharacterData

        if (!character || character.name === '') {
          let result = await playerClient.metaplex.nfts().findByMint({ mintAddress: mint })
          if (result && result.model === 'nft') {
            data.name = (result as Nft).name
          } else {
            data.name = 'Unknown Character'
          }
        } else {
          data.name = character.name
        }

        if (character) {
          data.x = character.x
          data.y = character.y
          data.hp = character.hp
          data.isZombie = character.isZombie
          data.joinedGame = true
          data.skills = character.skills
          data.nameChangeAvailable = character.hasNameChangeAvailable

          let config = await playerClient.config

          let regenRate = config.configVariables[32] * 1000;
          let timeDiff = Date.now() - (character.energyUpdatedAt.toNumber() * 1000)
          let energyToAdd = Math.floor(timeDiff / regenRate);
          let stamina = Math.min(100, character.energy + energyToAdd)

          data.energy = stamina;
        } else {
          data.joinedGame = false
        }
        setCharacterData(data)
      }
    }

    async function loadConfiguration() {
      if (playerClient) {
        setConfiguration(await playerClient.config)
      }
    }
    loadConfiguration()
    loadCharacter()
  }, [mint, playerClient])

  function randomInt(min: number, max: number): number { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const initCharacter = useCallback(
    async (isZombie: boolean) => {
      if (playerClient && anchorProvider) {
        let startingX = randomInt(1, 10)
        let startingY = randomInt(1, 10)
        let tile = pdas.mapTile(startingX, startingY)
        let mapTile = await playerClient.program.account.mapTile.fetchNullable(tile, 'confirmed');

        while (mapTile && mapTile.numBarricades > 0) {
          startingX = randomInt(1, 10)
          startingY = randomInt(1, 10)
          tile = pdas.mapTile(startingX, startingY)
          mapTile = await playerClient.program.account.mapTile.fetchNullable(tile, 'confirmed')
        }
        if (mapTile && mapTile.numBarricades === 0) {
          let tx: Transaction = await playerClient.characterInit(startingX, startingY, isZombie, mint)
          try {
            await anchorProvider.sendAndConfirm(tx, [], { skipPreflight: true, commitment: 'confirmed' })
          } catch (e: any) {
            console.log(e);
            let errorMessage = e.logs.join().match(/Error Message: ([^,]+)/)[1];
            toast({
              title: errorMessage,
              status: 'error',
              duration: 5000,
            })
          }
        }

      }
      changeCharacter(mint)
      closeSelection()
      onClose();
    },
    [anchorProvider, changeCharacter, closeSelection, mint, playerClient, toast, onClose]
  )
  const selectCharacter = useCallback(
    async (cd: CharacterData) => {
      if (cd.joinedGame) {
        changeCharacter(mint)
        closeSelection()
      }
    },
    [changeCharacter, closeSelection, mint]
  )

  const maxHp = useMemo(() => {
    if (characterData.skills && characterData.skills.length > 3 && characterData.skills[3]) {
      return configuration?.configVariables[37] + configuration?.configVariables[53];
    }
    return configuration?.configVariables[37]
  }, [configuration, characterData])


  const edit = useCallback(async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setCharacterName(characterData.name);
    onRenameOpen()
  }, [onRenameOpen, characterData]);

  const updateName = useCallback(async () => {
    if (playerClient && anchorProvider) {
      let tx = await playerClient.renameCharacter(mint, characterName)
      try {
        await anchorProvider.sendAndConfirm(tx, [], { skipPreflight: true, commitment: 'confirmed' })
      } catch (e: any) {
        playerClient.handleTransactionError(e, toast);
      }
    }
    onRenameClose();
  }, [playerClient, anchorProvider, characterName, onRenameClose, toast, mint]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterName(event.target.value);
  };

  return (
    <>
      <Box
        borderColor={'#A8B5B2'}
        borderWidth={'10px'}
        width={size}
        _hover={{
          borderColor: '#394A50',
          cursor: 'pointer',
        }}
        onClick={async () => {
          if (!characterData.joinedGame) {
            onOpen()
          } else {
            selectCharacter(characterData)
          }
        }}
      >
        <Box backgroundColor={'black'} textColor='white'>
          <Text fontSize={'xs'} align='center'>
            {characterData.name} {characterData.joinedGame && (<>| <Link onClick={edit}>Edit</Link></>)}
          </Text>
        </Box>
        <Image src={characterData.joinedGame ? characterData.isZombie ? 'https://cdn.zedwars.com/images/zombie.png' : 'https://cdn.zedwars.com/images/survivor.png' : 'https://cdn.zedwars.com/images/survivor_zombie.gif'} alt='Character' />
        <Box backgroundColor={'black'} textColor={'white'}>
          {characterData.joinedGame && (
            <Flex
              justifyContent={'space-between'}
              paddingRight='5px'
              paddingBottom='3px'
              paddingTop='3px'
              paddingLeft='5px'
            >
              <Text as='span' fontSize={'xs'} align='left'>
                {characterData.hp}/{maxHp} Health
              </Text>
              <Text as='span' fontSize={'xs'} align='left'>
                ({characterData.x}, {characterData.y})
              </Text>
              <Text as='span' fontSize={'xs'} align='right'>
                {characterData.energy} Stamina
              </Text>
            </Flex>
          )}
          {!characterData.joinedGame && (
            <Flex justify={'center'} paddingRight='5px' paddingBottom='3px' paddingTop='3px' paddingLeft='5px'>
              <Text fontSize={'xs'}>Click to Join</Text>
            </Flex>
          )}
        </Box>
      </Box>

      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior={'inside'} size={'md'} isCentered={true}>
        <ModalOverlay />
        <ModalContent color='white' borderRadius='0' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'}>
          <ModalBody>
            <Center>
              <VStack>
                <HStack textAlign={'center'} divider={<StackDivider borderColor='gray.400' />}>
                  <Center>
                    <Box>
                      <Text textDecoration={'underline'} fontSize={'lg'}>Zombie</Text>
                      <Text fontSize={'sm'}>Zombies offer higher experience rates as well as the ability to destroy barricades, attack survivors and other zombies as well as loot items from any survivors they successfully kill. A great choice for someone looking to cause some chaos.</Text>
                      <Button width={'150px'} size='sm' color='white' borderRadius='0' aria-label='Loot Character' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} onClick={() => { initCharacter(true) }}>
                        Join as Zombie
                      </Button>
                    </Box>
                  </Center>
                  <Center>
                    <Box>
                      <Text textDecoration={'underline'} fontSize={'lg'}>Survivor</Text>
                      <Text fontSize={'sm'}>Survivors offer the ability to build barricades and create safe houses, search tiles for legendary items as well as craft items to assist in fighting back the zombie horde. Perfect for those looking to fight back the zombie horde and create a safe city.</Text>
                      <Button width={'150px'} size='sm' color='white' borderRadius='0' aria-label='Loot Character' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} onClick={() => { initCharacter(false) }}>
                        Join as Survivor
                      </Button>
                    </Box>
                  </Center>
                </HStack>
                <Button width={'150px'} size='sm' color='white' borderRadius='0' aria-label='Loot Character' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} onClick={onClose}>
                  Cancel
                </Button>
              </VStack>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isRenameOpen} onClose={onRenameOpen} size={'sm'}>
        <ModalOverlay />
        <ModalContent color='white' borderRadius='0' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'}>
          <ModalHeader>Rename {characterData.name}</ModalHeader>
          <ModalBody>
            <Center>
              <VStack>
                <Input placeholder={characterData.name} value={characterName} onChange={handleInputChange} color={'white'} borderRadius='0' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'1px'} focusBorderColor={'white'} />
                {!characterData.nameChangeAvailable && (
                  <Text fontSize={'xs'}>There is a 0.25 SOL charge as you have already changed your name before. Pleaes open a ticket in Discord if you have recently purchased this character.</Text>
                )}
                
              </VStack>
            </Center>

          </ModalBody>
          <Center>
            <ModalFooter>
              <Button onClick={updateName} color='white' borderRadius='0' aria-label='Close Modal' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} mr={2}>
                Save
              </Button>
              <Button onClick={onRenameClose} color='white' borderRadius='0' aria-label='Close Modal' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }}>
                Close
              </Button>
            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>

    </>
  )
}

export default CharacterSelectionCard
