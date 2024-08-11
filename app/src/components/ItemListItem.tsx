import { Button, Td, Tr } from '@chakra-ui/react'
import { useConnection } from '@solana/wallet-adapter-react'
import React, { useCallback } from 'react'
import { useCharacter } from '../providers/CharacterProvider'
import { usePlayerClient } from '../providers/usePlayerClient'
import { pdas } from '../sdk'
import { useAnchorProvider } from '../providers/AnchorProviderProvider'

interface Props {
  item: number
}

const CharacterListItem: React.FC<Props> = ({ item: item_id }) => {
  const [name, setName] = React.useState<string>('')
  const [count] = React.useState<number>(0)
  const { playerClient } = usePlayerClient()
  const { connection } = useConnection()
  const { characterMint } = useCharacter()
  const [canUnequip] = React.useState<boolean>(false)
  const [canEquip, setCanEquip] = React.useState<boolean>(false)
  const { anchorProvider } = useAnchorProvider()

  React.useEffect(() => {
    async function getName() {
      if (playerClient) {
        let item = await playerClient.program.account.item.fetch(pdas.item(item_id))
        setName(item.name);
      }
    }
    async function getEquiptability() {
      if (characterMint && playerClient) {
        let character = await playerClient.program.account.character.fetchNullable(pdas.character(characterMint))
        let item = await playerClient.program.account.item.fetchNullable(pdas.item(item_id))
        if (character && item) {
          setCanEquip(true)
        }
      }
    }

    getName()
    getEquiptability()

    let characterSubscriptionId: number | null = null
    if (characterMint) {
      characterSubscriptionId = connection.onAccountChange(pdas.character(characterMint), getEquiptability)
    }
    return () => {
      if (characterSubscriptionId !== null) {
        connection.removeAccountChangeListener(characterSubscriptionId)
      }
    }
  }, [characterMint, connection, item_id, name, playerClient])
  const handleEquip = useCallback(async () => {
    if (playerClient && anchorProvider && characterMint) {
      let tx = await playerClient.characterEquipItem(characterMint, item_id)
      await playerClient.getProvider().sendAndConfirm(tx, [], { skipPreflight: true, commitment: 'confirmed' })
    }
  }, [anchorProvider, characterMint, item_id, playerClient])
  const handleUnequip = useCallback(async () => {
    if (playerClient && anchorProvider && characterMint) {
      let tx = await playerClient.characterUnequipItem(characterMint, { weapon: {} })
      await playerClient.getProvider().sendAndConfirm(tx, [], { skipPreflight: true, commitment: 'confirmed' })
    }
  }, [anchorProvider, characterMint, playerClient])
  const handleUse = useCallback(async () => {
    if (playerClient && anchorProvider && characterMint) {
      let tx = await playerClient.characterUseItem(characterMint, characterMint, item_id)
      await playerClient.getProvider().sendAndConfirm(tx, [], { skipPreflight: true, commitment: 'confirmed' })
    }
  }, [anchorProvider, characterMint, item_id, playerClient])
  const handleDestroy = useCallback(async () => {
    if (playerClient && anchorProvider && characterMint) {
      let tx = await playerClient.characterDestroyItem(characterMint, item_id)
      await playerClient.getProvider().sendAndConfirm(tx, [], { skipPreflight: true, commitment: 'confirmed' })
    }
  }, [anchorProvider, characterMint, item_id, playerClient])
  return (
    <Tr>
      <Td>{name}</Td>
      <Td>{count}</Td>
      {canUnequip ? (
        <Td>
          <Button variant={'link'} onClick={handleUnequip}>
            Unequip
          </Button>
        </Td>
      ) : canEquip ? (
        <Td>
          <Button variant={'link'} onClick={handleEquip}>
            Equip
          </Button>
        </Td>
      ) : (
        <Td>
          <Button variant={'link'} onClick={handleUse}>
            Use
          </Button>
        </Td>
      )}
      <Td>
        <Button variant={'link'} onClick={handleDestroy}>
          Destroy
        </Button>
      </Td>
    </Tr>
  )
}

export default CharacterListItem
