/// <reference types="cypress" />
// Declare global namespace for custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      selectCurrency(currency: 'usd' | 'brl' | 'eur'): Chainable<void>
      toggleTheme(): Chainable<void>
      selectCryptoCard(cryptoId: string): Chainable<void>
      waitForLoading(): Chainable<void>
      checkResponsive(): Chainable<void>
      waitForApiCalls(): Chainable<void>
      checkA11y(): Chainable<void>
    }
  }
}

// Custom command to select currency
Cypress.Commands.add('selectCurrency', (currency: 'usd' | 'brl' | 'eur') => {
  cy.get('[data-testid="currency-selector"]').click()
  cy.get(`[data-testid="currency-option-${currency}"]`).click()
  cy.wait(1000) // Wait for currency change to take effect
})

// Custom command to toggle theme
Cypress.Commands.add('toggleTheme', () => {
  cy.get('[data-testid="theme-toggle"]').click()
  cy.wait(500) // Wait for theme transition
})

// Custom command to select a crypto card
Cypress.Commands.add('selectCryptoCard', (cryptoId: string) => {
  cy.get(`[data-testid="crypto-card-${cryptoId}"]`).should('be.visible')
  cy.get(`[data-testid="details-button-${cryptoId}"]`).click()
  cy.wait(1000) // Wait for details to load
})

// Custom command to wait for loading to complete
Cypress.Commands.add('waitForLoading', () => {
  cy.get('[data-testid="loading"]', { timeout: 10000 }).should('not.exist')
})

// Custom command to check responsive design
Cypress.Commands.add('checkResponsive', () => {
  // Test mobile viewport
  cy.viewport(375, 667)
  cy.get('[data-testid="header"]').should('be.visible')
  
  // Test tablet viewport
  cy.viewport(768, 1024)
  cy.get('[data-testid="header"]').should('be.visible')
  
  // Test desktop viewport
  cy.viewport(1280, 720)
  cy.get('[data-testid="header"]').should('be.visible')
})

export {}