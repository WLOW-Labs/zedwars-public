import {
  Card,
  CardBody,
  Box,
  Flex,
  Divider,
  Icon,
  HStack,
  Stack,
  Text,
  Image,
  Progress,
  IconButton,
  useToast,
  Spinner,
  Center,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  UnorderedList,
  ListItem,
  ModalBody,
  ModalFooter,
  ModalContent,
  Link,
} from '@chakra-ui/react'
import React, { Fragment, useEffect, useMemo, useCallback } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { useCharacter } from '../providers/CharacterProvider'
import { usePlayerClient } from '../providers/usePlayerClient'
import { CountdownTimer } from './CountdownTimer'
import { Event } from './Event'
import InventoryItem from './InventoryItem'

interface Props {
  openCharacterSelection: () => void
  openSkillsSelection: () => void
}


const CharacterCard: React.FC<Props> = ({ openCharacterSelection, openSkillsSelection }) => {
  const { isOpen: isEventHistoryOpen, onOpen: onEventHistoryOpen, onClose: onEventHistoryClose } = useDisclosure()
  const { isOpen: isStatsOpen, onOpen: onStatsOpen, onClose: onStatsClose } = useDisclosure()
  const [configuration, setConfiguration] = React.useState<any>(null)
  const {
    characterMint,
    name,
    hp,
    energy,
    xp,
    isZombie,
    equippedArmor,
    equippedBackpack,
    equippedWeapon,
    level,
    energyUpdatedAt,
    data,
  } = useCharacter()

  const { playerClient } = usePlayerClient()

  const toast = useToast()

  useEffect(() => {
    async function loadConfiguration() {
      if (playerClient) {
        setConfiguration(await playerClient.config)
      }
    }
    loadConfiguration()
  }, [playerClient])

  const getMissionTypeString = (missionType: any) => {
    if (missionType.gainXp) return 'Gain XP';
    if (missionType.findItems) return 'Find Items';
    if (missionType.buildBarricades) return 'Build Barricades';
    if (missionType.killZombies) return 'Kill Zombies';
    if (missionType.installGenerator) return 'Install Generator';
    return 'Unknown';
  }

  const maxHp = useMemo(() => {
    if (data.skills && data.skills.length > 3 && data.skills[3]) {
      return configuration?.configVariables[37] + configuration?.configVariables[53];
    }
    return configuration?.configVariables[37]
  }, [configuration, data])
  const xpPerLevel = useMemo(() => {
    if (level) {
      return configuration?.configVariables[41] * level;
    }
    return configuration?.configVariables[41];
  }, [configuration, level])
  const energyRegenRate = useMemo(() => {
    return configuration?.configVariables[32]
  }, [configuration])

  const timeDiff = Date.now() / 1000 - energyUpdatedAt!
  const timeToWait = Math.max(energyRegenRate - timeDiff, 0)

  const revive = useCallback(async () => {
    if (playerClient && characterMint) {
      let tx = await playerClient.characterStandBackUp(characterMint)
      try {
        await playerClient.getProvider().sendAndConfirm(tx, [], { skipPreflight: true, commitment: 'confirmed' })
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
  }, [characterMint, playerClient, toast])

  const generateMissions = useCallback(async () => {
    if (playerClient && characterMint) {
      let tx = await playerClient.generateMissions(characterMint)
      try {
        await playerClient.getProvider().sendAndConfirm(tx, [], { skipPreflight: true, commitment: 'confirmed' })
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
  }, [characterMint, playerClient, toast])

  const startCourier = useCallback(async () => {
    if (playerClient && characterMint) {
      let tx = await playerClient.startCourierMission(characterMint, data.inventory[0])
      try {
        await playerClient.getProvider().sendAndConfirm(tx, [], { skipPreflight: true, commitment: 'confirmed' })
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
  }, [characterMint, playerClient, toast, data])

  const endCourier = useCallback(async () => {
    if (playerClient && characterMint) {
      let tx = await playerClient.endCourierMission(characterMint)
      try {
        await playerClient.getProvider().sendAndConfirm(tx, [], { skipPreflight: true, commitment: 'confirmed' })
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
  }, [characterMint, playerClient, toast])

  const content = (
    <Fragment>
      <Stack>
        <Flex justifyContent={'space-between'}>
          <Box onClick={openCharacterSelection}>
            <IconButton
              borderRadius='0'
              aria-label='Change Characters'
              backgroundColor='#577277'
              borderColor='#A8B5B2'
              borderWidth={'3px'}
              _hover={{ borderColor: '#394A50' }}
              icon={
                <Icon viewBox='0 0 24 24' stroke='white' fill='white'>
                  <path
                    fillRule='evenodd'
                    d='M15.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H7.5a.75.75 0 010-1.5h11.69l-3.22-3.22a.75.75 0 010-1.06zm-7.94 9a.75.75 0 010 1.06l-3.22 3.22H16.5a.75.75 0 010 1.5H4.81l3.22 3.22a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06 0z'
                    clipRule='evenodd'
                  />
                </Icon>
              }
            />
          </Box>
          <Text fontSize='2xl' color='white' onClick={onStatsOpen}>
            <Link>{name}</Link>
          </Text>
          <Box>
            <IconButton
              onClick={openSkillsSelection}
              borderRadius='0'
              aria-label='View Skills'
              backgroundColor='#577277'
              borderColor='#A8B5B2'
              borderWidth={'3px'}
              _hover={{ borderColor: '#394A50' }}
              icon={
                <Icon viewBox='0 0 24 24' fill='white' stroke='white'>
                  <path d='M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z' />
                </Icon>
              }
            />
          </Box>
        </Flex>
        <Box borderColor={'#A8B5B2'} borderWidth={'10px'}>
          <Image src={isZombie ? 'https://cdn.zedwars.com/images/zombie.png' : 'https://cdn.zedwars.com/images/survivor.png'} alt='Character' />
          <Box backgroundColor={'black'} textColor={'white'}>
            <Flex
              justifyContent={'space-between'}
              paddingRight='5px'
              paddingBottom='3px'
              paddingTop='3px'
              paddingLeft='5px'
            >
              <Text as='span' fontSize={'xs'} align='left'>
                {hp}/{maxHp} Health
              </Text>
              <Icon onClick={onEventHistoryOpen} boxSize={5} as={AiOutlineInfoCircle} _hover={{ color: '#394A50', cursor: 'pointer' }} />
              <Text as='span' fontSize={'xs'} align='right'>
                {energy} Stamina
              </Text>
            </Flex>
          </Box>
        </Box>
        <Text fontSize='sm' color='white' textAlign={'center'}>
          lvl {level}
        </Text>
        <Progress value={((xp || 0) / xpPerLevel) * 100} />
      </Stack>
      {hp === 0 && (
        <Center pt={2}>
          <Button onClick={revive} borderRadius='0'
            aria-label='Revive as a Zombie'
            backgroundColor='#577277'
            borderColor='#A8B5B2'
            borderWidth={'3px'}
            color={'white'}
            _hover={{ borderColor: '#394A50' }}>
            Stand Up
          </Button>
        </Center>
      )}
      {isZombie && hp > 0 && (
        <HStack paddingTop='5px'>
          <Box borderColor='#577277' borderWidth={'5px'} width='75px' height='75px'></Box>
          <InventoryItem item={equippedWeapon} equipSlot={'weapon'} target={null} />
        </HStack>
      )}
      {!isZombie && hp > 0 && (
        <HStack paddingTop='5px'>
          <InventoryItem item={equippedWeapon} equipSlot={'weapon'} target={null} />
          <InventoryItem item={equippedArmor} equipSlot={'armor'} target={null} />
          <InventoryItem item={equippedBackpack} equipSlot={'backpack'} target={null} />
        </HStack>
      )}

      <Text textAlign='center' fontSize='lg' color='white'>
        Next Stamina in <CountdownTimer dateTo={Date.now() + 1000 * timeToWait} />
      </Text>

      <Modal isOpen={isEventHistoryOpen} onClose={onEventHistoryClose} size={'lg'}>
        <ModalOverlay />
        <ModalContent color='white' borderRadius='0' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'}>
          <ModalHeader>Recent events for {name}</ModalHeader>
          <ModalBody>
            <UnorderedList>
              {

                data.events.toReversed().map((event: any, idx: number) => {
                  return <ListItem key={'idx'}><Event eventTime={event.timestamp.toNumber()} eventMessage={event.message} /></ListItem>
                })}

            </UnorderedList>
          </ModalBody>
          <Center>
            <ModalFooter>

              <Button onClick={onEventHistoryClose} color='white' borderRadius='0' aria-label='Close Modal' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }}>
                Close
              </Button>

            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>

      <Modal isOpen={isStatsOpen} onClose={onStatsClose}>
        <ModalOverlay />
        <ModalContent color='white' borderRadius='0' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'}>
          <ModalHeader>Stats for {name} <Button onClick={generateMissions} color='white' borderRadius='0' aria-label='Close Modal' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }}>
            Missions
          </Button>
          <Button onClick={startCourier} color='white' borderRadius='0' aria-label='Close Modal' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }}>
            Start Courier
          </Button>
          <Button onClick={endCourier} color='white' borderRadius='0' aria-label='Close Modal' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }}>
            Turn in Courier
          </Button>
          </ModalHeader>
          <ModalBody>
            <Text>XP Gained: {data.stats[0]}</Text>
            <Text>Barricades Built: {data.stats[1]}</Text>
            <Text>Barricades Destroyed: {data.stats[2]}</Text>
            <Text>Generators Destroyed: {data.stats[3]}</Text>
            <Text>Items Crafted: {data.stats[4]}</Text>
            <Text>Items Found: {data.stats[5]}</Text>
            <Text>Zombies Killed: {data.stats[6]}</Text>
            <Text>Survivors Killed: {data.stats[7]}</Text>
            <Divider />
            {
              data.weeklyMissions.map((mission: any) => {
                return <Text>{mission.current}/{mission.required} {getMissionTypeString(mission.missionType)}</Text>
              })
            }
            <Divider />
            { data.courierMission && (<Text>Courier Active to {data.courierMission.destination.x},{data.courierMission.destination.y}</Text>)}
          </ModalBody>
          <Center>
            <ModalFooter>

              <Button onClick={onStatsClose} color='white' borderRadius='0' aria-label='Close Modal' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }}>
                Close
              </Button>

            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
    </Fragment>
  )

  return (
    <Card backgroundColor={'#577277'}>
      <CardBody paddingTop={'5px'} paddingBottom={'5px'}>
        {configuration == null ? (
          <Center padding={'40px 0'}>
            <Spinner size='xl' thickness='3px' color='#A8B5B2' />
          </Center>
        ) : (
          content
        )}
      </CardBody>
      <Divider />
    </Card>
  )
}

export default CharacterCard
