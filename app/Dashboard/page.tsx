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
import { ChartAreaInteractive } from "@/components/dashboard/ui/chart-area-interactive"
import { DataTable } from "@/components/dashboard/ui/data-table"

import data from "./data.json"
import { BarChartData } from "@/components/dashboard/Bar-Chart"
import { Piechart } from "@/components/dashboard/Pie-Chart"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-row w-full">

          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 w-full">

          <div className="grid auto-rows-min gap-4 md:grid-cols-4">

            <div className="bg-muted/50 aspect-video rounded-xl h-full w-full">
              <GlobalData />
            </div>

            <div className="bg-muted/50 aspect-video rounded-xl h-full w-full">
              <TrendingTokens />
            </div>

            <div className="bg-muted/50 aspect-video rounded-xl h-full w-full">
              <TopGainers />
            </div>

            <div className="bg-muted/50 aspect-video rounded-xl h-full w-full">
              <TopLosers />
          </div>

          </div>

          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min " >
            <div className="w-full h-full flex flex-row gap-4">
              <div className="w-full h-full bg-muted/50 rounded-xl ">
                <ChartAreaInteractive />
              </div>
              <div className="w-full h-full bg-muted/50 rounded-xl">
                <BarChartData/>
              </div>
            </div>
          </div>
          <DataTable data={data}/>
          </div>

          <div className="max-w-[400px] w-full">
            <Piechart/>
          </div>

        </div>

      </SidebarInset>
    </SidebarProvider>
  )
}
