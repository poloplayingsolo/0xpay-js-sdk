import { IpnKind, IpnStatus, Blockchain } from '../enums'

/** @category Ipn */
export interface IpnCryptoWithdraw {
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
  time: number
  merchantId: string
  status: IpnStatus
  localId?: string
}

/** @category Ipn */
export interface IpnFiatWithdraw {
  id: string
  ticker: string
  amount: string
  fee: string
  time: number
  merchantId: string
  kind: IpnKind.WITHDRAW
  status: IpnStatus
  to: string
  meta?: string
  localId?: string
  internal: boolean
}

/** @category Ipn */
export type IpnWithdraw = IpnFiatWithdraw | IpnCryptoWithdraw
