import { createHmac } from 'crypto'

import { ApiError } from './ApiError'
import {
  Blockchain,
  CryptoAsset,
  FiatAsset,
  EstimatedExchange,
  EstimatedExchangeWithdraw,
  ExchangeDirection,
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

import fetch from 'node-fetch'

export class XPay {
  static readonly IPN_KIND = IpnKind
  static readonly IPN_STATUS = IpnStatus

  private readonly url: string // 0xPay url
  private readonly signatureTTL: number // Time to live for ipn signature in seconds

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
      method + url.pathname + url.search + encodedBody + timestamp
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

    if (!resp.ok) throw new ApiError(resp.status, respText)

    return JSON.parse(respText)
  }

  async createReceiveAddress(body: { blockchain: Blockchain; meta: string }): Promise<string> {
    const { address } = await this.fetchWithAuthentication('/merchants/addresses', 'POST', body)
    return address
  }

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

  async withdrawFiat(body: {
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

  async createFiatInvoice(body: {
    meta: string
    amount: { value: string; ticker: string }
    name: string
  }): Promise<string> {
    const response = await this.fetchWithAuthentication('/merchants/invoices', 'POST', body)
    return response.url
  }

  getAvailableExchangeDirections(): Promise<ExchangeDirection[]> {
    return this.fetchWithAuthentication('/merchants/exchange/available-directions', 'GET')
  }

  estimateExchange(body: {
    spendTicker: string
    targetTicker: string
    amount: string
    side: 'spend' | 'target'
    price?: string
  }): Promise<EstimatedExchange> {
    return this.fetchWithAuthentication('/merchants/exchange/estimate', 'GET', body)
  }

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

  withdrawExchangeCrypto(body: {
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
  }): Promise<void> {
    return this.fetchWithAuthentication('/merchants/exchange/withdrawals/crypto', 'POST', body)
  }

  withdrawExchangeFiat(body: {
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
  }): Promise<void> {
    return this.fetchWithAuthentication('/merchants/exchange/withdrawals/fiat', 'POST', body)
  }

  exchange(body: {
    amount: string
    side: 'spend' | 'target'
    meta: string
    spendTicker: string
    fee: string
    targetTicker: string
    localId: string
    price: string
  }): Promise<void> {
    return this.fetchWithAuthentication('/merchants/exchange', 'POST', body)
  }

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

  async getFiatWithdrawalFee(amount: string, ticker: string): Promise<string> {
    const response = await this.fetchWithAuthentication('/merchants/withdrawals/fiat/fee', 'GET', {
      ticker,
      amount
    })

    return response.value
  }

  getAvailableFiatAssets(): Promise<FiatAsset[]> {
    return this.fetchWithAuthentication('/merchants/assets/fiat', 'GET')
  }

  getAvailableCryptoAssets(): Promise<CryptoAsset[]> {
    return this.fetchWithAuthentication('/merchants/assets/crypto', 'GET')
  }

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

  isIpnReplenish(body: Ipn): body is IpnReplenish {
    return body.kind === IpnKind.REPLENISH
  }

  isIpnInvoice(body: Ipn): body is IpnInvoice {
    return body.kind === IpnKind.INVOICE
  }

  isIpnWithdraw(body: Ipn): body is IpnWithdraw {
    return body.kind === IpnKind.WITHDRAW
  }

  isIpnExchange(body: Ipn): body is IpnExchange {
    return body.kind === IpnKind.EXCHANGE
  }

  isIpnWithdrawBatch(body: Ipn): body is IpnWithdrawBatch {
    return body.kind === IpnKind.WITHDRAW_BATCH
  }

  isIpnWithdrawExchangeCrypto(body: Ipn): body is IpnWithdrawExchangeCrypto {
    return body.kind === IpnKind.WITHDRAW_EXCHANGE_CRYPTO
  }

  isIpnWithdrawExchangeFiat(body: Ipn): body is IpnWithdrawExchangeFiat {
    return body.kind === IpnKind.WITHDRAW_EXCHANGE_FIAT
  }
}
