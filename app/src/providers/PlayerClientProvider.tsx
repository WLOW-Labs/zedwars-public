import React, { FC, ReactNode, useMemo } from 'react'
import { PlayerClientContext } from './usePlayerClient'
import { PlayerClient } from '../sdk'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useDelegateKeypair } from './useDelegateKeypair'
import { useAnchorProvider } from './AnchorProviderProvider'
import { useSessionProvider } from './SessionProvider'

export interface PlayerClientProviderProps {
  children: ReactNode
}

export const PlayerClientProvider: FC<PlayerClientProviderProps> = ({ children }) => {
  const { delegateKeypair } = useDelegateKeypair()
  const { connection } = useConnection()
  const { anchorProvider } = useAnchorProvider()
  const { sessionProvider } = useSessionProvider()
  const { publicKey } = useWallet()
  const playerClient = useMemo(
    () =>
      publicKey
        ? PlayerClient.make(
            connection,
            publicKey,
            delegateKeypair ? delegateKeypair.publicKey : null,
            sessionProvider,
            anchorProvider
          )
        : null,
    [publicKey, connection, delegateKeypair, anchorProvider, sessionProvider]
  )

  return (
    <PlayerClientContext.Provider value={{ playerClient, playerPublicKey: publicKey }}>
      {children}
    </PlayerClientContext.Provider>
  )
}
