import { IpnKind, IpnStatus } from '../enums'
/** @category Ipn */
export interface IpnWithdrawExchangeFiat {
  kind: IpnKind.WITHDRAW_EXCHANGE_FIAT
  id: string
  ticker: string
  amount: string
  paidAmount?: string
  failedAmount?: string
  paidFee?: string
  failedFee?: string
  fee: string
  meta?: string
  localId?: string
  status: IpnStatus
  time: number
  exchangeFee: string
  spendTicker: string
  spendAmount: string
  price: string
  pricePair: string[]
  exchanged: boolean
  to: string
  merchantId: string
  failedReason?: string
}
