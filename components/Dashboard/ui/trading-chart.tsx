"use client"

import { useEffect, useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  MAINNET_TOKENS_BY_SYMBOL, 
  COINGECKO_IDS,
  Token 
} from "@/lib/constants"
import Image from "next/image"

interface TradingChartProps {
  buyTokenSymbol?: string
  sellTokenSymbol?: string
  delay?: number
  days?: number
  chartColor?: string
  price: number
}

interface ChartDataPoint {
  timestamp: number
  price: number
}

interface TokenMarketData {
  currentPrice: number
  priceChange24h: number
  marketCap: number
  volume24h: number
}

export function TradingChart({ buyTokenSymbol, sellTokenSymbol, price, chartColor = "green", delay = 0 }: TradingChartProps) {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [marketData, setMarketData] = useState<TokenMarketData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showBuyChart, setShowBuyChart] = useState(true)

  // Get current token info from constants
  const currentTokenSymbol = showBuyChart ? buyTokenSymbol : sellTokenSymbol
  const tokenInfo: Token | undefined = currentTokenSymbol 
    ? MAINNET_TOKENS_BY_SYMBOL[currentTokenSymbol.toLowerCase()]
    : undefined
  const coingeckoId = tokenInfo ? COINGECKO_IDS[tokenInfo.symbol.toLowerCase()] : null

  useEffect(() => {
    const fetchData = async () => {
      if (!coingeckoId || !tokenInfo) {
        setError("Invalid token selection")
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY
        const headers: Record<string, string> = {}
        if (apiKey) {
          headers["x-cg-demo-api-key"] = apiKey
        }

        // Fetch market data
        const [marketRes, chartRes] = await Promise.all([
          fetch(`https://api.coingecko.com/api/v3/coins/${coingeckoId}`, { headers }),
          fetch(`https://api.coingecko.com/api/v3/coins/${coingeckoId}/market_chart?vs_currency=usd&days=30`, { headers })
        ])

        if (!marketRes.ok || !chartRes.ok) throw new Error('Failed to fetch data')

        const marketData = await marketRes.json()
        const chartData = await chartRes.json()

        // Transform market data
        const transformedMarket: TokenMarketData = {
          currentPrice: marketData.market_data.current_price.usd,
          priceChange24h: marketData.market_data.price_change_percentage_24h,
          marketCap: marketData.market_data.market_cap.usd,
          volume24h: marketData.market_data.total_volume.usd
        }

        // Transform chart data
        const transformedChart: ChartDataPoint[] = chartData.prices.map(
          ([timestamp, price]: [number, number]) => ({
            timestamp,
            price: Number(price.toFixed(4))
          })
        )

        setMarketData(transformedMarket)
        setChartData(transformedChart)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [coingeckoId, tokenInfo, price])

  const getPriceRange = () => {
    if (chartData.length === 0) return { min: 0, max: 0 }
    const prices = chartData.map((point) => point.price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const range = maxPrice - minPrice
    const padding = range * 0.05
    return { min: minPrice - padding, max: maxPrice + padding }
  }

  const { min, max } = getPriceRange()

  if (isLoading) {
    return (
      <Card className="p-6 w-full h-full">
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error || !tokenInfo) {
    return (
      <Card className="p-6 w-full h-full">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          {error || "Select tokens to view chart"}
        </CardContent>
      </Card>
    )
  }

  const otherTokenSymbol = showBuyChart ? sellTokenSymbol : buyTokenSymbol
  const otherTokenInfo: Token | undefined = otherTokenSymbol 
    ? MAINNET_TOKENS_BY_SYMBOL[otherTokenSymbol.toLowerCase()]
    : undefined

  return (
    <Card className="w-full flex flex-col justify-between border-none bg-zinc-900">
      <CardHeader className="flex flex-row items-center justify-between mt-0">
        <div className="flex items-center gap-4 flex-row">
            <img 
              src={tokenInfo.logoURI} 
              alt={tokenInfo.name}
              className="h-12 w-12 rounded-full bg-zinc-800"
            />
          <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center gap-2">
            <CardTitle>{tokenInfo.symbol.toUpperCase()}</CardTitle>
            <div className="text-muted-foreground">
              {tokenInfo.name}
            </div>
          </div>
          {marketData && (
          <div className="flex flex-row gap-4 items-center">
            <div className="space-y-1">
              <div className="text-[18px] font-semibold">
                ${marketData.currentPrice.toLocaleString()}
              </div>
            </div>

            <div className={`bg-auto px-2 py-[2px] rounded-md ${marketData.priceChange24h >= 0 ? 'bg-green-700/50' : 'text-red-700/50'}`}>
              <div className={`text-[15px] ${
                marketData.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {marketData.priceChange24h.toFixed(2)}%
              </div>
            </div>

          </div>
        )}
          </div>
        </div>

        <button 
          onClick={() => setShowBuyChart(!showBuyChart)}
          className="text-sm hover:bg-accent p-2 rounded-lg flex items-center gap-2"
          disabled={!buyTokenSymbol || !sellTokenSymbol}
        >
          Show {otherTokenSymbol}
          {otherTokenInfo && (
            <img 
              src={otherTokenInfo.logoURI} 
              alt={otherTokenInfo.name}
              className="h-5 w-5 rounded-full"
            />
          )}
        </button>
      </CardHeader>
      
      <CardContent className="w-full h-full">
        <AreaChart
          accessibilityLayer
          layout="horizontal"
          width={1400}
          height={400}
          data={chartData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          className="w-full h-full"
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(ts) => new Date(ts).toLocaleDateString()}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[min, max]}
            tickFormatter={(value) => `$${value.toFixed(2)}`}
            tick={{ fill: "#888", fontSize: 10 }}
            axisLine={true}
            tickLine={true}
            hide={false}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#2563eb"
            fill="#3b82f6"
            fillOpacity={0.2}
          />
        </AreaChart>
      </CardContent>
    </Card>
  )
}