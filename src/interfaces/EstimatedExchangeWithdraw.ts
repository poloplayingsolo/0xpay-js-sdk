/** @category Withdraw With Exchange */
export interface EstimatedExchangeWithdraw {
  withdraw: {
    ticker: string
    amount: string
    fee: string
  }
  spend: {
    ticker: string
    amount: string
  }
  exchange: {
    ticker: string
    amount: string
    fee: string
  }
  price: {
    value: string
    pair: [string, string]
  }
}
