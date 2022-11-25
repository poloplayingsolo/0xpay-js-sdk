import { Blockchain } from './Blockchain'
import { IpnKind } from './IpnKind'
import { IpnStatus } from './IpnStatus'

export interface IpnReplenish {
  id: string
  hash?: string
  internal: boolean
  block?: number
  ticker: string
  blockchain: Blockchain
  kind: IpnKind.REPLENISH
  from: string[]
  localId?: string
  to: string
  amount: string
  amountRaw: string
  fee?: string
  meta?: string
  equivalent: {
    value: string
    price: string
    ticker: string
  }
  status: IpnStatus
}
