[@0xpay/sdk - v0.0.8](../README.md) / XPay

# Class: XPay

0xPay API SDK with methods and utilities

## Table of contents

### Properties

- [IPN\_KIND](XPay.md#ipn_kind)
- [IPN\_STATUS](XPay.md#ipn_status)

### Constructors

- [constructor](XPay.md#constructor)

### Basic Crypto Operations Methods

- [createReceiveAddress](XPay.md#createreceiveaddress)
- [withdrawCrypto](XPay.md#withdrawcrypto)
- [getCryptoWithdrawalFee](XPay.md#getcryptowithdrawalfee)
- [getAvailableCryptoAssets](XPay.md#getavailablecryptoassets)

### Basic Fiat Operations Methods

- [withdrawFiat](XPay.md#withdrawfiat)
- [withdrawFiatBatch](XPay.md#withdrawfiatbatch)
- [getFiatWithdrawalFee](XPay.md#getfiatwithdrawalfee)
- [getAvailableFiatAssets](XPay.md#getavailablefiatassets)

### Crypto Invoices Methods

- [createCryptoInvoice](XPay.md#createcryptoinvoice)

### Exchange Methods

- [getAvailableExchangeDirections](XPay.md#getavailableexchangedirections)
- [estimateExchange](XPay.md#estimateexchange)
- [exchange](XPay.md#exchange)

### Fiat Invoices Methods

- [createFiatInvoice](XPay.md#createfiatinvoice)

### Merchant Info Methods

- [getBalances](XPay.md#getbalances)

### Utilities Methods

- [validateWebhookRequest](XPay.md#validatewebhookrequest)
- [isIpnReplenish](XPay.md#isipnreplenish)
- [isIpnInvoice](XPay.md#isipninvoice)
- [isIpnWithdraw](XPay.md#isipnwithdraw)
- [isIpnExchange](XPay.md#isipnexchange)
- [isIpnWithdrawBatch](XPay.md#isipnwithdrawbatch)
- [isIpnWithdrawExchangeCrypto](XPay.md#isipnwithdrawexchangecrypto)
- [isIpnWithdrawExchangeFiat](XPay.md#isipnwithdrawexchangefiat)

### Withdraw With Exchange Methods

- [estimateExchangeWithdrawalCrypto](XPay.md#estimateexchangewithdrawalcrypto)
- [estimateExchangeWithdrawalFiat](XPay.md#estimateexchangewithdrawalfiat)
- [withdrawExchangeCrypto](XPay.md#withdrawexchangecrypto)
- [withdrawExchangeFiat](XPay.md#withdrawexchangefiat)

## Properties

### IPN\_KIND

▪ `Static` `Readonly` **IPN\_KIND**: typeof [`IpnKind`](../enums/XPayInterfaces.IpnKind.md) = `IpnKind`

Shortcut for IpnKind enum

___

### IPN\_STATUS

▪ `Static` `Readonly` **IPN\_STATUS**: typeof [`IpnStatus`](../enums/XPayInterfaces.IpnStatus.md) = `IpnStatus`

Shortcut for IpnStatus enum

## Constructors

### constructor

• **new XPay**(`merchantId`, `privateKey`, `options?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `merchantId` | `string` | Merchant ID |
| `privateKey` | `string` | Merchant private key |
| `options` | `Object` | Sdk options |
| `options.signatureTTL?` | `number` | Time to live for webhook notifiations signature. Must be greater than 1 if provided |
| `options.url?` | `string` | Url of public api |

## Basic Crypto Operations Methods

### createReceiveAddress

▸ **createReceiveAddress**(`body`): `Promise`<`string`\>

Create a deposit wallet address

As said previously, you can generate new deposit addresses with receiving addresses feature.
For BEP20 & ERC20 networks: on creation, one wallet address will be generated and assigned for both networks,
and monitored for incoming transactions.

**`Remarks`**

Deposit Updates: After a receiving address is created on a dedicated blockchain,
0xPay will notify you about incoming transactions for all the assets supported on this blockchain.

**`Throws`**

[XPayApiError](XPayApiError.md) if validation failed or exceed limit(not verified merchant)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `body` | `Object` | Request body |
| `body.blockchain` | [`Blockchain`](../modules/XPayInterfaces.md#blockchain) | Blockchain in which address will be created |
| `body.meta?` | `string` | Metadata to catch it back later with a notification |

#### Returns

`Promise`<`string`\>

Receive address

___

### withdrawCrypto

▸ **withdrawCrypto**(`body`): `Promise`<`string`\>

Send cryptocurrency transaction

Creates an outgoing cryptocurrency transaction.

**`Remarks`**

0xpay API will produce notifications according to status updates on your withdrawal.

**`Throws`**

[XPayApiError](XPayApiError.md) if validation failed, not enough balance or not enough fee

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `body` | `Object` | Request body |
| `body.localId?` | `string` | If was specified - error will be thrown if not unique |
| `body.amount` | `string` | Amount in decimal format |
| `body.to` | `string` | Destination wallet address |
| `body.ticker` | `string` | Currency ticker to withdraw |
| `body.blockchain` | [`Blockchain`](../modules/XPayInterfaces.md#blockchain) | Blockchain in which withdraw transaction will be created |
| `body.meta?` | `string` | Metadata to catch it back later with a notification |
| `body.fee?` | `string` | Precalculated fee. If not the specified – fee will be set automatically |

#### Returns

`Promise`<`string`\>

Withdraw id

___

### getCryptoWithdrawalFee

▸ **getCryptoWithdrawalFee**(`amount`, `ticker`, `blockchain`, `address?`): `Promise`<`string`\>

Get crypto withdraw fee

This method is used to get a fee for sending a desired amount of assets (ticker) on a chosen blockchain.

**`Throws`**

[XPayApiError](XPayApiError.md) if validation failed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `string` | Withdraw amount in decimal format |
| `ticker` | `string` | Currency ticker to withdraw |
| `blockchain` | [`Blockchain`](../modules/XPayInterfaces.md#blockchain) | Blockchain in which withdraw transaction will be created |
| `address?` | `string` | Destination wallet address(if you fill it in, we'll check if the transaction might be an internal transfer) |

#### Returns

`Promise`<`string`\>

Withdraw fee

___

### getAvailableCryptoAssets

▸ **getAvailableCryptoAssets**(): `Promise`<[`CryptoAsset`](../interfaces/XPayInterfaces.CryptoAsset.md)[]\>

List all supported crypto assets

This method is used to fetch all available crypto assets of your merchant.

#### Returns

`Promise`<[`CryptoAsset`](../interfaces/XPayInterfaces.CryptoAsset.md)[]\>

Array of all crypto assets with their ticker, name, price, and blockchain network

___

## Basic Fiat Operations Methods

### withdrawFiat

▸ **withdrawFiat**(`body`): `Promise`<`string`\>

Send single fiat withdraw

Creates an outgoing fiat transaction (for example, UAH payment to a banking card).

**`Remarks`**

Amount limits: Min: 1000 UAH; Max: 14500 UAH.
After creation, 0xpay API will produce notifications according to status updates on your withdrawal.

**`Throws`**

[XPayApiError](XPayApiError.md) if validation failed or not enough balance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `body` | `Object` | Request body |
| `body.localId?` | `string` | If was specified - error will be thrown if not unique |
| `body.amount` | `string` | Amount in decimal format |
| `body.to` | `string` | Destination card number |
| `body.ticker` | `string` | Currency ticker to withdraw(UAH) |
| `body.meta?` | `string` | Metadata to catch it back later with a notification |
| `body.fee?` | `string` | Precalculated fee. If not the specified – fee will be set automatically |

#### Returns

`Promise`<`string`\>

Withdraw id

___

### withdrawFiatBatch

▸ **withdrawFiatBatch**(`body`): `Promise`<`string`\>

Send fiat withdraws as batch

Splits large fiat transactions into several smaller payments and sends them to destination.

**`Remarks`**

Minimal limit: UAH 1000.
After creation, 0xpay API will produce notifications according to status updates on your withdrawal.

Example: You want to send UAH 100,000 to a banking card.
Normally, that'd require creating 7 different requests of ~UAH 14,500.
With batched payments, your transaction amount will be automatically split into smaller portions:
(13800 + 13611 + 14120 + 13900 + 13831 + 13822 + 8447 + 8469 = 100 000), then sent as a batch of payments.

**`Throws`**

[XPayApiError](XPayApiError.md) if validation failed, not enough balance or not enough fee

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `body` | `Object` | Request body |
| `body.localId?` | `string` | If was specified - error will be thrown if not unique |
| `body.amount` | `string` | Amount in decimal format |
| `body.to` | `string` | Destination card number |
| `body.ticker` | `string` | Currency ticker to withdraw(UAH) |
| `body.meta?` | `string` | Metadata to catch it back later with a notification |
| `body.fee?` | `string` | Precalculated fee. If not the specified – fee will be set automatically |

#### Returns

`Promise`<`string`\>

Withdraw batch id

___

### getFiatWithdrawalFee

▸ **getFiatWithdrawalFee**(`amount`, `ticker`): `Promise`<`string`\>

Get fiat withdraw fee

This method is used to get a fee for sending a desired amount of assets (ticker) on a chosen blockchain.

**`Throws`**

[XPayApiError](XPayApiError.md) if validation failed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `string` | Amount in decimal format |
| `ticker` | `string` | Currency ticker to withdraw(UAH) |

#### Returns

`Promise`<`string`\>

Withdraw fee

___

### getAvailableFiatAssets

▸ **getAvailableFiatAssets**(): `Promise`<[`FiatAsset`](../interfaces/XPayInterfaces.FiatAsset.md)[]\>

List all supported fiat assets

This method is used to fetch all available fiat assets of your merchant.

#### Returns

`Promise`<[`FiatAsset`](../interfaces/XPayInterfaces.FiatAsset.md)[]\>

Array of all crypto fiat with their ticker, name and price

___

## Crypto Invoices Methods

### createCryptoInvoice

▸ **createCryptoInvoice**(`body`): `Promise`<`string`\>

Create crypto invoice

Creates a webpage with your crypto invoice details on 0xpay.app domain, usable for a one-time payment.

**`Remarks`**

Payment limits: Min — 25 UAH, Max — 29999 UAH.
Status Updates: After creation, every invoice update will produce an invoice notification.

**`Throws`**

[XPayApiError](XPayApiError.md) if validation failed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `body` | `Object` | Request body |
| `body.email?` | `string` | User email |
| `body.name` | `string` | Descriptional field, name of your invoice. For example: "Order payment" |
| `body.amount?` | `Object` | Amount of invoice in decimal format with ticker and blockchain |
| `body.amount.value` | `string` | - |
| `body.amount.ticker` | `string` | - |
| `body.duration?` | `number` | The lifetime of crypto invoice in ms. Default: 72 hours |
| `body.clientDuration?` | `number` | The lifetime of crypto invoice in ms on the frontend. Default: duration / 2 |
| `body.toPendingImmediate?` | `boolean` | Jump immediately to pending status, it can be useful if you want to skip fist "user prompt" status. |
| `body.meta?` | `string` | - |

#### Returns

`Promise`<`string`\>

Invoice url

___

## Exchange Methods

### getAvailableExchangeDirections

▸ **getAvailableExchangeDirections**(): `Promise`<[`ExchangeDirection`](../interfaces/XPayInterfaces.ExchangeDirection.md)[]\>

Get available exchange directions

Returned available directions to exchange with price and limits.

**`Remarks`**

1.Get available directions for exchange through 0xpay (tickers).
2.Get 0xpay exchange limitations (min, max).
3.Find the way how you should format your swaps (precision, step).

#### Returns

`Promise`<[`ExchangeDirection`](../interfaces/XPayInterfaces.ExchangeDirection.md)[]\>

Exchange directions

___

### estimateExchange

▸ **estimateExchange**(`body`): `Promise`<[`EstimatedExchange`](../interfaces/XPayInterfaces.EstimatedExchange.md)\>

Estimate exchange

Estimate your exchange for later creation.

**`Throws`**

[XPayApiError](XPayApiError.md) if validation failed or not enough liquidity

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `body` | `Object` | Request body |
| `body.spendTicker` | `string` | Asset that you want to spend from your balance |
| `body.targetTicker` | `string` | Asset that you want to receive to your balance |
| `body.amount` | `string` | Amount you want to spend or receive |
| `body.side` | ``"target"`` \| ``"spend"`` | Your chosen direction, two possible values: target or spend |
| `body.price?` | `string` | Actual price of the pair |

#### Returns

`Promise`<[`EstimatedExchange`](../interfaces/XPayInterfaces.EstimatedExchange.md)\>

Estimated exchange

___

### exchange

▸ **exchange**(`body`): `Promise`<`string`\>

Exchange

Create an exchange of two assets.

**`Remark`**

Status Notifications: After the Success response, 0xpay API will produce notifications according to status updates on your exchange.

**`Throws`**

[XPayApiError](XPayApiError.md) if validation failed, not enough liquidity, not enough balance or not enough fee

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `body` | `Object` | Request body |
| `body.amount` | `string` | Amount you want to spend or receive |
| `body.side` | ``"target"`` \| ``"spend"`` | Your chosen direction, two possible values: target or spend |
| `body.meta` | `string` | Metadata to catch it back later with a notification |
| `body.spendTicker` | `string` | Asset that you want to spend from your balance |
| `body.fee` | `string` | Precalculated exchange fee |
| `body.targetTicker` | `string` | Asset that you want to receive to your balance |
| `body.localId` | `string` | If was specified - error will be thrown if not unique |
| `body.price` | `string` | Actual price of the pair |

#### Returns

`Promise`<`string`\>

Exchange id

___

## Fiat Invoices Methods

### createFiatInvoice

▸ **createFiatInvoice**(`body`): `Promise`<`string`\>

Create fiat invoice

Creates a webpage with your fiat invoice details on 0xpay.app domain, usable for a one-time payment.
Currently, the only supported fiat ticker is UAH.

**`Remarks`**

Payment limits: Min — 25 UAH, Max — 29999 UAH.
Status Updates: After creation, every invoice update will produce an invoice notification.

**`Throws`**

[XPayApiError](XPayApiError.md) if validation failed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `body` | `Object` | Request body |
| `body.email?` | `string` | User email |
| `body.name` | `string` | Descriptional field, name of your invoice. For example: "Order payment" |
| `body.amount?` | `Object` | Amount of invoice in decimal format with ticker |
| `body.amount.value` | `string` | - |
| `body.amount.ticker` | `string` | - |
| `body.toPendingImmediate?` | `boolean` | Jump immediately to pending status, it can be useful if you want to skip fist "user prompt" status. |
| `body.meta?` | `string` | - |

#### Returns

`Promise`<`string`\>

Invoice url

___

## Merchant Info Methods

### getBalances

▸ **getBalances**(`tickers`): `Promise`<[`Balance`](../interfaces/XPayInterfaces.Balance.md)[]\>

Get balances info

This method is used to get merchants balances.

**`Throws`**

[XPayApiError](XPayApiError.md) if validation failed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tickers` | `string`[] | Tickers of balances to get |

#### Returns

`Promise`<[`Balance`](../interfaces/XPayInterfaces.Balance.md)[]\>

Balances

___

## Utilities Methods

### validateWebhookRequest

▸ **validateWebhookRequest**(`payload`): `void` \| { `code`: ``-1`` \| ``-2`` \| ``-3`` ; `description`: `string`  }

Validate Webhook Requests

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | Request required payload |
| `payload.method` | `string` | Request method |
| `payload.url` | `string` | Request url |
| `payload.rawBody` | `string` | Request raw unparsed body |
| `payload.timestamp` | `string` \| `number` | - |
| `payload.signature` | `string` | Request `signature` header |

#### Returns

`void` \| { `code`: ``-1`` \| ``-2`` \| ``-3`` ; `description`: `string`  }

Code and description of validation error if failed

___

### isIpnReplenish

▸ **isIpnReplenish**(`ipn`): ipn is IpnReplenish

#### Parameters

| Name | Type |
| :------ | :------ |
| `ipn` | [`Ipn`](../modules/XPayInterfaces.md#ipn) |

#### Returns

ipn is IpnReplenish

___

### isIpnInvoice

▸ **isIpnInvoice**(`ipn`): ipn is IpnInvoice

#### Parameters

| Name | Type |
| :------ | :------ |
| `ipn` | [`Ipn`](../modules/XPayInterfaces.md#ipn) |

#### Returns

ipn is IpnInvoice

___

### isIpnWithdraw

▸ **isIpnWithdraw**(`ipn`): ipn is IpnWithdraw

#### Parameters

| Name | Type |
| :------ | :------ |
| `ipn` | [`Ipn`](../modules/XPayInterfaces.md#ipn) |

#### Returns

ipn is IpnWithdraw

___

### isIpnExchange

▸ **isIpnExchange**(`ipn`): ipn is IpnExchange

#### Parameters

| Name | Type |
| :------ | :------ |
| `ipn` | [`Ipn`](../modules/XPayInterfaces.md#ipn) |

#### Returns

ipn is IpnExchange

___

### isIpnWithdrawBatch

▸ **isIpnWithdrawBatch**(`ipn`): ipn is IpnWithdrawBatch

#### Parameters

| Name | Type |
| :------ | :------ |
| `ipn` | [`Ipn`](../modules/XPayInterfaces.md#ipn) |

#### Returns

ipn is IpnWithdrawBatch

___

### isIpnWithdrawExchangeCrypto

▸ **isIpnWithdrawExchangeCrypto**(`ipn`): ipn is IpnWithdrawExchangeCrypto

#### Parameters

| Name | Type |
| :------ | :------ |
| `ipn` | [`Ipn`](../modules/XPayInterfaces.md#ipn) |

#### Returns

ipn is IpnWithdrawExchangeCrypto

___

### isIpnWithdrawExchangeFiat

▸ **isIpnWithdrawExchangeFiat**(`ipn`): ipn is IpnWithdrawExchangeFiat

#### Parameters

| Name | Type |
| :------ | :------ |
| `ipn` | [`Ipn`](../modules/XPayInterfaces.md#ipn) |

#### Returns

ipn is IpnWithdrawExchangeFiat

___

## Withdraw With Exchange Methods

### estimateExchangeWithdrawalCrypto

▸ **estimateExchangeWithdrawalCrypto**(`body`): `Promise`<[`EstimatedExchangeWithdraw`](../interfaces/XPayInterfaces.EstimatedExchangeWithdraw.md)\>

Estimate crypto withdrawal with exchange

**`Throws`**

[XPayApiError](XPayApiError.md) if validation failed, not enough liquidity

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `body` | `Object` | Request body |
| `body.price?` | `string` | Actual price of the pair |
| `body.spendTicker` | `string` | Asset that you want to spend from your balance |
| `body.ticker` | `string` | Ticker for withdrawal. Example: You want to spend (exchange) USDT and make a withdrawal in BTC (ticker value) |
| `body.blockchain` | [`Blockchain`](../modules/XPayInterfaces.md#blockchain) | Blockchain network for withdrawal |
| `body.amount` | `string` | Amount you want to spend or withdraw |
| `body.side` | ``"spend"`` \| ``"withdraw"`` | Impacts amount field. When you want to withdraw the exact amount – specify the "withdraw" side. When you want to spend (exchange) an exact amount specify "exchange" |
| `body.to?` | `string` | Destination wallet address(if you fill it in, we'll check if the transaction might be an internal transfer) |

#### Returns

`Promise`<[`EstimatedExchangeWithdraw`](../interfaces/XPayInterfaces.EstimatedExchangeWithdraw.md)\>

Estimated crypto withdraw with exchange

___

### estimateExchangeWithdrawalFiat

▸ **estimateExchangeWithdrawalFiat**(`body`): `Promise`<[`EstimatedExchangeWithdraw`](../interfaces/XPayInterfaces.EstimatedExchangeWithdraw.md)\>

Estimate fiat withdrawal with exchange

**`Throws`**

[XPayApiError](XPayApiError.md) if validation failed, not enough liquidity

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `body` | `Object` | Request body |
| `body.price?` | `string` | Actual price of the pair |
| `body.spendTicker` | `string` | Asset that you want to spend from your balance |
| `body.ticker` | `string` | Ticker for withdrawal(only UAH available) |
| `body.amount` | `string` | Amount you want to spend or withdraw |
| `body.side` | ``"spend"`` \| ``"withdraw"`` | Impacts amount field. When you want to withdraw the exact amount – specify the "withdraw" side. When you want to spend (exchange) an exact amount specify "exchange" |

#### Returns

`Promise`<[`EstimatedExchangeWithdraw`](../interfaces/XPayInterfaces.EstimatedExchangeWithdraw.md)\>

Estimated fiat withdraw with exchange

___

### withdrawExchangeCrypto

▸ **withdrawExchangeCrypto**(`body`): `Promise`<`string`\>

Crypto Withdraw With Exchange

**`Remark`**

Status Notifications: After the Success response, 0xpay API will produce notifications according to status updates on your exchange.

**`Throws`**

[XPayApiError](XPayApiError.md) if validation failed, not enough liquidity, not enough balance or not enough fee

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `body` | `Object` | Request body |
| `body.amount` | `string` | Amount you want to spend or withdraw |
| `body.side` | ``"spend"`` \| ``"withdraw"`` | Impacts amount field. When you want to withdraw the exact amount – specify the "withdraw" side. When you want to spend (exchange) an exact amount specify "exchange" |
| `body.localId` | `string` | If was specified - error will be thrown if not unique |
| `body.spendTicker` | `string` | Asset that you want to spend from your balance |
| `body.to` | `string` | Destination wallet address |
| `body.blockchain` | [`Blockchain`](../modules/XPayInterfaces.md#blockchain) | Blockchain network for withdrawal |
| `body.fee` | `string` | Withdrawal fee |
| `body.exchangeFee` | `string` | Fee for exchange operation |
| `body.ticker` | `string` | Ticker for withdrawal. Example: You want to spend (exchange) USDT and make a withdrawal in BTC (ticker value) |
| `body.meta` | `string` | Metadata to catch it back later with a notification |
| `body.price` | `string` | Actual price of the pair |

#### Returns

`Promise`<`string`\>

Crypto withdrawal with exchange id

___

### withdrawExchangeFiat

▸ **withdrawExchangeFiat**(`body`): `Promise`<`void`\>

Fiat Withdraw With Exchange

**`Remark`**

Status Notifications: After the Success response, 0xpay API will produce notifications according to status updates on your exchange.

**`Throws`**

[XPayApiError](XPayApiError.md) if validation failed, not enough liquidity, not enough balance, not enough fee

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `body` | `Object` | Request body |
| `body.amount` | `string` | Amount you want to spend or withdraw |
| `body.side` | ``"spend"`` \| ``"withdraw"`` | Impacts amount field. When you want to withdraw the exact amount – specify the "withdraw" side. When you want to spend (exchange) an exact amount specify "exchange" |
| `body.meta` | `string` | Metadata to catch it back later with a notification |
| `body.spendTicker` | `string` | Asset that you want to spend from your balance |
| `body.to` | `string` | Credit card number |
| `body.fee` | `string` | Withdrawal fee |
| `body.exchangeFee` | `string` | Fee for exchange operation |
| `body.ticker` | `string` | Ticker for withdrawal(only UAh available) |
| `body.localId` | `string` | If was specified - error will be thrown if not unique |
| `body.price` | `string` | Actual price of the pair |

#### Returns

`Promise`<`void`\>

Crypto withdrawal with exchange id
