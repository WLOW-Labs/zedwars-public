import { Logs } from '@solana/web3.js'
import { createContext, useContext } from 'react'

export interface TransactionLogsContextState {
  logs: Logs | null
}

export const TransactionLogsContext = createContext<TransactionLogsContextState>({} as TransactionLogsContextState)

export function useTransactionLogs(): TransactionLogsContextState {
  return useContext(TransactionLogsContext)
}
