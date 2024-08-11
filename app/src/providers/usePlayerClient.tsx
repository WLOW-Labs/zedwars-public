import { PublicKey } from '@solana/web3.js'
import { createContext, useContext } from 'react'
import { PlayerClient } from '../sdk'

export interface PlayerClientContextState {
  playerClient: PlayerClient | null
  playerPublicKey: PublicKey | null
}

export const PlayerClientContext = createContext<PlayerClientContextState>({} as PlayerClientContextState)

export function usePlayerClient(): PlayerClientContextState {
  return useContext(PlayerClientContext)
}
