"use client"

import { useEffect, useState } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

// Data interfaces
interface CoinDetails {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
  image: string
}

interface ChartPoint {
  time: string
  price: number
}

// Props interface
interface TokenChartProps {
  tokenId: string
  days?: number // Number of days for the chart (default: 1)
  currency?: string // Currency for price display (default: "usd")
  chartColor?: string // Custom chart color (default: "#BAFD02")
  delay?: number // Delay in milliseconds before fetching data (default: 0)
}

export function ChainList({
  tokenId,
  days = 1,
  currency = "usd",
  chartColor = "#BAFD02",
  delay = 0,
}: TokenChartProps) {
  const [coinData, setCoinData] = useState<CoinDetails | null>(null)
  const [chartData, setChartData] = useState<ChartPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Dynamic chart configuration
  const chartConfig: ChartConfig = {
    price: {
      label: `Price (${currency.toUpperCase()})`,
      color: chartColor,
    },
  }

  

  // Fetch data from CoinGecko API with API key
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Retrieve the API key from environment variables
        const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY
        if (!apiKey) {
          throw new Error("CoinGecko API key is missing")
        }

        // Fetch coin details with API key in headers
        const detailsResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${tokenId}`,
          {
            signal,
            headers: {
              "x-cg-demo-api-key": apiKey,
            },
          }
        )
        if (!detailsResponse.ok) throw new Error("Failed to fetch coin details")
        const detailsData = await detailsResponse.json()
        const coinDetails: CoinDetails = {
          id: detailsData.id,
          name: detailsData.name,
          symbol: detailsData.symbol,
          current_price: detailsData.market_data.current_price[currency],
          price_change_percentage_24h:
            detailsData.market_data.price_change_percentage_24h,
          image: detailsData.image.small,
        }

        // Fetch chart data with API key in headers
        const chartResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart?vs_currency=${currency}&days=${days}`,
          {
            signal,
            headers: {
              "x-cg-demo-api-key": apiKey,
            },
          }
        )
        if (!chartResponse.ok) throw new Error("Failed to fetch market chart")
        const chartDataRaw = await chartResponse.json()
        const chartPoints = chartDataRaw.prices.map(
          ([timestamp, price]: [number, number]) => ({
            time: new Date(timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            price,
          })
        )

        setCoinData(coinDetails)
        setChartData(chartPoints)
      } catch (err) {
        if (err.name === "AbortError") return
        setError(err.message || "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }
      // Introduce delay before fetching data
      const timer = setTimeout(() => {
        fetchData()
      }, delay)

      return () => {
        clearTimeout(timer)
        controller.abort()
      }
      }, [tokenId, days, currency, delay])

  // Calculate min and max prices for Y-axis domain
  const getPriceRange = () => {
    if (chartData.length === 0) return { min: 0, max: 0 }
    const prices = chartData.map((point) => point.price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const range = maxPrice - minPrice
    const padding = range * 0.1 // 10% padding
    return { min: minPrice - padding, max: maxPrice + padding }
  }

  const { min, max } = getPriceRange()

  // Loading state
  if (isLoading) {
    return (
      <Card className="bg-gray-950 text-white">
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
      </Card>
    )
  }

  // Error state
  if (error || !coinData) {
    return (
      <Card className="bg-white/10 text-white">
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>{error || "No data available"}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  // Main UI
  return (
    <Card className="bg-gray-900 text-white rounded-4xl border-none">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src={coinData.image}
              alt={coinData.name}
              className="w-8 h-8 rounded-full"
            />
            <CardTitle className="text-1xl font-bold">
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </CardTitle>
          </div>
          <div
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-full text-sm",
              coinData.price_change_percentage_24h >= 0
                ? "bg-green-500"
                : "bg-red-500",
              "text-white"
            )}
          >
            {coinData.price_change_percentage_24h >= 0 ? (
              <ArrowUp className="h-3 w-3" />
            ) : (
              <ArrowDown className="h-3 w-3" />
            )}
            <span>
              {Math.abs(coinData.price_change_percentage_24h).toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-1xl font-semibold">
              {coinData.current_price.toFixed(2)} {currency.toUpperCase()}
            </div>
          </div>
        </div>
        <CardDescription className="text-gray-400">
          24Hour price chart
        </CardDescription>
      </CardHeader>
    </Card>
  )
}