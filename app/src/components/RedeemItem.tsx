import { Box, Image, useToast, Popover, PopoverTrigger, Portal, PopoverContent, PopoverBody, PopoverArrow, Center, Button, IconButton, Icon, useDisclosure } from '@chakra-ui/react'
import { Nft } from '@metaplex-foundation/js'
import { PublicKey } from '@solana/web3.js'
import React, { useCallback, useEffect } from 'react'
import { usePlayerClient } from '../providers/usePlayerClient'
import { pdas } from '../sdk'
import { useCharacter } from '../providers/CharacterProvider'
import { useAnchorProvider } from '../providers/AnchorProviderProvider'
import { useDelegateKeypair } from '../providers/useDelegateKeypair'

interface Props {
    size: string
    mint: PublicKey
    updateItems: () => void
}

interface ItemData {
    id: number
    name: string
}
const RedeemItem: React.FC<Props> = ({ size, mint, updateItems }) => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const [itemData, setItemData] = React.useState<ItemData>({} as ItemData)
    const { playerClient } = usePlayerClient()
    const { anchorProvider } = useAnchorProvider()
    const toast = useToast()
    const { characterMint } = useCharacter()
    const { delegateKeypair } = useDelegateKeypair();

    useEffect(() => {
        async function loadItem() {
            if (playerClient) {
                let item = await playerClient.program.account.itemMint.fetchNullable(pdas.itemMint(mint))
                let result = await playerClient.metaplex.nfts().findByMint({ mintAddress: mint })
                let data = {} as ItemData

                if (result && result.model === 'nft') {
                    data.name = (result as Nft).name
                } else {
                    data.name = 'Unknown Item'
                }
                console.log(item);
                if (item) {
                    data.id = item.id
                }
                setItemData(data)
            }
        }

        loadItem()
    }, [mint, playerClient, characterMint, delegateKeypair, toast, updateItems])

    const redeem = useCallback(async () => {
        if (!characterMint) {
            toast({
                title: "Make sure you select a character before redeeming an item",
                status: 'error',
                duration: 5000,
            })
            return;
        }
        if (playerClient && anchorProvider && mint && characterMint && !delegateKeypair) {
            let tx = await playerClient.characterRedeemItem(characterMint, mint)
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
        updateItems();
    }, [anchorProvider, mint, playerClient, characterMint, delegateKeypair, toast, updateItems])

    return (
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            <PopoverTrigger>
                <Box borderColor='#A8B5B2' borderWidth={'5px'} width={size} _hover={{ borderColor: '#394A50' }} cursor={'pointer'} mr={'1'}><Image src={`https://cdn.zedwars.com/items/${itemData.id}.png`}></Image></Box>
            </PopoverTrigger>
            <Portal>
                <PopoverContent backgroundColor='#577277' borderRadius={'0'} borderColor='black' borderWidth='1px' width={'175px'}>
                    <PopoverBody borderColor='#A8B5B2' borderWidth='3px'>
                        <PopoverArrow backgroundColor='#577277' />
                        <Center>
                            <Button onClick={async () => { onClose(); redeem(); }} size='md' color='white' borderRadius='0' aria-label='Redeem Item' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} mr='2'>Redeem</Button>
                            <IconButton onClick={onClose} borderRadius='0' aria-label='View Skills' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} icon={<Icon viewBox="0 0 24 24" fill="white" stroke='white'>
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                            </Icon>} />
                        </Center>
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover >
    )
}

export default RedeemItem
