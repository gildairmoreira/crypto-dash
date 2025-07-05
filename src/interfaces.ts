export interface IMarketCoin {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  roi: null
  last_updated: string
  sparkline_in_7d: {
    price: number[]
  }
  price_change_percentage_7d_in_currency: number
}

export interface IFormattedMarketCoin extends Omit<IMarketCoin, 'sparkline_in_7d'> {
  sparkline_in_7d: {
    price: Array<{
      x: number
      y: number
    }>
  }
}

export interface IMarketChart {
  prices: [number, number][]
  market_caps: [number, number][]
  total_volumes: [number, number][]
}

export interface ICoinDetails {
  id: string
  symbol: string
  name: string
  asset_platform_id: string
  platforms: Record<string, string>
  detail_platforms: Record<
    string,
    {
      decimal_place: number
      contract_address: string
    }
  >
  block_time_in_minutes: number
  hashing_algorithm: string
  categories: string[]
  public_notice: null
  additional_notices: string[]
  localization: Record<string, string>
  description: Record<string, string>
  links: {
    homepage: string[]
    blockchain_site: string[]
    official_forum_url: string[]
    chat_url: string[]
    announcement_url: string[]
    twitter_screen_name: string
    facebook_username: string
    bitcointalk_thread_identifier: null
    telegram_channel_identifier: string
    subreddit_url: string
    repos_url: {
      github: string[]
      bitbucket: string[]
    }
  }
  image: {
    thumb: string
    small: string
    large: string
  }
  country_origin: string
  genesis_date: string
  sentiment_votes_up_percentage: number
  sentiment_votes_down_percentage: number
  watchlist_portfolio_users: number
  market_cap_rank: number
  coingecko_rank: number
  coingecko_score: number
  developer_score: number
  community_score: number
  liquidity_score: number
  public_interest_score: number
  market_data: {
    current_price: Record<string, number>
    total_value_locked: null
    mcap_to_tvl_ratio: null
    fdv_to_tvl_ratio: null
    roi: null
    ath: Record<string, number>
    ath_change_percentage: Record<string, number>
    ath_date: Record<string, string>
    atl: Record<string, number>
    atl_change_percentage: Record<string, number>
    atl_date: Record<string, string>
    market_cap: Record<string, number>
    market_cap_rank: number
    fully_diluted_valuation: Record<string, number>
    total_volume: Record<string, number>
    high_24h: Record<string, number>
    low_24h: Record<string, number>
    price_change_24h: number
    price_change_percentage_24h: number
    price_change_percentage_7d: number
    price_change_percentage_14d: number
    price_change_percentage_30d: number
    price_change_percentage_60d: number
    price_change_percentage_200d: number
    price_change_percentage_1y: number
    market_cap_change_24h: number
    market_cap_change_percentage_24h: number
    price_change_24h_in_currency: Record<string, number>
    price_change_percentage_1h_in_currency: Record<string, number>
    price_change_percentage_24h_in_currency: Record<string, number>
    price_change_percentage_7d_in_currency: Record<string, number>
    price_change_percentage_14d_in_currency: Record<string, number>
    price_change_percentage_30d_in_currency: Record<string, number>
    price_change_percentage_60d_in_currency: Record<string, number>
    price_change_percentage_200d_in_currency: Record<string, number>
    price_change_percentage_1y_in_currency: Record<string, number>
    market_cap_change_24h_in_currency: Record<string, number>
    market_cap_change_percentage_24h_in_currency: Record<string, number>
    total_supply: number
    max_supply: number
    circulating_supply: number
    sparkline_7d: {
      price: number[]
    }
    last_updated: string
  }
  public_interest_stats: {
    alexa_rank: number
    bing_matches: null
  }
  status_updates: string[]
  last_updated: string
  tickers: Array<{
    base: string
    target: string
    market: {
      name: string
      identifier: string
      has_trading_incentive: boolean
    }
    last: number
    volume: number
    converted_last: Record<string, number>
    converted_volume: Record<string, number>
    trust_score: string
    bid_ask_spread_percentage: number
    timestamp: string
    last_traded_at: string
    last_fetch_at: string
    is_anomaly: boolean
    is_stale: boolean
    trade_url: string
    token_info_url: null
    coin_id: string
    target_coin_id?: string
  }>
}
