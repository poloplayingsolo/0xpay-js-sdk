import { IpnKind, IpnStatus, Blockchain } from '../enums'

/** @category Ipn */
export interface IpnCryptoInvoice {
  id: string
  ticker: string
  amount: string
  baseTicker?: string
  baseAmount?: string
  price?: string
  paidPrice?: string
  blockchain: Blockchain
  address: string
  paidAmount?: string
  fee?: string
  time: number
  expiredAt: number
  merchantId: string
  kind: IpnKind.CRYPTO_INVOICE
  status: IpnStatus
  name: string
  meta?: string
  description?: string
}
