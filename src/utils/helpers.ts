import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const customChartTooltip = (price: number, fixed: number) => {
  return `<div class="bg-main-darker text-white p-2 rounded-lg border border-primary/20">$${Math.fround(
    price,
  ).toFixed(fixed)}</div>`
}

// Função para formatar preços fracionados mostrando apenas até o primeiro dígito não-zero
export const formatFractionalPrice = (price: number, currencySymbol: string): string => {
  const priceStr = price.toString()
  
  // Se o preço é maior que 0.01, usa formatação normal
  if (price >= 0.01) {
    return `${currencySymbol}${price.toLocaleString()}`
  }
  
  // Para preços muito pequenos, encontra o primeiro dígito não-zero
  const match = priceStr.match(/^0\.(0*)([1-9]\d?)/)
  if (match) {
    const [, zeros, significantDigits] = match
    return `${currencySymbol}0.${zeros}${significantDigits}`
  }
  
  // Fallback para formatação normal
  return `${currencySymbol}${price.toLocaleString()}`
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
