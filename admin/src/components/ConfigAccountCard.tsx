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
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useConnection } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import React, { useEffect } from 'react'
import { useOperatorClient } from '../providers/useOperatorClient'
import { pdas } from '../sdk'
import { defaultConfig } from '../sdk/default_config'
import { defaultItemRandomWeights } from '../sdk/default_item_random_weights'
import string_truncate from '../utils/string_truncate'

interface Props {
  size: string
}

const ConfigAccountCard: React.FC<Props> = ({ size }) => {
  const [isInitialized, setIsInitialized] = React.useState<boolean>(false)
  const { connection } = useConnection()
  const { operatorClient } = useOperatorClient()

  async function fixConfigAccount() {
    let tx = await operatorClient.resizeConfig(2500);

    if (tx) {
      let sig = await connection.sendTransaction(tx, [operatorClient.keypair], { skipPreflight: true })
      await connection.confirmTransaction(sig)
    }
  }

  async function initConfigAccount() {
    const itemsCollectionNftMint = await operatorClient.createCollectionNFT('Zed Wars Items', 'ZWI', 'https://cdn.zedwars.com/images/items.png')
    const charactersCollectionNftMint = await operatorClient.createCollectionNFT('Zed Wars Players', 'ZWP', 'https://cdn.zedwars.com/images/survivor_zombie.gif')
    const tx = await operatorClient.configInit(itemsCollectionNftMint, charactersCollectionNftMint)
    if (tx) {
      let sig = await connection.sendTransaction(tx, [operatorClient.keypair], { skipPreflight: true })
      await connection.confirmTransaction(sig)
    }
  }

  async function withdrawTreasury() {
    const tx = await operatorClient.withdrawTreasury();
    if (tx) {
      let sig = await connection.sendTransaction(tx, [operatorClient.keypair], { skipPreflight: true })
      await connection.confirmTransaction(sig)
    }
  }

  useEffect(() => {
    async function getAccountInfo() {
      let accountInfo = await connection.getAccountInfo(pdas.config())
      if (accountInfo && isInitialized === false) {
        setIsInitialized(true)
      } else if (!accountInfo && isInitialized === true) {
        setIsInitialized(false)
      }
    }

    getAccountInfo()

    const accountChangeSubscription = connection.onAccountChange(pdas.config(), (accountInfo) => {
      if (accountInfo && isInitialized === false) {
        setIsInitialized(true)
      } else if (!accountInfo && isInitialized === true) {
        setIsInitialized(false)
      }
    })
    return () => {
      connection.removeAccountChangeListener(accountChangeSubscription)
    }
  }, [connection, isInitialized])
  return (
    <Card variant={'outline'} w={size} h={size}>
      <CardHeader>
        <Heading size={'md'}>Config Account
          <Button ml={2} variant={'outline'} onClick={fixConfigAccount}>
            Fix
          </Button></Heading>
      </CardHeader>
      <CardBody>
        <Stack>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Address
            </Heading>
            <Text pt='2' fontSize='sm'>
              {string_truncate(pdas.config().toBase58(), 10)}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Is Initialized?
            </Heading>
            <Text pt='2' fontSize='sm'>
              {isInitialized ? 'Yes' : 'No'}
            </Text>
          </Box>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <HStack>
          <Button variant={'outline'} onClick={initConfigAccount} isDisabled={isInitialized}>
            Init Config
          </Button>
          <Button variant={'outline'} onClick={withdrawTreasury} isDisabled={!isInitialized}>
            Withdraw
          </Button>
        </HStack>
      </CardFooter>
    </Card>
  )
}

export default ConfigAccountCard
