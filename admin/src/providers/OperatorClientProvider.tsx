import { Keypair } from '@solana/web3.js'
import React, { FC, ReactNode, useMemo } from 'react'
import { OperatorClientContext } from './useOperatorClient'
import { OperatorClient } from '../sdk'
import { useConnection } from '@solana/wallet-adapter-react'
import operatorKey from '../../../operator.json'

export interface OperatorClientProviderProps {
  children: ReactNode
}

export const OperatorClientProvider: FC<OperatorClientProviderProps> = ({ children }) => {
  const operatorKeypair = Keypair.fromSecretKey(Buffer.from(operatorKey))
  const { connection } = useConnection()
  const operatorClient = useMemo(() => new OperatorClient(connection, operatorKeypair), [connection, operatorKeypair])

  return (
    <OperatorClientContext.Provider value={{ operatorClient, operatorKeypair }}>
      {children}
    </OperatorClientContext.Provider>
  )
}
