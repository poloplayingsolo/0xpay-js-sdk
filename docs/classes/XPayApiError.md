[@0xpay/sdk - v0.0.8](../README.md) / XPayApiError

# Class: XPayApiError

Response API error

## Hierarchy

- `Error`

  ↳ **`XPayApiError`**

## Table of contents

### Properties

- [body](XPayApiError.md#body)
- [status](XPayApiError.md#status)

### Constructors

- [constructor](XPayApiError.md#constructor)

## Properties

### body

• `Readonly` **body**: `any`

response error body: parsed(if json) or raw

___

### status

• `Readonly` **status**: `number`

response status code

## Constructors

### constructor

• **new XPayApiError**(`status`, `body`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `status` | `number` |
| `body` | `string` |

#### Overrides

Error.constructor
