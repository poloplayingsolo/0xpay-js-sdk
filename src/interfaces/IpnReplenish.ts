import { IpnKind, IpnStatus, Blockchain } from '../enums'

/** @category Ipn */
export interface IpnReplenish {
  id: string
  hash?: string
  internal: boolean
  block?: number
  ticker: string
  blockchain: Blockchain
  kind: IpnKind.REPLENISH
  from: string[]
  to: string
  amount: string
  fee: string
  time: number
  meta: string
  status: IpnStatus
  merchantId: string
  withdrawId?: string
}
