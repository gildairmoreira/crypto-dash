import React from 'react'
import { useExchangeRates } from '../hooks/useExchangeRates'
import { useGlobalStore } from '../store/useGlobalStore'
import { Button } from '@heroui/button'
import { IoRefresh, IoTime, IoCheckmarkCircle, IoWarning } from 'react-icons/io5'

interface ExchangeRateStatusProps {
  className?: string
}

export function ExchangeRateStatus({ className = '' }: ExchangeRateStatusProps) {
  const { theme } = useGlobalStore()
  const { exchangeRates, isLoading, error, lastUpdate, refetch } = useExchangeRates()
  const isDark = theme === 'dark'

  const formatLastUpdate = (date: Date | null) => {
    if (!date) return 'Nunca'
    
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMinutes = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMinutes / 60)
    
    if (diffMinutes < 1) return 'Agora mesmo'
    if (diffMinutes < 60) return `${diffMinutes}min atrás`
    if (diffHours < 24) return `${diffHours}h atrás`
    
    return date.toLocaleDateString('pt-BR')
  }

  const getStatusIcon = () => {
    if (isLoading) {
      return <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
    }
    if (error) {
      return <IoWarning className="w-4 h-4 text-red-500" />
    }
    return <IoCheckmarkCircle className="w-4 h-4 text-green-500" />
  }

  const getStatusText = () => {
    if (isLoading) return 'Carregando...'
    if (error) return 'Erro na API'
    return 'Conectado'
  }

  const getStatusColor = () => {
    if (isLoading) return isDark ? 'text-blue-400' : 'text-blue-600'
    if (error) return 'text-red-500'
    return 'text-green-500'
  }

  return (
    <div className={`p-4 rounded-lg border ${
      isDark 
        ? 'bg-gray-900/50 border-gray-700/50 backdrop-blur-sm' 
        : 'bg-white/80 border-gray-200/50 backdrop-blur-sm'
    } ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`font-semibold text-sm ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Status das Cotações
        </h3>
        <Button
          size="sm"
          variant="ghost"
          isIconOnly
          onPress={() => refetch()}
          isLoading={isLoading}
          className={`${
            isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
          }`}
        >
          <IoRefresh className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {/* Status da conexão */}
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className={`text-xs font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>

        {/* Última atualização */}
        <div className="flex items-center gap-2">
          <IoTime className={`w-4 h-4 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <span className={`text-xs ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Última atualização: {formatLastUpdate(lastUpdate)}
          </span>
        </div>

        {/* Cotações atuais */}
        {exchangeRates.length > 0 && (
          <div className="mt-3 pt-2 border-t border-gray-200/20">
            <div className="grid grid-cols-1 gap-1">
              {exchangeRates.map((rate, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className={`text-xs font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {rate.pair}
                  </span>
                  <span className={`text-xs font-mono ${
                    isDark ? 'text-primary' : 'text-blue-600'
                  }`}>
                    {rate.rate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Informação sobre atualização automática */}
        <div className={`text-xs mt-2 p-2 rounded ${
          isDark ? 'bg-gray-800/50 text-gray-400' : 'bg-gray-50 text-gray-500'
        }`}>
          💡 As cotações são atualizadas automaticamente a cada 6 horas
        </div>
      </div>
    </div>
  )
}