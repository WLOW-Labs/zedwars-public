import { Keypair } from '@solana/web3.js'
import { createContext, useContext } from 'react'
import { OperatorClient } from '../sdk'

export interface OperatorClientContextState {
  operatorClient: OperatorClient
  operatorKeypair: Keypair
}

export const OperatorClientContext = createContext<OperatorClientContextState>({} as OperatorClientContextState)

export function useOperatorClient(): OperatorClientContextState {
  return useContext(OperatorClientContext)
}
