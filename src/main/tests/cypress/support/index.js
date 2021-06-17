Cypress.Commands.add('getByTestId', (id) => cy.get(`[data-testid=${id}]`))

Cypress.Commands.add('getInputErrorMessage', (id) => (
  cy.getByTestId(id)
    .children('.ant-form-item-control')
    .children('.ant-form-item-explain-error')
    .children()
))
