import { Blockchain } from './Blockchain'

export interface CryptoAsset {
  name: string
  ticker: string
  blockchains: Blockchain[]
  price: {
    value: string
    ticker: string
  }
}
