import React from 'react'
import PriceChange24h from './PriceChange24h'
import { Button } from "@heroui/button"
import { IoPulse } from 'react-icons/io5'
import CardChart from './CardChart'
import { useGlobalStore } from '../store/useGlobalStore'
import { IFormattedMarketCoin } from '../interfaces'
import { CURRENCY_SYMBOLS } from '../constants/currencies'
import { formatFractionalPrice } from '../utils/helpers'
import type { IconType } from 'react-icons'

type Props = {
  readonly id: string
  readonly image: string
  readonly name: string
  readonly currentPrice: number
  readonly changeIn24h: number
  readonly chartData: { x: number; y: number }[]
}

function MarketCurrencyCard({
  id,
  name,
  image,
  currentPrice,
  changeIn24h,
  chartData,
}: Props) {
  const { setDetailsId, currency, theme } = useGlobalStore()
  const PulseIcon: IconType = IoPulse
  const currencySymbol = CURRENCY_SYMBOLS[currency]
  const isDark = theme === 'dark'

  const showDetails = () => {
    setDetailsId(id)
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }

  return (
    <div data-testid={`crypto-card-${id}`} className={`w-full p-6 rounded-2xl flex flex-col h-80 transition-all duration-300 hover:scale-[1.02] cursor-pointer backdrop-blur-md border ${
      isDark 
        ? 'bg-main-darker/80 border-primary/20 text-indigo-300 hover:shadow-lg hover:shadow-primary/20 hover:border-primary/40' 
        : 'bg-white/70 border-blue-200/50 text-gray-700 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300/60'
    }`}>
      {/* image and name */}
      <div className="flex gap-3">
        <div className="relative">
          <img 
            src={image} 
            alt={name} 
            className="rounded-full w-12 h-12 transition-transform duration-300 hover:scale-110" 
            loading="lazy"
          />
          <div className={`absolute inset-0 rounded-full animate-pulse ${
            isDark ? 'bg-primary/10' : 'bg-blue-500/10'
          }`}></div>
        </div>
        <div className={`font-bold my-auto text-xl transition-colors duration-300 ${
          isDark 
            ? 'text-white hover:text-primary' 
            : 'text-gray-900 hover:text-blue-600'
        }`}>
          {name}
        </div>
      </div>

      {/* chart */}
      <div className="ml-auto transition-transform duration-300 hover:scale-105">
        <CardChart 
          series={chartData.map(d => [d.x, d.y])} 
          theme={theme}
        />
      </div>

      {/* price change  */}
      <div className="flex justify-between items-end mt-auto">
        <div>
          <PriceChange24h changePrice={changeIn24h} />
          <div className={`text-xl lg:text-4xl font-bold transition-colors duration-300 ${
            isDark 
              ? 'text-white hover:text-primary' 
              : 'text-gray-900 hover:text-blue-600'
          }`}>
            {formatFractionalPrice(currentPrice, currencySymbol)}
          </div>
        </div>
        <Button
          data-testid={`details-button-${id}`}
          onPress={showDetails}
          variant="bordered"
          color={isDark ? "primary" : "default"}
          className={`transition-all duration-300 hover:scale-105 backdrop-blur-sm rounded-xl ${
            isDark 
              ? 'border-primary/50 text-primary hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-primary/25 hover:rounded-2xl' 
              : 'border-blue-300 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/25 hover:rounded-2xl'
          }`}
          startContent={<PulseIcon className="animate-pulse" />}
        >
          Detalhes
        </Button>
      </div>
    </div>
  )
}

export default MarketCurrencyCard
