// trading-chart.tsx
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

interface TradingChartProps {
  buyTokenSymbol?: string
  sellTokenSymbol?: string
  delay?: number
  days?: number
  chartColor?: string
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

export function TradingChart({ buyTokenSymbol, sellTokenSymbol, chartColor = "green",   delay = 0, }: TradingChartProps) {
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
  }, [coingeckoId, tokenInfo])

  const getPriceRange = () => {
    if (chartData.length === 0) return { min: 0, max: 0 }
    const prices = chartData.map((point) => point.price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const range = maxPrice - minPrice
    const padding = range * 0.1
    return { min: minPrice - padding, max: maxPrice + padding }
  }

  const { min, max } = getPriceRange()

  if (isLoading) {
    return (
      <Card className="p-6">
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
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          {error || "Select tokens to view chart"}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <img 
            src={tokenInfo.logoURI} 
            alt={tokenInfo.name}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <CardTitle>{tokenInfo.symbol.toUpperCase()}</CardTitle>
            <div className="text-muted-foreground">
              {tokenInfo.name}
            </div>
          </div>
        </div>
        <button 
          onClick={() => setShowBuyChart(!showBuyChart)}
          className="text-sm hover:bg-accent p-2 rounded-lg"
          disabled={!buyTokenSymbol || !sellTokenSymbol}
        >
          Show {showBuyChart ? sellTokenSymbol : buyTokenSymbol}
        </button>
      </CardHeader>
      
      <CardContent>
        <AreaChart
          width={1000}
          height={600}
          data={chartData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          className="w-full h-full"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(ts) => new Date(ts).toLocaleDateString()}
          />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#2563eb"
            fill="#3b82f6"
            fillOpacity={0.2}
          />
        </AreaChart>
        
        {marketData && (
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="space-y-1">
              <div className="text-muted-foreground">Price</div>
              <div className="text-2xl font-semibold">
                ${marketData.currentPrice.toLocaleString()}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground">24h Change</div>
              <div className={`text-2xl ${
                marketData.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {marketData.priceChange24h.toFixed(2)}%
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}