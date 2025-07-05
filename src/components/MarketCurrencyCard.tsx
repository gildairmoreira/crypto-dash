import React from 'react'
import PriceChange24h from './PriceChange24h'
import { Button } from "@heroui/button"
import { IoPulse } from 'react-icons/io5'
import CardChart from './CardChart'
import { useGlobalStore } from '../store/useGlobalStore'

type Props = {
  id: string
  image: string
  name: string
  currentPrice: number
  changeIn24h: number
  chartData: { x: number; y: number }[]
}

function MarketCurrencyCard({
  id,
  name,
  image,
  currentPrice,
  changeIn24h,
  chartData,
}: Props) {
  const setDetailsId = useGlobalStore((state) => state.setDetailsId)

  const showDetails = () => {
    setDetailsId(id)
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }

  return (
    <div className="bg-main-darker bg-opacity-90 w-full p-5 rounded-2xl flex flex-col h-80 text-indigo-300 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] cursor-pointer">
      {/* image and name */}
      <div className="flex gap-3">
        <div className="relative">
          <img 
            src={image} 
            alt={name} 
            className="rounded-full w-12 h-12 transition-transform duration-300 hover:scale-110" 
            loading="lazy"
          />
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
        </div>
        <div className="font-bold my-auto text-white text-xl hover:text-primary transition-colors duration-300">
          {name}
        </div>
      </div>

      {/* chart */}
      <div className="ml-auto transition-transform duration-300 hover:scale-105">
        <CardChart series={chartData} />
      </div>

      {/* price change  */}
      <div className="flex justify-between items-end mt-auto">
        <div>
          <PriceChange24h changePrice={changeIn24h} />
          <div className="text-white text-xl lg:text-4xl font-bold transition-colors duration-300 hover:text-primary">
            ${currentPrice.toLocaleString()}
          </div>
        </div>
        <Button
          onPress={showDetails}
          variant="bordered"
          color="primary"
          className="transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white"
          startContent={<IoPulse className="animate-pulse" />}
        >
          Details
        </Button>
      </div>
    </div>
  )
}

export default MarketCurrencyCard
