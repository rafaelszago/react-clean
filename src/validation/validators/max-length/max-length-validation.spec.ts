import faker from 'faker'
import { MaxLengthError } from '@/validation/errors'
import { MaxLengthValidation } from './max-length-validation'

describe('MinLengthValidation', () => {
  test('Should return error if maxLength is invalid', () => {
    const sut = new MaxLengthValidation(faker.database.column(), 5)
    const error = sut.validate(faker.random.alphaNumeric(10))
    expect(error).toEqual(new MaxLengthError(sut.name, sut.minLength))
  })
})
