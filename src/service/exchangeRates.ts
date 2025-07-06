import axios from 'axios'

// Interface para as cotações de câmbio
export interface ExchangeRate {
  pair: string
  rate: string
  lastUpdate: Date
}

export interface ExchangeRateResponse {
  success: boolean
  timestamp: number
  base: string
  date: string
  rates: Record<string, number>
}

// Cache das cotações para evitar muitas requisições
interface CacheEntry {
  data: ExchangeRate[]
  timestamp: number
}

class ExchangeRateService {
  private cache: Map<string, CacheEntry> = new Map()
  private readonly CACHE_DURATION = 6 * 60 * 60 * 1000 // 6 horas em millisegundos
  private readonly API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest'
  
  // Fallback para quando a API não estiver disponível
  private readonly FALLBACK_RATES = {
    USD: { BRL: 5.85, EUR: 0.96 },
    EUR: { USD: 1.04, BRL: 5.62 },
    BRL: { USD: 0.17, EUR: 0.18 }
  }

  private isValidCache(cacheKey: string): boolean {
    const cached = this.cache.get(cacheKey)
    if (!cached) return false
    
    const now = Date.now()
    return (now - cached.timestamp) < this.CACHE_DURATION
  }

  private formatRate(rate: number): string {
    // Formatar com 2-4 casas decimais dependendo do valor
    if (rate < 0.01) {
      return rate.toFixed(4)
    } else if (rate < 1) {
      return rate.toFixed(3)
    } else {
      return rate.toFixed(2)
    }
  }

  private async fetchFromAPI(baseCurrency: string): Promise<ExchangeRate[]> {
    try {
      const response = await axios.get<ExchangeRateResponse>(
        `${this.API_BASE_URL}/${baseCurrency.toUpperCase()}`,
        { timeout: 5000 }
      )

      if (!response.data.success) {
        throw new Error('API response indicates failure')
      }

      const rates: ExchangeRate[] = []
      const { rates: apiRates } = response.data
      const lastUpdate = new Date()

      // Mapear as cotações baseadas na moeda base
      switch (baseCurrency.toUpperCase()) {
        case 'USD':
          if (apiRates.BRL) {
            rates.push({
              pair: 'USD/BRL',
              rate: this.formatRate(apiRates.BRL),
              lastUpdate
            })
          }
          if (apiRates.EUR) {
            rates.push({
              pair: 'USD/EUR',
              rate: this.formatRate(apiRates.EUR),
              lastUpdate
            })
          }
          break

        case 'EUR':
          if (apiRates.USD) {
            rates.push({
              pair: 'EUR/USD',
              rate: this.formatRate(apiRates.USD),
              lastUpdate
            })
          }
          if (apiRates.BRL) {
            rates.push({
              pair: 'EUR/BRL',
              rate: this.formatRate(apiRates.BRL),
              lastUpdate
            })
          }
          break

        case 'BRL':
          if (apiRates.USD) {
            rates.push({
              pair: 'BRL/USD',
              rate: this.formatRate(apiRates.USD),
              lastUpdate
            })
          }
          if (apiRates.EUR) {
            rates.push({
              pair: 'BRL/EUR',
              rate: this.formatRate(apiRates.EUR),
              lastUpdate
            })
          }
          break
      }

      return rates
    } catch (error) {
      console.warn('Falha ao buscar cotações da API, usando valores fallback:', error)
      return this.getFallbackRates(baseCurrency)
    }
  }

  private getFallbackRates(baseCurrency: string): ExchangeRate[] {
    const rates: ExchangeRate[] = []
    const lastUpdate = new Date()
    const base = baseCurrency.toUpperCase() as keyof typeof this.FALLBACK_RATES
    
    if (this.FALLBACK_RATES[base]) {
      Object.entries(this.FALLBACK_RATES[base]).forEach(([currency, rate]) => {
        rates.push({
          pair: `${base}/${currency}`,
          rate: this.formatRate(rate),
          lastUpdate
        })
      })
    }

    return rates
  }

  async getExchangeRates(baseCurrency: string): Promise<ExchangeRate[]> {
    const cacheKey = baseCurrency.toUpperCase()
    
    // Verificar cache primeiro
    if (this.isValidCache(cacheKey)) {
      const cached = this.cache.get(cacheKey)!
      return cached.data
    }

    try {
      // Buscar da API
      const rates = await this.fetchFromAPI(baseCurrency)
      
      // Salvar no cache
      this.cache.set(cacheKey, {
        data: rates,
        timestamp: Date.now()
      })

      return rates
    } catch (error) {
      console.error('Erro ao buscar cotações:', error)
      
      // Se tiver cache expirado, usar ele mesmo assim
      const cached = this.cache.get(cacheKey)
      if (cached) {
        console.warn('Usando cache expirado devido a erro na API')
        return cached.data
      }
      
      // Último recurso: valores fallback
      return this.getFallbackRates(baseCurrency)
    }
  }

  // Método para forçar atualização (útil para debugging)
  async forceRefresh(baseCurrency: string): Promise<ExchangeRate[]> {
    const cacheKey = baseCurrency.toUpperCase()
    this.cache.delete(cacheKey)
    return this.getExchangeRates(baseCurrency)
  }

  // Método para limpar todo o cache
  clearCache(): void {
    this.cache.clear()
  }

  // Método para verificar quando foi a última atualização
  getLastUpdate(baseCurrency: string): Date | null {
    const cached = this.cache.get(baseCurrency.toUpperCase())
    return cached ? new Date(cached.timestamp) : null
  }
}

// Instância singleton do serviço
export const exchangeRateService = new ExchangeRateService()