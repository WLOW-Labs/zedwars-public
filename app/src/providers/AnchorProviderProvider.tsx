import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react'
import React, { createContext, useState, useEffect, useContext } from 'react'
import * as anchor from '@coral-xyz/anchor'
import { useDelegateKeypair } from './useDelegateKeypair'

// Define the type for the context values
interface AnchorProviderContextType {
  anchorProvider: anchor.AnchorProvider | null
}

// Create the context
export const AnchorProviderContext = createContext<AnchorProviderContextType>({} as AnchorProviderContextType)

interface AnchorProviderProps {
  children: React.ReactNode
}
// Define the provider component
export const AnchorProviderProvider: React.FC<AnchorProviderProps> = ({ children }) => {
  const { connection } = useConnection()
  const anchorWallet = useAnchorWallet()
  const [anchorProvider, setAnchorProvider] = useState<anchor.AnchorProvider | null>(null)
  const { delegateKeypair } = useDelegateKeypair()

  useEffect(() => {
    if (!connection || !anchorWallet) {
      setAnchorProvider(null)
    } else {
      setAnchorProvider(
        new anchor.AnchorProvider(connection, anchorWallet, { skipPreflight: true, commitment: 'confirmed' })
      )
    }
  }, [connection, anchorWallet, delegateKeypair])

  // Return the context provider with the provided values and functions
  return <AnchorProviderContext.Provider value={{ anchorProvider }}>{children}</AnchorProviderContext.Provider>
}
// Define the hook to use the context values
export const useAnchorProvider = () => {
  const val = useContext(AnchorProviderContext)
  return val
}
