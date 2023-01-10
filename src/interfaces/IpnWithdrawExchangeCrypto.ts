import { Blockchain } from './Blockchain'
import { IpnKind } from './IpnKind'
import { IpnStatus } from './IpnStatus'

/** @category Ipn */
export interface IpnWithdrawExchangeCrypto {
  id: string
  kind: IpnKind.WITHDRAW_EXCHANGE_CRYPTO
  ticker: string
  amount: string
  amountRaw: string
  fee: string
  feeRaw: string
  exchangeFee: string
  exchangeFeeRaw: string
  spendTicker: string
  spendAmount: string
  price: string
  pricePair: string[]
  blockchain: Blockchain
  hash?: string
  address: string
  meta?: string
  localId: string
  internal: boolean
  status: IpnStatus
  merchantId: string
  failedReason?: string
  time: number
  exchanged: boolean
}
