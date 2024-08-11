import {
    Button, Box, VStack, Icon, Center, Text, IconButton, useToast,
} from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { useCharacter } from '../providers/CharacterProvider'
import { usePlayerClient } from '../providers/usePlayerClient'
import { useAnchorProvider } from '../providers/AnchorProviderProvider'
import { skillList } from '../data/skills'
import Skill from './Skill'

interface Props {
    closeSkillsSelection: () => void
}
const Skills: React.FC<Props> = ({ closeSkillsSelection }) => {
    const { characterMint, data } = useCharacter()
    const { playerClient } = usePlayerClient()
    const { anchorProvider } = useAnchorProvider()
    const [category, setCategory] = React.useState<string>('civilian')
    const toast = useToast()

    const unlock = useCallback(async (skillName: string) => {
        let skill: any = {}
        skill[skillName] = {}
        if (playerClient && anchorProvider && characterMint) {
            let tx = await playerClient.characterUnlockSkill(characterMint, skill)
            try {
                await anchorProvider.sendAndConfirm(tx, [], { skipPreflight: true, commitment: 'confirmed' })
            } catch (e: any) {
                let errorMessage = e.logs.join().match(/Error Message: ([^,]+)/)[1];
                toast({
                    title: errorMessage,
                    status: 'error',
                    duration: 5000,
                })
            }
        }
    }, [anchorProvider, characterMint, playerClient, toast])

    return (
        <Box backgroundColor={'#577277'} margin={'0 37px'}>
            <Center mt='1'>
                <IconButton onClick={closeSkillsSelection} mb='2' borderRadius='0' aria-label='View Settings' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} icon={<Icon viewBox="0 0 24 24" stroke='white' fill='white'>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </Icon>} />
            </Center>
            <Center>
                <Text fontSize={'4xl'} color='white'>Skills ({data.skillPoints} Point(s) Available)</Text>
            </Center>
            <Center>
                <Button size='md' color='white' borderRadius='0' aria-label='List Survivors' backgroundColor={category === 'civilian' ? '#A8B5B2' : '#577277'} borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: (category === 'civilian' ? '#A8B5B2' : '#394A50') }} onClick={() => {
                    setCategory('civilian')
                }}>
                    Civilian
                </Button>
                <Button ml='1' size='md' color='white' borderRadius='0' aria-label='List Zombies' backgroundColor={category === 'military' ? '#A8B5B2' : '#577277'} borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: (category === 'military' ? '#A8B5B2' : '#394A50') }} onClick={() => {
                    setCategory('military')
                }}>
                    Military
                </Button>
                <Button ml='1' size='md' color='white' borderRadius='0' aria-label='List Zombies' backgroundColor={category === 'scientist' ? '#A8B5B2' : '#577277'} borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: (category === 'scientist' ? '#A8B5B2' : '#394A50') }} onClick={() => {
                    setCategory('scientist')
                }}>
                    Scientist
                </Button>
                <Button ml='1' size='md' color='white' borderRadius='0' aria-label='List Zombies' backgroundColor={category === 'zombie' ? '#A8B5B2' : '#577277'} borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: (category === 'zombie' ? '#A8B5B2' : '#394A50') }} onClick={() => {
                    setCategory('zombie')
                }}>
                    Zombie
                </Button>
            </Center>
            <Center mt='3'>
                {category === 'civilian' &&
                    <VStack overflow='scroll' overflowX={'hidden'} height='550px' sx={{ '-MsOverflowStyle': 'none', 'scrollbarWidth': 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
                        {skillList.civilian.map((skill, idx) => {
                            return <Skill data={data} skill={skill} unlockSkill={unlock} key={idx} />
                        })}
                    </VStack>
                }
                {category === 'military' &&
                    <VStack overflow='scroll' overflowX={'hidden'} height='550px' sx={{ '-msOverflowStyle': 'none', 'scrollbarWidth': 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
                        {skillList.military.map((skill, idx) => {
                            return <Skill data={data} skill={skill} unlockSkill={unlock} key={idx} />
                        })}
                    </VStack>
                }
                {category === 'scientist' &&
                    <VStack overflow='scroll' overflowX={'hidden'} height='550px' sx={{ '-MsOverflowStyle': 'none', 'scrollbarWidth': 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
                        {skillList.scientist.map((skill, idx) => {
                            return <Skill data={data} skill={skill} unlockSkill={unlock} key={idx} />
                        })}
                    </VStack>
                }
                {category === 'zombie' &&
                    <VStack overflow='scroll' overflowX={'hidden'} height='550px' sx={{ '-MsOverflowStyle': 'none', 'scrollbarWidth': 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
                        {skillList.zombie.map((skill, idx) => {
                            return <Skill data={data} skill={skill} unlockSkill={unlock} key={idx} />
                        })}
                    </VStack>
                }
            </Center>
        </Box >
    )
}

export default Skills
