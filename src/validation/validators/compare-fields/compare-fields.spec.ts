import { CompareFieldsError } from '@/validation/errors'
import faker from 'faker'
import { CompareFieldsValidation } from './compare-fields'

describe('CompareFieldsValidation', () => {
  test('Should return error if values are different', () => {
    const fieldName = faker.database.column()
    const sut = new CompareFieldsValidation(fieldName)
    const error = sut.validate(faker.random.word(), faker.random.word())

    expect(error).toEqual(new CompareFieldsError())
  })

  test('Should return falsy if values are equal', () => {
    const fieldName = faker.database.column()
    const value = faker.random.word()
    const sut = new CompareFieldsValidation(fieldName)
    const error = sut.validate(value, value)

    expect(error).toBeFalsy()
  })
})
