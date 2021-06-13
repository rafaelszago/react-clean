export class MaxLengthError extends Error {
  constructor (readonly name: string, readonly minLength: number) {
    super(`Input ${name} only can be ${minLength} characters`)
    this.name = 'MaxLengthError'
  }
}
