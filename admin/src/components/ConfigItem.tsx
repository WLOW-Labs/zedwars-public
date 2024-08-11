import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    WrapItem,
    Divider,
    Heading,
    HStack,
    Input,
    Stack,
    StackDivider,
} from '@chakra-ui/react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useConnection } from '@solana/wallet-adapter-react'
import React from 'react'
import { useOperatorClient } from '../providers/useOperatorClient'
import { ConfigItem } from '../sdk/default_config'

interface Props {
    configItem: ConfigItem
}

const ConfigListItem: React.FC<Props> = ({ configItem }) => {
    const { connection } = useConnection()
    const { operatorClient } = useOperatorClient()
    const [updatedValue, setUpdatedValue] = React.useState<number>(configItem.value)

    async function update() {
        try {
            let transaction = await operatorClient.configSetVariable(configItem.key, updatedValue)
            if (transaction) {
                let sig = await connection.sendTransaction(transaction, [operatorClient.keypair], { skipPreflight: true })
                await connection.confirmTransaction(sig)
            }
        } catch (error) {
            alert(error)
        }
    }
    return (
        <Box paddingBottom={'1'}>
            <HStack>
                <WrapItem width={'225px'}>
                    {configItem.name}
                </WrapItem>
                <Input
                    defaultValue={configItem.value}
                    onChange={(event) => {
                        setUpdatedValue(parseInt(event.target.value))
                    }}
                    width={'100px'}
                ></Input>
                <Button variant={'outline'} onClick={update} width={'100px'} isDisabled={configItem.value == updatedValue}>
                    Update
                </Button>
            </HStack>
        </Box>
    )
}

export default ConfigListItem
