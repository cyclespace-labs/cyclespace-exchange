"use client"

import { AppSidebar } from "@/components/dashboard/ui/app-sidebar"
import GlobalData from "@/components/dashboard/GlobalData"
import { LinearChart } from "@/components/dashboard/Linear-Chart"
import TopLosers from "@/components/dashboard/TopLosers"
import TrendingTokens from "@/components/dashboard/MarketStats"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ChartArea } from "lucide-react"
import {  TradingChart } from "@/components/dashboard/tradingChart/trading-chart"
import { DataTable } from "@/components/dashboard/ui/data-table"

import data from "./data.json"
import { BarChartData } from "@/components/dashboard/Bar-Chart"
import { Piechart } from "@/components/dashboard/Pie-Chart"
import NewsSection from "@/components/dashboard/News-Section"
import { NavBar } from "@/components/Navigation/NavBar"
import { Ticker } from "@/components/Ticker"
import Swap from "../Swap/page"
import { useState } from "react"
import MarketStats from './../../components/dashboard/MarketStats';
import { NavMenu } from "@/components/NavMenu/NavMenu"
import BarIndex from "@/components/dashboard/BarIndex"
import { PairIndex } from './../../components/dashboard/PairIndex';
import { ScrollArea, ScrollAreaThumb } from "@radix-ui/react-scroll-area"
import { XAxis } from 'recharts';
import TechnicalSpecs from "@/components/dashboard/BarIndex"
import { ScrollBar } from "@/components/ui/scroll-area"
import { Command, CommandList } from "@/components/ui/command"
import { BentoGridDemo } from './../../components/Section2';
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation"
import { AuroraBackground } from "@/components/ui/aurora-background"

const token = {
  symbol: 'WETH',
  address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  chainId: 1,
  coingeckoId: 'weth',
};

export default function Page() {

const [fromToken, setFromToken] = useState("link");
  const [toToken, setToToken] = useState("busd");
  const [currentChartToken, setCurrentChartToken] = useState(fromToken);

  return (
    <AuroraBackground className=" w-full h-full">
    <div className="backdrop-filter backdrop-blur-3xl  w-full m-0 p-0">
      <div className=" w-full px-0 backdrop-filter backdrop-blur-3xl bg-zinc-900/50">

        <header className="flex h-fit p-1 shrink-0 items-center gap-2 bg-transparent border-t-2 border-b-2  border-zinc-800">
          <NavMenu/>
        </header>
      
        <div className="w-full px-0">
          <div className="flex flex-row w-full h-full">
              <div className="flex flex-1 flex-col gap-0 pt-0 w-full h-fit">
                <div className=" ">
                  <Ticker/>
                </div> 
                  <div className="h-full w-full justify-start items-start flex gap-0 overflow">
                    
                        <div className="max-w-[400px] h-[715px] flex flex-col bg-transparent"> 
                          <Command className="h-full flex flex-col bg-transparent p-0"> 
                              <CommandList className=" h-full w-full flex flex-col gap-0 bg-transparent p-0 border-[1px] border-zinc-800"> 
                                <div className="bg-transparent border-b-[1px] border-zinc-800">
                                    <MarketStats tokenSymbol={currentChartToken} />
                                </div>
                                <div className="bg-transparent border-b-[1px] border-zinc-800">
                                    <TechnicalSpecs tokenSymbol={currentChartToken}/>
                                </div>
                              </CommandList>
                          </Command>
                        </div>
                    

                        {/* chart */}
                      <div className="w-full h-full flex">
                        <TradingChart
                          buyTokenSymbol={toToken}
                          sellTokenSymbol={fromToken}
                          price={0}
                          setCurrentChartToken={setCurrentChartToken}
                        />
                      </div>
                        <div className="max-w-[400px] h-[715px] flex flex-col">
                          <Command className="h-full flex flex-col bg-transparent p-0 rounded-none">
                            <CommandList className=" h-full w-full flex flex-col gap-4 bg-transparent p-0 rounded-none  border-t-2 border-b-2  border-zinc-800">
                              <Swap
                                fromToken={fromToken}
                                setFromToken={setFromToken}
                                toToken={toToken}
                                setToToken={setToToken}
                                setCurrentChartToken={setCurrentChartToken}
                              />
                            </CommandList>
                          </Command>
                        </div>
                  </div>

                  <div className="flex flex-col gap-4 w-full h-full bg-transparent">
                    <BentoGridDemo/>
                  </div>

                  {/*
                  
                  <div>
                      <DataTable data={data}/>
                  </div>
                  
                  */}

              </div>
          </div>

        </div>

      </div>
    </div>
      
    </AuroraBackground>
  )
}
