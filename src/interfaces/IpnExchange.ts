import { IpnKind } from './IpnKind'
import { IpnStatus } from './IpnStatus'

/** @category Ipn */
export interface IpnExchange {
  id: string
  kind: IpnKind.EXCHANGE
  targetTicker: string
  targetAmount: string
  fee: string
  spendTicker: string
  spendAmount: string
  price: string
  pricePair: string[]
  meta?: string
  localId: string
  status: IpnStatus
  merchantId: string
  failedReason?: string
  time: number
}
