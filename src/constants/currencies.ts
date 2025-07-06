export const CURRENCY_SYMBOLS = {
  usd: '$',
  brl: 'R$',
  eur: '€'
} as const

export const CURRENCIES = [
  { key: 'usd', label: 'USD - Dólar Americano', symbol: '$', flagType: 'usd' },
  { key: 'brl', label: 'BRL - Real Brasileiro', symbol: 'R$', flagType: 'brl' },
  { key: 'eur', label: 'EUR - Euro', symbol: '€', flagType: 'eur' },
] as const

export type Currency = keyof typeof CURRENCY_SYMBOLS