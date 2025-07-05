import { useQuery } from '@tanstack/react-query'
import { IFormattedMarketCoin } from '../interfaces'
import { fetchMarketCurrencies } from '../service'

function useMarketCoins() {
  const result = useQuery<IFormattedMarketCoin[]>({
    queryFn: fetchMarketCurrencies,
    queryKey: ['marketCoins'],
  })
  return result
}

export default useMarketCoins
