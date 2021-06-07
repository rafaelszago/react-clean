import faker from 'faker'
import { AccountModel } from '../models'
import { AuthenticationParams } from '../usecases'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.alphaNumeric(32),
})
