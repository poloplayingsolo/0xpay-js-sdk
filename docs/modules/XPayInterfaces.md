[@0xpay/sdk - v0.0.8](../README.md) / XPayInterfaces

# Namespace: XPayInterfaces

## Table of contents

### Asset Interfaces

- [CryptoAsset](../interfaces/XPayInterfaces.CryptoAsset.md)
- [FiatAsset](../interfaces/XPayInterfaces.FiatAsset.md)

### Exchange Interfaces

- [EstimatedExchange](../interfaces/XPayInterfaces.EstimatedExchange.md)
- [ExchangeDirection](../interfaces/XPayInterfaces.ExchangeDirection.md)

### Ipn Interfaces

- [IpnExchange](../interfaces/XPayInterfaces.IpnExchange.md)
- [IpnInvoice](../interfaces/XPayInterfaces.IpnInvoice.md)
- [IpnReplenish](../interfaces/XPayInterfaces.IpnReplenish.md)
- [IpnWithdraw](../interfaces/XPayInterfaces.IpnWithdraw.md)
- [IpnWithdrawBatch](../interfaces/XPayInterfaces.IpnWithdrawBatch.md)
- [IpnWithdrawExchangeCrypto](../interfaces/XPayInterfaces.IpnWithdrawExchangeCrypto.md)
- [IpnWithdrawExchangeFiat](../interfaces/XPayInterfaces.IpnWithdrawExchangeFiat.md)

### Merchant Info Interfaces

- [Balance](../interfaces/XPayInterfaces.Balance.md)

### Withdraw With Exchange Interfaces

- [EstimatedExchangeWithdraw](../interfaces/XPayInterfaces.EstimatedExchangeWithdraw.md)

### General Type Aliases

- [Blockchain](XPayInterfaces.md#blockchain)

### Ipn Type Aliases

- [Ipn](XPayInterfaces.md#ipn)

### Ipn Enumerations

- [IpnKind](../enums/XPayInterfaces.IpnKind.md)
- [IpnStatus](../enums/XPayInterfaces.IpnStatus.md)

## General Type Aliases

### Blockchain

Ƭ **Blockchain**: ``"BITCOIN"`` \| ``"ETHEREUM"`` \| ``"BINANCE_SMART_CHAIN"`` \| ``"TRON"``

Supported blockchain networks

___

## Ipn Type Aliases

### Ipn

Ƭ **Ipn**: [`IpnInvoice`](../interfaces/XPayInterfaces.IpnInvoice.md) \| [`IpnReplenish`](../interfaces/XPayInterfaces.IpnReplenish.md) \| [`IpnWithdraw`](../interfaces/XPayInterfaces.IpnWithdraw.md) \| [`IpnWithdrawBatch`](../interfaces/XPayInterfaces.IpnWithdrawBatch.md) \| [`IpnWithdrawExchangeCrypto`](../interfaces/XPayInterfaces.IpnWithdrawExchangeCrypto.md) \| [`IpnWithdrawExchangeFiat`](../interfaces/XPayInterfaces.IpnWithdrawExchangeFiat.md) \| [`IpnExchange`](../interfaces/XPayInterfaces.IpnExchange.md)
