import faker from 'faker'
import { mockInvalidCredentialsError, mockSuccess } from '../support/http-mocks'
import {
  CompareFieldsError,
  EmailError,
  MinLengthError
} from '@/validation/errors'

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
})
