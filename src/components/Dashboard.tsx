import React from 'react'
import DetailsView from './DetailsView'
import MarketCurrencies from './MarketCurrencies'
import { PriceTicker } from './PriceTicker'
import { useGlobalStore } from '../store/useGlobalStore'

function Dashboard() {
  const { theme } = useGlobalStore()
  const isDark = theme === 'dark'
  
  return (
    <div className="w-full">
      {/* Price Ticker - Full Width */}
      <PriceTicker className="mb-5" />
      
      {/* Main Content */}
      <div className="space-y-5 my-auto animate-fadeIn px-4">
        <div className={`text-xl font-bold mb-3 transition-colors duration-300 ${
          isDark 
            ? 'text-white hover:text-primary' 
            : 'text-gray-900 hover:text-blue-600'
        }`}>
          Visualização Detalhada
        </div>
        <div className={`rounded-3xl p-5 transition-all duration-300 hover:shadow-lg ${
          isDark 
            ? 'bg-opacity-90 bg-main-darker hover:shadow-primary/20' 
            : 'bg-white bg-opacity-90 border border-blue-100 hover:shadow-blue-200'
        }`}>
          <DetailsView />
        </div>
        <div className={`text-xl font-bold mb-3 transition-colors duration-300 ${
          isDark 
            ? 'text-white hover:text-primary' 
            : 'text-gray-900 hover:text-blue-600'
        }`}>
          Moedas do Mercado
        </div>
        <MarketCurrencies />
      </div>
    </div>
  )
}

export default Dashboard
