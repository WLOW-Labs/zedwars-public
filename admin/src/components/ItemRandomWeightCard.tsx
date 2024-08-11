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
} from '@chakra-ui/react'
import { useConnection } from '@solana/wallet-adapter-react'
import { Keypair } from '@solana/web3.js'
import React from 'react'
import { useOperatorClient } from '../providers/useOperatorClient'
import { ItemRandomWeight } from '../sdk/arg_types'
import { defaultItemRandomWeights } from '../sdk/default_item_random_weights'

interface Props {
    size: string
}

const ItemRandomWeightCard: React.FC<Props> = ({ size }) => {
    const [isInitialized, setIsInitialized] = React.useState<boolean>(false)
    const { connection } = useConnection()
    const { operatorClient } = useOperatorClient()
    const tileTypes = ["street", "hospital", "apartment", "policeStation", " warehouse", "fireStation", "zedCorp", "factory", "secretLocation"]

    async function update() {
        defaultItemRandomWeights.forEach(async (itemRandomWeight) => {
            let tt: any = {}
            tt[itemRandomWeight.tileType] = {}


            let tx = await operatorClient.configSetItemRandomWeights(itemRandomWeight.tileType, itemRandomWeight.itemIds, itemRandomWeight.weights);
            if (tx) {
                let sig = await connection.sendTransaction(tx, [operatorClient.keypair], { skipPreflight: true })
                await connection.confirmTransaction(sig)
            }
            tx = await operatorClient.configSetSearchSuccessRate(tt, itemRandomWeight.baseSuccess);
            if (tx) {
                let sig = await connection.sendTransaction(tx, [operatorClient.keypair], { skipPreflight: true })
                await connection.confirmTransaction(sig)
            }
        });
    }

    async function updateRegenRates() {
        defaultItemRandomWeights.forEach(async (itemRandomWeight) => {
            let tx = await operatorClient.configSetLootRegenRates(itemRandomWeight.tileType, itemRandomWeight.regenRate);
            if (tx) {
                let sig = await connection.sendTransaction(tx, [operatorClient.keypair], { skipPreflight: true })
                await connection.confirmTransaction(sig)
            }
            
        });
    }

    async function updateMerkle() {
        let merkle = Keypair.generate();
        const tx = await operatorClient.configSetMerkleTree(merkle, 10000)
        if (tx) {
            let sig = await connection.sendTransaction(tx, [operatorClient.keypair, merkle], { skipPreflight: true })
            await connection.confirmTransaction(sig)
        }
    }

    return (
        <Card variant={'outline'} w={size} h={size} overflowY={'scroll'}>
            <CardHeader>
                <Heading size={'md'}>
                    Item Random Weights
                </Heading>
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                    <Box>
                        <Button variant={'outline'} onClick={update} isDisabled={isInitialized}>
                            Update Random Weights
                        </Button>
                    </Box>
                    <Box>
                        <Button variant={'outline'} onClick={updateRegenRates} isDisabled={isInitialized}>
                            Update Regen Rates
                        </Button>
                    </Box>
                    <Box>
                        <Button variant={'outline'} onClick={updateMerkle} isDisabled={isInitialized}>
                            Update Merkle Tree
                        </Button>
                    </Box>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>

            </CardFooter>
        </Card>
    )
}

export default ItemRandomWeightCard
