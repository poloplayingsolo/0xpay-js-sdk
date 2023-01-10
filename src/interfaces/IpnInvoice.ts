import { IpnKind } from './IpnKind'
import { IpnStatus } from './IpnStatus'

/** @category Ipn */
export interface IpnInvoice {
  id: string
  kind: IpnKind.INVOICE
  ticker: string
  merchantId: string
  amount: string
  amountRaw: string
  paidAmount?: string
  paidAmountRaw?: string
  equivalent: {
    value: string
    price: string
    ticker: string
  }
  paidEquivalent: {
    value: string
    price: string
    ticker: string
  }
  fee?: string
  meta?: string
  description?: string
  status: IpnStatus
  time: number
}
