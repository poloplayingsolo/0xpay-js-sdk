/** @category Asset */
export interface FiatAsset {
  name: string
  ticker: string
  price: {
    value: string
    ticker: string
  }
}
