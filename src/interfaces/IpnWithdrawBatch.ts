import { IpnKind, IpnStatus } from '../enums'

/** @category Ipn */
export interface IpnWithdrawBatch {
  id: string
  ticker: string
  amount: string
  fee: string
  paidAmount: string
  paidFee: string
  failedAmount: string
  failedFee: string
  time: number
  merchantId: string
  kind: IpnKind.WITHDRAW_BATCH
  status: IpnStatus
  to: string
  meta?: string
  localId?: string
  internal: boolean
}
