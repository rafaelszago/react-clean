import faker from 'faker'
import { MinLengthError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'

const makeSut = (): MinLengthValidation =>
  new MinLengthValidation(faker.database.column(), 10)

describe('MinLengthValidation', () => {
  test('Should return error if minLength is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(6))
    expect(error).toEqual(new MinLengthError(sut.name, sut.minLength))
  })
})
