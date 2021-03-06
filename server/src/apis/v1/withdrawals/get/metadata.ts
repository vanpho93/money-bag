import { IWithdrawal } from '../../../../global'

export interface IInput {
  withdrawalId: number
}

export type IOutput = IWithdrawal

export enum EErrorCode {
  WITHDRAWAL_NOT_FOUND = 'WITHDRAWAL_NOT_FOUND',
}
