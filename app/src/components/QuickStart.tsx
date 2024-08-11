import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Link,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react'

export const QuickStart = () => {
  const { isOpen: isQuickStartOpen, onOpen: onQuickStartOpen, onClose: onQuickStartClose } = useDisclosure()

  return (
    <>
      <Box>
        <AbsoluteCenter axis='horizontal' bottom={'0'}>
          <Button
            width={'200px'}
            size='md'
            color='white'
            borderRadius='0'
            aria-label='Quick Start'
            backgroundColor='#577277'
            borderColor='#A8B5B2'
            borderWidth={'3px'}
            _hover={{ borderColor: '#394A50' }}
            onClick={onQuickStartOpen}
          >
            Quick Start
          </Button>
        </AbsoluteCenter>
      </Box>

      <Modal isOpen={isQuickStartOpen} onClose={onQuickStartClose} isCentered>
        <ModalOverlay />
        <ModalContent
          color='white'
          borderRadius='0'
          backgroundColor='#577277'
          borderColor='#A8B5B2'
          borderWidth={'3px'}
        >
          <ModalHeader>Getting Started</ModalHeader>
          <ModalBody>
            <UnorderedList>
              <ListItem>Make sure you have some SOL for minting and sending transactions</ListItem>
              <ListItem>
                Once you create a character, join the game by selecting zombie or survivor on the bottom of the
                character card
              </ListItem>
              <ListItem>
                As a survivor you can search non street tiles for loot, barricade tiles, unlock skills and attack
                zombies
              </ListItem>
              <ListItem>As a zombie you can attack survivors and zombies, loot corpses and destroy barricades</ListItem>
              <ListItem>If you die, any items you have on you can be looted by other players.</ListItem>
              <ListItem>
                You can mint an NFT from an item in your inventory, this removes the item from your inventory and mints
                an NFT to your wallet
              </ListItem>
              <ListItem>
                You can redeem an NFT using the menu in the bottom right corner of your screen. This burns the NFT and
                adds the item to the currently active character
              </ListItem>
              <ListItem>
                Check out the docs by clicking{' '}
                <Link href='https://docs.zedwars.com' target='_blank'>
                  here
                </Link>{' '}
                or in the menu in the bottom right.
              </ListItem>
            </UnorderedList>
          </ModalBody>
          <Center>
            <ModalFooter>
              <Button
                onClick={onQuickStartClose}
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
