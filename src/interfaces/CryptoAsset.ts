import { Blockchain } from './Blockchain'

/** @category Asset */
export interface CryptoAsset {
  name: string
  ticker: string
  blockchains: Blockchain[]
  price: {
    value: string
    ticker: string
  }
}
