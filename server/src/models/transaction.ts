import { ITimed, ETable, createModel } from './'

export interface ITransaction extends ITimed {
  transactionId: number
  partnerId: number
  hash: string
  tokenAddress: string
  tokenId: string
  block: number
  value: number
}

export class Transaction extends createModel<ITransaction>(ETable.TRANSACTION) {}
