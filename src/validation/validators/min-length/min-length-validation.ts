import { MinLengthError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly name: string, readonly minLength: number) {}

  validate (value: string): Error {
    return value.length >= this.minLength
      ? null
      : new MinLengthError(this.name, this.minLength)
  }
}
