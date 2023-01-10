# @0xpay/sdk

## Node.js 0xPay integration package
[![npm](https://img.shields.io/npm/v/@0xpay/sdk.svg)](https://www.npmjs.com/package/@0xpay/sdk)


## Overview

SDK for [0xPay Merchant API](https://docs.0xpay.app/general/welcome-to-0xpay) which allows merchants to accept and manage payments on various blockchain networks and fiat assets via integration options.


## Getting started

### Prerequisites

To start using 0xPay SDK you need to [register your personal account](https://docs.0xpay.app/account-entities/personal-account) and then [create merchant](https://docs.0xpay.app/account-entities/merchants/creation-and-setup) at [0xPay](https://0xpay.app/) to obtain your merchant id and private key and provide it to SDK.

### Installation

```bash
// NPM
npm install @0xpay/sdk
// Yarn
yarn add @0xpay/sdk
```


### Create instance

```ts
import { XPay } from '@0xpay/sdk'

const MERCHANT_ID = 'your-merchant-id'
const MERCHANT_PRIVATE_KEY = 'your-merchant-private-key'

// Create XPay instance
const xpay = new XPay(MERCHANT_ID, MERCHANT_PRIVATE_KEY)
```


### Get available crypto assets

```ts
import { XPay } from '@0xpay/sdk'
import express from 'express'

// Create XPay instance
const xpay = new XPay(...)

express().post('/ipn', express.raw(), (req, res) => {
  const validationError = xpay.validateWebhookRequest({ ...req, ...req.headers })
  if (validationError) throw new Error(validationError.description)

  // processing your ipn...

  res.send('OK')
})
```


## [Extended Docs](./docs/README.md)
