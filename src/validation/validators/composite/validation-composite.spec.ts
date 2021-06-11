import faker from 'faker'
import { ValidationComposite } from './validation-composite'
import { FieldValidationSpy } from '../../tests/mock-field-validation'

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column()
    const fieldValidationSpy = new FieldValidationSpy(fieldName)
    const fieldValidationSpy2 = new FieldValidationSpy(fieldName)
    const errorMessage = faker.hacker.phrase()
    fieldValidationSpy2.error = new Error(errorMessage)
    const sut = new ValidationComposite([
      fieldValidationSpy,
      fieldValidationSpy2,
    ])
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBe(errorMessage)
  })
})
