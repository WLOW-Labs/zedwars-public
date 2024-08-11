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
import React, { useCallback, useEffect } from 'react'

interface Props {
  size: string
}

const AddLegendaryItemCard: React.FC<Props> = ({ size }) => {
  let [item, setItem] = React.useState<number>(0)
  let [kind, setKind] = React.useState<string>("")
  let { connection } = useConnection()
  const { operatorClient } = useOperatorClient()

  useEffect(() => {
    async function getAccountInfo() {
      const configAccount = await operatorClient.program.account.config.fetchNullable(pdas.config())
      if (configAccount && Array.isArray(configAccount.rareDropTable)) {

      }
    }

    getAccountInfo()

    const accountChangeSubscription = connection.onAccountChange(pdas.config(), getAccountInfo)
    return () => {
      connection.removeAccountChangeListener(accountChangeSubscription)
    }
  }, [connection])

  let addLegendaryItem = useCallback(async () => {
    const itemData = await operatorClient.program.account.item.fetchNullable(pdas.item(item))
    if (!itemData) {
      alert('Enter a real item ID please.')
      return;
    }
    let transaction = await operatorClient.configAddLegendaryItem(kind, item)
    if (transaction) {
      let sig = await connection.sendTransaction(transaction, [operatorClient.keypair], { skipPreflight: true })
      await connection.confirmTransaction(sig)
    }
  }, [item])


  return (
    <Card variant={'outline'} w={size} h={size} display="flex" flexDirection="column">
      <CardHeader>
        <Heading size={'md'}>Rare Drop Table</Heading>
      </CardHeader>
      <CardBody flex="1" overflowY="auto"> {/* Adjusted to allow scrolling within CardBody only */}
        <VStack spacing='4'>
          <Input
            value={item}
            onChange={(e) => setItem(Number(e.target.value))}
            placeholder="Enter item ID"
          />
           <Input
            value={kind}
            onChange={(e) => setKind(e.target.value)}
            placeholder="Enter item kind"
          />
        </VStack>
      </CardBody>
      <Divider />
      <CardFooter>
        <HStack>
          <Button variant={'outline'} onClick={addLegendaryItem} isDisabled={item == 0}>
            Add
          </Button>
        </HStack>
      </CardFooter>
    </Card>
  )
}

export default AddLegendaryItemCard
