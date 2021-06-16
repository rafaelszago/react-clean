import faker from 'faker'

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
})
