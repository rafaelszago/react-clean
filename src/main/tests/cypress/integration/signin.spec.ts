describe('SignIn', () => {
  beforeEach(() => {
    cy.visit('signin')
  })

  it('Should load with correct initial state', () => {
    cy.get('[data-testid="email"]').should('have.value', '')
    cy.get('[data-testid="password"]').should('have.value', '')
    cy.get('[data-testid="submit"]').should('have.attr', 'disabled')
  })
})
