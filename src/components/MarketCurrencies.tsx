import { useEffect } from 'react'
import useMarketCoins from '../queries/useMarketCoins'
import Loading from './Loading'
import MarketCurrencyCard from './MarketCurrencyCard'
import toast from 'react-hot-toast'

type Props = {}

function MarketCurrencies({}: Props) {
  const { data: coins, isLoading, isError } = useMarketCoins()

  useEffect(() => {
    if (isError) toast('Failed to load market currencies!')
  }, [isError])

  if (isError) return null

  if (isLoading) return <Loading />

  return (
    <div className="w-full gap-5 grid md:grid-cols-2 lg:grid-cols-3">
      {coins &&
        coins.map((item) => (
          <MarketCurrencyCard
            key={item.id}
            changeIn24h={item.price_change_percentage_24h}
            id={item.id}
            chartData={item.sparkline_in_7d.price}
            image={item.image}
            name={item.name}
            currentPrice={item.current_price}
          />
        ))}
    </div>
  )
}

export default MarketCurrencies
