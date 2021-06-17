import faker from 'faker'
import { mockSuccess, mockUnexpectedError } from '../support/http-mocks'
import {
  CompareFieldsError,
  EmailError,
  MinLengthError
} from '@/validation/errors'
import { UnexpectedError } from '@/domain/errors'

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('name').should('have.value', '')
    cy.getByTestId('email').should('have.value', '')
    cy.getByTestId('password').should('have.value', '')
    cy.getByTestId('password-confirmation').should('have.value', '')
    cy.getByTestId('submit').should('have.attr', 'disabled')
  })

  it('Should show error if form is invalid', () => {
    cy.getByTestId('name').type(faker.random.alpha({ count: 3 }))
    cy.getByTestId('email').type(faker.random.word())
    cy.getByTestId('password').type(faker.random.alpha({ count: 5 }))
    cy.getByTestId('password-confirmation').type(
      faker.random.alpha({ count: 4 })
    )
    cy.getInputErrorMessage('name-item').should(
      'contain.text',
      new MinLengthError('name', 4).message
    )
    cy.getInputErrorMessage('email-item').should(
      'contain.text',
      new EmailError().message
    )
    cy.getInputErrorMessage('password-item').should(
      'contain.text',
      new MinLengthError('password', 6).message
    )
    cy.getInputErrorMessage('password-confirmation-item').should(
      'contain.text',
      new CompareFieldsError().message
    )
  })

  it('Should enable submit button if form is valid', () => {
    const password = faker.random.alpha({ count: 6 })
    cy.getByTestId('name').type(faker.random.alpha({ count: 6 }))
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(password)
    cy.getByTestId('password-confirmation').type(password)
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
  })

  it('Should return UnexpectedErrror if request fails', () => {
    mockUnexpectedError({ url: 'api/signup' })
    const password = faker.random.alpha({ count: 6 })
    cy.getByTestId('name').type(faker.random.alpha({ count: 6 }))
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(password)
    cy.getByTestId('password-confirmation').type(password)
    cy.getByTestId('submit').click()
    cy.wait('@apiRequest')
      .its('response.body.error')
      .should('eq', new UnexpectedError().message)
  })

  it('Should return accessToken if request succeeds', () => {
    mockSuccess({ url: 'api/signup' })
    const password = faker.random.alpha({ count: 6 })
    cy.getByTestId('name').type(faker.random.alpha({ count: 6 }))
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(password)
    cy.getByTestId('password-confirmation').type(password)
    cy.getByTestId('submit').click()
    cy.wait('@apiRequest').its('response.body.accessToken').should('exist')
  })
})
