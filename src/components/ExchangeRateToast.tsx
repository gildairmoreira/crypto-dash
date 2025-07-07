import React, { useState } from 'react'
import { useGlobalStore } from '../store/useGlobalStore'
import { useExchangeRates } from '../hooks/useExchangeRates'
import { Toast } from './Toast'

interface ExchangeRateToastProps {
  className?: string
}

export function ExchangeRateToast({ className = '' }: ExchangeRateToastProps) {
  const { theme } = useGlobalStore()
  const { exchangeRates, isLoading, error, lastUpdate } = useExchangeRates()
  const [isToastVisible, setIsToastVisible] = useState(false)
  const isDark = theme === 'dark'

  const getStatusIndicator = () => {
    if (isLoading) {
      return <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
    }
    if (error) {
      return <div className="w-2 h-2 bg-red-500 rounded-full" />
    }
    return <div className="w-2 h-2 bg-green-500 rounded-full" />
  }

  const formatLastUpdate = () => {
    if (!lastUpdate) return 'Nunca'
    const now = new Date()
    const diff = Math.floor((now.getTime() - lastUpdate.getTime()) / 1000)
    
    if (diff < 60) return `${diff}s`
    if (diff < 3600) return `${Math.floor(diff / 60)}min`
    return `${Math.floor(diff / 3600)}h`
  }

  const handleClick = () => {
    setIsToastVisible(true)
  }

  const handleCloseToast = () => {
    setIsToastVisible(false)
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={handleClick}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-200 hover:scale-110 ${className} ${
          isDark
            ? 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900'
            : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
        }`}
        aria-label="Ver informações sobre cotações de câmbio"
      >
        i
      </button>

      {/* Toast */}
      <Toast
        isVisible={isToastVisible}
        onClose={handleCloseToast}
        title="Cotações de Câmbio"
        duration={3500}
      >
        <div className="space-y-3">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className={`text-xs ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Status:
            </span>
            <div className="flex items-center gap-2">
              {getStatusIndicator()}
              <span className={`text-xs ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {isLoading ? 'Carregando...' : error ? 'Erro' : 'Atualizado'}
              </span>
            </div>
          </div>

          {/* Last Update */}
          <div className="flex items-center justify-between">
            <span className={`text-xs ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Última atualização:
            </span>
            <span className={`text-xs ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {formatLastUpdate()}
            </span>
          </div>

          {/* Exchange Rates */}
          {exchangeRates && exchangeRates.length > 0 && (
            <div className="space-y-2">
              <div className={`text-xs font-medium border-t pt-2 ${
                isDark ? 'text-gray-300 border-gray-700' : 'text-gray-600 border-gray-200'
              }`}>
                Principais cotações:
              </div>
              <div className="space-y-1">
                {exchangeRates.slice(0, 4).map((exchangeRate) => (
                  <div key={exchangeRate.pair} className="flex justify-between items-center">
                    <span className={`text-xs font-medium ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {exchangeRate.pair}
                    </span>
                    <span className={`text-xs font-mono ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      R$ {exchangeRate.rate}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className={`text-xs p-2 rounded border-l-4 ${
              isDark 
                ? 'bg-red-900/20 border-red-500 text-red-300' 
                : 'bg-red-50 border-red-500 text-red-700'
            }`}>
              {error}
            </div>
          )}
        </div>
      </Toast>
    </>
  )
}