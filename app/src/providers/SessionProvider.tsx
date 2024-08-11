import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react'
import React, { createContext, useState, useEffect, useContext } from 'react'
import * as anchor from '@coral-xyz/anchor'
import { useDelegateKeypair } from './useDelegateKeypair'

// Define the type for the context values
interface SessionProviderContextType {
  sessionProvider: anchor.AnchorProvider | null
}

// Create the context
export const SessionProviderContext = createContext<SessionProviderContextType>({} as SessionProviderContextType)

interface AnchorProviderProps {
  children: React.ReactNode
}
// Define the provider component
export const SessionProvider: React.FC<AnchorProviderProps> = ({ children }) => {
  const { connection } = useConnection()
  const anchorWallet = useAnchorWallet()
  const [sessionProvider, setSessionProvider] = useState<anchor.AnchorProvider | null>(null)
  const { delegateKeypair } = useDelegateKeypair()

  useEffect(() => {
    if (!connection || !anchorWallet) {
      setSessionProvider(null)
    } else {
      if (delegateKeypair) {
        setSessionProvider(
          new anchor.AnchorProvider(
            connection,
            {
              publicKey: delegateKeypair.publicKey,
              signTransaction: async (tx) => {
                console.log('signing tx with delegate keypair:', delegateKeypair.publicKey.toBase58())
                tx.sign(delegateKeypair as any)
                return tx
              },
              signAllTransactions: async (txs) => {
                txs.forEach((tx) => {
                  tx.sign(delegateKeypair as any)
                })
                return txs
              },
            },
            {
              skipPreflight: true,
              commitment: 'confirmed',
              preflightCommitment: 'confirmed',
            }
          )
        )
      } else {
        setSessionProvider(null);
      }
    }
  }, [connection, anchorWallet, delegateKeypair])

  // Return the context provider with the provided values and functions
  return <SessionProviderContext.Provider value={{ sessionProvider }}>{children}</SessionProviderContext.Provider>
}
// Define the hook to use the context values
export const useSessionProvider = () => {
  const val = useContext(SessionProviderContext)
  return val
}
