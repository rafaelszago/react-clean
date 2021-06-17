import faker from 'faker'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

type HttpMockParams = {
  url: string
  mockName?: string
}

export const mockInvalidCredentialsError = ({
  url,
  mockName = 'apiRequest'
}: HttpMockParams): void => {
  cy.intercept('POST', url, {
    statusCode: 401,
    body: {
      error: new InvalidCredentialsError().message
    }
  }).as(mockName)
}

export const mockUnexpectedError = ({
  url,
  mockName = 'apiRequest'
}: HttpMockParams): void => {
  cy.intercept('POST', url, {
    statusCode: faker.helpers.randomize([400, 404, 500]),
    body: {
      error: new UnexpectedError().message
    }
  }).as(mockName)
}

export const mockSuccess = ({
  url,
  mockName = 'apiRequest'
}: HttpMockParams): void => {
  cy.intercept('POST', url, {
    statusCode: 200,
    body: {
      accessToken: faker.random.alpha({ count: 102 })
    }
  }).as(mockName)
}
