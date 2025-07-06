import React from 'react'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import { useGlobalStore } from './store/useGlobalStore'

function App() {
  const { theme } = useGlobalStore()
  const isDark = theme === 'dark'
  
  return (
    <div className={`min-h-screen animate-fadeIn ${
      isDark 
        ? 'bg-main' 
        : 'bg-gradient-to-br from-blue-50 to-white'
    }`}>
      <div className="p-5 space-y-5">
        <Header />
      </div>
      <Dashboard />
    </div>
  )
}

export default App
