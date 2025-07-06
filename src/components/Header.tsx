import React from 'react'
import { IoLogoBitcoin, IoTrendingUp, IoGlobe } from 'react-icons/io5'
import { Select, SelectItem } from '@heroui/select'
import { motion } from 'framer-motion'
import { useGlobalStore } from '../store/useGlobalStore'
import { CURRENCIES } from '../constants/currencies'
import { ThemeToggle } from './ThemeToggle'
import { getFlagComponent } from './FlagIcons'

function Header() {
  const { currency, setCurrency, theme } = useGlobalStore()
  const isDark = theme === 'dark'

  return (
    <motion.header 
      className={`w-full backdrop-blur-md border-b rounded-3xl overflow-hidden ${
        isDark 
          ? 'bg-main-darker/80 border-primary/20' 
          : 'border-blue-200 bg-white/80'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-row gap-5 justify-between items-center p-4">
        {/* Logo Section */}
        <motion.div 
          className="flex gap-4 items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <motion.div
              className="flex justify-center items-center w-12 h-12 bg-gradient-to-br rounded-full shadow-lg from-primary to-primary/80"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <IoLogoBitcoin className="w-7 h-7 text-white" />
            </motion.div>
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Crypto Dashboard
            </h1>
            <div className={`flex items-center gap-1 text-xs ${
              isDark ? 'text-primary/70' : 'text-blue-600'
            }`}>
              <IoTrendingUp className="w-3 h-3" />
              <span>Dados em Tempo Real</span>
            </div>
          </div>
        </motion.div>
        
        {/* Controls */}
        <motion.div 
          className="flex gap-4 items-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Currency Selector */}
          <Select
            placeholder="Selecione a moeda"
            selectedKeys={new Set([currency])}
            onSelectionChange={(keys) => {
              const selectedCurrency = Array.from(keys)[0] as 'usd' | 'brl' | 'eur'
              if (selectedCurrency) {
                setCurrency(selectedCurrency)
              }
            }}
            className="min-w-[120px]"
            variant="bordered"
            color={isDark ? "primary" : "default"}
            renderValue={(items) => {
              const currentCurrency = CURRENCIES.find(c => c.key === currency)
              if (!currentCurrency) return null
              const FlagComponent = getFlagComponent(currentCurrency.flagType)
              return (
                <div className="flex gap-3 items-center">
                  <FlagComponent className="w-8 h-6" />
                  <span className={`font-bold text-lg ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {currentCurrency.key.toUpperCase()}
                  </span>
                </div>
              )
            }}
            classNames={{
              trigger: isDark 
                ? "bg-main-darker/50 border-primary/30 hover:border-primary transition-all duration-300 backdrop-blur-sm h-12"
                : "bg-white/50 border-blue-200 hover:border-blue-400 transition-all duration-300 backdrop-blur-sm h-12",
              value: "flex items-center",
              popoverContent: isDark ? "bg-main-darker border-primary/20" : "bg-white border-blue-200"
            }}
          >
            {CURRENCIES.map((curr) => (
              <SelectItem 
                key={curr.key} 
                value={curr.key} 
                className={isDark 
                  ? "text-white hover:bg-primary/20" 
                  : "text-gray-900 hover:bg-blue-50"
                }
              >
                <div className="flex gap-3 items-center py-1">
                  {(() => {
                    const FlagComponent = getFlagComponent(curr.flagType)
                    return <FlagComponent className="w-8 h-6" />
                  })()}
                  <div className="flex flex-col">
                    <span className="font-bold text-base">{curr.key.toUpperCase()}</span>
                    <span className={`text-xs ${
                      isDark ? 'text-primary/70' : 'text-blue-600'
                    }`}>
                      {curr.label.split(' - ')[1]}
                    </span>
                  </div>
                  <span className={`ml-auto font-medium ${
                    isDark ? 'text-primary' : 'text-blue-600'
                  }`}>
                    {curr.symbol}
                  </span>
                </div>
              </SelectItem>
            ))}
          </Select>
        </motion.div>
      </div>
    </motion.header>
  )
}

export default Header