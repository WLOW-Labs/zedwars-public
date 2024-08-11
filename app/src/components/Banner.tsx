import { Box, Center, Text, Link } from '@chakra-ui/react'
import { zIndexMap } from '../styles/theme'

export const Banner = () => (
  <Box position={'absolute'} top={'0'} left={'0'} width={'100%'} backgroundColor={'red'} zIndex={zIndexMap.banner}>
    <Center color={'white'}>
      <Text fontSize={'sm'}>
        The alpha is on the Solana Devnet, you will need some Devnet SOL to play! You can get some{' '}
        <Link href='https://faucet.solana.com/' target='_blank'>
          here
        </Link>{' '}
        or{' '}
        <Link href='https://solfaucet.com/' target='_blank'>
          here
        </Link>
      </Text>
    </Center>
  </Box>
)
