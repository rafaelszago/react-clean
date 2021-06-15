export interface FieldValidation {
  name: string
  validate: (value, compareValue) => Error
}
