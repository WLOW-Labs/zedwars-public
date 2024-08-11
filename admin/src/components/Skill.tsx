import {
    Box,
    Button,
    WrapItem,
    HStack,
    Input,
} from '@chakra-ui/react'
import { useConnection } from '@solana/wallet-adapter-react'
import React from 'react'
import { useAnchorProvider } from '../providers/AnchorProviderProvider'
import { useOperatorClient } from '../providers/useOperatorClient'
import { SkillInfo } from '../sdk/skills'

interface Props {
    skillName: string
    sp: number
}

const SkillItem: React.FC<Props> = ({ skillName, sp }) => {
    const { operatorClient } = useOperatorClient()
    const [skillPoints, setSkillPoints] = React.useState<number>(sp)
    const { connection } = useConnection()

    async function update() {
        try {
            let x: any = {};
            x[skillName] = {}
            let transaction = await operatorClient.configSetSkillPointsRequired(x, skillPoints)
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
                    {skillName}
                </WrapItem>
                <Input
                    defaultValue={sp}
                    onChange={(event) => {
                        setSkillPoints(parseInt(event.target.value))
                    }}
                    width={'100px'}
                ></Input>
                <Button variant={'outline'} onClick={update} width={'100px'} isDisabled={sp === skillPoints}>
                    Update
                </Button>
            </HStack>
        </Box>
    )
}

export default SkillItem
