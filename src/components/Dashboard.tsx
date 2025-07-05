import React from 'react'
import DetailsView from './DetailsView'
import MarketCurrencies from './MarketCurrencies'

function Dashboard() {
  return (
    <div className="space-y-5 my-auto animate-fadeIn">
      <div className="text-white text-xl font-bold mb-3 transition-colors duration-300 hover:text-primary">
        Details View
      </div>
      <div className="rounded-3xl p-5 bg-main-darker bg-opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
        <DetailsView />
      </div>
      <div className="text-white text-xl font-bold mb-3 transition-colors duration-300 hover:text-primary">
        Market Coins
      </div>
      <MarketCurrencies />
    </div>
  )
}

export default Dashboard
