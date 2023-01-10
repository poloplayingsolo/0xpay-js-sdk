/**
 * Response API error
 *
 * @category SDK Errors
 */
export class XPayApiError extends Error {
  /** response error body: parsed(if json) or raw */
  readonly body: any
  /** response status code */
  readonly status: number

  constructor(status: number, body: string) {
    super(body)

    this.status = status
    try {
      this.body = JSON.parse(body)
    } catch {
      this.body = body
    }
  }
}
