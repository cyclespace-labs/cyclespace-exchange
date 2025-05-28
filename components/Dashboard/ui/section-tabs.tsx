import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { DataTable } from "../tokenList/data-table"
import { Rows2 } from "lucide-react"
import { IconCube3dSphere } from "@tabler/icons-react"
import { Tokenomics } from "../Tokenomics"
import BubbleChart from "../Bubblemap"
import { Separator } from "@/components/ui/separator"


export function SectionTabs() {
  return (
    <Tabs defaultValue="explore" className="w-full ">
      <TabsList className="grid w-[200px] grid-cols-2 bg-transparent gap-2 ml-5">
        <TabsTrigger value="explore">
          <Rows2 color="white" strokeWidth={2} size={20}/>
          Explore
        </TabsTrigger>
        <TabsTrigger value="research">
          <IconCube3dSphere color="white" strokeWidth={2} size={20} /> 
          Research
        </TabsTrigger>
      </TabsList>
      <TabsContent value="explore" className="w-full">

        <DataTable />

      </TabsContent>
      <TabsContent value="research" className="grid grid-cols-2 ">
        <div className="border border-px border-zinc-700 w-full h-fit"><Tokenomics /></div>
        <BubbleChart/>
      </TabsContent>
    </Tabs>
  )
}
