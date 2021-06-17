declare namespace Cypress {
  interface Chainable {
    getByTestId: (id: string) => Chainable<Element>
    getInputErrorMessage: (id: string) => Chainable<Element>
  }
}
