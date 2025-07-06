import { useState, useEffect, useCallback } from 'react'
import { exchangeRateService, ExchangeRate } from '../service/exchangeRates'
import { useGlobalStore } from '../store/useGlobalStore'

interface UseExchangeRatesReturn {
  exchangeRates: ExchangeRate[]
  isLoading: boolean
  error: string | null
  lastUpdate: Date | null
  refetch: () => Promise<void>
}

export function useExchangeRates(): UseExchangeRatesReturn {
  const { currency } = useGlobalStore()
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchRates = useCallback(async (baseCurrency: string) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const rates = await exchangeRateService.getExchangeRates(baseCurrency)
      setExchangeRates(rates)
      setLastUpdate(exchangeRateService.getLastUpdate(baseCurrency) || new Date())
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar cotações'
      setError(errorMessage)
      console.error('Erro ao buscar cotações:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const refetch = useCallback(async () => {
    await fetchRates(currency)
  }, [currency, fetchRates])

  // Buscar cotações quando a moeda mudar
  useEffect(() => {
    fetchRates(currency)
  }, [currency, fetchRates])

  // Configurar atualização automática a cada 6 horas
  useEffect(() => {
    const SIX_HOURS = 6 * 60 * 60 * 1000 // 6 horas em millisegundos
    
    const interval = setInterval(() => {
      console.log('Atualizando cotações automaticamente...')
      fetchRates(currency)
    }, SIX_HOURS)

    return () => clearInterval(interval)
  }, [currency, fetchRates])

  // Atualizar quando a aba voltar ao foco (para pegar atualizações perdidas)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const lastUpdateTime = exchangeRateService.getLastUpdate(currency)
        if (lastUpdateTime) {
          const timeSinceUpdate = Date.now() - lastUpdateTime.getTime()
          const SIX_HOURS = 6 * 60 * 60 * 1000
          
          // Se passou mais de 6 horas, atualizar
          if (timeSinceUpdate > SIX_HOURS) {
            console.log('Atualizando cotações após retorno do foco...')
            fetchRates(currency)
          }
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [currency, fetchRates])

  return {
    exchangeRates,
    isLoading,
    error,
    lastUpdate,
    refetch
  }
}