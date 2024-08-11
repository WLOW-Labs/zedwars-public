import { Keypair } from '@solana/web3.js'
import { FC, ReactNode, useEffect, useState } from 'react'
import { DelegateKeypairContext } from './useDelegateKeypair'

export interface DelegateKeypairProviderProps {
  children: ReactNode
}

export const DelegateKeypairProvider: FC<DelegateKeypairProviderProps> = ({ children }) => {
  const [delegateKeypair, setDelegateKeypair] = useState<Keypair | null>(null)
  useEffect(() => {
    if (delegateKeypair) {
      localStorage.setItem('delegateKeypair', JSON.stringify(delegateKeypair.secretKey))
    }
  }, [delegateKeypair])
  return (
    <DelegateKeypairContext.Provider value={{ delegateKeypair, setDelegateKeypair }}>
      {children}
    </DelegateKeypairContext.Provider>
  )
}
