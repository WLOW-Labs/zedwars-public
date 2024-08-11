import { Center, HStack, VStack } from '@chakra-ui/react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useOperatorClient } from '../providers/useOperatorClient'
import AccountInfoCard from './AccountInfoCard'
import ConfigAccountCard from './ConfigAccountCard'
import ConfigCard from './ConfigCard'
import ItemsCard from './ItemsCard'
import MapTileAccountsCard from './MapTileAccountsBox'
import MintCharacterCard from './MintCharacterCard'
import TransactionLogCard from './TransactionLogCard'
import SkillCard from './SkillCard'
import ItemRandomWeightCard from './ItemRandomWeightCard'
import { pdas } from '../sdk'
import GiftItemCard from './GiftItemCard'
import ItemViewerCard from './ItemViewerCard'
import PlayerViewerCard from './PlayerViewerCard'
import TileViewerCard from './TileViewerCard'
import AddRDTItemCard from './AddRDTItem'
import AddLegendaryItemCard from './AddLegendaryItem'

const DebugPanel = () => {
  const { operatorKeypair } = useOperatorClient()
  const { publicKey } = useWallet()
  console.log(operatorKeypair.publicKey.toBase58());
  return (
    <Center>
      <VStack>
        <HStack>
          <AccountInfoCard label='Operator' publicKey={operatorKeypair.publicKey} size={'300px'} />
          <AccountInfoCard label='Treasury' publicKey={pdas.config()} size={'300px'} />
          <TransactionLogCard size={'300px'} />
          <GiftItemCard size={'300px'} />
        </HStack>
        <HStack>
          <ConfigAccountCard size={'300px'} />
          <ItemsCard size={'300px'} />
          <MapTileAccountsCard size={'300px'} />
          <MintCharacterCard size={'300px'} />
        </HStack>
        <HStack>
          <AddRDTItemCard size={'300px'} />
          <AddLegendaryItemCard size={'300px'} />
        </HStack>
        <HStack>
          <ItemViewerCard size={'400px'} />
          <PlayerViewerCard size={'400px'} />
          <TileViewerCard size={'400px'} />
        </HStack>
        <HStack>
          <ConfigCard size={'500px'} />
          <SkillCard size={'500px'} />
          <ItemRandomWeightCard size={'300px'} />
        </HStack>

      </VStack>
    </Center>
  )
}

export default DebugPanel
