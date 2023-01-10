/** @category Merchant Info */
export interface Balance {
  /** Balance value in decimal format */
  value: string
  /** Balance equivalent in USD */
  converted: string
  ticker: string
}