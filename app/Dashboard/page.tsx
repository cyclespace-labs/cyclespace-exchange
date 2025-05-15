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
import {  TradingChart } from "@/components/dashboard/ui/trading-chart"
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
    <SidebarProvider className="dark:bg-zinc-950 bg-zinc-200  w-full">
      <AppSidebar className="bg-transparent border-none" />
      <SidebarInset className=" w-full">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16 px-4">

          <div className="flex items-center gap-2 px- mt-2 mb-2">
            <SidebarTrigger className="-ml-1 dark:bg-zinc-950 bg-zinc-200" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
          <NavMenu/>
        </header>
        <div className="w-full">
        <div className="flex flex-row w-full h-full">
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0 w-full h-fit">
                      <div className=" mb-2">
                                  <Ticker/>
                                </div> 
                  <div className="h-[715px] w-full justify-start items-start flex gap-2 overflow">
                        <div className="max-w-[400px] h-[715px] flex flex-col"> {/* Fixed parent height */}
                          <Command className="h-full flex flex-col bg-transparent p-0"> {/* Full height */}
                              <CommandList className=" h-full flex flex-col gap-4 pr-2 bg-transparent p-0 rounded-xl"> {/* Add bottom padding */}
                                <div className="my-2">
                                    <MarketStats tokenSymbol={currentChartToken} />
                                </div>
                                <div className="my-2">
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
                        <div className="">
                        <Swap
                            fromToken={fromToken}
                            setFromToken={setFromToken}
                            toToken={toToken}
                            setToToken={setToToken}
                            setCurrentChartToken={setCurrentChartToken}
                        
                          />
                        </div>
                  </div>
                <DataTable data={data}/>
              </div>
          </div>

        </div>

      </SidebarInset>
    </SidebarProvider>
  )
}
