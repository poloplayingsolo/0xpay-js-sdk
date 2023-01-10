import { Blockchain } from './Blockchain'
import { IpnKind } from './IpnKind'
import { IpnStatus } from './IpnStatus'

/** @category Ipn */
export interface IpnWithdraw {
  id: string
  hash?: string
  internal: boolean
  block?: number
  ticker: string
  blockchain: Blockchain
  kind: IpnKind.WITHDRAW
  from: string[]
  to: string
  amount: string
  fee: string
  meta?: string
  equivalent: {
    value: string
    price: string
    ticker: string
  }
  localId: string
  status: IpnStatus
  time: number
}
