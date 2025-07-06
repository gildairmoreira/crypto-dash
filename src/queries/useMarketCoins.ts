import { useQuery } from '@tanstack/react-query'
import { IFormattedMarketCoin } from '../interfaces'
import { fetchMarketCurrencies } from '../service'
import { useGlobalStore } from '../store/useGlobalStore'

function useMarketCoins() {
  const currency = useGlobalStore((state) => state.currency)
  
  const result = useQuery<IFormattedMarketCoin[]>({
    queryFn: () => fetchMarketCurrencies(currency),
    queryKey: ['marketCoins', currency],
  })
  return result
}

export default useMarketCoins
