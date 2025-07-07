import { useState, useEffect, useCallback, useRef } from 'react'
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
  const fetchingRef = useRef(false)
  const debounceRef = useRef<number | null>(null)

  const fetchRates = useCallback(async (baseCurrency: string, force = false) => {
    // Evitar múltiplas chamadas simultâneas
    if (fetchingRef.current && !force) {
      return
    }

    // Verificar se já temos dados em cache válidos
    const lastUpdateTime = exchangeRateService.getLastUpdate(baseCurrency)
    if (!force && lastUpdateTime) {
      const timeSinceUpdate = Date.now() - lastUpdateTime.getTime()
      const THIRTY_MINUTES = 30 * 60 * 1000 // 30 minutos
      
      if (timeSinceUpdate < THIRTY_MINUTES) {
        // Usar dados do cache
        try {
          const cachedRates = await exchangeRateService.getExchangeRates(baseCurrency)
          setExchangeRates(cachedRates)
          setLastUpdate(lastUpdateTime)
          setIsLoading(false)
          return
        } catch (err) {
           // Se falhar ao buscar cache, continuar com fetch normal
           console.warn('Falha ao acessar cache:', err)
         }
      }
    }

    try {
      fetchingRef.current = true
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
      fetchingRef.current = false
    }
  }, [])

  const refetch = useCallback(async () => {
    await fetchRates(currency, true)
  }, [currency, fetchRates])

  const debouncedFetchRates = useCallback((baseCurrency: string, delay = 300) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    
    debounceRef.current = setTimeout(() => {
      fetchRates(baseCurrency)
    }, delay)
  }, [fetchRates])

  // Buscar cotações quando a moeda mudar (com debounce)
  useEffect(() => {
    debouncedFetchRates(currency)
    
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [currency, debouncedFetchRates])

  // Configurar atualização automática a cada 2 horas (reduzido de 6h)
  useEffect(() => {
    const TWO_HOURS = 2 * 60 * 60 * 1000 // 2 horas em millisegundos
    
    const interval = setInterval(() => {
      console.log('Atualizando cotações automaticamente...')
      fetchRates(currency, true) // Force update
    }, TWO_HOURS)

    return () => clearInterval(interval)
  }, [currency, fetchRates])

  // Atualizar quando a aba voltar ao foco (para pegar atualizações perdidas)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const lastUpdateTime = exchangeRateService.getLastUpdate(currency)
        if (lastUpdateTime) {
          const timeSinceUpdate = Date.now() - lastUpdateTime.getTime()
          const ONE_HOUR = 60 * 60 * 1000 // 1 hora (reduzido de 6h)
          
          // Se passou mais de 1 hora, atualizar
          if (timeSinceUpdate > ONE_HOUR) {
            console.log('Atualizando cotações após retorno do foco...')
            debouncedFetchRates(currency, 1000) // Debounce de 1s
          }
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [currency, debouncedFetchRates])

  return {
    exchangeRates,
    isLoading,
    error,
    lastUpdate,
    refetch
  }
}