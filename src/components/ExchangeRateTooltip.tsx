import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGlobalStore } from '../store/useGlobalStore'
import { useExchangeRates } from '../hooks/useExchangeRates'

interface ExchangeRateTooltipProps {
  className?: string
}

export function ExchangeRateTooltip({ className = '' }: ExchangeRateTooltipProps) {
  const { theme } = useGlobalStore()
  const { exchangeRates, isLoading, error, lastUpdate } = useExchangeRates()
  const [isOpen, setIsOpen] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
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

  return (
    <div 
      className={`inline-block relative ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-200 hover:scale-110 ${
          isDark
            ? 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900'
            : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
        }`}
        aria-label="Informações sobre cotações de câmbio"
      >
        i
      </button>

      {/* Tooltip */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.9, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 w-64 p-3 rounded-lg border shadow-lg ${
              isDark 
                ? 'bg-gray-900 border-gray-700 shadow-black/40' 
                : 'bg-white border-gray-200 shadow-gray-400/20'
            }`}
          >
            {/* Arrow */}
            <div className={`absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent ${
              isDark ? 'border-r-gray-900' : 'border-r-white'
            }`} />
            
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className={`text-sm font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Cotações
              </div>
              <div className="flex items-center gap-2">
                {getStatusIndicator()}
                <span className={`text-xs ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {formatLastUpdate()}
                </span>
              </div>
            </div>

            {/* Exchange Rates */}
            {exchangeRates && exchangeRates.length > 0 && (
              <div className="space-y-1">
                {exchangeRates.slice(0, 3).map((exchangeRate) => (
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
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}