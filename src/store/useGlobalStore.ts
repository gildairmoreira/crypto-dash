import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Currency } from '../constants/currencies'

type Theme = 'dark' | 'light'

type State = {
  detailsId: string
  currency: Currency
  theme: Theme
  isThemeTransitioning: boolean
  setDetailsId: (id: string) => void
  setCurrency: (currency: Currency) => void
  setTheme: (theme: Theme) => void
  setThemeTransitioning: (transitioning: boolean) => void
}

// Função para detectar o tema  do sistema operacional
const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark'
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Função para obter valores iniciais do localStorage
const getInitialValues = () => {
  if (typeof window === 'undefined') {
    return {
      currency: 'usd' as Currency,
      theme: 'dark' as Theme,
      detailsId: 'bitcoin'
    }
  }
  
  const savedCurrency = localStorage.getItem('crypto-dash-currency') as Currency || 'usd'
  const savedTheme = localStorage.getItem('crypto-dash-theme') as Theme
  const savedDetailsId = localStorage.getItem('crypto-dash-detailsId') || 'bitcoin'
  
  // Se não há tema salvo, usar o tema do sistema
  const theme = savedTheme || getSystemTheme()
  
  return {
    currency: savedCurrency,
    theme: theme,
    detailsId: savedDetailsId
  }
}

const initialValues = getInitialValues()

export const useGlobalStore = create<State>()((
  persist(
    (set, get) => ({
      detailsId: initialValues.detailsId,
      currency: initialValues.currency,
      theme: initialValues.theme,
      isThemeTransitioning: false,
      setDetailsId: (id) => {
        set((state) => ({ ...state, detailsId: id }))
        localStorage.setItem('crypto-dash-detailsId', id)
      },
      setCurrency: (currency) => {
        set((state) => ({ ...state, currency }))
        localStorage.setItem('crypto-dash-currency', currency)
      },
      setTheme: (theme) => {
        const currentTheme = get().theme
        if (currentTheme !== theme) {
          set((state) => ({ ...state, isThemeTransitioning: true }))
          
          // Pequeno delay para suavizar a transição
          setTimeout(() => {
            set((state) => ({ ...state, theme, isThemeTransitioning: false }))
            localStorage.setItem('crypto-dash-theme', theme)
            
            // Aplicar classe no body para transições CSS globais
            document.body.classList.remove('theme-dark', 'theme-light')
            document.body.classList.add(`theme-${theme}`)
          }, 50)
        }
      },
      setThemeTransitioning: (transitioning) => {
        set((state) => ({ ...state, isThemeTransitioning: transitioning }))
      }
    }),
    {
      name: 'crypto-dash-storage',
      partialize: (state) => ({
        currency: state.currency,
        theme: state.theme,
        detailsId: state.detailsId
      })
    }
  )
))
