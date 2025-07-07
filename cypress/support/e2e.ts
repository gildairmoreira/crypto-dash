// Import commands.js using ES2015 syntax:
import './commands'

// Stub console errors and warnings to avoid noise in tests
beforeEach(() => {
  cy.window().then((win) => {
    cy.stub(win.console, 'error').as('consoleError')
    cy.stub(win.console, 'warn').as('consoleWarn')
  })
})

// Custom command to wait for API calls
Cypress.Commands.add('waitForApiCalls', () => {
  // Intercept common API endpoints
  cy.intercept('GET', '**/api/v3/coins/markets*').as('getMarkets')
  cy.intercept('GET', '**/api/v3/coins/*').as('getCoinDetails')
  cy.intercept('GET', '**/api/v3/coins/*/market_chart*').as('getMarketChart')
  
  // Wait for at least one API call to complete
  cy.wait('@getMarkets', { timeout: 10000 }).then(() => {
    cy.log('API calls completed')
  })
})

// Custom command for accessibility testing
Cypress.Commands.add('checkA11y', () => {
  // Basic accessibility checks
  cy.get('img').should('have.attr', 'alt')
  cy.get('button').should('be.visible')
  cy.get('[role]').should('exist')
})

declare global {
  namespace Cypress {
    interface Chainable {
      waitForApiCalls(): Chainable<void>
      checkA11y(): Chainable<void>
    }
  }
}