'use client'
import { useEffect, useRef } from 'react'
import { CandlestickSeries, createChart, IChartApi, ISeriesApi, UTCTimestamp } from 'lightweight-charts'

interface CandleData {
  time: UTCTimestamp
  open: number
  high: number
  low: number
  close: number
}

export default function RealtimeChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)
  const streamingDataProvider = useRef<Generator<CandleData> | null>(null)

  function generateData(
    numberOfCandles = 500,
    updatesPerCandle = 5,
    startAt = 100
  ): { initialData: CandleData[]; realtimeUpdates: CandleData[] } {
    let randomFactor = 25 + Math.random() * 25
    
    const samplePoint = (i: number) =>
      i *
        (0.5 +
          Math.sin(i / 1) * 0.2 +
          Math.sin(i / 2) * 0.4 +
          Math.sin(i / randomFactor) * 0.8 +
          Math.sin(i / 50) * 0.5) +
      200 +
      i * 2

    const createCandle = (val: number, time: number): CandleData => ({
      time,
      open: val,
      high: val,
      low: val,
      close: val,
    })

    const updateCandle = (candle: CandleData, val: number): CandleData => ({
      time: candle.time,
      close: val,
      open: candle.open,
      low: Math.min(candle.low, val),
      high: Math.max(candle.high, val),
    })

    randomFactor = 25 + Math.random() * 25
    const date = new Date(Date.UTC(2018, 0, 1, 12, 0, 0, 0))
    const numberOfPoints = numberOfCandles * updatesPerCandle
    const initialData: CandleData[] = []
    const realtimeUpdates: CandleData[] = []
    let lastCandle: CandleData | null = null
    let previousValue = samplePoint(-1)

    for (let i = 0; i < numberOfPoints; ++i) {
      if (i % updatesPerCandle === 0) {
        date.setUTCDate(date.getUTCDate() + 1)
      }
      const time = date.getTime() / 1000
      let value = samplePoint(i)
      const diff = (value - previousValue) * Math.random()
      value = previousValue + diff
      previousValue = value

      if (i % updatesPerCandle === 0) {
        const candle = createCandle(value, time)
        lastCandle = candle
        if (i >= startAt) {
          realtimeUpdates.push(candle)
        }
      } else {
        if (!lastCandle) continue
        const newCandle = updateCandle(lastCandle, value)
        lastCandle = newCandle
        if (i >= startAt) {
          realtimeUpdates.push(newCandle)
        } else if ((i + 1) % updatesPerCandle === 0) {
          initialData.push(newCandle)
        }
      }
    }

    return { initialData, realtimeUpdates }
  }

  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      layout: {
        textColor: 'black',
        background: { type: 'solid', color: 'white' },
      },
      height: 400,
    })
    chartRef.current = chart

      const series = chart.addSeries(CandlestickSeries, {
        upColor: '#16a34a',
        downColor: '#dc2626',
        borderVisible: false,
        wickUpColor: '#16a34a',
        wickDownColor: '#dc2626'
      })

    seriesRef.current = series

    const data = generateData(2500, 20, 1000)
    series.setData(data.initialData)
    chart.timeScale().fitContent()
    chart.timeScale().scrollToPosition(5)

    function* getNextRealtimeUpdate(realtimeData: CandleData[]) {
      for (const dataPoint of realtimeData) {
        yield dataPoint
      }
      return null
    }
    streamingDataProvider.current = getNextRealtimeUpdate(data.realtimeUpdates)

    const intervalID = setInterval(() => {
      const update = streamingDataProvider.current?.next()
      if (update?.done) {
        clearInterval(intervalID)
        return
      }
      if (update?.value) {
        series.update(update.value)
      }
    }, 100)

    const handleResize = () => {
      chart.applyOptions({ height: 400 })
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearInterval(intervalID)
      chart.remove()
    }
  }, [])

  return (
    <div className="relative w-full h-[500px]">
      <div ref={chartContainerRef} className="w-full h-full" />
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors font-sans text-sm font-medium text-gray-900"
          onClick={() => chartRef.current?.timeScale().scrollToRealTime()}
        >
          Go to realtime
        </button>
      </div>
    </div>
  )
}