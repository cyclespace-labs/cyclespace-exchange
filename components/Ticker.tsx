"use client"

import { useEffect, useState, useCallback } from 'react'
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { motion } from 'framer-motion'

interface CoinData {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  image: string
}

// Configuration constants
const API_REFRESH_INTERVAL = 30000 // 30 seconds
const MAX_RETRY_ATTEMPTS = 3
const RETRY_DELAY = 2000 // 2 seconds
const API_RATE_LIMIT_WAIT = 60000 // 1 minute

export function Ticker() {
  const [coins, setCoins] = useState<CoinData[]>([])
  const [isMounted, setIsMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [isRateLimited, setIsRateLimited] = useState(false)

  const fetchCoins = useCallback(async () => {
    if (isRateLimited) return;
    const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false',
        {
          headers: {
            'Accept': 'application/json',
            ...(process.env.COINGECKO_API_KEY && { 'x-cg-demo-api-key': process.env.COINGECKO_API_KEY })
          }
        }
      )

      if (!response.ok) {
        if (response.status === 429) { // Too Many Requests
          setIsRateLimited(true)
          setError('Rate limit exceeded. Please wait...')
          setTimeout(() => setIsRateLimited(false), API_RATE_LIMIT_WAIT)
          return
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: CoinData[] = await response.json()
      
      // Validate data structure
      if (!Array.isArray(data) || !data.every(coin => coin.id && coin.symbol)) {
        throw new Error('Invalid data format received from API')
      }

      setCoins(data)
      setError(null)
      setRetryCount(0)
      if (!isMounted) setIsMounted(true)
      
    } catch (error) {
      console.error('Error fetching coins:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setError(`Failed to fetch coin data: ${errorMessage}`)

      if (retryCount < MAX_RETRY_ATTEMPTS) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1)
          fetchCoins()
        }, RETRY_DELAY * (retryCount + 1)) // Exponential backoff
      }
    }
  }, [isMounted, retryCount, isRateLimited])

  useEffect(() => {
    fetchCoins()
    const interval = setInterval(fetchCoins, API_REFRESH_INTERVAL)

    return () => {
      clearInterval(interval)
    }
  }, [fetchCoins])

  // Loading state
  if (!isMounted && !error) {
    return (
      <div className="flex h-12 w-full items-center justify-center bg-muted/30">
        <span className="text-white/80">Loading cryptocurrency data...</span>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex h-12 w-full items-center justify-center bg-muted/30">
        <span className="text-red-500">
          {error}
          {retryCount < MAX_RETRY_ATTEMPTS && ` (Retrying ${retryCount + 1}/${MAX_RETRY_ATTEMPTS}...)`}
        </span>
      </div>
    )
  }

  return (
    <div className="flex h-12 w-full overflow-hidden border-none border-y dark:bg-zinc-900 bg-white shadow-sm justify-center items-center">
      <motion.div 
        className=" flex-none items-center flex w-fit "
        animate={{
          translateX: '-50%',
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}>
        {[...coins, ...coins].map((coin, idx) => (
          <div 
            key={`${coin.id}-${idx}`} 
            className="flex-none gap-8 sm:gap-4 md:gap-4 pr-14 flex w-fit "
          >
            <div className="flex items-center gap-2 w-fit">
              <img 
                src={coin.image} 
                alt={coin.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/fallback-coin.png' // Add a fallback image
                }}
                className="md:w-6 md:h-6 rounded-full object-contain w-6 h-6 sm:w-4 sm:h-4 text-1xl md:text-2xl sm:text-1xl aspect-auto"
              />
              <span className="font-semibold text-black dark:text-white uppercase">{coin.symbol}</span>
              <span className="text-sm font-medium text-black dark:text-white">
                ${coin.current_price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 4
                })}
              </span>
              <Badge
                variant="outline"
                className={cn(
                  'text-xs',
                  coin.price_change_percentage_24h >= 0
                    ? 'text-green-500'
                    : 'text-red-500'
                )}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </Badge>
            </div>
            <div className="h-6 w-px bg-border" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}