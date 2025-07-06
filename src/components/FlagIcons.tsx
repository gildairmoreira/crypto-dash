import React from 'react'

interface FlagProps {
  className?: string
}

export const USFlag: React.FC<FlagProps> = ({ className = "w-6 h-4" }) => (
  <svg className={className} viewBox="0 0 24 16" fill="none">
    <rect width="24" height="16" fill="#B22234"/>
    <rect width="24" height="1.23" fill="white"/>
    <rect y="2.46" width="24" height="1.23" fill="white"/>
    <rect y="4.92" width="24" height="1.23" fill="white"/>
    <rect y="7.38" width="24" height="1.23" fill="white"/>
    <rect y="9.84" width="24" height="1.23" fill="white"/>
    <rect y="12.3" width="24" height="1.23" fill="white"/>
    <rect y="14.76" width="24" height="1.23" fill="white"/>
    <rect width="9.6" height="8.61" fill="#3C3B6E"/>
    <g fill="white">
      <circle cx="1.2" cy="1.23" r="0.3"/>
      <circle cx="2.4" cy="1.23" r="0.3"/>
      <circle cx="3.6" cy="1.23" r="0.3"/>
      <circle cx="4.8" cy="1.23" r="0.3"/>
      <circle cx="6" cy="1.23" r="0.3"/>
      <circle cx="7.2" cy="1.23" r="0.3"/>
      <circle cx="8.4" cy="1.23" r="0.3"/>
      <circle cx="1.8" cy="2.46" r="0.3"/>
      <circle cx="3" cy="2.46" r="0.3"/>
      <circle cx="4.2" cy="2.46" r="0.3"/>
      <circle cx="5.4" cy="2.46" r="0.3"/>
      <circle cx="6.6" cy="2.46" r="0.3"/>
      <circle cx="7.8" cy="2.46" r="0.3"/>
    </g>
  </svg>
)

export const BRFlag: React.FC<FlagProps> = ({ className = "w-6 h-4" }) => (
  <svg className={className} viewBox="0 0 24 16" fill="none">
    <rect width="24" height="16" fill="#009739"/>
    <polygon points="12,2 20,8 12,14 4,8" fill="#FEDD00"/>
    <circle cx="12" cy="8" r="3" fill="#012169"/>
    <path d="M10 6.5 Q12 7.5 14 6.5" stroke="white" strokeWidth="0.3" fill="none"/>
    <text x="12" y="9.5" textAnchor="middle" fontSize="1.5" fill="white">★</text>
  </svg>
)

export const EUFlag: React.FC<FlagProps> = ({ className = "w-6 h-4" }) => (
  <svg className={className} viewBox="0 0 24 16" fill="none">
    <rect width="24" height="16" fill="#003399"/>
    <g fill="#FFCC00">
      <circle cx="12" cy="3" r="0.4"/>
      <circle cx="15.5" cy="4" r="0.4"/>
      <circle cx="17.5" cy="6.5" r="0.4"/>
      <circle cx="17.5" cy="9.5" r="0.4"/>
      <circle cx="15.5" cy="12" r="0.4"/>
      <circle cx="12" cy="13" r="0.4"/>
      <circle cx="8.5" cy="12" r="0.4"/>
      <circle cx="6.5" cy="9.5" r="0.4"/>
      <circle cx="6.5" cy="6.5" r="0.4"/>
      <circle cx="8.5" cy="4" r="0.4"/>
      <circle cx="12" cy="5.5" r="0.4"/>
      <circle cx="12" cy="10.5" r="0.4"/>
    </g>
  </svg>
)

export const getFlagComponent = (currency: string) => {
  switch (currency) {
    case 'usd':
      return USFlag
    case 'brl':
      return BRFlag
    case 'eur':
      return EUFlag
    default:
      return USFlag
  }
}