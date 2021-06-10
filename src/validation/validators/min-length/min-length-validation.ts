import { MinLengthError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor(readonly name: string, readonly minLength: string) {
    this.name = name
    this.minLength = minLength
  }

  validate(value: string): Error {
    return new MinLengthError(this.name, this.minLength)
  }
}
