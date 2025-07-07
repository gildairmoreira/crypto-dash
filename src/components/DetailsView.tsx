import { Button, ButtonGroup } from "@heroui/button"
import React, { useEffect, useState } from 'react'
import MarketChart from './MarketChart'
import PriceChange24h from './PriceChange24h'
import useMarketChart from '../queries/useMarketChart'
import useCoinDetails from '../queries/useCoinDetails'
import toast from 'react-hot-toast'
import Loading from './Loading'
import { useGlobalStore } from '../store/useGlobalStore'
import { CURRENCY_SYMBOLS } from '../constants/currencies'
import { formatFractionalPrice } from '../utils/helpers'

type Props = {}

const daysFilters = [7, 30, 365]
type DaysType = keyof typeof daysFilters

function DetailsView({}: Props) {
  const { detailsId: coinId, currency, theme } = useGlobalStore()
  const [days, setDays] = useState<DaysType>(365)
  const currencySymbol = CURRENCY_SYMBOLS[currency]
  const isDark = theme === 'dark'
  const {
    data: chartData,
    isLoading: isChartDataLoading,
    isError: isChartDataError,
  } = useMarketChart({
    id: coinId,
    days: days as number,
  })
  const {
    data: details,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
  } = useCoinDetails({
    id: coinId,
  })
  const changeIn24 = details?.market_data.price_change_percentage_24h
  const currentPrice = details?.market_data.current_price[currency]
  const high24h = details?.market_data.high_24h[currency]
  const low24h = details?.market_data.low_24h[currency]

  useEffect(() => {
    if (isDetailsError || isChartDataError)
      toast('Desculpe! Falha ao carregar os recursos!')
  }, [isDetailsError, isChartDataError])

  if (isDetailsLoading || isChartDataLoading) return <Loading />

  return (
    <div data-testid="details-view">
      {/* filters */}
      <div data-testid="chart-filters" className="flex gap-5 justify-end">
        <ButtonGroup variant="bordered" color="primary" className="my-auto">
          {daysFilters.map((filter) => (
            <Button 
              key={filter} 
              onClick={() => setDays(filter)}
              className={`transition-all duration-300 ${
                days === filter 
                  ? (isDark 
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25' 
                      : 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/25'
                    )
                  : (isDark 
                      ? 'hover:bg-primary/10 hover:border-primary/50' 
                      : 'hover:bg-blue-50 hover:border-blue-300'
                    )
              }`}
            >
              {filter}d {days === filter && '✓'}
            </Button>
          ))}
        </ButtonGroup>
        <div className={`my-auto font-bold ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>{details?.name}</div>
      </div>
      {/* chart */}
      <div data-testid="market-chart-container" className="mx-auto w-full min-h-96">
        {chartData && <MarketChart series={chartData.prices} />}
      </div>

      {/* details */}
      <div data-testid="price-details" className="flex flex-col flex-wrap flex-grow gap-2 mx-auto md:flex-row">
        <div className={`p-3 space-y-4 w-full bg-opacity-90 rounded-2xl md:w-52 h-fit ${
          isDark 
            ? 'text-indigo-300 bg-main-darker' 
            : 'text-gray-600 bg-white/80 border border-gray-200'
        }`}>
          <div className="opacity-70">Preço Atual</div>
          <div className="flex justify-between w-full">
            <div className={isDark ? 'text-white' : 'text-gray-900'}>
              {currentPrice ? formatFractionalPrice(currentPrice, currencySymbol) : 'N/A'}
            </div>
            {changeIn24 && <PriceChange24h changePrice={changeIn24} />}
          </div>
        </div>
        <div className={`p-3 space-y-4 w-full bg-opacity-90 rounded-2xl md:w-52 h-fit ${
          isDark 
            ? 'text-indigo-300 bg-main-darker' 
            : 'text-gray-600 bg-white/80 border border-gray-200'
        }`}>
          <div className="opacity-70">Mínima 24h</div>
          <div className="flex justify-between w-full">
            <div className={isDark ? 'text-white' : 'text-gray-900'}>
              {low24h ? formatFractionalPrice(low24h, currencySymbol) : 'N/A'}
            </div>
          </div>
        </div>

        <div className={`p-3 space-y-4 w-full bg-opacity-90 rounded-2xl md:w-52 h-fit ${
          isDark 
            ? 'text-indigo-300 bg-main-darker' 
            : 'text-gray-600 bg-white/80 border border-gray-200'
        }`}>
          <div className="opacity-70">Máxima 24h</div>
          <div className="flex justify-between w-full">
            <div className={isDark ? 'text-white' : 'text-gray-900'}>
              {high24h ? formatFractionalPrice(high24h, currencySymbol) : 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsView
