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
import React, { useEffect } from 'react'
import { useOperatorClient } from '../providers/useOperatorClient'
import { pdas } from '../sdk'
import { SkillList } from '../sdk/skills'
import SkillItem from './Skill'

interface Props {
    size: string
}

const SkillCard: React.FC<Props> = ({ size }) => {
    const [isInitialized, setIsInitialized] = React.useState<boolean>(false)
    const { connection } = useConnection()
    const { operatorClient, operatorKeypair } = useOperatorClient()
    const [items, setItems] = React.useState<number[]>([])
    useEffect(() => {
        async function getAccountInfo() {
            const configAccount = await operatorClient.program.account.config.fetchNullable(pdas.config())

            if (configAccount) {
                setItems([...configAccount.skillPointsRequired])
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

    async function registerDefaultSkillPoints() {
        for (let i = 0; i < SkillList.length; i++) {
            let x: any = {};
            x[SkillList[i].skill] = {};
            console.log(SkillList[i].skill, SkillList[i].skillPoints)
            let tx = await operatorClient.configSetSkillPointsRequired(x, SkillList[i].skillPoints);
            if (tx) {
                let sig = await connection.sendTransaction(tx, [operatorKeypair], { skipPreflight: true })
                await connection.confirmTransaction(sig)
            }
        }
    }

    return (
        <Card variant={'outline'} w={size} h={size} overflowY={'scroll'}>
            <CardHeader>
                <Heading size={'md'}>
                    Skill Point Requirements
                    <Button ml={2} variant={'outline'} onClick={registerDefaultSkillPoints}>
                        Register Default Skills
                    </Button>
                </Heading>
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                    <Box>
                        {items.map((val, idx) => {
                            let sl = SkillList[idx];
                            return (
                                <WrapItem>
                                    <SkillItem skillName={sl.skill} sp={items[idx]}></SkillItem>
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

export default SkillCard
