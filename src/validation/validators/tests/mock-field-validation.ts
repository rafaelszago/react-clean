import { FieldValidation } from '@/validation/protocols/field-validation'

export class FieldValidationSpy implements FieldValidation {
  error: Error = null

  constructor(readonly name: string) {}

  validate(value: string): Error {
    return this.error
  }
}
