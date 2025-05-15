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

const token = {
  symbol: 'WETH',
  address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  chainId: 1,
  coingeckoId: 'weth',
};

export default function Page() {

const [fromToken, setFromToken] = useState("link");
  const [toToken, setToToken] = useState("busd");
  const [currentChartToken, setCurrentChartToken] = useState(toToken);

  return (
    <SidebarProvider className="dark:bg-zinc-950 bg-zinc-200  w-full">
      <AppSidebar className="" />
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
          
           {/*} <div className="justify-center items-center w-[1850px] overflow-clip my-4">
              <Ticker/>
            </div> */}

        <div className="flex flex-row w-full h-full">

              <div className="flex flex-1 flex-col gap-4 p-4 pt-0 w-full h-fit">

                  <div className="mt-0 pt-0 h-[715px] w-full justify-start items-start flex gap-2">
                    <div className="max-w-[400px] h-full container flex flex-col gap-2">
                      <MarketStats tokenSymbol={currentChartToken} /> 
                      <PairIndex           
                          buyTokenSymbol={toToken}
                          sellTokenSymbol={fromToken} price={0} />
                      <BarIndex/>
                    </div>
                      <Swap
                      
                        fromToken={fromToken}
                        setFromToken={setFromToken}
                        toToken={toToken}
                        setToToken={setToToken}
                        setCurrentChartToken={setCurrentChartToken}
                      
                      />
                  </div>

                <div className="grid auto-rows-min gap-4 md:grid-cols-4">

                  <div className="bg-zinc-900 aspect-video rounded-xl h-full w-full">
                    <GlobalData />
                  </div>

                  <div className="bg-zinc-900 aspect-video rounded-xl h-full w-full">
                    <MarketStats tokenSymbol={"busd"} />
                  </div>

                  <div className="bg-zinc-900 aspect-video rounded-xl h-full w-full">
                    <BarIndex />
                  </div>

                  <div className="bg-zinc-900 aspect-video rounded-xl h-full w-full">
                    <TopLosers />
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
