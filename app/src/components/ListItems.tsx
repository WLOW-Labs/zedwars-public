import { Box, Text, Center, Wrap } from '@chakra-ui/react'
import { useConnection } from '@solana/wallet-adapter-react'
import React from 'react'
import { useCharacter } from '../providers/CharacterProvider'
import { usePlayerClient } from '../providers/usePlayerClient'
import { pdas } from '../sdk'
import InventoryItem from './InventoryItem'

const ListItems: React.FC = () => {
  const [items, setItems] = React.useState<number[]>([])
  const [maxInventory, setMaxInventory] = React.useState<number>(0)
  const { x: characterX, y: characterY, characterMint } = useCharacter()
  const { playerClient } = usePlayerClient()
  const { connection } = useConnection()
  React.useEffect(() => {
    async function loadItems() {
      if (playerClient && characterMint) {
        let character = await playerClient.program.account.character.fetchNullable(pdas.character(characterMint))
        let config = await playerClient.program.account.config.fetch(pdas.config());
        if (character) {
          setItems(character.inventory)
          setMaxInventory(character.backpackSpace + config.configVariables[39])
        }
      }
    }
    loadItems()
    let characterSubscriptionId: number | null = null
    if (connection && characterMint) {
      characterSubscriptionId = connection.onAccountChange(pdas.character(characterMint), loadItems)
    }
    return () => {
      if (characterSubscriptionId) {
        connection.removeAccountChangeListener(characterSubscriptionId)
      }
    }
  }, [characterMint, characterX, characterY, connection, playerClient])

  return (
    <Center>
      <Box backgroundColor={'#577277'}>
        <Text textAlign='center' color='white'>Inventory ({items.length}/{maxInventory})</Text>
        <Wrap justify={'center'}>
          {items.map((item, idx) => {
            return (
              <InventoryItem item={item} key={idx} equipSlot={null} target={null} />
            )
          })}
        </Wrap>

      </Box>
    </Center>

  )
}

export default ListItems
