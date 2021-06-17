import { EmailError, MinLengthError } from '@/validation/errors'
import faker from 'faker'
import { mockInvalidCredentialsError, mockSuccess } from '../support/http-mocks'

describe('SignIn', () => {
  beforeEach(() => {
    cy.visit('signin')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.value', '')
    cy.getByTestId('password').should('have.value', '')
    cy.getByTestId('submit').should('have.attr', 'disabled')
  })

  it('Should show error if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    cy.getByTestId('password').type(faker.random.alpha({ count: 5 }))
    cy.getInputErrorMessage('email-item').should(
      'contain.text',
      new EmailError().message
    )
    cy.getInputErrorMessage('password-item').should(
      'contain.text',
      new MinLengthError('password', 6)
    )
  })

  it('Should enable submit button if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.random.alpha({ count: 6 }))
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
  })

  it('Should has no accessToken if credentials are invalid', () => {
    mockInvalidCredentialsError({ url: 'api/signin' })
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.random.alpha({ count: 6 }))
    cy.getByTestId('submit').click()
    cy.wait('@apiRequest')
      .window()
      .then(window => assert.isNull(window.localStorage.getItem('accessToken')))
  })

  it('Should save accessToken if request returns status 200', () => {
    mockSuccess({ url: 'api/signin' })
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.random.alpha({ count: 6 }))
    cy.getByTestId('submit').click()
    cy.wait('@apiRequest')
      .window()
      .then(window =>
        assert.isNotNull(window.localStorage.getItem('accessToken'))
      )
  })
})
