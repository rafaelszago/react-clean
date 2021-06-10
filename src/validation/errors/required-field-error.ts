export class RequiredFieldError extends Error {
  constructor(readonly name: string) {
    super(`Field ${name} is required`)
    this.name = 'RequiredFieldError'
  }
}
