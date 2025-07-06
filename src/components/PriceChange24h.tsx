import React from 'react'
import { IoCaretDownOutline, IoCaretUpOutline } from 'react-icons/io5'

type Props = {
  readonly changePrice: number
}

function PriceChange24h({ changePrice }: Props) {
  const isPositive = changePrice > 0

  return (
    <div
      className={`flex gap-1 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'} transition-all duration-300 hover:scale-105`}
    >
      <div className="my-auto">
        {isPositive ? (
          <IoCaretUpOutline className="animate-bounce" />
        ) : (
          <IoCaretDownOutline className="animate-bounce" />
        )}
      </div>
      <div className="font-bold">{Math.abs(changePrice).toFixed(2)}%</div>
    </div>
  )
}

export default PriceChange24h
