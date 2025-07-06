import { useEffect } from 'react'
import { motion } from 'framer-motion'
import useMarketCoins from '../queries/useMarketCoins'
import Loading from './Loading'
import MarketCurrencyCard from './MarketCurrencyCard'
import toast from 'react-hot-toast'

type Props = {}

function MarketCurrencies({}: Props) {
  const { data: coins, isLoading, isError } = useMarketCoins()

  useEffect(() => {
    if (isError) toast('Falha ao carregar as moedas do mercado!')
  }, [isError])

  if (isError) return null

  if (isLoading) return <Loading />

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  }

  return (
    <motion.div 
      className="w-full gap-5 grid md:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {coins &&
        coins.map((item, index) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.02,
              y: -5,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <MarketCurrencyCard
              changeIn24h={item.price_change_percentage_24h}
              id={item.id}
              chartData={item.sparkline_in_7d.price}
              image={item.image}
              name={item.name}
              currentPrice={item.current_price}
            />
          </motion.div>
        ))}
    </motion.div>
  )
}

export default MarketCurrencies
