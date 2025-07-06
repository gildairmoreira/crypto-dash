"use client"

import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '../utils/helpers'
import { useGlobalStore } from '../store/useGlobalStore'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useGlobalStore()
  const isDark = theme === 'dark'

  useEffect(() => {
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const handleToggle = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <motion.button
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all duration-300 border",
        isDark 
          ? "bg-zinc-900 border-zinc-700 hover:bg-zinc-800" 
          : "bg-white border-gray-300 hover:bg-gray-50",
        className
      )}
      onClick={handleToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
    >
      {isDark ? (
        <Sun 
          className="w-5 h-5 text-yellow-500 transition-colors duration-300" 
          strokeWidth={2}
        />
      ) : (
        <Moon 
          className="w-5 h-5 text-blue-600 transition-colors duration-300" 
          strokeWidth={2}
        />
      )}
    </motion.button>
  )
}