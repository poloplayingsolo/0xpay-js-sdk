import { IpnKind, IpnStatus } from '../enums'

/** @category Ipn */
export interface IpnInvoice {
  id: string
  ticker: string
  amount: string
  paidAmount?: string
  cardNumber?: string
  fee?: string
  error?: { code: number; message: string }
  time: number
  merchantId: string
  kind: IpnKind.INVOICE
  status: IpnStatus
  name: string
  meta?: string
  description?: string
}
