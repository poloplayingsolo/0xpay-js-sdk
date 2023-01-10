[@0xpay/sdk - v0.0.8](../README.md) / [XPayInterfaces](../modules/XPayInterfaces.md) / IpnWithdraw

# Interface: IpnWithdraw

[XPayInterfaces](../modules/XPayInterfaces.md).IpnWithdraw

## Table of contents

### Properties

- [id](XPayInterfaces.IpnWithdraw.md#id)
- [hash](XPayInterfaces.IpnWithdraw.md#hash)
- [internal](XPayInterfaces.IpnWithdraw.md#internal)
- [block](XPayInterfaces.IpnWithdraw.md#block)
- [ticker](XPayInterfaces.IpnWithdraw.md#ticker)
- [blockchain](XPayInterfaces.IpnWithdraw.md#blockchain)
- [kind](XPayInterfaces.IpnWithdraw.md#kind)
- [from](XPayInterfaces.IpnWithdraw.md#from)
- [to](XPayInterfaces.IpnWithdraw.md#to)
- [amount](XPayInterfaces.IpnWithdraw.md#amount)
- [fee](XPayInterfaces.IpnWithdraw.md#fee)
- [meta](XPayInterfaces.IpnWithdraw.md#meta)
- [equivalent](XPayInterfaces.IpnWithdraw.md#equivalent)
- [localId](XPayInterfaces.IpnWithdraw.md#localid)
- [status](XPayInterfaces.IpnWithdraw.md#status)
- [time](XPayInterfaces.IpnWithdraw.md#time)

## Properties

### id

• **id**: `string`

___

### hash

• `Optional` **hash**: `string`

___

### internal

• **internal**: `boolean`

___

### block

• `Optional` **block**: `number`

___

### ticker

• **ticker**: `string`

___

### blockchain

• **blockchain**: [`Blockchain`](../modules/XPayInterfaces.md#blockchain)

___

### kind

• **kind**: [`WITHDRAW`](../enums/XPayInterfaces.IpnKind.md#withdraw)

___

### from

• **from**: `string`[]

___

### to

• **to**: `string`

___

### amount

• **amount**: `string`

___

### fee

• **fee**: `string`

___

### meta

• `Optional` **meta**: `string`

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

### localId

• **localId**: `string`

___

### status

• **status**: [`IpnStatus`](../enums/XPayInterfaces.IpnStatus.md)

___

### time

• **time**: `number`
