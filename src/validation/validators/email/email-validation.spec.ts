import faker from 'faker'
import { EmailError } from '@/validation/errors/email-error'
import { EmailValidation } from './email-validation'

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = new EmailValidation('email')
    const error = sut.validate(faker.random.words())
    expect(error).toEqual(new EmailError())
  })

  test('Should return falsy if email is valid', () => {
    const sut = new EmailValidation('email')
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
