import { Validation } from '../protocols/validations'

export class ValidationStub implements Validation {
  errorMessage: string

  validate (): string {
    return this.errorMessage
  }
}
