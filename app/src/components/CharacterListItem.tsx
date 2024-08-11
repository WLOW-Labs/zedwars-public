import { Box, HStack, Image, Button, Text, VStack, ModalHeader, useDisclosure, useToast, Modal, ModalOverlay, ModalContent, ModalBody, Center, ModalFooter, Wrap, WrapItem } from '@chakra-ui/react'
import { useConnection } from '@solana/wallet-adapter-react'
import React, { useState, useEffect, useCallback } from 'react'
import { ZWCharacter } from '../interfaces/ZWCharacter'
import { useAnchorProvider } from '../providers/AnchorProviderProvider'
import { useCharacter } from '../providers/CharacterProvider'
import { usePlayerClient } from '../providers/usePlayerClient'
import InventoryItem from './InventoryItem'

interface Props {
  character: ZWCharacter
}

const CharacterListItem: React.FC<Props> = ({ character }) => {
  const [hp, setHp] = useState<number>(0)
  const [isZombie, setIsZombie] = useState<boolean | null>(null)
  const { playerClient } = usePlayerClient()
  const { connection } = useConnection()
  const { anchorProvider } = useAnchorProvider()
  const { characterMint, isZombie: playerIsZombie, x, y, hasRangedWeapon } = useCharacter()
  const { isOpen: isLootOpen, onOpen: onLootOpen, onClose: onLootClose } = useDisclosure()
  const { isOpen: isMoveOpen, onOpen: onMoveOpen, onClose: onMoveClose } = useDisclosure()

  useEffect(() => {
    async function getHp() {
      if (playerClient) {
        setHp(character.hp)
        setIsZombie(character.isZombie)
      }
    }
    getHp()
    let subscriptionId: number | null = null
    if (connection) {
      subscriptionId = connection.onAccountChange(character.mint, getHp)
    }
    return () => {
      if (subscriptionId) {
        connection.removeAccountChangeListener(subscriptionId)
      }
    }
  }, [connection, playerClient, character])
  const toast = useToast();
  const attack = useCallback(async () => {
    if (anchorProvider && playerClient && characterMint) {
      let tx = await playerClient.characterAttack(characterMint, character.mint)
      try {
        await playerClient.getProvider().sendAndConfirm(tx)
      } catch (e: any) {
        playerClient.handleTransactionError(e, toast);
      }
    }
  }, [anchorProvider, characterMint, character.mint, playerClient, toast])

  const revive = useCallback(async () => {
    if (anchorProvider && playerClient && characterMint) {
      let tx = await playerClient.characterUseItem(characterMint, character.mint, 1003)
      try {
        await playerClient.getProvider().sendAndConfirm(tx)
      } catch (e: any) {
        playerClient.handleTransactionError(e, toast);
      }
    }
  }, [anchorProvider, characterMint, character.mint, playerClient, toast])

  const fak = useCallback(async () => {
    if (anchorProvider && playerClient && characterMint) {
      let tx = await playerClient.characterUseItem(characterMint, character.mint, 1000)
      try {
        await playerClient.getProvider().sendAndConfirm(tx)
      } catch (e: any) {
        playerClient.handleTransactionError(e, toast);
      }
    }
  }, [anchorProvider, characterMint, character.mint, playerClient, toast])

  const movePlayer = useCallback(async (x: number, y: number) => {
    if (anchorProvider && playerClient && characterMint) {
      let tx = await playerClient.characterDrag(characterMint, character.mint, x, y)
      try {
        await playerClient.getProvider().sendAndConfirm(tx)
      } catch (e: any) {
        playerClient.handleTransactionError(e, toast);
      }
    }
  }, [anchorProvider, characterMint, character.mint, playerClient, toast])

  const dragSurvivor = useCallback(async () => {
    if (anchorProvider && playerClient && characterMint) {
      let tx = await playerClient.characterDrag(characterMint, character.mint, character.x, character.y)
      try {
        await playerClient.getProvider().sendAndConfirm(tx)
      } catch (e: any) {
        playerClient.handleTransactionError(e, toast);
      }
    }
  }, [anchorProvider, characterMint, character, playerClient, toast])

  function isAdjacent() {
    let result = false
    if (x !== null && y !== null) {
      let diffX = Math.abs(x - character.x)
      let diffY = Math.abs(y - character.y)
      if (diffX + diffY === 1) {
        result = true
      }
    }
    return result
  }

  function isSameTile() {
    let result = false
    if (x === character.x && y === character.y) {
      result = true;
    }
    return result
  }

  return (
    <>
      <Box borderColor='#A8B5B2' borderWidth='5px' margin='10px'>
        <HStack>
          <Box w='75px' h='95px' padding={'3px'}>
            <Image src={isZombie ? 'https://cdn.zedwars.com/images/zombie.png' : 'https://cdn.zedwars.com/images/survivor.png'} alt='Character' />
            <Box backgroundColor={'black'} textColor='white'>
              <Text fontSize={'xs'} align='center'>
                {hp} HP
              </Text>
            </Box>
          </Box>
          <Center>
            <VStack>
              <Text as="span" fontSize={'xl'} color='white'>{character.name}</Text>
              <HStack>
                {hp > 0 && (playerIsZombie || isZombie) && (isSameTile() || (hasRangedWeapon && isAdjacent())) && (
                  <Button size='sm' color='white' borderRadius='0' aria-label='Attack Character' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} onClick={attack}>
                    Attack
                  </Button>
                )}
                {isZombie && !playerIsZombie && hp > 0 && isSameTile() && (
                  <Button size='sm' color='white' borderRadius='0' aria-label='Revive Character' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} onClick={revive}>
                    Revive
                  </Button>
                )}
                {!isZombie && !playerIsZombie && hp > 0 && isSameTile() && (
                  <Button size='sm' color='white' borderRadius='0' aria-label='Revive Character' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} onClick={fak}>
                    Use FAK
                  </Button>
                )}
                {character.inventory.length > 0 && hp === 0 && isSameTile() && (
                  <Button size='sm' color='white' borderRadius='0' aria-label='Loot Character' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} onClick={onLootOpen}>
                    Loot
                  </Button>
                )}
                {hp === 0 && isZombie && !playerIsZombie && isSameTile() && (
                  <Button size='sm' color='white' borderRadius='0' aria-label='Loot Character' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} onClick={onMoveOpen}>
                    Move
                  </Button>
                )}
                {hp < 25 && !isZombie && playerIsZombie && isAdjacent() && (
                  <Button size='sm' color='white' borderRadius='0' aria-label='Loot Character' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} onClick={dragSurvivor}>
                    Drag
                  </Button>
                )}

              </HStack>
            </VStack>
          </Center>
        </HStack>
      </Box >

      <Modal isOpen={isLootOpen} onClose={onLootClose}>
        <ModalOverlay />
        <ModalContent color='white' borderRadius='0' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'}>
          <ModalHeader>Loot of {character.name}</ModalHeader>
          <ModalBody>
            <Center>
              <Wrap justify={'center'}>
                {character.inventory.map((item, idx) => {
                  return (
                    <WrapItem key={idx} >
                      <InventoryItem item={item} equipSlot={'loot'} target={character.mint} />
                    </WrapItem>
                  )
                })}
              </Wrap>
            </Center>

          </ModalBody>
          <Center>
            <ModalFooter>

              <Button onClick={onLootClose} color='white' borderRadius='0' aria-label='Close Modal' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }}>
                Close
              </Button>

            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>

      <Modal isOpen={isMoveOpen} onClose={onMoveClose}>
        <ModalOverlay />
        <ModalContent color='white' borderRadius='0' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'}>
          <ModalHeader>Move {character.name}</ModalHeader>
          <ModalBody>
            <Center>
              <VStack>
                <Button width={'150px'} size='sm' color='white' borderRadius='0' aria-label='Loot Character' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} onClick={() => { movePlayer(character.x, character.y - 1) }}>
                  North
                </Button>
                <Button width={'150px'} size='sm' color='white' borderRadius='0' aria-label='Loot Character' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} onClick={() => { movePlayer(character.x, character.y + 1) }}>
                  South
                </Button>
                <Button width={'150px'} size='sm' color='white' borderRadius='0' aria-label='Loot Character' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} onClick={() => { movePlayer(character.x + 1, character.y) }}>
                  East
                </Button>
                <Button width={'150px'} size='sm' color='white' borderRadius='0' aria-label='Loot Character' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} onClick={() => { movePlayer(character.x - 1, character.y) }}>
                  West
                </Button>
                <Text fontSize={'xs'}>Bodies can only be moved to adjacent tiles without barricades</Text>
              </VStack>
            </Center>

          </ModalBody>
          <Center>
            <ModalFooter>

              <Button onClick={onMoveClose} color='white' borderRadius='0' aria-label='Close Modal' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }}>
                Close
              </Button>

            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CharacterListItem
