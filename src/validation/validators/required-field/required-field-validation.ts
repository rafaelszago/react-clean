import { RequiredFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly name: string) {
    this.name = name
  }

  validate(value: string): Error {
    return value ? null : new RequiredFieldError(this.name)
  }
}
