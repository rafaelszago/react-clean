import { MaxLengthError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class MaxLengthValidation implements FieldValidation {
  constructor (readonly name: string, readonly minLength: number) {}

  validate (value: string): Error {
    return value.length <= this.minLength
      ? null
      : new MaxLengthError(this.name, this.minLength)
  }
}
