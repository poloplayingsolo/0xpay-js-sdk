import { IpnExchange } from './IpnExchange'
import { IpnInvoice } from './IpnInvoice'
import { IpnReplenish } from './IpnReplenish'
import { IpnWithdraw } from './IpnWithdraw'
import { IpnWithdrawBatch } from './IpnWithdrawBatch'
import { IpnWithdrawExchangeCrypto } from './IpnWithdrawExchangeCrypto'
import { IpnWithdrawExchangeFiat } from './IpnWithdrawExchangeFiat'
import { IpnCryptoInvoice } from './IpnCryptoInvoice'

/** @category Ipn */
export type Ipn =
  | IpnInvoice
  | IpnCryptoInvoice
  | IpnReplenish
  | IpnWithdraw
  | IpnWithdrawBatch
  | IpnWithdrawExchangeCrypto
  | IpnWithdrawExchangeFiat
  | IpnExchange
