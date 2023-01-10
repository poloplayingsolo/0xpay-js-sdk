/** @category Exchange */
export interface EstimatedExchange {
  spend: {
    ticker: string
    amount: string
  }
  exchange: {
    ticker: string
    amount: string
    fee: string
  }
  target: {
    ticker: string
    amount: string
  }
  price: {
    value: string
    pair: [string, string]
  }
}
