import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useGlobalStore } from '../store/useGlobalStore'
import { CURRENCY_SYMBOLS } from '../constants/currencies'
import { useExchangeRates } from '../hooks/useExchangeRates'
import { ExchangeRateToast } from './ExchangeRateToast'

interface PriceTickerItemProps {
  symbol: string
  price: string
  change: string
  positive: boolean
}

const PriceTickerItem = ({ 
  symbol, 
  price, 
  change, 
  positive 
}: PriceTickerItemProps) => {
  const { theme } = useGlobalStore()
  const isDark = theme === 'dark'
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  // Check if price has many decimal places (like PEPE)
  const hasSmallPrice = price.includes('0.0000')
  
  // Format price for display
  const formatPrice = (fullPrice: string) => {
    if (!hasSmallPrice) return fullPrice
    
    if (isExpanded || isHovered) {
      return fullPrice
    }
    
    // Show abbreviated version
    const match = fullPrice.match(/(.*0\.0+)(\d{2})(.*)/)
    if (match) {
      const [, prefix, significantDigits, suffix] = match
      const zeroCount = prefix.split('0').length - 2
      return `${prefix.split('0.')[0]}0.0{${zeroCount-1}}${significantDigits}...`
    }
    return fullPrice
  }
  
  return (
    <div className="flex gap-2 items-center px-4">
      <span className={`font-medium ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        {symbol}
      </span>
      <span 
        className={`cursor-pointer transition-all duration-200 ${
          isDark ? 'text-primary/70 hover:text-primary' : 'text-blue-600 hover:text-blue-800'
        } ${hasSmallPrice ? 'px-1 rounded hover:bg-opacity-10 hover:bg-gray-500' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => hasSmallPrice && setIsExpanded(!isExpanded)}
        title={hasSmallPrice ? 'Clique para fixar/desfixar preço completo' : undefined}
      >
        {formatPrice(price)}
      </span>
      <span className={`font-medium ${
        positive ? 'text-green-400' : 'text-red-400'
      }`}>
        {change}
      </span>
    </div>
  )
}

interface PriceTickerProps {
  className?: string
}

export function PriceTicker({ className = '' }: PriceTickerProps) {
  const { theme, currency } = useGlobalStore()
  const { exchangeRates, isLoading: ratesLoading, error: ratesError, lastUpdate } = useExchangeRates()
  const isDark = theme === 'dark'
  const currencySymbol = CURRENCY_SYMBOLS[currency]

  // Mock data - in a real app, this would come from an API
  const tickerData = [
    { symbol: 'BTC', price: `${currencySymbol}43,250.00`, change: '+2.5%', positive: true },
    { symbol: 'ETH', price: `${currencySymbol}2,680.50`, change: '+1.8%', positive: true },
    { symbol: 'PEPE', price: `${currencySymbol}0.00000125`, change: '+15.2%', positive: true },
    { symbol: 'ADA', price: `${currencySymbol}0.485`, change: '-0.3%', positive: false },
    { symbol: 'SOL', price: `${currencySymbol}98.75`, change: '+4.2%', positive: true },
    { symbol: 'DOT', price: `${currencySymbol}7.25`, change: '+0.9%', positive: true },
    { symbol: 'LINK', price: `${currencySymbol}14.85`, change: '+3.1%', positive: true },
    { symbol: 'MATIC', price: `${currencySymbol}0.92`, change: '-1.2%', positive: false },
    { symbol: 'TRUMP', price: `${currencySymbol}12.45`, change: '+8.7%', positive: true },
    { symbol: 'MELANIA', price: `${currencySymbol}3.21`, change: '+5.4%', positive: true },
  ]

  // Usar cotações dinâmicas da API
  const exchangeRateItems = exchangeRates.map(rate => ({
    pair: rate.pair,
    rate: rate.rate,
    lastUpdate: rate.lastUpdate
  }))

  return (
    <div data-testid="price-ticker" className={`w-full overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-gray-700/50' 
        : 'bg-gradient-to-r from-white/80 to-gray-50/80 border-gray-200/50'
    } border backdrop-blur-sm ${className}`}>
      <motion.div
        className="flex gap-8 items-center py-3 text-xs whitespace-nowrap"
        animate={{ x: [-100, -2000] }}
        transition={{ 
          duration: 40, 
          repeat: Infinity, 
          ease: "linear",
          repeatType: "loop"
        }}
      >
        {/* Duplicate the data to create seamless loop */}
        {[...tickerData, ...tickerData, ...tickerData].map((item, index) => (
          <PriceTickerItem
            key={`${item.symbol}-${index}`}
            symbol={item.symbol}
            price={item.price}
            change={item.change}
            positive={item.positive}
          />
        ))}
      </motion.div>
      
      {/* Exchange rates display for all currencies */}
      <div className={`flex justify-center items-center py-2 border-t ${
        isDark ? 'border-gray-700/50 bg-gray-900/30' : 'border-gray-200/50 bg-white/30'
      }`}>
        {ratesLoading ? (
          <div className={`flex items-center gap-2 text-xs ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <div className="w-3 h-3 rounded-full border border-current animate-spin border-t-transparent"></div>
            <span>Carregando cotações...</span>
            <ExchangeRateToast />
          </div>
        ) : ratesError ? (
          <div className={`flex items-center gap-2 text-xs ${
            isDark ? 'text-red-400' : 'text-red-500'
          }`}>
            <span>⚠️ Erro ao carregar cotações</span>
            <ExchangeRateToast />
          </div>
        ) : exchangeRateItems.length > 0 ? (
          <div className="flex gap-6 items-center text-xs">
            <div className="flex gap-4">
              {exchangeRateItems.map((item, index) => (
                <div key={index} className={`flex items-center gap-1 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <span className="font-medium">{item.pair}:</span>
                  <span className={isDark ? 'text-primary' : 'text-blue-600'}>
                    {item.rate}
                  </span>
                </div>
              ))}
            </div>
            {lastUpdate && (
              <div className={`flex items-center gap-2 text-xs ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`}>
                <span>•</span>
                <span title={`Última atualização: ${lastUpdate.toLocaleString('pt-BR')}`}>
                  {new Date().getTime() - lastUpdate.getTime() < 60000 
                    ? 'Agora mesmo' 
                    : `${Math.floor((new Date().getTime() - lastUpdate.getTime()) / 60000)}min atrás`
                  }
                </span>
                <ExchangeRateToast />
              </div>
            )}
          </div>
        ) : (
          <div className={`flex items-center gap-2 text-xs ${
            isDark ? 'text-gray-500' : 'text-gray-400'
          }`}>
            <span>Cotações não disponíveis</span>
            <ExchangeRateToast />
          </div>
        )}
      </div>
    </div>
  )
}