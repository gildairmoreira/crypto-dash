import React, { useState, useRef, useEffect } from 'react'
import { useExchangeRates } from '../hooks/useExchangeRates'
import { useGlobalStore } from '../store/useGlobalStore'
import { Button } from '@heroui/button'
import { IoRefresh, IoTime, IoCheckmarkCircle, IoWarning, IoInformationCircle } from 'react-icons/io5'
import { motion, AnimatePresence } from 'framer-motion'

interface ExchangeRateTooltipProps {
  className?: string
}

export function ExchangeRateTooltip({ className = '' }: ExchangeRateTooltipProps) {
  const { theme } = useGlobalStore()
  const { exchangeRates, isLoading, error, lastUpdate, refetch } = useExchangeRates()
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const isDark = theme === 'dark'

  // Fechar tooltip quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current && 
        triggerRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

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
      return <div className="animate-spin w-3 h-3 border border-current border-t-transparent rounded-full" />
    }
    if (error) {
      return <IoWarning className="w-3 h-3 text-red-500" />
    }
    return <IoCheckmarkCircle className="w-3 h-3 text-green-500" />
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

  const shouldShowTooltip = isOpen || isHovered

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
      <Button
        ref={triggerRef}
        size="sm"
        variant="ghost"
        isIconOnly
        className={`w-6 h-6 min-w-6 transition-all duration-200 ${
          isDark 
            ? 'hover:bg-gray-700/50 text-gray-400 hover:text-gray-200' 
            : 'hover:bg-gray-100/50 text-gray-500 hover:text-gray-700'
        } ${shouldShowTooltip ? (isDark ? 'bg-gray-700/50 text-gray-200' : 'bg-gray-100/50 text-gray-700') : ''}`}
        onPress={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <IoInformationCircle className="w-3 h-3" />
      </Button>

      {/* Tooltip */}
      <AnimatePresence>
        {shouldShowTooltip && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute right-0 top-8 z-50 w-80 p-4 rounded-lg border shadow-lg backdrop-blur-sm ${
              isDark 
                ? 'bg-gray-900/95 border-gray-700/50 shadow-black/20' 
                : 'bg-white/95 border-gray-200/50 shadow-gray-900/10'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Header */}
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
                className={`w-6 h-6 min-w-6 ${
                  isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
              >
                <IoRefresh className="w-3 h-3" />
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
                <IoTime className={`w-3 h-3 ${
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
                💡 Atualizações automáticas a cada 6 horas
              </div>
            </div>

            {/* Seta do tooltip */}
            <div className={`absolute -top-1 right-3 w-2 h-2 rotate-45 border-l border-t ${
              isDark 
                ? 'bg-gray-900/95 border-gray-700/50' 
                : 'bg-white/95 border-gray-200/50'
            }`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}