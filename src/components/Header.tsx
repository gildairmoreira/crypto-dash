import React from 'react'
import { IoLogoBitcoin } from 'react-icons/io5'

function Header() {
  return (
    <div className="rounded-3xl flex flex-row gap-5 justify-start p-3 bg-main-darker bg-opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02]">
      <div className="my-auto text-4xl text-primary transition-transform duration-300 hover:scale-110 hover:rotate-12">
        <IoLogoBitcoin className="animate-pulse" />
      </div>
      <div className="text-2xl font-bold text-primary transition-colors duration-300 hover:text-white">
        Crypto Dashboard
      </div>
    </div>
  )
}

export default Header