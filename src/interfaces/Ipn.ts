import { IpnExchange } from './IpnExchange'
import { IpnInvoice } from './IpnInvoice'
import { IpnReplenish } from './IpnReplenish'
import { IpnWithdraw } from './IpnWithdraw'
import { IpnWithdrawBatch } from './IpnWithdrawBatch'
import { IpnWithdrawExchangeCrypto } from './IpnWithdrawExchangeCrypto'
import { IpnWithdrawExchangeFiat } from './IpnWithdrawExchangeFiat'

export type Ipn =
  | IpnInvoice
  | IpnReplenish
  | IpnWithdraw
  | IpnWithdrawBatch
  | IpnWithdrawExchangeCrypto
  | IpnWithdrawExchangeFiat
  | IpnExchange
