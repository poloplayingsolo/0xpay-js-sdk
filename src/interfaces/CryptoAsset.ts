import { Blockchain } from '../enums'

/** @category Asset */
export interface CryptoAsset {
  name: string
  decimals: number
  blockchains: Blockchain[]
  ticker: string
  price: {
    value: string
    ticker: string
  }
}
