[@0xpay/sdk - v0.0.8](../README.md) / [XPayInterfaces](../modules/XPayInterfaces.md) / IpnReplenish

# Interface: IpnReplenish

[XPayInterfaces](../modules/XPayInterfaces.md).IpnReplenish

## Table of contents

### Properties

- [id](XPayInterfaces.IpnReplenish.md#id)
- [hash](XPayInterfaces.IpnReplenish.md#hash)
- [internal](XPayInterfaces.IpnReplenish.md#internal)
- [block](XPayInterfaces.IpnReplenish.md#block)
- [ticker](XPayInterfaces.IpnReplenish.md#ticker)
- [blockchain](XPayInterfaces.IpnReplenish.md#blockchain)
- [kind](XPayInterfaces.IpnReplenish.md#kind)
- [from](XPayInterfaces.IpnReplenish.md#from)
- [localId](XPayInterfaces.IpnReplenish.md#localid)
- [to](XPayInterfaces.IpnReplenish.md#to)
- [amount](XPayInterfaces.IpnReplenish.md#amount)
- [amountRaw](XPayInterfaces.IpnReplenish.md#amountraw)
- [fee](XPayInterfaces.IpnReplenish.md#fee)
- [meta](XPayInterfaces.IpnReplenish.md#meta)
- [equivalent](XPayInterfaces.IpnReplenish.md#equivalent)
- [status](XPayInterfaces.IpnReplenish.md#status)

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

• **kind**: [`REPLENISH`](../enums/XPayInterfaces.IpnKind.md#replenish)

___

### from

• **from**: `string`[]

___

### localId

• `Optional` **localId**: `string`

___

### to

• **to**: `string`

___

### amount

• **amount**: `string`

___

### amountRaw

• **amountRaw**: `string`

___

### fee

• `Optional` **fee**: `string`

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

### status

• **status**: [`IpnStatus`](../enums/XPayInterfaces.IpnStatus.md)
