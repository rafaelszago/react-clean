export class EmailError extends Error {
  constructor () {
    super('E-mail is invalid')
    this.name = 'EmailError'
  }
}
