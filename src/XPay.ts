import { createHmac } from 'crypto'
import fetch from 'node-fetch'

import {
  Blockchain,
  CryptoAsset,
  FiatAsset,
  EstimatedExchange,
  EstimatedExchangeWithdraw,
  ExchangeDirection,
  Balance,
  Ipn,
  IpnReplenish,
  IpnKind,
  IpnInvoice,
  IpnWithdraw,
  IpnExchange,
  IpnWithdrawBatch,
  IpnWithdrawExchangeCrypto,
  IpnWithdrawExchangeFiat,
  IpnStatus
} from './interfaces'
import { XPayApiError } from './XPayApiError'

/**
 * 0xPay API SDK with methods and utilities
 *
 * @category SDK Client
 */
export class XPay {
  /** Shortcut for IpnKind enum */
  static readonly IPN_KIND = IpnKind
  /** Shortcut for IpnStatus enum */
  static readonly IPN_STATUS = IpnStatus

  private readonly url: string
  private readonly signatureTTL: number

  /**
   * @param merchantId - Merchant ID
   * @param privateKey - Merchant private key
   * @param options - Sdk options
   * @param options.signatureTTL - Time to live for webhook notifiations signature. Must be greater than 1 if provided
   * @param options.url - Url of public api
   */
  constructor(
    private readonly merchantId: string,
    private readonly privateKey: string,
    options: { signatureTTL?: number; url?: string } = {}
  ) {
    const { signatureTTL = 5, url = 'https://public.api.0xpay.app' } = options
    if (signatureTTL < 1) throw new Error('Signature TTL can not be less than 1 second')

    this.url = url
    this.signatureTTL = signatureTTL
  }

  private generateSignature(message: string): string {
    return createHmac('sha256', this.privateKey).update(message).digest('hex')
  }

  private async fetchWithAuthentication(
    apiMethod: string,
    method: 'GET' | 'POST' | 'PUT',
    payload?: Record<string, any>
  ): Promise<any> {
    const getMethod = method === 'GET'

    const params = new URLSearchParams(getMethod ? payload : undefined).toString()
    const url = new URL(apiMethod + (params ? '?' + params : ''), this.url)

    const encodedBody = getMethod ? undefined : JSON.stringify(payload)
    const timestamp = Math.floor(Date.now() / 1000)

    const signature = this.generateSignature(
      method + url.pathname + url.search + (encodedBody ?? '') + timestamp
    )

    const resp = await fetch(url.toString(), {
      method,
      body: encodedBody,
      headers: {
        'merchant-id': this.merchantId,
        signature: signature,
        timestamp: timestamp.toString(),
        'Content-Type': 'application/json'
      }
    })

    const respText = await resp.text()

    if (!resp.ok) throw new XPayApiError(resp.status, respText)

    return JSON.parse(respText)
  }

  /**
   * Get balances info
   *
   * This method is used to get merchants balances.
   *
   * @param tickers - Tickers of balances to get
   *
   * @returns Balances
   * 
   * @throws {@link XPayApiError} if validation failed
   * 
   * @category Merchant Info
   */
  getBalances(tickers: string[]): Promise<Balance[]> {
    return this.fetchWithAuthentication('/merchants/balances', 'GET', { tickers })
  }

  /**
   * Create a deposit wallet address
   *
   * As said previously, you can generate new deposit addresses with receiving addresses feature.
   * For BEP20 & ERC20 networks: on creation, one wallet address will be generated and assigned for both networks,
   * and monitored for incoming transactions.
   *
   * @remarks
   * Deposit Updates: After a receiving address is created on a dedicated blockchain,
   * 0xPay will notify you about incoming transactions for all the assets supported on this blockchain.
   *
   * @param body - Request body
   * @param body.blockchain - Blockchain in which address will be created
   * @param body.meta - Metadata to catch it back later with a notification
   *
   * @returns Receive address
   * 
   * @throws {@link XPayApiError} if validation failed or exceed limit(not verified merchant)
   *
   * @category Basic Crypto Operations
   */
  async createReceiveAddress(body: { blockchain: Blockchain; meta?: string }): Promise<string> {
    const { address } = await this.fetchWithAuthentication('/merchants/addresses', 'POST', body)
    return address
  }

  /**
   * Send cryptocurrency transaction
   *
   * Creates an outgoing cryptocurrency transaction.
   *
   * @remarks
   * 0xpay API will produce notifications according to status updates on your withdrawal.
   *
   * @param body - Request body
   * @param body.ticker - Currency ticker to withdraw
   * @param body.blockchain - Blockchain in which withdraw transaction will be created
   * @param body.to - Destination wallet address
   * @param body.amount - Amount in decimal format
   * @param body.fee - Precalculated fee. If not the specified – fee will be set automatically
   * @param body.localId - If was specified - error will be thrown if not unique
   * @param body.meta - Metadata to catch it back later with a notification
   *
   * @returns Withdraw id
   * 
   * @throws {@link XPayApiError} if validation failed, not enough balance or not enough fee
   * 
   * @category Basic Crypto Operations
   */
  async withdrawCrypto(body: {
    localId?: string
    amount: string
    to: string
    ticker: string
    blockchain: Blockchain
    meta?: string
    fee?: string
  }): Promise<string> {
    const response = await this.fetchWithAuthentication('/merchants/withdrawals', 'POST', body)
    return response.id
  }

  /**
   * Get crypto withdraw fee
   *
   * This method is used to get a fee for sending a desired amount of assets (ticker) on a chosen blockchain.
   *
   * @param amount - Withdraw amount in decimal format
   * @param ticker - Currency ticker to withdraw
   * @param blockchain - Blockchain in which withdraw transaction will be created
   * @param address - Destination wallet address(if you fill it in, we'll check if the transaction might be an internal transfer)
   *
   * @returns Withdraw fee
   * 
   * @throws {@link XPayApiError} if validation failed
   * 
   * @category Basic Crypto Operations
   */
  async getCryptoWithdrawalFee(
    amount: string,
    ticker: string,
    blockchain: Blockchain,
    address?: string
  ): Promise<string> {
    const response = await this.fetchWithAuthentication(
      '/merchants/withdrawals/crypto/fee',
      'GET',
      { address, blockchain, ticker, amount }
    )

    return response.value
  }

  /**
   * List all supported crypto assets
   *
   * This method is used to fetch all available crypto assets of your merchant. 
   *
   * @returns Array of all crypto assets with their ticker, name, price, and blockchain network
   * 
   * @category Basic Crypto Operations
   */
  getAvailableCryptoAssets(): Promise<CryptoAsset[]> {
    return this.fetchWithAuthentication('/merchants/assets/crypto', 'GET')
  }

  /**
   * Send single fiat withdraw
   *
   * Creates an outgoing fiat transaction (for example, UAH payment to a banking card).
   *
   * @remarks
   * Amount limits: Min: 1000 UAH; Max: 14500 UAH.
   * After creation, 0xpay API will produce notifications according to status updates on your withdrawal.
   *
   * @param body - Request body
   * @param body.ticker - Currency ticker to withdraw(UAH)
   * @param body.to - Destination card number
   * @param body.amount - Amount in decimal format
   * @param body.fee - Precalculated fee. If not the specified – fee will be set automatically
   * @param body.localId - If was specified - error will be thrown if not unique
   * @param body.meta - Metadata to catch it back later with a notification
   *
   * @returns Withdraw id
   * 
   * @throws {@link XPayApiError} if validation failed or not enough balance
   * 
   * @category Basic Fiat Operations
   */
  async withdrawFiat(body: {
    localId?: string
    amount: string
    to: string
    ticker: string
    meta?: string
    fee?: string
  }): Promise<string> {
    const response = await this.fetchWithAuthentication(
      '/merchants/withdrawals/fiat',
      'POST',
      body
    )
    return response.id
  }

  /**
   * Send fiat withdraws as batch
   *
   * Splits large fiat transactions into several smaller payments and sends them to destination.
   *
   * @remarks
   * Minimal limit: UAH 1000.
   * After creation, 0xpay API will produce notifications according to status updates on your withdrawal.
   *
   * Example: You want to send UAH 100,000 to a banking card.
   * Normally, that'd require creating 7 different requests of ~UAH 14,500.
   * With batched payments, your transaction amount will be automatically split into smaller portions:
   * (13800 + 13611 + 14120 + 13900 + 13831 + 13822 + 8447 + 8469 = 100 000), then sent as a batch of payments. 
   *
   * @param body - Request body
   * @param body.ticker - Currency ticker to withdraw(UAH)
   * @param body.to - Destination card number
   * @param body.amount - Amount in decimal format
   * @param body.fee - Precalculated fee. If not the specified – fee will be set automatically
   * @param body.localId - If was specified - error will be thrown if not unique
   * @param body.meta - Metadata to catch it back later with a notification
   *
   * @returns Withdraw batch id
   * 
   * @throws {@link XPayApiError} if validation failed, not enough balance or not enough fee
   * 
   * @category Basic Fiat Operations
   */
  async withdrawFiatBatch(body: {
    localId?: string
    amount: string
    to: string
    ticker: string
    meta?: string
    fee?: string
  }): Promise<string> {
    const response = await this.fetchWithAuthentication(
      '/merchants/withdrawals/fiat/batch',
      'POST',
      body
    )
    return response.id
  }

  /**
   * Get fiat withdraw fee
   *
   * This method is used to get a fee for sending a desired amount of assets (ticker) on a chosen blockchain.
   *
   * @param amount - Amount in decimal format
   * @param ticker - Currency ticker to withdraw(UAH)
   *
   * @returns Withdraw fee
   * 
   * @throws {@link XPayApiError} if validation failed
   * 
   * @category Basic Fiat Operations
   */
  async getFiatWithdrawalFee(amount: string, ticker: string): Promise<string> {
    const response = await this.fetchWithAuthentication('/merchants/withdrawals/fiat/fee', 'GET', {
      ticker,
      amount
    })

    return response.value
  }

  /**
   * List all supported fiat assets
   *
   * This method is used to fetch all available fiat assets of your merchant.
   *
   * @returns Array of all crypto fiat with their ticker, name and price
   * 
   * @category Basic Fiat Operations
   */
  getAvailableFiatAssets(): Promise<FiatAsset[]> {
    return this.fetchWithAuthentication('/merchants/assets/fiat', 'GET')
  }

  /**
   * Create fiat invoice
   *
   * Creates a webpage with your fiat invoice details on 0xpay.app domain, usable for a one-time payment.
   * Currently, the only supported fiat ticker is UAH.
   * 
   * @remarks
   * Payment limits: Min — 25 UAH, Max — 29999 UAH.
   * Status Updates: After creation, every invoice update will produce an invoice notification.
   *
   * @param body - Request body
   * @param body.email - User email
   * @param body.name - Descriptional field, name of your invoice. For example: "Order payment"
   * @param body.amount - Amount of invoice in decimal format with ticker
   * @param body.toPendingImmediate - Jump immediately to pending status, it can be useful if you want to skip fist "user prompt" status.
   *
   * @returns Invoice url
   * 
   * @throws {@link XPayApiError} if validation failed
   * 
   * @category Fiat Invoices
   */
  async createFiatInvoice(body: {
    email?: string
    name: string
    amount?: { value: string; ticker: string }
    toPendingImmediate?: boolean
    meta?: string
  }): Promise<string> {
    const response = await this.fetchWithAuthentication('/merchants/invoices', 'POST', body)
    return response.url
  }

  /**
   * Create crypto invoice
   *
   * Creates a webpage with your crypto invoice details on 0xpay.app domain, usable for a one-time payment.
   * 
   * @remarks
   * Payment limits: Min — 25 UAH, Max — 29999 UAH.
   * Status Updates: After creation, every invoice update will produce an invoice notification.
   *
   * @param body - Request body
   * @param body.email - User email
   * @param body.name - Descriptional field, name of your invoice. For example: "Order payment"
   * @param body.baseAmount - If specified baseAmount.amount will be converted to the amount after a user clicks the "Continue" button on the invoice page. Useful when you want to bill your user with fiat assets but pay an invoice in crypto
   * @param body.baseAmount.ticker - Only fiat tickers supported now, available values: "UAH", "USD", "EUR"
   * @param body.baseAmount.value - Invoice amount in fiat currency
   * @param body.amount - Amount of invoice in decimal format with ticker and blockchain
   * @param body.amount.ticker - Crypto ticker of pay currency
   * @param body.amount.value - Invoice amount you want to receive from user, this value is optional if `baseAmount` provided
   * @param body.amount.blockchain - Blockchain network to pay
   * @param body.duration - The lifetime of crypto invoice in ms. Default: 72 hours
   * @param body.clientDuration - The lifetime of crypto invoice in ms on the frontend. Default: duration / 2
   * @param body.toPendingImmediate - Jump immediately to pending status, it can be useful if you want to skip fist "user prompt" status.
   *
   * @returns Invoice url
   * 
   * @throws {@link XPayApiError} if validation failed
   * 
   * @category Crypto Invoices
   */
  async createCryptoInvoice(body: {
    email?: string
    name: string
    amount?: { value: string; ticker: string }
    duration?: number
    clientDuration?: number
    toPendingImmediate?: boolean
    meta?: string
  }): Promise<string> {
    const response = await this.fetchWithAuthentication('/merchants/invoices/crypto', 'POST', body)
    return response.url
  }

  /**
   * Get available exchange directions
   *
   * Returned available directions to exchange with price and limits.
   * 
   * @remarks
   * 1.Get available directions for exchange through 0xpay (tickers).
   * 2.Get 0xpay exchange limitations (min, max).
   * 3.Find the way how you should format your swaps (precision, step).
   *
   * @returns Exchange directions
   * 
   * @category Exchange
   */
  getAvailableExchangeDirections(): Promise<ExchangeDirection[]> {
    return this.fetchWithAuthentication('/merchants/exchange/available-directions', 'GET')
  }

  /**
   * Estimate exchange
   *
   * Estimate your exchange for later creation.
   * 
   * @param body - Request body
   * @param body.targetTicker - Asset that you want to receive to your balance
   * @param body.spendTicker - Asset that you want to spend from your balance
   * @param body.amount - Amount you want to spend or receive
   * @param body.side - Your chosen direction, two possible values: target or spend
   * @param body.price - Actual price of the pair
   *
   * @returns Estimated exchange
   * 
   * @throws {@link XPayApiError} if validation failed or not enough liquidity
   * 
   * @category Exchange
   */
  estimateExchange(body: {
    spendTicker: string
    targetTicker: string
    amount: string
    side: 'spend' | 'target'
    price?: string
  }): Promise<EstimatedExchange> {
    return this.fetchWithAuthentication('/merchants/exchange/estimate', 'GET', body)
  }

  /**
   * Exchange
   *
   * Create an exchange of two assets.
   *
   * @remark
   * Status Notifications: After the Success response, 0xpay API will produce notifications according to status updates on your exchange.
   * 
   * @param body - Request body
   * @param body.targetTicker - Asset that you want to receive to your balance
   * @param body.spendTicker - Asset that you want to spend from your balance
   * @param body.amount - Amount you want to spend or receive
   * @param body.side - Your chosen direction, two possible values: target or spend
   * @param body.fee - Precalculated exchange fee
   * @param body.price - Actual price of the pair
   * @param body.meta - Metadata to catch it back later with a notification
   * @param body.localId - If was specified - error will be thrown if not unique
   *
   * @returns Exchange id
   * 
   * @throws {@link XPayApiError} if validation failed, not enough liquidity, not enough balance or not enough fee
   * 
   * @category Exchange
   */
  async exchange(body: {
    amount: string
    side: 'spend' | 'target'
    meta: string
    spendTicker: string
    fee: string
    targetTicker: string
    localId: string
    price: string
  }): Promise<string> {
    const { id } = await this.fetchWithAuthentication('/merchants/exchange', 'POST', body)
    return id
  }

  /**
   * Estimate crypto withdrawal with exchange
   * 
   * @param body - Request body
   * @param body.ticker - Ticker for withdrawal. Example: You want to spend (exchange) USDT and make a withdrawal in BTC (ticker value)
   * @param body.blockchain - Blockchain network for withdrawal
   * @param body.spendTicker - Asset that you want to spend from your balance
   * @param body.amount - Amount you want to spend or withdraw
   * @param body.side - Impacts amount field. When you want to withdraw the exact amount – specify the "withdraw" side. When you want to spend (exchange) an exact amount specify "exchange"
   * @param body.to - Destination wallet address(if you fill it in, we'll check if the transaction might be an internal transfer)
   * @param body.price - Actual price of the pair
   *
   * @returns Estimated crypto withdraw with exchange
   * 
   * @throws {@link XPayApiError} if validation failed, not enough liquidity
   * 
   * @category Withdraw With Exchange
   */
  estimateExchangeWithdrawalCrypto(body: {
    price?: string
    spendTicker: string
    ticker: string
    blockchain: Blockchain
    amount: string
    side: 'spend' | 'withdraw'
    to?: string
  }): Promise<EstimatedExchangeWithdraw> {
    return this.fetchWithAuthentication(
      '/merchants/exchange/withdrawals/crypto/estimate',
      'GET',
      body
    )
  }

  /**
   * Estimate fiat withdrawal with exchange
   * 
   * @param body - Request body
   * @param body.ticker - Ticker for withdrawal(only UAH available)
   * @param body.spendTicker - Asset that you want to spend from your balance
   * @param body.amount - Amount you want to spend or withdraw
   * @param body.side - Impacts amount field. When you want to withdraw the exact amount – specify the "withdraw" side. When you want to spend (exchange) an exact amount specify "exchange"
   * @param body.price - Actual price of the pair
   *
   * @returns Estimated fiat withdraw with exchange
   * 
   * @throws {@link XPayApiError} if validation failed, not enough liquidity
   * 
   * @category Withdraw With Exchange
   */
  estimateExchangeWithdrawalFiat(body: {
    price?: string
    spendTicker: string
    ticker: string
    amount: string
    side: 'spend' | 'withdraw'
  }): Promise<EstimatedExchangeWithdraw> {
    return this.fetchWithAuthentication(
      '/merchants/exchange/withdrawals/fiat/estimate',
      'GET',
      body
    )
  }

  /**
   * Crypto Withdraw With Exchange
   *
   * @remark
   * Status Notifications: After the Success response, 0xpay API will produce notifications according to status updates on your exchange.
   * 
   * @param body - Request body
   * @param body.ticker - Ticker for withdrawal. Example: You want to spend (exchange) USDT and make a withdrawal in BTC (ticker value)
   * @param body.blockchain - Blockchain network for withdrawal
   * @param body.spendTicker - Asset that you want to spend from your balance
   * @param body.amount - Amount you want to spend or withdraw
   * @param body.side - Impacts amount field. When you want to withdraw the exact amount – specify the "withdraw" side. When you want to spend (exchange) an exact amount specify "exchange"
   * @param body.to - Destination wallet address
   * @param body.price - Actual price of the pair
   * @param body.fee - Withdrawal fee
   * @param body.exchangeFee - Fee for exchange operation
   * @param body.meta - Metadata to catch it back later with a notification
   * @param body.localId - If was specified - error will be thrown if not unique
   *
   * @returns Crypto withdrawal with exchange id
   * 
   * @throws {@link XPayApiError} if validation failed, not enough liquidity, not enough balance or not enough fee
   * 
   * @category Withdraw With Exchange
   */
  async withdrawExchangeCrypto(body: {
    amount: string
    side: 'spend' | 'withdraw'
    localId: string
    spendTicker: string
    to: string
    blockchain: Blockchain
    fee: string
    exchangeFee: string
    ticker: string
    meta: string
    price: string
  }): Promise<string> {
    const { id } = await this.fetchWithAuthentication('/merchants/exchange/withdrawals/crypto', 'POST', body)
    return id
  }

  /**
   * Fiat Withdraw With Exchange
   *
   * @remark
   * Status Notifications: After the Success response, 0xpay API will produce notifications according to status updates on your exchange.
   * 
   * @param body - Request body
   * @param body.ticker - Ticker for withdrawal(only UAh available)
   * @param body.spendTicker - Asset that you want to spend from your balance
   * @param body.amount - Amount you want to spend or withdraw
   * @param body.side - Impacts amount field. When you want to withdraw the exact amount – specify the "withdraw" side. When you want to spend (exchange) an exact amount specify "exchange"
   * @param body.to - Credit card number
   * @param body.price - Actual price of the pair
   * @param body.fee - Withdrawal fee
   * @param body.exchangeFee - Fee for exchange operation
   * @param body.meta - Metadata to catch it back later with a notification
   * @param body.localId - If was specified - error will be thrown if not unique
   *
   * @returns Crypto withdrawal with exchange id
   * 
   * @throws {@link XPayApiError} if validation failed, not enough liquidity, not enough balance, not enough fee
   * 
   * @category Withdraw With Exchange
   */
  async withdrawExchangeFiat(body: {
    amount: string
    side: 'spend' | 'withdraw'
    meta: string
    spendTicker: string
    to: string
    fee: string
    exchangeFee: string
    ticker: string
    localId: string
    price: string
  }): Promise<string> {
    const { id } = await this.fetchWithAuthentication('/merchants/exchange/withdrawals/fiat', 'POST', body)
    return id
  }

  /**
   * Validate Webhook Requests
   * 
   * @param payload - Request required payload
   * @param payload.method - Request method
   * @param payload.url - Request url
   * @param payload.rawBody - Request raw unparsed body
   * @param payload.signature - Request `signature` header
   *
   * @returns Code and description of validation error if failed
   * 
   * @category Utilities
   */
  validateWebhookRequest(
    payload: { method: string; url: string; rawBody: string; timestamp: number | string; signature: string },
  ): { code: -1 | -2 | -3; description: string } | void {
    const { method, url, rawBody, signature } = payload
    const timestamp = Number(payload.timestamp)

    const time = Math.floor(Date.now() / 1000)

    if (timestamp > time) return { code: -3, description: 'Future request' }
    if (timestamp < time - this.signatureTTL) return { code: -2, description: 'Signature expired' }

    const message = method.toUpperCase() + url + rawBody + timestamp
    if (this.generateSignature(message) !== signature)
      return { code: -1, description: 'Invalid signature' }
  }

  /** @category Utilities */
  isIpnReplenish(ipn: Ipn): ipn is IpnReplenish {
    return ipn.kind === IpnKind.REPLENISH
  }

  /** @category Utilities */
  isIpnInvoice(ipn: Ipn): ipn is IpnInvoice {
    return ipn.kind === IpnKind.INVOICE
  }

  /** @category Utilities */
  isIpnWithdraw(ipn: Ipn): ipn is IpnWithdraw {
    return ipn.kind === IpnKind.WITHDRAW
  }

  /** @category Utilities */
  isIpnExchange(ipn: Ipn): ipn is IpnExchange {
    return ipn.kind === IpnKind.EXCHANGE
  }

  /** @category Utilities */
  isIpnWithdrawBatch(ipn: Ipn): ipn is IpnWithdrawBatch {
    return ipn.kind === IpnKind.WITHDRAW_BATCH
  }

  /** @category Utilities */
  isIpnWithdrawExchangeCrypto(ipn: Ipn): ipn is IpnWithdrawExchangeCrypto {
    return ipn.kind === IpnKind.WITHDRAW_EXCHANGE_CRYPTO
  }

  /** @category Utilities */
  isIpnWithdrawExchangeFiat(ipn: Ipn): ipn is IpnWithdrawExchangeFiat {
    return ipn.kind === IpnKind.WITHDRAW_EXCHANGE_FIAT
  }
}
