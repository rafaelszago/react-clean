export class MinLengthError extends Error {
  constructor(readonly name: string, readonly minLength: string) {
    super(`Input ${name} need ${minLength} characters at least`)
    this.name = 'MinLengthError'
  }
}
