import faker from 'faker'
import { RequiredFieldError } from '@/validation/errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation =>
  new RequiredFieldValidation(faker.database.column())

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError(sut.name))
  })

  test('Should return falsy if field is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.words())
    expect(error).toBeFalsy
  })
})
