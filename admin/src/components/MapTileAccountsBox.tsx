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
  VStack,
} from '@chakra-ui/react'
import { useConnection } from '@solana/wallet-adapter-react'
import React from 'react'
import { useOperatorClient } from '../providers/useOperatorClient'
import { defaultTiles, pdas } from '../sdk'

interface Props {
  size: string
}

const MapTileAccountsCard: React.FC<Props> = ({ size }) => {
  const { operatorClient } = useOperatorClient()
  const { connection } = useConnection()
  const [tileCount, setTileCount] = React.useState<number>(0)


  async function registerDefaultTiles() {
    const rateLimit = 100; // 20 requests per second
    const interval = 1000 / rateLimit; // interval in milliseconds
    let queue = defaultTiles.slice(); // copy the array

    const processQueue = async () => {
      if (queue.length > 0) {
        const tile = queue.shift();
        if (tile) {
          console.log(`${queue.length} tiles left`);
          try {
            let tileAccount = await operatorClient.program.account.mapTile.fetchNullable(pdas.mapTile(tile.x, tile.y));
            //if (tileAccount) {
            //  console.log('This tile already exists, skipping');
            //  return;
            //}
            let tx = await operatorClient.mapTileInit(tile);
            if (tx) {
              let sig = await connection.sendTransaction(tx, [operatorClient.keypair], { skipPreflight: true });
              await connection.confirmTransaction(sig);
            }
          } catch (error) {
            console.error("Error processing tile:", error);
          } finally {
            setTimeout(processQueue, interval);
          }
        }
      }
    };

    processQueue();
  }

  async function resizeDefaultTiles() {
    const rateLimit = 100; // 20 requests per second
    const interval = 1000 / rateLimit; // interval in milliseconds
    let queue = defaultTiles.slice(); // copy the array

    const processQueue = async () => {
      if (queue.length > 0) {
        const tile = queue.shift();
        if (tile) {
          console.log(`${queue.length} tiles left`);
          try {
            let tx = await operatorClient.resizeTile(tile.x, tile.y);
            if (tx) {
              let sig = await connection.sendTransaction(tx, [operatorClient.keypair], { skipPreflight: true });
              await connection.confirmTransaction(sig);
            }
          } catch (error) {
            console.error("Error processing tile:", error);
          } finally {
            setTimeout(processQueue, interval);
          }
        }
      }
    };

    processQueue();
  }


  React.useEffect(() => {
    async function getTiles() {
      let tiles = await operatorClient.program.account.mapTile.all()
      setTileCount(tiles.length)
    }
    getTiles()
  }, [connection, operatorClient.program.account.config])

  return (
    <>
      <Card variant={'outline'} w={size} h={size}>
        <CardHeader>
          <Heading size={'md'}>Map Tiles ({tileCount})</Heading>
        </CardHeader>
        <CardBody>
          <VStack>
            <Box>
              <Button variant={'outline'} onClick={registerDefaultTiles}>
                Register Default Tiles
              </Button>
            </Box>
            <Box>
              <Button variant={'outline'} onClick={resizeDefaultTiles}>
                Resize Default Tiles
              </Button>
            </Box>
          </VStack>
        </CardBody>
        <Divider />
      </Card>
    </>
  )
}

export default MapTileAccountsCard
