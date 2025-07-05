import React from 'react'
import Dashboard from './components/Dashboard'
import Header from './components/Header'

function App() {
  return (
    <div className="min-h-screen bg-main p-5 space-y-5 animate-fadeIn">
      <Header />
      <Dashboard />
    </div>
  )
}

export default App
