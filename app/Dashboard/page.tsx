"use client"

import {  TradingChart } from "@/components/dashboard/tradingChart/trading-chart"
import { Ticker } from "@/components/Ticker"
import MarketStats from './../../components/dashboard/MarketStats';
import { NavMenu } from "@/components/NavMenu/NavMenu"
import TechnicalSpecs from "@/components/dashboard/TechnicalSpecs"
import { Command, CommandList } from "cmdk"
import { SectionTabs } from './../../components/dashboard/ui/section-tabs';
import { DEFAULT_BUY_TOKEN } from "@/components/Swap/price"
import { useSWRConfig } from 'swr'
import dynamic from "next/dynamic"
import { useState, useEffect, useCallback } from "react"
import { Separator } from "@radix-ui/react-separator";
import NewsLayout from "@/components/NewsLayout";

// Lazy load heavy components
const Swap = dynamic(() => import("../Swap/page"), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-zinc-800 rounded-lg h-64" />
})

const TokenomicsBubbleChart = dynamic(
  () => import("@/components/dashboard/Bubblemap"),
  { ssr: false }
)

// Cache key for SWR
const CACHE_KEY = 'dashboard-data'


export default function Page() {

  const { cache, mutate } = useSWRConfig()
  const [fromToken, setFromToken] = useState("link")
  const [toToken, setToToken] = useState("busd")
  const [currentChartToken, setCurrentChartToken] = useState(fromToken)

  // Memoized token handler with cache invalidation
  const handleTokenSelect = useCallback((symbol: string) => {
    setFromToken(symbol)
    setCurrentChartToken(symbol)
  }, [mutate])

    // Prefetch and cache initial data


  return (
    <div className=" w-full h-full bg-black">
    <div className="backdrop-filter backdrop-blur-3xl  w-full m-0 p-0">
      <div className=" w-full px-0 backdrop-filter backdrop-blur-3xl bg-zinc-900/50">

        <header className="flex h-fit p-1 shrink-0 items-center gap-2 bg-transparent border-b-[1px]  border-zinc-700 py-1">
          <NavMenu/>
        </header>
      
        <div className="w-full px-0">
          <div className="flex flex-row w-full h-full">
              <div className="flex flex-1 flex-col gap-0 pt-0 w-full h-fit">

                <div className="h-fit w-full border-zinc-700 border-b-[1px]">
                  <Ticker/>
                </div> 

                  <div className="h-full w-full justify-start items-start flex gap-0 overflow">

                        <div className="max-w-[400px] h-[715px] flex flex-col bg-transparent"> 

                          <div className="h-full flex flex-col bg-transparent p-0"> 
                              <div className=" h-full w-full flex flex-col gap-0"> 
                                <div className="bg-transparent border-b-[1px] border-zinc-700">
                                    <MarketStats tokenSymbol={currentChartToken}  />
                                </div>
                                <div className="bg-transparent border-b-[1px] border-zinc-700">
                                    <TechnicalSpecs tokenSymbol={currentChartToken} />
                                </div>
                                  <div className="w-full h-[300px]">
                                   {/*<NewsLayout/>*/}
                                  </div>
                              </div>
                          </div>
                        </div>

                    

                        {/* chart */}
                      <div className="w-full h-full border-zinc-700 border-x-[1px] flex flex-col ">
                        {/*
                        <RealtimeChart coinId="ethereum"/>
                        */}
                        <TradingChart
                          buyTokenSymbol={toToken}
                          sellTokenSymbol={fromToken}
                          price={0}
                          setCurrentChartToken={setCurrentChartToken}
                          cacheKey={CACHE_KEY}
                        />

                        <Separator className="w-full h-px bg-zinc-800 mb-5"/>

                        <div className="flex flex-row gap-4 w-full h-full bg-transparent items-center" >
                          <SectionTabs />
                        </div>

                      </div>


                  <div className="max-w-[400px] h-[715px] flex flex-col">
                    <Swap
                      fromToken={fromToken}
                      setFromToken={setFromToken}
                      toToken={toToken}
                      setToToken={setToToken}
                      setCurrentChartToken={setCurrentChartToken}
                      price={undefined}
                      setPrice={() => {}}
                      setFinalize={() => {}}
                      chainId={0}                              
                    />
                  </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
