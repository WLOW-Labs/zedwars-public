import {
  Box,
  Center,
  Text,
  Button,
  useDisclosure,
  VStack,
  useToast,
  Icon,
  IconButton,
  Modal,
  ModalOverlay,
  ModalHeader,
  UnorderedList,
  ListItem,
  ModalBody,
  ModalFooter,
  ModalContent,
} from '@chakra-ui/react'
import { CloseIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAnchorProvider } from '../providers/AnchorProviderProvider'
import { getNameFromTileType, useCharacter } from '../providers/CharacterProvider'
import { usePlayerClient } from '../providers/usePlayerClient'
import CharacterCard from './CharacterCard'
import ListCharacters from './ListCharacters'
import ListItems from './ListItems'
import Map from './Map'
import Skills from './Skills'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { itemNames } from '../data/itemNames'
import { TileType } from '../sdk/arg_types'
import { pdas } from '../sdk'
import { MatchMediaType, withMatchMedia } from '../hooks/withMatchMedia'
import { zIndexMap } from '../styles/theme'
import { useConnection } from '@solana/wallet-adapter-react'

interface GameScreenProps {
  openCharacterSelection: () => void
}

export interface Tile {
  x: number
  y: number
}

interface TileData {
  name: string
  barricades: number
  zombies: number
  survivors: number
  generatorInstalled: boolean
  poweredUntil: Date
  tileType: TileType
}

interface ItemWeight {
  itemId: number
  weight: number
}

const MenuIcon = ({ menuOpened, setMenuOpened, direction }: any) => {
  return (
    <IconButton
      aria-label='Menu'
      backgroundColor='#577277'
      borderColor='#A8B5B2'
      borderRadius='0'
      borderWidth={'3px'}
      _hover={{ borderColor: '#394A50' }}
      zIndex={zIndexMap.sidebarMenu}
      icon={
        menuOpened ? (
          <CloseIcon color={'#fff'} />
        ) : direction === 'left' ? (
          <ArrowLeftIcon color={'#fff'} />
        ) : (
          <ArrowRightIcon color={'#fff'} />
        )
      }
      onClick={setMenuOpened}
    />
  )
}

const GameScreen = ({
  openCharacterSelection,
  isTablet,
  isDesktop,
  isMobile,
  isSmallDesktop,
}: GameScreenProps & MatchMediaType) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isTileInfoOpen, onOpen: onTileInfoOpen, onClose: onTileInfoClose } = useDisclosure()
  const [weights, setWeights] = useState<ItemWeight[]>([])
  const { characterMint, x, y, hp, isZombie, data } = useCharacter()
  const [selectedTile, setSelectedTile] = useState<Tile>({ x, y })
  const [tile, setTile] = useState<TileData>({
    name: '',
    barricades: 0,
    zombies: 0,
    survivors: 0,
    generatorInstalled: false,
    poweredUntil: new Date(0),
    tileType: { street: true },
  })
  const { playerClient } = usePlayerClient()
  const { connection } = useConnection()
  const { anchorProvider } = useAnchorProvider()
  const toast = useToast()
  const [characterSectionDisplayed, setCharacterSectionDisplayed] = useState<boolean>(false)
  const [tileSectionDisplayed, setTileSectionDisplayed] = useState<boolean>(false)

  useEffect(() => {
    let mapTilePDA = pdas.mapTile(selectedTile.x, selectedTile.y)
    let tileSubscriptionId: number | null = null
    async function getTile() {
      if (playerClient) {
        const mapTile = await playerClient.program.account.mapTile.fetchNullable(mapTilePDA)
        if (mapTile) {
          let x = new Date(0)
          x.setUTCSeconds(mapTile.hasPowerUntil.toNumber())
          setTile({
            barricades: mapTile.numBarricades,
            survivors: mapTile.numSurvivors,
            zombies: mapTile.numZombies,
            generatorInstalled: mapTile.hasGenerator,
            poweredUntil: x,
            tileType: mapTile.tileType,
            name: getNameFromTileType(mapTile.tileType),
          })
          let config = await playerClient.config
          let a = config.itemRandomWeights as Array<Array<ItemWeight>>
          let idx = await playerClient.getTileTypeIndex(mapTile.tileType)
          setWeights(a[idx])
        }
      }
    }
    tileSubscriptionId = connection.onAccountChange(mapTilePDA, getTile)
    getTile()

    return () => {
      if (tileSubscriptionId) {
        connection.removeAccountChangeListener(tileSubscriptionId)
      }
    }
  }, [playerClient, selectedTile, connection])

  function isAdjacent() {
    let result = false
    if (x !== null && y !== null) {
      let diffX = Math.abs(x - selectedTile.x)
      let diffY = Math.abs(y - selectedTile.y)
      if (diffX + diffY === 1) {
        result = true
      }
    }
    return result
  }

  function isSameTile() {
    let result = false
    if (x === selectedTile.x && y === selectedTile.y) {
      result = true
    }
    return result
  }

  const search = useCallback(async () => {
    if (playerClient && anchorProvider && characterMint) {
      let config = await playerClient.config
      if (data.inventory.length >= data.backpackSpace + config.configVariables[39]) {
        toast({
          title: 'Your inventory is full.',
          status: 'error',
          duration: 5000,
        })
        return
      }
      let tx = await playerClient.characterSearch(characterMint)
      try {
        await playerClient.getProvider().sendAndConfirm(tx, [], { skipPreflight: true, commitment: 'confirmed' })
      } catch (e: any) {
        let errorMessage = e.logs.join().match(/Error Message: ([^,]+)/)[1]
        toast({
          title: errorMessage,
          status: 'error',
          duration: 5000,
        })
      }
    }
  }, [playerClient, anchorProvider, characterMint, data, toast])

  const buildBarricade = useCallback(async () => {
    if (playerClient && anchorProvider && characterMint) {
      if (!data.skills[1]) {
        toast({
          title: 'You need the barricade builder skill to build barricades.',
          status: 'error',
          duration: 5000,
        })
        return
      }
      let tx = await playerClient.characterBarricade(characterMint)
      try {
        await playerClient.getProvider().sendAndConfirm(tx, [], { skipPreflight: true, commitment: 'confirmed' })
      } catch (e: any) {
        let errorMessage = e.logs.join().match(/Error Message: ([^,]+)/)[1]
        toast({
          title: errorMessage,
          status: 'error',
          duration: 5000,
        })
      }
    }
  }, [anchorProvider, characterMint, playerClient, data, toast])

  const attackBarricade = useCallback(async () => {
    if (playerClient && anchorProvider && characterMint) {
      let tx = await playerClient.characterDestroyBarricade(characterMint, x, y)
      try {
        await playerClient.getProvider().sendAndConfirm(tx, [], { skipPreflight: true, commitment: 'confirmed' })
      } catch (e: any) {
        let errorMessage = e.logs.join().match(/Error Message: ([^,]+)/)[1]
        toast({
          title: errorMessage,
          status: 'error',
          duration: 5000,
        })
      }
    }
  }, [anchorProvider, characterMint, playerClient, x, y, toast])

  const destroyGenerator = useCallback(async () => {
    if (playerClient && anchorProvider && characterMint) {
      let tx = await playerClient.characterDestroyGenerator(characterMint, x, y)
      try {
        await playerClient.getProvider().sendAndConfirm(tx, [], { skipPreflight: true, commitment: 'confirmed' })
      } catch (e: any) {
        let errorMessage = e.logs.join().match(/Error Message: ([^,]+)/)[1]
        toast({
          title: errorMessage,
          status: 'error',
          duration: 5000,
        })
      }
    }
  }, [anchorProvider, characterMint, playerClient, x, y, toast])

  const collapseLeftMenu = useMemo(() => isTablet || isMobile, [isTablet, isMobile])
  const collapseRightMenu = useMemo(() => isSmallDesktop || isTablet || isMobile, [isSmallDesktop, isTablet, isMobile])

  return (
    <>
      {collapseRightMenu && !tileSectionDisplayed ? (
        <Box position={'fixed'} right={0} top={'180px'} zIndex={zIndexMap.sidebarMenu}>
          <MenuIcon
            menuOpened={tileSectionDisplayed}
            setMenuOpened={() => {
              setTileSectionDisplayed(!tileSectionDisplayed)
              if (isMobile) {
                setCharacterSectionDisplayed(false)
              }
            }}
            direction='left'
          />
        </Box>
      ) : null}
      {collapseLeftMenu && !characterSectionDisplayed ? (
        <Box position={'fixed'} left={0} top={'180px'} zIndex={zIndexMap.sidebarMenu}>
          <MenuIcon
            menuOpened={characterSectionDisplayed}
            setMenuOpened={() => {
              setCharacterSectionDisplayed(!characterSectionDisplayed)
              if (isMobile) {
                setTileSectionDisplayed(false)
              }
            }}
          />
        </Box>
      ) : null}
      <Box padding={'25px'} position={'relative'}>
        <Box display={'flex'} gap={'25px'} justifyContent={'center'}>
          <Box
            width={'300px'}
            height={'770px'}
            borderColor={'#A8B5B2'}
            borderWidth={'10px'}
            backgroundColor={'#577277'}
            zIndex={zIndexMap.sidebarMenu}
            {...(collapseLeftMenu
              ? { position: 'absolute', left: '0', display: characterSectionDisplayed ? 'block' : 'none' }
              : {})}
          >
            <Box position='absolute' left='100%' top='100px' {...(!collapseLeftMenu ? { display: 'none' } : {})}>
              <MenuIcon
                menuOpened={characterSectionDisplayed}
                setMenuOpened={() => {
                  setCharacterSectionDisplayed(!characterSectionDisplayed)
                  if (isMobile) {
                    setTileSectionDisplayed(false)
                  }
                }}
                placement='left'
              />
            </Box>
            <CharacterCard
              openCharacterSelection={openCharacterSelection}
              openSkillsSelection={() => {
                setCharacterSectionDisplayed(false)
                onOpen()
              }}
            />
            {hp !== 0 && (
              <Box
                mt={2}
                overflow='scroll'
                overflowX={'hidden'}
                height='250px'
                sx={{ '-MsOverflowStyle': 'none', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}
              >
                <ListItems />
              </Box>
            )}
          </Box>
          <Box height={'770px'} borderColor={'#A8B5B2'} borderWidth={'10px'}>
            {!isOpen && <Map selectedTile={selectedTile} setSelectedTile={setSelectedTile} />}
            {isOpen && <Skills closeSkillsSelection={onClose} />}
          </Box>
          <VStack
            backgroundColor={'#577277'}
            zIndex={zIndexMap.sidebarMenu}
            height={'770px'}
            flexDirection={'column'}
            borderColor={'#A8B5B2'}
            borderRightWidth={'10px'}
            borderLeftWidth={'10px'}
            {...(collapseRightMenu
              ? { position: 'absolute', right: '0', display: tileSectionDisplayed ? 'flex' : 'none' }
              : {})}
          >
            <Box
              width={'300px'}
              height={'200px'}
              borderColor={'#A8B5B2'}
              borderTopWidth={'10px'}
              borderBottomWidth={'10px'}
              overflow={'scroll'}
              sx={{ '-MsOverflowStyle': 'none', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}
              color={'white'}
            >
              <Box>
                <Center paddingLeft={'15px'}>
                  {tile?.name} ({selectedTile?.x}, {selectedTile?.y})
                  <Icon
                    onClick={onTileInfoOpen}
                    boxSize={5}
                    as={AiOutlineInfoCircle}
                    _hover={{ color: '#394A50', cursor: 'pointer' }}
                  />
                </Center>
                <Text fontSize={'small'} paddingLeft={'15px'}>
                  Barricades: {tile?.barricades} | Zombies: {tile?.zombies} | Survivors: {tile?.survivors}
                </Text>
                <Text fontSize={'small'} paddingLeft={'15px'}>
                  Generator Installed: {tile?.generatorInstalled ? 'True' : 'False'}
                </Text>
                {tile && tile.generatorInstalled && tile.poweredUntil.getTime() > Date.now() && (
                  <Text fontSize={'small'} paddingLeft={'15px'}>
                    Powered for ~{Math.round((tile.poweredUntil.getTime() - Date.now()) / 36e5)} hours
                  </Text>
                )}
                {!isZombie && isSameTile() && !tile.tileType.street && (
                  <>
                    <Center>
                      <Button
                        onClick={buildBarricade}
                        width={'250px'}
                        size='md'
                        color='white'
                        borderRadius='0'
                        aria-label='Build Barricade'
                        backgroundColor='#577277'
                        borderColor='#A8B5B2'
                        borderWidth={'3px'}
                        _hover={{ borderColor: '#394A50' }}
                      >
                        Build Barricade
                      </Button>
                    </Center>
                    <Center>
                      <Button
                        onClick={search}
                        mt={'1'}
                        width={'250px'}
                        size='md'
                        color='white'
                        borderRadius='0'
                        aria-label='Search Tile'
                        backgroundColor='#577277'
                        borderColor='#A8B5B2'
                        borderWidth={'3px'}
                        _hover={{ borderColor: '#394A50' }}
                      >
                        Search Tile
                      </Button>
                    </Center>
                  </>
                )}
                {isZombie &&
                  tile?.generatorInstalled &&
                  isSameTile() &&
                  selectedTile.x === x &&
                  selectedTile.y === y && (
                    <Center>
                      <Button
                        onClick={destroyGenerator}
                        mt={'1'}
                        width={'250px'}
                        size='md'
                        color='white'
                        borderRadius='0'
                        aria-label='Destroy Generator'
                        backgroundColor='#577277'
                        borderColor='#A8B5B2'
                        borderWidth={'3px'}
                        _hover={{ borderColor: '#394A50' }}
                      >
                        Destroy Generator
                      </Button>
                    </Center>
                  )}
                {isZombie && tile && tile.barricades > 0 && (isAdjacent() || isSameTile()) && (
                  <Center>
                    <Button
                      onClick={attackBarricade}
                      mt={'1'}
                      width={'250px'}
                      size='md'
                      color='white'
                      borderRadius='0'
                      aria-label='Attack Barricade'
                      backgroundColor='#577277'
                      borderColor='#A8B5B2'
                      borderWidth={'3px'}
                      _hover={{ borderColor: '#394A50' }}
                    >
                      Attack Barricade
                    </Button>
                  </Center>
                )}
              </Box>
            </Box>
            <Box
              width={'300px'}
              flex={1}
              borderColor={'#A8B5B2'}
              borderTopWidth={'10px'}
              borderBottomWidth={'10px'}
              overflow={'scroll'}
              sx={{ '-MsOverflowStyle': 'none', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}
            >
              <Box>
                <ListCharacters selectedTile={selectedTile} />
              </Box>
            </Box>
            <Box {...(!collapseRightMenu ? { display: 'none' } : {})} position='absolute' right='100%' top='100px'>
              <MenuIcon
                menuOpened={tileSectionDisplayed}
                setMenuOpened={() => {
                  setTileSectionDisplayed(!tileSectionDisplayed)
                  if (isMobile) {
                    setCharacterSectionDisplayed(false)
                  }
                }}
              />
            </Box>
          </VStack>
        </Box>
      </Box>
      <Modal isOpen={isTileInfoOpen} onClose={onTileInfoClose}>
        <ModalOverlay />
        <ModalContent
          color='white'
          borderRadius='0'
          backgroundColor='#577277'
          borderColor='#A8B5B2'
          borderWidth={'3px'}
        >
          <ModalHeader>{tile?.name} Loot Table</ModalHeader>
          <ModalBody>
            <UnorderedList>
              {weights.map((weight) => {
                return (
                  <ListItem>
                    {itemNames[weight.itemId]}:{' '}
                    {Number(weight.weight / 10000).toLocaleString(undefined, {
                      style: 'percent',
                      minimumFractionDigits: 2,
                    })}
                  </ListItem>
                )
              })}
            </UnorderedList>
          </ModalBody>
          <Center>
            <ModalFooter>
              <Button
                onClick={onTileInfoClose}
                color='white'
                borderRadius='0'
                aria-label='Close Modal'
                backgroundColor='#577277'
                borderColor='#A8B5B2'
                borderWidth={'3px'}
                _hover={{ borderColor: '#394A50' }}
              >
                Close
              </Button>
            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
    </>
  )
}

export default withMatchMedia(GameScreen)
