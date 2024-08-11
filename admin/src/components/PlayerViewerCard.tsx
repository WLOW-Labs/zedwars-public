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
  HStack,
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

const PlayerViewerCard: React.FC<Props> = ({ size }) => {
  let [player, setPlayer] = React.useState<string>("")
  let [playerData, setPlayerData] = React.useState<string>("")
  const { operatorClient } = useOperatorClient()
  const { connection } = useConnection()

  let viewItem = useCallback(async () => {
    console.log("fetching: " + pdas.character(new PublicKey(player)).toBase58())
    const id = await operatorClient.program.account.character.fetch(pdas.character(new PublicKey(player)))
    console.log(id.killedAt?.toNumber());
    setPlayerData(JSON.stringify(id, null, 2))
  }, [player])

  async function refreshStamina() {
    if (connection) {
      let tx = await operatorClient.characterUpdate(new PublicKey(player),{
        energy: 100,
      });
      if (tx) {
        let sig = await connection.sendTransaction(tx, [operatorClient.keypair], { skipPreflight: true })
        await connection.confirmTransaction(sig)
      }
    }
  }

  async function unlockLevels() {
    if (connection) {
      let tx = await operatorClient.characterUpdate(new PublicKey(player),{
        skillPoints: 50,
      });
      if (tx) {
        let sig = await connection.sendTransaction(tx, [operatorClient.keypair], { skipPreflight: true })
        await connection.confirmTransaction(sig)
      }
    }
  }

  return (
    <Card variant={'outline'} w={size} h={size}>
      <CardHeader>
        <Heading size={'md'}>View Player</Heading>
      </CardHeader>
      <CardBody overflowY={'auto'}>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Mint
            </Heading>
            <Input
              value={player}
              onChange={(e) => setPlayer(e.target.value)}
              placeholder="Enter mint ID"
            />
          </Box>
          <Box overflowY={'auto'}>
            {playerData}
          </Box>
        </Stack>
      </CardBody>
      <Divider />
        <CardFooter>
          <HStack>
        <Button variant={'outline'} onClick={viewItem} isDisabled={player == ""}>
          View
        </Button>
        <Button variant={'outline'} onClick={refreshStamina} isDisabled={player == ""}>
          Refresh Stamina
        </Button>
        <Button variant={'outline'} onClick={unlockLevels} isDisabled={player == ""}>
          X
        </Button>
        </HStack>
      </CardFooter>
    </Card>
  )
}

export default PlayerViewerCard
