export interface FieldValidation {
  name: string
  validate(value): Error
}
