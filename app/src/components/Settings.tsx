import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Icon,
  IconButton,
  Link,
  useDisclosure,
  useToast,
  WrapItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  VStack
} from '@chakra-ui/react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import RedeemItem from './RedeemItem'
import { pdas } from '../sdk'
import { usePlayerClient } from '../providers/usePlayerClient'
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { Metadata, Nft } from '@metaplex-foundation/js'
import { useCallback, useEffect, useState } from 'react'
import { useAnchorProvider } from '../providers/AnchorProviderProvider'
import { useDelegateKeypair } from '../providers/useDelegateKeypair'
import { useCharacter } from '../providers/CharacterProvider'

export const Settings = () => {
  const { characterMint } = useCharacter()
  const { playerClient } = usePlayerClient()
  const { anchorProvider } = useAnchorProvider()
  const { delegateKeypair, setDelegateKeypair } = useDelegateKeypair()
  const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure()
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure()
  const [items, setItems] = useState<PublicKey[]>([])
  const toast = useToast()
  const [isSessionEnabled, setIsSessionEnabled] = useState<boolean>(true)

  async function airdrop() {
    if (anchorProvider && playerClient && playerClient.playerPubkey) {
      let error = null
      try {
        await anchorProvider.connection.requestAirdrop(playerClient.playerPubkey, LAMPORTS_PER_SOL)
      } catch (e) {
        error = e
      }
      if (error) {
        toast({
          title: `Failed to airdrop, are you requesting too often?`,
          status: 'error',
          duration: 5000,
        })
      } else {
        toast({
          title: `Attempting to airdrop 1 sol to ${playerClient.playerPubkey}`,
          status: 'info',
          duration: 5000,
        })
      }
    }
  }

  const loadItems = useCallback(async () => {
    let config = await playerClient?.program.account.config.fetchNullable(pdas.config())
    let result = await playerClient?.metaplex.nfts().findAllByOwner({ owner: playerClient.playerPubkey })
    let mints: PublicKey[] = []
    if (result && config) {
      for (let i = 0; i < result.length; i++) {
        if (
          result[i].collection?.verified &&
          result[i].collection?.address.toBase58() === config.itemsCollectionMint.toBase58()
        ) {
          if (result[i].model === 'metadata') {
            mints.push((result[i] as Metadata).mintAddress)
          } else if (result[i].model === 'nft') {
            mints.push((result[i] as Nft).address)
          }
        }
      }
    }
    setItems(mints)
  }, [playerClient])

  async function startSession() {
    if (playerClient && anchorProvider && !delegateKeypair) {
      let delegateSecretKeyString = localStorage.getItem('delegateKeypair')
      let keypair = null
      if (delegateSecretKeyString) {
        console.log('delegate keypair already exists')

        keypair = Keypair.fromSecretKey(new Uint8Array(Object.values(JSON.parse(delegateSecretKeyString))))
      } else {
        console.log('creating a new delegate keypair to use')
        keypair = new Keypair()
        localStorage.setItem('delegateKeypair', JSON.stringify(keypair))
      }

      let hasError = false;
      let tx = await playerClient.createSession(keypair.publicKey, 60 * 60 * 24, 10_000_000)
      try {
        await anchorProvider.sendAndConfirm(tx, [keypair], { skipPreflight: true, commitment: 'confirmed' })
      } catch (e: any) {
        hasError = true
        console.log(e)
      } finally {
        if (!hasError) {
          toast({
            title: 'Session successfully created',
            status: 'success',
            duration: 2500,
          })
        }
      }

      setDelegateKeypair(keypair)
      setIsSessionEnabled(true)
    }
  }

  async function stopSession() {
    if (delegateKeypair) {
      setDelegateKeypair(null)
      setIsSessionEnabled(false)
      toast({
        title: 'Session successfully stopped',
        status: 'info',
        duration: 2500,
      })
    }
  }



  useEffect(() => {
    async function checkSession() {
      if (playerClient) {
        let session = await playerClient.program.account.session.fetchNullable(pdas.session(playerClient.playerPubkey))
        //console.log(pdas.session(playerClient.playerPubkey).toBase58());
        if (session && session.validUntil.toNumber() - Date.now() / 1000 > 60 * 60 && isSessionEnabled) {
          console.log('existing session account found and valid')
          let delegateSecretKeyString = localStorage.getItem('delegateKeypair')
          if (delegateSecretKeyString && !delegateKeypair) {
            let localKeypair = Keypair.fromSecretKey(new Uint8Array(Object.values(JSON.parse(delegateSecretKeyString))))
            if (localKeypair.publicKey.toBase58() === session.delegate.toBase58()) {
              setDelegateKeypair(localKeypair)
              setIsSessionEnabled(true)
            }
          }
        } else {
          console.log('no session account found or existing session is invalid, resetting delegate keypair')
          if (delegateKeypair) {
            setDelegateKeypair(null)
          }
        }
      }
    }

    checkSession()

    loadItems()
  }, [characterMint, playerClient, loadItems, delegateKeypair, isSessionEnabled, setDelegateKeypair, setIsSessionEnabled])

  return (
    <>
      <Box
        position={'absolute'}
        right={'0'}
        bottom='0'
        visibility={isSettingsOpen ? 'hidden' : 'visible'}
        onClick={onSettingsOpen}
      >
        <IconButton
          borderRadius='0'
          aria-label='View Settings'
          backgroundColor='#577277'
          borderColor='#A8B5B2'
          borderWidth={'3px'}
          _hover={{ borderColor: '#394A50' }}
          icon={
            <Icon viewBox='0 0 24 24' stroke='white' fill='white'>
              <path
                fillRule='evenodd'
                d='M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 01-.517.608 7.45 7.45 0 00-.478.198.798.798 0 01-.796-.064l-.453-.324a1.875 1.875 0 00-2.416.2l-.243.243a1.875 1.875 0 00-.2 2.416l.324.453a.798.798 0 01.064.796 7.448 7.448 0 00-.198.478.798.798 0 01-.608.517l-.55.092a1.875 1.875 0 00-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 01-.064.796l-.324.453a1.875 1.875 0 00.2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 01.796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 01.517-.608 7.52 7.52 0 00.478-.198.798.798 0 01.796.064l.453.324a1.875 1.875 0 002.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 01-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 001.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 01-.608-.517 7.507 7.507 0 00-.198-.478.798.798 0 01.064-.796l.324-.453a1.875 1.875 0 00-.2-2.416l-.243-.243a1.875 1.875 0 00-2.416-.2l-.453.324a.798.798 0 01-.796.064 7.462 7.462 0 00-.478-.198.798.798 0 01-.517-.608l-.091-.55a1.875 1.875 0 00-1.85-1.566h-.344zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z'
                clipRule='evenodd'
              />
            </Icon>
          }
        />
      </Box>
      <Modal isOpen={isSettingsOpen} onClose={onSettingsClose} isCentered size={'sm'}>
        <ModalOverlay />
        <ModalContent color='white' borderRadius='0' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'}>
          <ModalBody>
            <Center>
              <VStack>
                <WalletMultiButton
                  style={{
                    backgroundColor: '#577277',
                    color: 'white',
                    border: '3px solid #A8B5B2',
                    borderRadius: '0',
                    marginTop: '10px',
                    width: '200px',
                  }}
                />
                <Button
                  width={'200px'}
                  size='md'
                  color='white'
                  borderRadius='0'
                  aria-label='Redeem Item NFT'
                  backgroundColor='#577277'
                  borderColor='#A8B5B2'
                  borderWidth={'3px'}
                  _hover={{ borderColor: '#394A50' }}
                  onClick={async () => {
                    loadItems()
                    onSettingsClose()
                    onDrawerOpen()
                  }}
                >
                  Redeem Items
                </Button>
                <Link href='https://docs.zedwars.com' target='_blank'>
                  <Button
                    width={'200px'}
                    size='md'
                    color='white'
                    borderRadius='0'
                    aria-label='Redeem Item NFT'
                    backgroundColor='#577277'
                    borderColor='#A8B5B2'
                    borderWidth={'3px'}
                    _hover={{ borderColor: '#394A50' }}
                  >
                    Docs
                  </Button>
                </Link>
                <Link href='https://linktr.ee/zedwars' target='_blank'>
                  <Button
                    width={'200px'}
                    size='md'
                    color='white'
                    borderRadius='0'
                    aria-label='Redeem Item NFT'
                    backgroundColor='#577277'
                    borderColor='#A8B5B2'
                    borderWidth={'3px'}
                    _hover={{ borderColor: '#394A50' }}
                  >
                    Socials
                  </Button>
                </Link>
                {process.env.REACT_APP_STAGE && process.env.REACT_APP_STAGE === 'dev' && (
                  <Button
                    width={'200px'}
                    size='md'
                    color='white'
                    borderRadius='0'
                    aria-label='Redeem Item NFT'
                    backgroundColor='#577277'
                    borderColor='#A8B5B2'
                    borderWidth={'3px'}
                    _hover={{ borderColor: '#394A50' }}
                    onClick={async () => {
                      onSettingsClose()
                      airdrop()
                    }}
                  >
                    Airdrop
                  </Button>
                )}
                {!delegateKeypair && (
                  <Button
                    width={'200px'}
                    size='md'
                    color='white'
                    borderRadius='0'
                    aria-label='Redeem Item NFT'
                    backgroundColor='#577277'
                    borderColor='#A8B5B2'
                    borderWidth={'3px'}
                    _hover={{ borderColor: '#394A50' }}
                    onClick={async () => {
                      onSettingsClose()
                      startSession()
                    }}
                  >
                    Start Session
                  </Button>
                )}

                {delegateKeypair && (
                  <Button
                    width={'200px'}
                    size='md'
                    color='white'
                    borderRadius='0'
                    aria-label='Redeem Item NFT'
                    backgroundColor='#577277'
                    borderColor='#A8B5B2'
                    borderWidth={'3px'}
                    _hover={{ borderColor: '#394A50' }}
                    onClick={async () => {
                      onSettingsClose()
                      stopSession()
                    }}
                  >
                    Stop Session
                  </Button>
                )}
              </VStack>
            </Center>

          </ModalBody>
          <Center>
            <ModalFooter>

              <Button onClick={onSettingsClose} color='white' borderRadius='0' aria-label='Close Modal' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }}>
                Close
              </Button>

            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
      <Drawer placement={'bottom'} onClose={onDrawerClose} isOpen={isDrawerOpen}>
        <DrawerOverlay />
        <DrawerContent
          backgroundColor={'#577277'}
          height={'200px'}
          borderColor='#A8B5B2'
          borderWidth={'10px'}
          borderLeft='none'
          borderRight='none'
          borderBottom='none'
          color={'white'}
        >
          <DrawerBody>
            <Center>
              {items.length === 0 && "No item NFT's found."}
              {items.map((item) => {
                return (
                  <WrapItem>
                    <RedeemItem size={'150px'} mint={item} updateItems={loadItems}></RedeemItem>
                  </WrapItem>
                )
              })}
            </Center>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
