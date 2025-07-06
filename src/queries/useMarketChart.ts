import { useQuery } from '@tanstack/react-query'
import { fetchMarketChart } from '../service'
import { useGlobalStore } from '../store/useGlobalStore'

import React from 'react'

type Props = {
  id: string
  days: number
}

function useMarketChart({ id, days }: Props) {
  const currency = useGlobalStore((state) => state.currency)
  
  const result = useQuery({
    queryFn: async () => await fetchMarketChart(id, days, currency),
    queryKey: ['marketChart', id, days, currency],
  })
  return result
}

export default useMarketChart
