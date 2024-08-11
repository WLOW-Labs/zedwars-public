import { Keypair } from '@solana/web3.js'
import { createContext, useContext } from 'react'

export interface DelegateKeypairContextState {
  delegateKeypair: Keypair | null
  setDelegateKeypair: (keypair: Keypair | null) => void
}

export const DelegateKeypairContext = createContext<DelegateKeypairContextState>({} as DelegateKeypairContextState)

export function useDelegateKeypair(): DelegateKeypairContextState {
  return useContext(DelegateKeypairContext)
}
