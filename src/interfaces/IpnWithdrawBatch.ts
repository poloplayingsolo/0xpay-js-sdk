import { IpnKind } from './IpnKind'
import { IpnStatus } from './IpnStatus'

/** @category Ipn */
export interface IpnWithdrawBatch {
  kind: IpnKind.WITHDRAW_BATCH
  id: string
  ticker: string
  amount: string
  amountRaw: string
  paidAmount: string
  paidAmountRaw: string
  failedAmount: string
  failedAmountRaw: string
  failedFee?: string
  fee: string
  feeRaw?: string
  to: string
  meta: string
  localId: string
  status: IpnStatus
  time: number
}
