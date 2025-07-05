import { Button, ButtonGroup } from "@heroui/button"
import React, { useEffect, useState } from 'react'
import MarketChart from './MarketChart'
import PriceChange24h from './PriceChange24h'
import useMarketChart from '../queries/useMarketChart'
import useCoinDetails from '../queries/useCoinDetails'
import toast from 'react-hot-toast'
import Loading from './Loading'
import { useGlobalStore } from '../store/useGlobalStore'

type Props = {}

const daysFilters = [7, 30, 365]
type DaysType = keyof typeof daysFilters

function DetailsView({}: Props) {
  const coinId = useGlobalStore((state) => state.detailsId)
  const [days, setDays] = useState<DaysType>(365)
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
  const currentPrice = details?.market_data.current_price.usd
  const high24h = details?.market_data.high_24h.usd
  const low24h = details?.market_data.low_24h.usd

  useEffect(() => {
    if (isDetailsError || isChartDataError)
      toast('Sorry! Failed to load resources!')
  }, [isDetailsError, isChartDataError])

  if (isDetailsLoading || isChartDataLoading) return <Loading />

  return (
    <>
      {/* filters */}
      <div className="flex gap-5 justify-end">
        <ButtonGroup variant="bordered" color="primary" className="my-auto">
          {daysFilters.map((filter) => (
            <Button key={filter} onClick={() => setDays(filter)}>
              {filter}d
            </Button>
          ))}
        </ButtonGroup>
        <div className="my-auto text-white font-bold">{details?.name}</div>
      </div>
      {/* chart */}
      <div className="mx-auto w-full min-h-96">
        {chartData && <MarketChart series={chartData.prices} />}
      </div>

      {/* details */}
      <div className="flex flex-col md:flex-row flex-wrap gap-2 flex-grow mx-auto">
        <div className="bg-main-darker bg-opacity-90 w-full md:w-52 p-3 space-y-4 rounded-2xl h-fit text-indigo-300">
          <div className="opacity-70">Current Price</div>
          <div className="flex w-full justify-between">
            <div className="text-white">${currentPrice}</div>
            {changeIn24 && <PriceChange24h changePrice={changeIn24} />}
          </div>
        </div>
        <div className="bg-main-darker bg-opacity-90 w-full md:w-52 p-3 space-y-4 rounded-2xl h-fit text-indigo-300">
          <div className="opacity-70">Low 24hr</div>
          <div className="flex w-full justify-between">
            <div className="text-white">${low24h}</div>
          </div>
        </div>

        <div className="bg-main-darker bg-opacity-90 w-full md:w-52 p-3 space-y-4 rounded-2xl h-fit text-indigo-300">
          <div className="opacity-70">High 24hr</div>
          <div className="flex w-full justify-between">
            <div className="text-white">${high24h}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailsView
