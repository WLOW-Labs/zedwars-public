import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Stack,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import { useConnection } from '@solana/wallet-adapter-react'
import React from 'react'
import { useOperatorClient } from '../providers/useOperatorClient'
import { defaultItems, pdas } from '../sdk'

interface Props {
  size: string
}

const ItemsCard: React.FC<Props> = ({ size }) => {
  const [itemsCount, setItemsCount] = React.useState<number>(0)
  const { connection } = useConnection()
  const { operatorClient, operatorKeypair } = useOperatorClient()
  React.useEffect(() => {
    let configPDA = pdas.config()
    async function getItemsCount() {
      let config = await operatorClient.program.account.config.fetchNullable(configPDA)
      if (config !== null && config.numberOfItems !== itemsCount) {
        setItemsCount(config.numberOfItems)
      }
      let items = await operatorClient.program.account.item.all()
      console.log(items);
    }
    getItemsCount()

    let configSubscriptionId = connection.onAccountChange(configPDA, (accountInfo) => {
      if (accountInfo !== null) {
        getItemsCount()
      }
    })
    return () => {
      connection.removeAccountChangeListener(configSubscriptionId)
    }
  }, [itemsCount, connection, operatorClient.program.account.config])

  async function registerDefaultItems() {
    for (let i = 0; i < defaultItems.length; i++) {
      let tx = await operatorClient.registerOrUpdateItem(defaultItems[i])
      if (tx) {
        let sig = await connection.sendTransaction(tx, [operatorKeypair], { skipPreflight: true })
        await connection.confirmTransaction(sig)
      }
    }
  }

  async function resizeItems() {
    for (let i = 0; i < defaultItems.length; i++) {
      let tx = await operatorClient.resizeItem(defaultItems[i].itemId)
      if (tx) {
        let sig = await connection.sendTransaction(tx, [operatorKeypair], { skipPreflight: true })
        await connection.confirmTransaction(sig)
      }
    }
  }

  return (
    <Card variant={'outline'} w={size} h={size}>
      <CardHeader>
        <Heading size={'md'}>Pre-defined Items</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Stat>
              <StatLabel>Number of Items Registered</StatLabel>
              <StatNumber>{itemsCount}</StatNumber>
            </Stat>
          </Box>
          <Box>
            <Button variant={'outline'} onClick={registerDefaultItems}>
              Register Default Items
            </Button>
            <Button variant={'outline'} onClick={resizeItems}>
              Resize Items
            </Button>
          </Box>
        </Stack>
      </CardBody>
      <Divider />
    </Card>
  )
}

export default ItemsCard
