import { useQuery } from '@tanstack/react-query'
import { fetchCoinDetails } from '../service'
import { ICoinDetails } from '../interfaces'

type Props = {
  id: string
}

function useCoinDetails({ id }: Props) {
  const result = useQuery<ICoinDetails>({
    queryFn: async () => await fetchCoinDetails(id),
    queryKey: ['coinDetails', id],
  })
  return result
}

export default useCoinDetails
