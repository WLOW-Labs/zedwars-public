import { useOperatorClient } from '@/providers/useOperatorClient'
import { pdas } from '@/sdk'
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Input,
  Stack,
  StackDivider,
} from '@chakra-ui/react'
import { useConnection } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import React, { useCallback } from 'react'

interface Props {
  size: string
}

const ItemViewerCard: React.FC<Props> = ({ size }) => {
  let [item, setItem] = React.useState<number>(0)
  let [itemData, setItemData] = React.useState<string>("")
  const { operatorClient } = useOperatorClient()

  let viewItem = useCallback(async () => {
    const id = await operatorClient.program.account.item.fetch(pdas.item(item))
    setItemData(JSON.stringify(id, null, 2))
  }, [item])


  return (
    <Card variant={'outline'} w={size} h={size}>
      <CardHeader>
        <Heading size={'md'}>View Item</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
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
            {itemData}
          </Box>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button variant={'outline'} onClick={viewItem} isDisabled={item == 0}>
          View
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ItemViewerCard
