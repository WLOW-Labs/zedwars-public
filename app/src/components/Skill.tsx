import { Button, HStack, Flex, Center, Text } from '@chakra-ui/react'
import React from 'react'
import { SkillInfo } from '../data/skills'

interface Props {
    skill: SkillInfo
    data: any
    unlockSkill: (skill: string) => void
}

const Skill: React.FC<Props> = ({ skill, data, unlockSkill }) => {
    return (
        <HStack spacing='0' mt={'3'}>
            <Flex width='100px' height='100px' borderColor={'#A8B5B2'} borderWidth={'5px'} backgroundColor={'#577277'} justifyContent='center' borderRight={'0'}>
                <Center>
                    <Text fontSize={'xl'} color='white' textAlign={'center'}>{skill.skillName}</Text>
                </Center>
            </Flex>
            <Flex width='400px' justifyContent='center' borderColor={'#A8B5B2'} borderWidth={'5px'} backgroundColor={'#577277'} height='100px' overflow={'scroll'} overflowX={'hidden'} sx={{ '-MsOverflowStyle': 'none', 'scrollbarWidth': 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
                <Center>
                    <Text padding='5px' fontSize={'xl'} color='white' height='100px'>{skill.description}</Text>
                </Center>
            </Flex>
            <Flex width='50px' height='100px' borderColor={'#A8B5B2'} borderWidth={'5px'} backgroundColor={'#577277'} justifyContent='center' borderRight={'0'} borderLeft={'0'}>
                <Center>
                    <Text fontSize={'xl'} color='white'>{skill.skillPoints}</Text>
                </Center>
            </Flex>
            <Flex width='125px' height='100px' borderColor={'#A8B5B2'} borderWidth={'5px'} backgroundColor={'#577277'} justifyContent='center'>
                <Center>
                    {data.skills[skill.position] ? (
                        <Text fontSize={'xl'} color='white'>Unlocked</Text>
                    ) : (
                        <Button onClick={() => {
                            unlockSkill(skill.skill)
                        }} ml='1' size='md' color='white' borderRadius='0' aria-label='List Zombies' backgroundColor={'#577277'} borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }}>
                            Unlock
                        </Button>
                    )}
                </Center>
            </Flex>
        </HStack>
    )
}

export default Skill
