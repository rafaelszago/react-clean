import faker from 'faker'
import { MinLengthError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'

describe('MinLengthValidation', () => {
  test('Should return error if minLength is invalid', () => {
    const sut = new MinLengthValidation(faker.database.column(), 10)
    const error = sut.validate(faker.random.alphaNumeric(6))
    expect(error).toEqual(new MinLengthError(sut.name, sut.minLength))
  })
})
