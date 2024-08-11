import { Center, Heading, VStack, Button, Box } from '@chakra-ui/react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

interface WelcomeScreenProps {
  openCharacterSelection: () => void
}
const WelcomeScreen = ({ openCharacterSelection }: WelcomeScreenProps) => {
  const { publicKey } = useWallet()
  return (
    <Center>
      <Box display='flex' alignItems={'center'} borderColor={'#A8B5B2'} borderWidth={'10px'} backgroundColor={'#577277'} height={'850px'} width={'1500px'}>
        <Center height='850px' width='1500px'>
          {(publicKey === null) && (
            <WalletMultiButton style={{ backgroundColor: '#577277', color: 'white', border: '3px solid #A8B5B2', borderRadius: '0' }} />
          )}
          {(publicKey != null) && (
            <Button size='lg' isDisabled={publicKey === null} onClick={openCharacterSelection} color='white' borderRadius='0' aria-label='Choose Character' backgroundColor='#577277' borderColor='#A8B5B2' borderWidth={'3px'} _hover={{ borderColor: '#394A50' }}>
              Select Character
            </Button>
          )}

        </Center>
      </Box>
    </Center>
  )
}

export default WelcomeScreen
