import { IpnKind, IpnStatus } from '../enums'

/** @category Ipn */
export interface IpnExchange {
  kind: IpnKind.EXCHANGE
  id: string
  meta?: string
  localId?: string
  status: IpnStatus
  time: number
  fee: string
  targetTicker: string
  targetAmount: string
  spendTicker: string
  spendAmount: string
  price: string
  pricePair: string[]
  merchantId: string
  failedReason?: string
}


