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
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import React, { useEffect } from 'react'
import { useOperatorClient } from '../providers/useOperatorClient'
import { pdas } from '../sdk'

interface Props {
  size: string
}

const MintCharacterCard: React.FC<Props> = ({ size }) => {
  const { operatorClient } = useOperatorClient()
  const { publicKey } = useWallet()
  const [playerCount, setPlayerCount] = React.useState<number>(0)
  const [isInitialized, setIsInitialized] = React.useState<boolean>(false)
  const { connection } = useConnection()

  useEffect(() => {
    async function getAccountInfo() {
      const configAccount = await operatorClient.program.account.config.fetchNullable(pdas.config())


      if (configAccount) {
        setPlayerCount(configAccount.numberOfCharacters)
        setIsInitialized(true)
      } else if (!configAccount && isInitialized === true) {
        setIsInitialized(false)
      }
    }

    getAccountInfo()


    const accountChangeSubscription = connection.onAccountChange(pdas.config(), getAccountInfo)
    return () => {
      connection.removeAccountChangeListener(accountChangeSubscription)
    }
  }, [connection, isInitialized])

  async function updateAllCharacters() {

    let characters = [
      'CWtEBsKZQL2SVQeuCPcGtaEPqNtW5GZcRcJbGiobF7kk',
    ]

    characters.forEach(async (character) => {
      let tx = await operatorClient.resizeCharacter(new PublicKey(character), 2000);

      if (tx) {
        try {
          let sig = await connection.sendTransaction(tx, [operatorClient.keypair], { skipPreflight: true });
          await connection.confirmTransaction(sig);
        } catch (error) {
          console.error("Transaction error:", error);
          console.log(character)
        }
      }
    });

  }

  async function snapshot() {
    if (connection) {
      let characters = await operatorClient.program.account.character.all();
      let output = `Total Characters: ${characters.length}\n`;
      characters.forEach((character, index) => {
        output += `'${character.account.mint.toBase58()}',\n`;
      });

      // Create a Blob from the output
      const blob = new Blob([output], { type: 'text/plain' });
      const href = URL.createObjectURL(blob);
      // Create a temporary link to trigger the download
      const link = document.createElement('a');
      link.href = href;
      link.download = "snapshot.txt"; // Name of the file to be downloaded
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    }
  }

  async function mint() {
    if (connection) {
      let tx = await operatorClient.characterInit("Survivor", 15, 16, false, '00000000000000000000002');
      if (tx) {
        let sig = await connection.sendTransaction(tx, [operatorClient.keypair], { skipPreflight: true })
        await connection.confirmTransaction(sig)
      }
    }
  }


  return (
    <Card variant={'outline'} w={size} h={size}>
      <CardHeader>
        <Heading size={'md'}>
          Character Count
          <Button ml={2} variant={'outline'} onClick={updateAllCharacters}>
            Refresh Characters
          </Button>
          <Button ml={2} variant={'outline'} onClick={snapshot}>
            Snapshot
          </Button>
          <Button ml={2} variant={'outline'} onClick={mint}>
            Mint
          </Button>
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            {playerCount}
          </Box>
        </Stack>
      </CardBody>
    </Card>
  )
}


export default MintCharacterCard
