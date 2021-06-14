import { CompareFieldsError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class CompareFieldsValidation implements FieldValidation {
  constructor(readonly name: string, private readonly secondValue: string) {}

  validate(value: string): Error {
    return value === this.secondValue ? null : new CompareFieldsError()
  }
}
