import Axios from 'axios'
import {
  ICoinDetails,
  IFormattedMarketCoin,
  IMarketChart,
  IMarketCoin,
} from '../interfaces.js'
import moment from 'moment'

const axios = Axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/coins',
})

// fetchMarketCurrencies
export async function fetchMarketCurrencies(currency: string = 'usd'): Promise<IFormattedMarketCoin[]> {
  try {
    const { data } = await axios.get('/markets', {
      params: {
        vs_currency: currency,
        order: 'market_cap_desc',
        per_page: 23,
        page: 1,
        sparkline: true,
        price_change_percentage: '7d',
        locale: 'pt',
        ids: 'bitcoin,ethereum,binancecoin,cardano,solana,polkadot,dogecoin,avalanche-2,polygon,chainlink,litecoin,bitcoin-cash,algorand,stellar,vechain,filecoin,tron,ethereum-classic,monero,pepe,maga,melania,trump'
      },
    })

    console.log('API Response for PEPE:', data.find((coin: any) => coin.id === 'pepe'))
    return formatData(data)
  } catch (error) {
    console.error('Error fetching market currencies:', error)
    throw error
  }
}

// fetchMarketChart
export async function fetchMarketChart(
  id: string,
  days: number,
  currency: string = 'usd',
): Promise<IMarketChart> {
  const { data } = await axios.get(`/${id}/market_chart`, {
    params: {
      vs_currency: currency,
      days,
      interval: 'daily',
    },
  })

  return data
}

export async function fetchCoinDetails(id: string): Promise<ICoinDetails> {
  const { data } = await axios.get('/' + id)
  return data
}

function formatSparkline(sparkline: number[]) {
  const sevenDaysAgo = moment().subtract(7, 'd').unix()
  let formattedSparkline = sparkline.slice(-48).map((item, index) => {
    return {
      x: sevenDaysAgo + (index + 1) * 3600,
      y: item,
    }
  })

  return formattedSparkline
}

function formatData(data: IMarketCoin[]): IFormattedMarketCoin[] {
  let formattedData = []
  formattedData = data.map((item) => {
    const formattedSparkline = formatSparkline(item.sparkline_in_7d.price)

    const formattedItem: IFormattedMarketCoin = {
      ...item,
      sparkline_in_7d: {
        price: formattedSparkline,
      },
    }
    return formattedItem
  })
  return formattedData
}
