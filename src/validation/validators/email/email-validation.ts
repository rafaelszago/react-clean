import { EmailError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class EmailValidation implements FieldValidation {
  constructor(readonly name: string) {
    this.name = name
  }

  validate(value: string): Error {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
    return regex.test(value) ? null : new EmailError()
  }
}
