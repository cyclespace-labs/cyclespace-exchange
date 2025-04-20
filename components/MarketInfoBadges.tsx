import { Badge } from "@/components/ui/badge"

interface MarketInfoBadgesProps {
  marketCap: number
  volume: number
  currency: string
}

const formatLargeNumber = (num: number): string => {
  if (num >= 1e12) {
    return (num / 1e12).toFixed(2) + "T"
  } else if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + "B"
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + "M"
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + "K"
  } else {
    return num.toFixed(2)
  }
}

export function MarketInfoBadges({ marketCap, volume, currency }: MarketInfoBadgesProps) {
  return (
    <div className="flex gap-0 flex-col">
      <Badge className="text-[10px]">
        MCap: {formatLargeNumber(marketCap)} {currency.toUpperCase()}
      </Badge>
      <Badge className="text-[10px]">
        Vol: {formatLargeNumber(volume)} {currency.toUpperCase()}
      </Badge>
    </div>
  )
}