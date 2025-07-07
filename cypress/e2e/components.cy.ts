describe('Crypto Dashboard - Component Tests', () => {
  beforeEach(() => {
    cy.waitForApiCalls()
    cy.visit('/')
    cy.waitForLoading()
  })

  describe('Header Component', () => {
    it('should display all header elements', () => {
      cy.get('[data-testid="header"]').within(() => {
        cy.get('[data-testid="currency-selector"]').should('be.visible')
        cy.get('[data-testid="theme-toggle"]').should('be.visible')
      })
    })

    it('should show currency options when clicked', () => {
      cy.get('[data-testid="currency-selector"]').click()
      cy.get('[data-testid="currency-option-usd"]').should('be.visible')
      cy.get('[data-testid="currency-option-brl"]').should('be.visible')
      cy.get('[data-testid="currency-option-eur"]').should('be.visible')
    })
  })

  describe('Market Currency Cards', () => {
    it('should display essential information for each crypto', () => {
      cy.get('[data-testid^="crypto-card-"]').first().within(() => {
        // Verificar se tem imagem
        cy.get('img').should('be.visible').and('have.attr', 'alt')
        
        // Verificar se tem nome e símbolo
        cy.get('[data-testid="crypto-name"]').should('be.visible')
        cy.get('[data-testid="crypto-symbol"]').should('be.visible')
        
        // Verificar se tem preço
        cy.get('[data-testid="crypto-price"]').should('be.visible')
        
        // Verificar se tem mudança de 24h
        cy.get('[data-testid="price-change-24h"]').should('be.visible')
        
        // Verificar se tem gráfico sparkline
        cy.get('[data-testid="sparkline-chart"]').should('be.visible')
      })
    })

    it('should show positive and negative price changes correctly', () => {
      cy.get('[data-testid="price-change-24h"]').each(($el) => {
        const text = $el.text()
        if (text.includes('+')) {
          cy.wrap($el).should('have.class', 'text-green-500')
        } else if (text.includes('-')) {
          cy.wrap($el).should('have.class', 'text-red-500')
        }
      })
    })

    it('should be clickable and navigate to details', () => {
      cy.get('[data-testid^="crypto-card-"]').first().click()
      cy.get('[data-testid="details-view"]').should('be.visible')
    })
  })

  describe('Price Ticker Component', () => {
    it('should display current price and changes', () => {
      cy.selectCryptoCard('bitcoin')
      
      cy.get('[data-testid="price-ticker"]').within(() => {
        cy.get('[data-testid="current-price"]').should('be.visible')
        cy.get('[data-testid="price-change-percentage"]').should('be.visible')
        cy.get('[data-testid="price-change-value"]').should('be.visible')
      })
    })

    it('should update when currency changes', () => {
      cy.selectCryptoCard('bitcoin')
      
      // Verificar preço em USD
      cy.get('[data-testid="current-price"]').should('contain', '$')
      
      // Mudar para BRL
      cy.selectCurrency('brl')
      
      // Verificar se mudou para BRL
      cy.get('[data-testid="current-price"]').should('contain', 'R$')
    })
  })

  describe('Market Chart Component', () => {
    it('should display chart with controls', () => {
      cy.selectCryptoCard('bitcoin')
      
      cy.get('[data-testid="market-chart"]').should('be.visible')
      
      // Verificar controles de período
      cy.get('[data-testid="period-7"]').should('be.visible')
      cy.get('[data-testid="period-30"]').should('be.visible')
      cy.get('[data-testid="period-90"]').should('be.visible')
      cy.get('[data-testid="period-365"]').should('be.visible')
    })

    it('should change chart data when period is selected', () => {
      cy.selectCryptoCard('bitcoin')
      
      // Selecionar período de 30 dias
      cy.get('[data-testid="period-30"]').click()
      cy.wait(2000) // Aguardar carregamento
      
      // Verificar se o gráfico ainda está visível
      cy.get('[data-testid="market-chart"]').should('be.visible')
      
      // Selecionar período de 1 ano
      cy.get('[data-testid="period-365"]').click()
      cy.wait(2000)
      
      cy.get('[data-testid="market-chart"]').should('be.visible')
    })
  })

  describe('Theme Toggle Component', () => {
    it('should toggle between light and dark themes', () => {
      // Verificar tema inicial (dark)
      cy.get('html').should('have.class', 'dark')
      
      // Alternar para tema claro
      cy.toggleTheme()
      cy.get('html').should('not.have.class', 'dark')
      
      // Verificar se os elementos mudaram de cor
      cy.get('[data-testid="header"]').should('have.class', 'bg-white/80')
      
      // Alternar de volta para tema escuro
      cy.toggleTheme()
      cy.get('html').should('have.class', 'dark')
    })
  })

  describe('Loading Component', () => {
    it('should show loading spinner during data fetch', () => {
      // Interceptar API para adicionar delay
      cy.intercept('GET', '**/api/v3/coins/markets*', (req) => {
        req.reply({ delay: 2000 })
      }).as('getMarketDataSlow')
      
      cy.visit('/')
      
      // Verificar se o loading aparece
      cy.get('[data-testid="loading-spinner"]').should('be.visible')
      
      // Aguardar carregamento
      cy.wait('@getMarketDataSlow')
      
      // Verificar se o loading desaparece
      cy.get('[data-testid="loading-spinner"]').should('not.exist')
    })
  })

  describe('Exchange Rate Features', () => {
    it('should display exchange rate status', () => {
      cy.get('[data-testid="exchange-rate-status"]').should('be.visible')
    })

    it('should show exchange rate tooltip on hover', () => {
      cy.get('[data-testid="exchange-rate-tooltip"]').trigger('mouseover')
      cy.get('[data-testid="tooltip-content"]').should('be.visible')
    })
  })
})