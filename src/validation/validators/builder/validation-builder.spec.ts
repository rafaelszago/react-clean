import faker from 'faker'
import { RequiredFieldValidation, EmailValidation } from '../'
import { MinLengthValidation } from '../min-length/min-length-validation'
import { ValidationBuilder as sut } from './validation-builder'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const fieldName = faker.database.column()
    const validations = sut.field(fieldName).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)])
  })
  test('Should return EmailValidation', () => {
    const fieldName = faker.database.column()
    const validations = sut.field(fieldName).email().build()
    expect(validations).toEqual([new EmailValidation(fieldName)])
  })
  test('Should return EmailValidation', () => {
    const fieldName = faker.database.column()
    const fieldValue = 5
    const validations = sut.field(fieldName).min(fieldValue).build()
    expect(validations).toEqual([
      new MinLengthValidation(fieldName, fieldValue),
    ])
  })
})