import { Box, Image, Center, PopoverTrigger, Popover, Portal, PopoverContent, IconButton, Icon, Button, useDisclosure, PopoverBody, PopoverArrow } from '@chakra-ui/react'

interface InventoryItemProps {
    item: number
}

const InventoryItem = ({ item }: InventoryItemProps) => {
    const { onOpen, onClose, isOpen } = useDisclosure()

    return (
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            <PopoverTrigger>
                <Box borderColor='#A8B5B2' borderWidth={'5px'} width='75px' height='75px' _hover={{ borderColor: '#394A50' }} cursor='pointer'><Image src="/images/common.png"></Image></Box>
            </PopoverTrigger>
            <Portal>
                <PopoverContent backgroundColor='#577277' borderRadius={'0'} borderColor='black' borderWidth='1px' width="275px">
                    <PopoverBody borderColor='#A8B5B2' borderWidth='3px'>
                        <PopoverArrow backgroundColor='#577277' />
                        <Center>
                            <Button size='md' color='white' borderRadius='0' aria-label='Equip Item' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} mr='2'>Equip</Button>
                            <Button size='md' color='white' borderRadius='0' aria-label='Destroy Item' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} mr='2'>Destroy</Button>
                            <Button size='md' color='white' borderRadius='0' aria-label='Mint Item' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} mr='2'>Mint</Button>
                            <IconButton onClick={onClose} borderRadius='0' aria-label='View Skills' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} icon={<Icon viewBox="0 0 24 24" fill="white" stroke='white'>
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                            </Icon>} />
                        </Center>
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>

    )
}

export default InventoryItem
