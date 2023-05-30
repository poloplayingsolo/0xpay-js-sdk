import { IpnKind, IpnStatus, Blockchain } from '../enums'

/** @category Ipn */
export interface IpnWithdrawExchangeCrypto {
  kind: IpnKind.WITHDRAW_EXCHANGE_CRYPTO
  id: string
  ticker: string
  amount: string
  fee: string
  meta?: string
  localId?: string
  status: IpnStatus
  time: number
  exchangeFee: string
  spendTicker: string
  exchanged: boolean
  spendAmount: string
  price: string
  pricePair: string[]
  blockchain: Blockchain
  hash?: string
  internal?: boolean
  address: string
  merchantId: string
  failedReason?: string
}
