import { Validation } from '@/presentation/protocols/validations'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class ValidationComposite implements Validation {
  private constructor(private readonly validators: FieldValidation[]) {}

  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators)
  }

  validate(
    fieldName: string,
    fieldValue: string,
    compareValue: string = ''
  ): string {
    const validators = this.validators.filter(v => v.name === fieldName)

    for (const validator of validators) {
      const error = validator.validate(fieldValue, compareValue)
      if (error) {
        return error.message
      }
    }
  }
}
