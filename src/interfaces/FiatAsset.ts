/** @category Asset */
export interface FiatAsset {
  name: string
  decimals: number
  ticker: string
  price: {
    value: string
    ticker: string
  }
}
