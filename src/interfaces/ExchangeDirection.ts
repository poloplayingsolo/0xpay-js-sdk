/** @category Exchange */
export interface ExchangeDirection {
  exchange: {
    ticker: string
    amountStep: string
    min: string
    max: string
  }
  target: {
    ticker: string
    amountStep: string
  }
  price: {
    value: string
    pair: [string, string]
  }
  decimals: {
    price: number
    exchange: number
  }
}
