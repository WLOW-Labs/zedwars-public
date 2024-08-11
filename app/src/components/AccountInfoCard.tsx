import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react'
import { useConnection } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import React from 'react'
import string_truncate from '../utils/string_truncate'

interface Props {
  label: string
  size: string
  publicKey: PublicKey | null
}

const AccountInfoCard: React.FC<Props> = ({ publicKey, label, size }) => {
  let [balance, setBalance] = React.useState<number | null>(null)
  let { connection } = useConnection()

  async function airdrop() {
    if (publicKey) {
      await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL)
    }
  }
  React.useEffect(() => {
    let accountChange: number | null = null
    async function getBalance() {
      if (publicKey) {
        let newBalance = await connection.getBalance(publicKey)
        if (newBalance !== accountChange) {
          setBalance(newBalance)
        }
      }
    }
    if (publicKey) {
      accountChange = connection.onAccountChange(publicKey, (accountInfo) => {
        if (balance !== accountInfo.lamports) {
          setBalance(accountInfo.lamports)
        }
      })
    }
    getBalance()
    return () => {
      if (accountChange) {
        connection.removeAccountChangeListener(accountChange)
      }
    }
  }, [publicKey, balance, connection])
  return (
    <Card variant={'outline'} w={size} h={size}>
      <CardHeader>
        <Heading size={'md'}>{label}</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Address
            </Heading>
            <Text pt='2' fontSize='sm'>
              {publicKey ? string_truncate(publicKey.toBase58(), 8) : '...'}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Balance
            </Heading>
            <Text pt='2' fontSize='sm'>
              {balance ? (balance / LAMPORTS_PER_SOL).toFixed(9) : '...'} SOL
            </Text>
          </Box>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button variant={'outline'} onClick={airdrop} isDisabled={publicKey == null}>
          Airdrop
        </Button>
      </CardFooter>
    </Card>
  )
}

export default AccountInfoCard
