'use client'

import { ChakraProvider, theme } from '@chakra-ui/react'
import { SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { TransactionLogsProvider } from '../providers/TransactionLogsProvider'
import { AnchorProviderProvider } from '../providers/AnchorProviderProvider'
import { DelegateKeypairProvider } from '../providers/DelegateKeypairProvider'
import { OperatorClientProvider } from '../providers/OperatorClientProvider'
import DebugPanel from '../components/DebugPanel'
import React from 'react'

export default function Home() {
  
  const endpoint = 'https://devnet.helius-rpc.com/?api-key=e5c039f0-477f-4fdb-a516-060fda57b12f'
  const wallets = React.useMemo(
    () => [ new SolflareWalletAdapter()],
    []
  )

  return (
    <ChakraProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
          <WalletModalProvider>
            <DelegateKeypairProvider>
              <AnchorProviderProvider>
                  <TransactionLogsProvider>
                    <OperatorClientProvider>
                      <DebugPanel />
                    </OperatorClientProvider>
                  </TransactionLogsProvider>
              </AnchorProviderProvider>
            </DelegateKeypairProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ChakraProvider>
  )
}
