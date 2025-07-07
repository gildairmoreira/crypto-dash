describe('Crypto Dashboard - Main Flow', () => {
  beforeEach(() => {
    cy.waitForApiCalls()
    cy.visit('/')
  })

  it('should load the homepage successfully', () => {
    // Verificar se a página carrega
    cy.get('[data-testid="header"]').should('be.visible')
    cy.get('[data-testid="dashboard"]').should('be.visible')
    
    // Verificar se o título está presente
    cy.title().should('contain', 'Crypto Dashboard')
    
    // Aguardar carregamento dos dados
    cy.waitForLoading()
    
    // Verificar se as criptomoedas são carregadas
    cy.get('[data-testid^="crypto-card-"]').should('have.length.greaterThan', 0)
  })

  it('should change currency successfully', () => {
    cy.waitForLoading()
    
    // Selecionar moeda BRL
    cy.selectCurrency('brl')
    
    // Verificar se os preços mudaram para BRL
    cy.get('[data-testid^="crypto-card-"]').first().should('contain', 'R$')
    
    // Selecionar moeda EUR
    cy.selectCurrency('eur')
    
    // Verificar se os preços mudaram para EUR
    cy.get('[data-testid^="crypto-card-"]').first().should('contain', '€')
    
    // Voltar para USD
    cy.selectCurrency('usd')
    cy.get('[data-testid^="crypto-card-"]').first().should('contain', '$')
  })

  it('should toggle theme successfully', () => {
    // Verificar tema inicial
    cy.get('body').should('have.class', 'dark')
    
    // Alternar tema
    cy.toggleTheme()
    
    // Verificar se mudou para tema claro
    cy.get('body').should('not.have.class', 'dark')
    
    // Alternar de volta
    cy.toggleTheme()
    cy.get('body').should('have.class', 'dark')
  })

  it('should navigate to crypto details', () => {
    cy.waitForLoading()
    
    // Clicar no primeiro card de criptomoeda
    cy.get('[data-testid^="crypto-card-"]').first().click()
    
    // Verificar se a view de detalhes aparece
    cy.get('[data-testid="details-view"]').should('be.visible')
    
    // Verificar se o gráfico de detalhes carrega
    cy.get('[data-testid="market-chart"]').should('be.visible')
    
    // Verificar se as informações de preço estão presentes
    cy.get('[data-testid="price-ticker"]').should('be.visible')
  })

  it('should display market chart with different time periods', () => {
    cy.waitForLoading()
    
    // Selecionar Bitcoin para detalhes
    cy.selectCryptoCard('bitcoin')
    
    // Verificar se o gráfico carrega
    cy.get('[data-testid="market-chart"]').should('be.visible')
    
    // Testar diferentes períodos de tempo
    const periods = ['7', '30', '90', '365']
    
    periods.forEach(period => {
      cy.get(`[data-testid="period-${period}"]`).click()
      cy.get('[data-testid="market-chart"]').should('be.visible')
      cy.wait(1000) // Aguardar carregamento do gráfico
    })
  })

  it('should be responsive on different screen sizes', () => {
    cy.waitForLoading()
    
    // Testar responsividade
    cy.checkResponsive()
    
    // Verificar se elementos principais estão visíveis em mobile
    cy.viewport(375, 667)
    cy.get('[data-testid="header"]').should('be.visible')
    cy.get('[data-testid="dashboard"]').should('be.visible')
    cy.get('[data-testid^="crypto-card-"]').should('be.visible')
  })

  it('should handle API errors gracefully', () => {
    // Interceptar e simular erro de API
    cy.intercept('GET', '**/api/v3/coins/markets*', {
      statusCode: 500,
      body: { error: 'Internal Server Error' }
    }).as('getMarketDataError')
    
    cy.visit('/')
    cy.wait('@getMarketDataError')
    
    // Verificar se uma mensagem de erro ou fallback é exibida
    cy.get('body').should('contain.text', 'erro')
  })

  it('should persist user preferences', () => {
    cy.waitForLoading()
    
    // Alterar configurações
    cy.selectCurrency('eur')
    cy.toggleTheme()
    
    // Recarregar página
    cy.reload()
    cy.waitForLoading()
    
    // Verificar se as configurações persistiram
    cy.get('[data-testid^="crypto-card-"]').first().should('contain', '€')
    cy.get('body').should('not.have.class', 'dark')
  })

  it('should check basic accessibility', () => {
    cy.waitForLoading()
    cy.checkA11y()
    
    // Verificar navegação por teclado
    cy.get('body').type('{tab}')
    cy.focused().should('be.visible')
  })
})