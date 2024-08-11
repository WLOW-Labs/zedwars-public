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
} from '@chakra-ui/react'
import { useConnection } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import React, { useCallback, useEffect } from 'react'

interface Props {
  size: string
}

const AddRDTItemCard: React.FC<Props> = ({ size }) => {
  let [item, setItem] = React.useState<number>(0)
  let [rdtData, setRdtData] = React.useState<string>("")
  let { connection } = useConnection()
  const { operatorClient } = useOperatorClient()

  useEffect(() => {
    async function getAccountInfo() {
      const configAccount = await operatorClient.program.account.config.fetchNullable(pdas.config())
      if (configAccount && Array.isArray(configAccount.rareDropTable)) {
        // Convert the array of numbers to a string list
        const prettyList = configAccount.rareDropTable.map((item) => `${item}`).join(', ');
        setRdtData(prettyList);
      }
    }

    getAccountInfo()

    const accountChangeSubscription = connection.onAccountChange(pdas.config(), getAccountInfo)
    return () => {
      connection.removeAccountChangeListener(accountChangeSubscription)
    }
  }, [connection])

  let addToRDT = useCallback(async () => {
    const itemData = await operatorClient.program.account.item.fetchNullable(pdas.item(item))
    if (!itemData) {
      alert('Enter a real item ID please.')
      return;
    }
    let transaction = await operatorClient.configAddItemToRareDropTable(item)
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
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <ul>
              {rdtData.split(', ').map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Box>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <HStack>
          <Input
            value={item}
            onChange={(e) => setItem(Number(e.target.value))}
            placeholder="Enter item ID"
          />
          <Button variant={'outline'} onClick={addToRDT} isDisabled={item == 0}>
            Add
          </Button>
        </HStack>
      </CardFooter>
    </Card>
  )
}

export default AddRDTItemCard
