import faker from 'faker'
import { mockInvalidCredentialsError, mockSuccess } from '../support/http-mocks'

describe('SignIn', () => {
  beforeEach(() => {
    cy.visit('signin')
  })

  it('Should load with correct initial state', () => {
    cy.get('[data-testid="email"]').should('have.value', '')
    cy.get('[data-testid="password"]').should('have.value', '')
    cy.get('[data-testid="submit"]').should('have.attr', 'disabled')
  })

  it('Should show error if form is invalid', () => {
    cy.get('[data-testid="email"]').type(faker.random.word())
    cy.get('[data-testid="password"]').type(faker.random.alpha({ count: 5 }))
    cy.get('[data-testid="email-item"]')
      .children('.ant-form-item-control')
      .children('.ant-form-item-explain-error')
      .children()
      .should('contain.text', 'E-mail is invalid')
    cy.get('[data-testid="password-item"]')
      .children('.ant-form-item-control')
      .children('.ant-form-item-explain-error')
      .children()
      .should('contain.text', 'Input password need 6 characters at least')
  })

  it('Should enable submit button if form is valid', () => {
    cy.get('[data-testid="email"]').type(faker.internet.email())
    cy.get('[data-testid="password"]').type(faker.random.alpha({ count: 6 }))
    cy.get('[data-testid="submit"]').should('not.have.attr', 'disabled')
  })

  it('Should has no accessToken if credentials are invalid', () => {
    mockInvalidCredentialsError({ url: 'api/signin' })
    cy.get('[data-testid="email"]').type(faker.internet.email())
    cy.get('[data-testid="password"]').type(faker.random.alpha({ count: 6 }))
    cy.get('[data-testid="submit"]').click()
    cy.wait('@apiRequest')
      .window()
      .then(window => assert.isNull(window.localStorage.getItem('accessToken')))
  })

  it('Should save accessToken if request returns status 200', () => {
    mockSuccess({ url: 'api/signin' })
    cy.get('[data-testid="email"]').type(faker.internet.email())
    cy.get('[data-testid="password"]').type(faker.random.alpha({ count: 6 }))
    cy.get('[data-testid="submit"]').click()
    cy.wait('@apiRequest')
      .window()
      .then(window =>
        assert.isNotNull(window.localStorage.getItem('accessToken'))
      )
  })
})
