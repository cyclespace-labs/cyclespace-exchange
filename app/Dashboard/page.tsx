"use client"

import { AppSidebar } from "@/components/dashboard/ui/app-sidebar"
import GlobalData from "@/components/dashboard/GlobalData"
import { LinearChart } from "@/components/dashboard/Linear-Chart"
import TopGainers from "@/components/dashboard/TopGainers"
import TopLosers from "@/components/dashboard/TopLosers"
import TrendingTokens from "@/components/dashboard/TrendingToken"
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




export default function Page() {

  const [fromToken, setFromToken] = useState("weth");
  const [toToken, setToToken] = useState("usdc");

  return (
    <SidebarProvider className="bg-black w-full">
      <AppSidebar className="bg-black" />
      <SidebarInset className="bg-black w-full">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-black">

          <div className="flex items-center gap-2 px-4  bg-black">
            <SidebarTrigger className="-ml-1 bg-black" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
          
        </header>

        <div className="w-full">
            <div className="justify-center items-center w-[1850px] overflow-clip my-4">
              <Ticker/>
            </div>
        <div className="flex flex-row w-full h-full">

              <div className="flex flex-1 flex-col gap-4 p-4 pt-0 w-full h-fit">

              <div className="w-full h-fit">
                  <div className="mt-0 pt-0 h-fit w-fit justify-start items-start flex">
                    <Swap/>
                  </div>
                </div>

                <div className="grid auto-rows-min gap-4 md:grid-cols-4">

                  <div className="bg-zinc-900 aspect-video rounded-xl h-full w-full">
                    <GlobalData />
                  </div>

                  <div className="bg-zinc-900 aspect-video rounded-xl h-full w-full">
                    <TrendingTokens />
                  </div>

                  <div className="bg-zinc-900 aspect-video rounded-xl h-full w-full">
                    <TopGainers />
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
