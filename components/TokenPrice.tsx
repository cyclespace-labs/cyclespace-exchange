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

// Chart configuration
const chartConfig: ChartConfig = {
  price: {
    label: "Price (USD)",
    color: "#00ff99", // Vibrant green for the chart
  },
}

export function TokenPrice({ tokenId }: { tokenId: string }) {
  const [coinData, setCoinData] = useState<CoinDetails | null>(null)
  const [chartData, setChartData] = useState<ChartPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch data from CoinGecko API
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch coin details
        const detailsResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${tokenId}`,
          { signal }
        )
        if (!detailsResponse.ok) throw new Error("Failed to fetch coin details")
        const detailsData = await detailsResponse.json()
        const coinDetails: CoinDetails = {
          id: detailsData.id,
          name: detailsData.name,
          symbol: detailsData.symbol,
          current_price: detailsData.market_data.current_price.usd,
          price_change_percentage_24h:
            detailsData.market_data.price_change_percentage_24h,
          image: detailsData.image.small,
        }

        // Fetch 24-hour chart data
        const chartResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart?vs_currency=usd&days=1`,
          { signal }
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

    fetchData()
    return () => controller.abort()
  }, [tokenId])

  // Calculate min and max prices for Y-axis domain
  const getPriceRange = () => {
    if (chartData.length === 0) return { min: 0, max: 0 };
    const prices = chartData.map(point => point.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const range = maxPrice - minPrice;
    const padding = range * 0.1; // 10% padding
    return { min: minPrice - padding, max: maxPrice + padding };
  };

  const { min, max } = getPriceRange();

  // Loading state
  if (isLoading) {
    return (
      <Card className="bg-gray-900 text-white">
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
    <Card className="bg-white/5 text-white rounded-4xl border-none">
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
              ${coinData.current_price.toFixed(2)}
            </div>
          </div>
        </div>
        <CardDescription className="text-gray-400">
          24-hour price chart
        </CardDescription>
      </CardHeader> 
    </Card>
  )
}