import { Box, Image, Center, PopoverTrigger, Popover, Portal, PopoverContent, IconButton, Icon, Button, useDisclosure, PopoverBody, PopoverArrow, useToast } from '@chakra-ui/react'
import { usePlayerClient } from '../providers/usePlayerClient'
import { useAnchorProvider } from '../providers/AnchorProviderProvider'
import React, { useCallback, useEffect, Fragment } from 'react'
import { useCharacter } from '../providers/CharacterProvider'
import { pdas } from '../sdk'
import { isConsumable, ItemType } from '../sdk/arg_types'
import { Keypair, PublicKey } from '@solana/web3.js'
import { useDelegateKeypair } from '../providers/useDelegateKeypair'

interface InventoryItemProps {
    item: number | null
    equipSlot: string | null
    target: PublicKey | null
}

const InventoryItem = ({ item, equipSlot, target }: InventoryItemProps) => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const { playerClient } = usePlayerClient()
    const { anchorProvider } = useAnchorProvider()
    const { characterMint, isZombie } = useCharacter()
    const [itemType, setItemType] = React.useState<ItemType>({})
    const { delegateKeypair } = useDelegateKeypair();

    const toast = useToast();

    const equip = useCallback(async () => {
        if (playerClient && anchorProvider && characterMint && item) {
            let tx = await playerClient.characterEquipItem(characterMint, item)
            try {
                await playerClient.getProvider().sendAndConfirm(tx, [], { skipPreflight: true, commitment: 'confirmed' })
            } catch (e: any) {
                let errorMessage = e.logs.join().match(/Error Message: ([^,]+)/)[1];
                toast({
                    title: errorMessage,
                    status: 'error',
                    duration: 5000,
                })
            }
        }
        onClose()
    }, [anchorProvider, characterMint, playerClient, item, onClose, toast])

    const unequip = useCallback(async () => {
        if (playerClient && anchorProvider && characterMint && equipSlot) {
            let x: any = {}
            x[equipSlot] = {};
            let tx = await playerClient.characterUnequipItem(characterMint, x)
            try {
                await playerClient.getProvider().sendAndConfirm(tx, [], { skipPreflight: true, commitment: 'confirmed' })
            } catch (e: any) {
                let errorMessage = e.logs.join().match(/Error Message: ([^,]+)/)[1];
                toast({
                    title: errorMessage,
                    status: 'error',
                    duration: 5000,
                })
            }
        }
        onClose()
    }, [anchorProvider, characterMint, playerClient, equipSlot, onClose, toast])

    const swapZombieWeapon = useCallback(async () => {
        if (playerClient && anchorProvider && characterMint) {
            let equipItem = 500;
            if (!item) {
                equipItem = 500;
            } else {
                if (item === 500) {
                    equipItem = 501;
                } else {
                    equipItem = 500;
                }
            }
            let tx = await playerClient.characterEquipItem(characterMint, equipItem)
            try {
                await playerClient.getProvider().sendAndConfirm(tx, [], { skipPreflight: true, commitment: 'confirmed' })
            } catch (e: any) {
                let errorMessage = e.logs.join().match(/Error Message: ([^,]+)/)[1];
                toast({
                    title: errorMessage,
                    status: 'error',
                    duration: 5000,
                })
            }
        }
        onClose()
    }, [anchorProvider, characterMint, playerClient, item, onClose, toast])

    const destroy = useCallback(async () => {
        if (playerClient && anchorProvider && characterMint && item) {
            let tx = await playerClient.characterDestroyItem(characterMint, item)
            try {
                await playerClient.getProvider().sendAndConfirm(tx, [], { skipPreflight: true, commitment: 'confirmed' })
            } catch (e: any) {
                let errorMessage = e.logs.join().match(/Error Message: ([^,]+)/)[1];
                toast({
                    title: errorMessage,
                    status: 'error',
                    duration: 5000,
                })
            }
        }
        onClose()
    }, [anchorProvider, characterMint, playerClient, item, onClose, toast])

    const useItem = useCallback(async () => {
        if (playerClient && anchorProvider && characterMint && item) {
            let tx = await playerClient.characterUseItem(characterMint, characterMint, item)
            try {
                await playerClient.getProvider().sendAndConfirm(tx, [], { skipPreflight: true, commitment: 'confirmed' })
            } catch (e: any) {
                let errorMessage = e.logs.join().match(/Error Message: ([^,]+)/)[1];
                toast({
                    title: errorMessage,
                    status: 'error',
                    duration: 5000,
                })
            }
        }
        onClose()
    }, [anchorProvider, characterMint, playerClient, item, onClose, toast])

    const mintItem = useCallback(async () => {
        if (playerClient && anchorProvider && characterMint && item && !delegateKeypair) {
            let mint = Keypair.generate();
            let tx = await playerClient.itemMint(mint, characterMint, item)
            try {
                await anchorProvider.sendAndConfirm(tx, [mint], { skipPreflight: true, commitment: 'confirmed' })
            } catch (e: any) {
                console.log(e);
                let errorMessage = e.logs.join().match(/Error Message: ([^,]+)/)[1];
                toast({
                    title: errorMessage,
                    status: 'error',
                    duration: 5000,
                })
            }
        }
        onClose()
    }, [anchorProvider, characterMint, playerClient, item, onClose, toast, delegateKeypair])

    const lootItem = useCallback(async () => {
        if (playerClient && anchorProvider && characterMint && item && target) {
            let tx = await playerClient.characterLoot(characterMint, target, item)
            try {
                await anchorProvider.sendAndConfirm(tx, [], { skipPreflight: true, commitment: 'confirmed' })
            } catch (e: any) {
                console.log(e);
                let errorMessage = e.logs.join().match(/Error Message: ([^,]+)/)[1];
                toast({
                    title: errorMessage,
                    status: 'error',
                    duration: 5000,
                })
            }
        }
        onClose()
    }, [anchorProvider, characterMint, playerClient, item, onClose, target, toast])


    useEffect(() => {
        async function getItem() {
            if (playerClient && characterMint && item) {
                const result = await playerClient.program.account.item.fetch(pdas.item(item));
                setItemType(result.itemType as ItemType);
            }
        }
        getItem()
    }, [item, playerClient, characterMint])

    return (
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            <PopoverTrigger>
                <Box borderColor='#A8B5B2' borderWidth={item ? '5px' : '0px'} width='75px' height='75px' _hover={{ borderColor: '#394A50' }} cursor={item ? 'pointer' : 'default'}><Image src={`https://cdn.zedwars.com/items/${item ?? `${equipSlot}_placeholder`}.png`}></Image></Box>
            </PopoverTrigger>
            <Portal>
                {(item || isZombie) && (
                    <PopoverContent backgroundColor='#577277' borderRadius={'0'} borderColor='black' borderWidth='1px' width={equipSlot ? (isZombie ? '225px' : '175px') : '290px'}>
                        <PopoverBody borderColor='#A8B5B2' borderWidth='3px'>
                            <PopoverArrow backgroundColor='#577277' />
                            <Center>
                                {!equipSlot && (
                                    <Fragment>
                                        {!isConsumable(itemType) && (
                                            <Button onClick={equip} size='md' color='white' borderRadius='0' aria-label='Equip Item' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} mr='2'>Equip</Button>
                                        )}
                                        {isConsumable(itemType) && (
                                            <Button onClick={useItem} size='md' color='white' borderRadius='0' aria-label='Use Item' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} mr='2'>Use</Button>
                                        )}
                                        <Button onClick={destroy} size='md' color='white' borderRadius='0' aria-label='Destroy Item' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} mr='2'>Destroy</Button>
                                        <Button onClick={mintItem} size='md' color='white' borderRadius='0' aria-label='Mint Item' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} mr='2'>Mint</Button>
                                    </Fragment>
                                )}
                                {equipSlot && equipSlot !== 'loot' && !isZombie && (
                                    <Button onClick={unequip} size='md' color='white' borderRadius='0' aria-label='Unequip Item' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} mr='2'>Unequip</Button>
                                )}
                                {equipSlot && equipSlot === 'loot' && (
                                    <Button onClick={lootItem} size='md' color='white' borderRadius='0' aria-label='Loot Item' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} mr='2'>Loot</Button>
                                )}
                                {equipSlot && equipSlot !== 'loot' && isZombie && (
                                    <Button onClick={swapZombieWeapon} size='md' color='white' borderRadius='0' aria-label='Swap Weapon' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} mr='2'>Swap to {!item || item === 501 ? 'Bite' : 'Claws'}</Button>
                                )}
                                <IconButton onClick={onClose} borderRadius='0' aria-label='View Skills' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }} icon={<Icon viewBox="0 0 24 24" fill="white" stroke='white'>
                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                </Icon>} />
                            </Center>
                        </PopoverBody>
                    </PopoverContent>
                )}
            </Portal>
        </Popover>

    )
}

export default InventoryItem
