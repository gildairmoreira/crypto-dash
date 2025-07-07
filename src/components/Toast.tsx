import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
import { useGlobalStore } from '../store/useGlobalStore'

interface ToastProps {
  isVisible: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  duration?: number
}

export function Toast({ 
  isVisible, 
  onClose, 
  title, 
  children, 
  duration = 3500 
}: ToastProps) {
  const { theme } = useGlobalStore()
  const isDark = theme === 'dark'

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`fixed bottom-4 right-4 z-50 w-80 p-4 rounded-lg border shadow-lg ${
            isDark 
              ? 'bg-gray-900 border-gray-700 shadow-black/40' 
              : 'bg-white border-gray-200 shadow-gray-400/20'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {title}
            </h3>
            <button
              onClick={onClose}
              className={`p-1 rounded-full transition-colors hover:bg-opacity-20 ${
                isDark 
                  ? 'text-gray-400 hover:bg-white hover:text-white' 
                  : 'text-gray-500 hover:bg-gray-500 hover:text-gray-700'
              }`}
              aria-label="Fechar toast"
            >
              <IoClose className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className={`text-sm ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {children}
          </div>

          {/* Progress bar */}
          {duration > 0 && (
            <motion.div
              className={`absolute bottom-0 left-0 h-1 rounded-b-lg ${
                isDark ? 'bg-blue-500' : 'bg-blue-600'
              }`}
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}