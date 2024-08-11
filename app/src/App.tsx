import * as React from 'react'
import { ChakraProvider, Box, Grid, extendTheme, Center } from '@chakra-ui/react'
import { SolflareWalletAdapter, BraveWalletAdapter } from '@solana/wallet-adapter-wallets'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PlayerClientProvider } from './providers/PlayerClientProvider'
import MainPage from './pages/MainPage'
import { CharacterProvider } from './providers/CharacterProvider'
import { AnchorProviderProvider } from './providers/AnchorProviderProvider'
import { DelegateKeypairProvider } from './providers/DelegateKeypairProvider'
import { useRef } from 'react'
import { SessionProvider } from './providers/SessionProvider'

require('@solana/wallet-adapter-react-ui/styles.css')

export const App = () => {
  const endpoint = `${process.env.REACT_APP_RPC_URL}`
  const wallets = React.useMemo(
    () => [new BraveWalletAdapter(), new SolflareWalletAdapter()],
    []
  )
  const ref = useRef<HTMLDivElement>(null);

  const theme = extendTheme({
    styles: {
      global: {
        body: {
          color: "white",
        },
      },
    },
  })

  return (
    <ChakraProvider theme={theme} portalZIndex={40} toastOptions={{
      portalProps: {
        containerRef: ref,
      },
      defaultOptions: {
        position: 'bottom-right',
        duration: 2500,
      }
    }}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
          <WalletModalProvider>
            <DelegateKeypairProvider>
              <SessionProvider>
                <AnchorProviderProvider>
                  <PlayerClientProvider>
                    <CharacterProvider>
                      <Box fontSize='xl' backgroundImage={'https://cdn.zedwars.com/images/background.png'}>
                        <Grid height={'100vh'}>
                          <Center>
                            <MainPage />
                          </Center>
                        </Grid>
                      </Box>
                    </CharacterProvider>
                  </PlayerClientProvider>
                </AnchorProviderProvider>
              </SessionProvider>
            </DelegateKeypairProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
      {
        <div ref={ref} />
      }
    </ChakraProvider>
  )
}
