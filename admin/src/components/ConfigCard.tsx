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
    WrapItem,
} from '@chakra-ui/react'
import { useConnection } from '@solana/wallet-adapter-react'
import { Keypair } from '@solana/web3.js'
import React, { useEffect } from 'react'
import { useOperatorClient } from '../providers/useOperatorClient'
import { pdas } from '../sdk'
import { defaultConfig } from '../sdk/default_config'
import ConfigItem from './ConfigItem'

interface Props {
    size: string
}

const ConfigCard: React.FC<Props> = ({ size }) => {
    const [isInitialized, setIsInitialized] = React.useState<boolean>(false)
    const { connection } = useConnection()
    const { operatorClient } = useOperatorClient()
    const [items, setItems] = React.useState<number[]>([])
    useEffect(() => {
        async function getAccountInfo() {
            const configAccount = await operatorClient.program.account.config.fetchNullable(pdas.config())
            console.log(configAccount?.charactersCollectionMint.toBase58());
            if (configAccount) {
                console.log(configAccount);
                setItems(configAccount.configVariables)
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

    async function registerDefaultConfig() {
        defaultConfig.forEach(async (config) => {
            console.log(`updating ${config.key} to ${config.value}`)
            let transaction = await operatorClient.configSetVariable(config.key, config.value)
            if (transaction) {
                let sig = await connection.sendTransaction(transaction, [operatorClient.keypair], { skipPreflight: true })
                await connection.confirmTransaction(sig)
            }
        });
    }

    return (
        <Card variant={'outline'} w={size} h={size} overflowY={'scroll'}>
            <CardHeader>
                <Heading size={'md'}>
                    Config Variables
                    <Button ml={2} variant={'outline'} onClick={registerDefaultConfig}>
                        Register Default Config
                    </Button>
                </Heading>
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                    <Box>
                        {items.map((val, idx) => {
                            if (val != 0) {
                                defaultConfig[idx].value = val;
                            }
                            return (
                                <WrapItem>
                                    <ConfigItem configItem={defaultConfig[idx]}></ConfigItem>
                                </WrapItem>
                            )
                        })}
                    </Box>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>

            </CardFooter>
        </Card>
    )
}

export default ConfigCard
