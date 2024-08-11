import { useOperatorClient } from '@/providers/useOperatorClient'
import { pdas } from '../sdk'
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  HStack,
  Input,
  Stack,
  StackDivider,
  VStack,
} from '@chakra-ui/react'
import { useConnection } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import React, { useCallback } from 'react'

interface Props {
  size: string
}

const GiftItemCard: React.FC<Props> = ({ size }) => {
  let [item, setItem] = React.useState<number>(0)
  let [player, setPlayer] = React.useState<string>("")
  let { connection } = useConnection()
  const { operatorClient } = useOperatorClient()

  let giftItem = useCallback(async () => {
    const character = await operatorClient.program.account.character.fetch(pdas.character(new PublicKey(player)))
    const itemData = await operatorClient.program.account.item.fetchNullable(pdas.item(item))
    if (!itemData) {
      alert('Enter a real item ID please.')
      return;
    }
    console.log(character);
    character.inventory.push(item)
    let transaction = await operatorClient.characterUpdate(new PublicKey(player), {
      inventory: character.inventory
    })
    if (transaction) {
      let sig = await connection.sendTransaction(transaction, [operatorClient.keypair], { skipPreflight: true })
      await connection.confirmTransaction(sig)
    }
  }, [player, item])

  let airdropItem = useCallback(async () => {
    const itemData = await operatorClient.program.account.item.fetchNullable(pdas.item(item))
    if (!itemData) {
      alert('Enter a real item ID please.')
      return;
    }
    let transaction = await operatorClient.airdropItem(new PublicKey(player), item)
    if (transaction) {
      let sig = await connection.sendTransaction(transaction, [operatorClient.keypair], { skipPreflight: true })
      await connection.confirmTransaction(sig)
    }
  }, [player, item])


  return (
    <Card variant={'outline'} w={size} h={size}>
      <CardHeader>
        <Heading size={'md'}>Gift Item</Heading>
      </CardHeader>
      <CardBody>
        <VStack>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Item ID
            </Heading>
            <Input
              value={item}
              onChange={(e) => setItem(Number(e.target.value))}
              placeholder="Enter item ID"
            />
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Character Mint or Wallet
            </Heading>
            <Input
              value={player}
              onChange={(e) => setPlayer(e.target.value)}
              placeholder="Mint/Wallet Pubkey"
            />
          </Box>
        </VStack>
      </CardBody>
      <Divider />
      <CardFooter>
        <HStack>
          <Button variant={'outline'} onClick={giftItem} isDisabled={player == ""}>
            Gift
          </Button>
          <Button variant={'outline'} onClick={airdropItem} isDisabled={player == ""}>
            Airdrop
          </Button>
        </HStack>
      </CardFooter>
    </Card>
  )
}

export default GiftItemCard
