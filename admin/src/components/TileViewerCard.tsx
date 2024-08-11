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

const TileViewerCard: React.FC<Props> = ({ size }) => {
  let [tile, setTile] = React.useState<string>("")
  let [tileData, setTileData] = React.useState<string>("")
  const { operatorClient } = useOperatorClient()
  const { connection } = useConnection()

  let viewTile = useCallback(async () => {
    let splitTile = tile.split(',')
    let x = Number(splitTile[0])
    let y = Number(splitTile[1])
    console.log(`trying ${x},${y}`)
    const td = await operatorClient.program.account.mapTile.fetch(pdas.mapTile(x, y))
    console.log(td.lastSearchedAt.toNumber());
    setTileData(JSON.stringify(td, null, 2))
  }, [tile])

  let barricade = useCallback(async () => {
    let splitTile = tile.split(',')
    let x = Number(splitTile[0])
    let y = Number(splitTile[1])
    let currentTile = await operatorClient.program.account.mapTile.fetch(pdas.mapTile(x,y))
    if (currentTile) {
      let mapTileUpdateArgs = {
        numZombies: currentTile.numZombies,
        numSurvivors: currentTile.numSurvivors,
        numBarricades: 250,
        hasGenerator: currentTile.hasGenerator,
        hasPowerUntil: currentTile.hasPowerUntil,
        tileType: currentTile.tileType,
        lootableItems: currentTile.lootableItems,
        canBeSearched: currentTile.canBeSearched,
        canBeBarricaded: currentTile.canBeBarricaded,
      }
      const tx = await operatorClient.mapTileUpdate(x, y,mapTileUpdateArgs)  

      if (tx) {
        let sig = await connection.sendTransaction(tx, [operatorClient.keypair], { skipPreflight: true })
        await connection.confirmTransaction(sig)
      }
    }
    
  }, [tile])


  return (
    <Card variant={'outline'} w={size} h={size}>
      <CardHeader>
        <Heading size={'md'}>View Tile</Heading>
      </CardHeader>
      <CardBody overflowY={'auto'}>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Mint
            </Heading>
            <Input
              value={tile}
              onChange={(e) => setTile(e.target.value)}
              placeholder="Enter Tile X,Y"
            />
          </Box>
          <Box overflowY={'auto'}>
            {tileData}
          </Box>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button variant={'outline'} onClick={viewTile} isDisabled={tile == ""}>
          View
        </Button>

        <Button variant={'outline'} onClick={barricade} isDisabled={tile == ""}>
          Max Barricade
        </Button>
      </CardFooter>
    </Card>
  )
}

export default TileViewerCard
