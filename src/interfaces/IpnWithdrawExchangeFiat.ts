import { IpnKind } from './IpnKind'
import { IpnStatus } from './IpnStatus'

/** @category Ipn */
export interface IpnWithdrawExchangeFiat {
  id: string
  kind: IpnKind.WITHDRAW_EXCHANGE_FIAT
  ticker: string
  amount: string
  fee: string
  exchangeFee: string
  spendTicker: string
  spendAmount: string
  price: string
  pricePair: string[]
  to: string
  failedReason?: string
  meta?: string
  localId: string
  internal?: boolean
  status: IpnStatus
  merchantId: string
  time: number
  paidAmount: string
  failedAmount?: string
  failedFee?: string
  exchanged: boolean
}
