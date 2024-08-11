import React, { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { TransactionLogsContext, TransactionLogsContextState } from './useTransactionLogs'
import { useConnection } from '@solana/wallet-adapter-react'
import { Logs } from '@solana/web3.js'
import { PROGRAM_ID } from '../sdk'

export interface TransactionLogsProviderProps {
  children: ReactNode
}

export const TransactionLogsProvider: FC<TransactionLogsProviderProps> = ({ children }) => {
  const { connection } = useConnection()
  const [logs, setLogs] = useState<Logs | null>(null)
  const onLogs = useCallback(
    (logs: Logs) => {
      setLogs(logs)
    },
    [setLogs]
  )
  useEffect(() => {
    const logsSubscriptionId = connection.onLogs(PROGRAM_ID, onLogs, 'confirmed')
    return () => {
      connection.removeOnLogsListener(logsSubscriptionId)
    }
  }, [connection, onLogs])

  const value: TransactionLogsContextState = useMemo(() => ({ logs }), [logs])

  return <TransactionLogsContext.Provider value={value}>{children}</TransactionLogsContext.Provider>
}
