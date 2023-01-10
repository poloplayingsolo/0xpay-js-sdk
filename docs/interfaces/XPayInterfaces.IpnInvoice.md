[@0xpay/sdk - v0.0.8](../README.md) / [XPayInterfaces](../modules/XPayInterfaces.md) / IpnInvoice

# Interface: IpnInvoice

[XPayInterfaces](../modules/XPayInterfaces.md).IpnInvoice

## Table of contents

### Properties

- [id](XPayInterfaces.IpnInvoice.md#id)
- [kind](XPayInterfaces.IpnInvoice.md#kind)
- [ticker](XPayInterfaces.IpnInvoice.md#ticker)
- [merchantId](XPayInterfaces.IpnInvoice.md#merchantid)
- [amount](XPayInterfaces.IpnInvoice.md#amount)
- [amountRaw](XPayInterfaces.IpnInvoice.md#amountraw)
- [paidAmount](XPayInterfaces.IpnInvoice.md#paidamount)
- [paidAmountRaw](XPayInterfaces.IpnInvoice.md#paidamountraw)
- [equivalent](XPayInterfaces.IpnInvoice.md#equivalent)
- [paidEquivalent](XPayInterfaces.IpnInvoice.md#paidequivalent)
- [fee](XPayInterfaces.IpnInvoice.md#fee)
- [meta](XPayInterfaces.IpnInvoice.md#meta)
- [description](XPayInterfaces.IpnInvoice.md#description)
- [status](XPayInterfaces.IpnInvoice.md#status)
- [time](XPayInterfaces.IpnInvoice.md#time)

## Properties

### id

• **id**: `string`

___

### kind

• **kind**: [`INVOICE`](../enums/XPayInterfaces.IpnKind.md#invoice)

___

### ticker

• **ticker**: `string`

___

### merchantId

• **merchantId**: `string`

___

### amount

• **amount**: `string`

___

### amountRaw

• **amountRaw**: `string`

___

### paidAmount

• `Optional` **paidAmount**: `string`

___

### paidAmountRaw

• `Optional` **paidAmountRaw**: `string`

___

### equivalent

• **equivalent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `value` | `string` |
| `price` | `string` |
| `ticker` | `string` |

___

### paidEquivalent

• **paidEquivalent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `value` | `string` |
| `price` | `string` |
| `ticker` | `string` |

___

### fee

• `Optional` **fee**: `string`

___

### meta

• `Optional` **meta**: `string`

___

### description

• `Optional` **description**: `string`

___

### status

• **status**: [`IpnStatus`](../enums/XPayInterfaces.IpnStatus.md)

___

### time

• **time**: `number`
