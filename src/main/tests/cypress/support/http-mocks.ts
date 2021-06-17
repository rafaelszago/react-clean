import faker from 'faker'

export const mockInvalidCredentialsError = (url: string): void => {
  cy.intercept('POST', url, {
    statusCode: 401,
    body: {
      error: faker.random.words()
    }
  }).as('apiRequest')
}

export const mockUnexpectedError = (url: string): void => {
  cy.intercept('POST', url, {
    statusCode: faker.helpers.randomize([400, 404, 500]),
    body: {
      error: faker.random.words()
    }
  }).as('apiRequest')
}

export const mockSuccess = (url: string): void => {
  cy.intercept('POST', url, {
    statusCode: 200,
    body: {
      accessToken: faker.random.alpha({ count: 102 })
    }
  }).as('apiRequest')
}
