export class UnexpectedError extends Error {
  constructor() {
    super('Connection error')
    this.name = 'UnexpectedError'
  }
}
