import { PublicKey } from '@solana/web3.js'
import { createContext, useContext } from 'react'

export interface CharacterContextState {
  characterMint: PublicKey
  x: number
  y: number
}

export const CharacterContext = createContext<CharacterContextState | null>(null)

export function useTransactionLogs(): CharacterContextState | null {
  return useContext(CharacterContext)
}
