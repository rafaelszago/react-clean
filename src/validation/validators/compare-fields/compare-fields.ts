import { CompareFieldsError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class CompareFieldsValidation implements FieldValidation {
  constructor(readonly name: string) {}

  validate(value: string, compareValue: string): Error {
    return value === compareValue ? null : new CompareFieldsError()
  }
}
