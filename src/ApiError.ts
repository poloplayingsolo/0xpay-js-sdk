export class ApiError extends Error {
  readonly body: any
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
