import faker from 'faker'
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
  MaxLengthValidation,
} from '../'
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
  test('Should return MinLengthValidation', () => {
    const fieldName = faker.database.column()
    const fieldValue = 5
    const validations = sut.field(fieldName).min(fieldValue).build()
    expect(validations).toEqual([
      new MinLengthValidation(fieldName, fieldValue),
    ])
  })
  test('Should return MaxLengthValidation', () => {
    const fieldName = faker.database.column()
    const fieldValue = 5
    const validations = sut.field(fieldName).max(fieldValue).build()
    expect(validations).toEqual([
      new MaxLengthValidation(fieldName, fieldValue),
    ])
  })
  test('Should return a list of validations', () => {
    const fieldName = faker.database.column()
    const fieldValue = 5
    const validations = sut
      .field(fieldName)
      .required()
      .email()
      .min(fieldValue)
      .max(fieldValue)
      .build()
    expect(validations).toEqual([
      new RequiredFieldValidation(fieldName),
      new EmailValidation(fieldName),
      new MinLengthValidation(fieldName, fieldValue),
      new MaxLengthValidation(fieldName, fieldValue),
    ])
  })
})
