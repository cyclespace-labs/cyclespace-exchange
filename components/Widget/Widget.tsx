'use client'

import type { WidgetConfig } from '@lifi/widget'
import { getToken } from '@lifi/widget'
import { ChainType, HiddenUI, LiFiWidget, WidgetSkeleton, WidgetTokens } from '@lifi/widget'
import { ClientOnly } from './ClientOnly'


export function Widget() {
  
  const config = {
    buildUrl: true,
    variant: "wide",
    subvariant: "split",
    appearance: "dark",
    hiddenUI: [HiddenUI.PoweredBy],
    theme: {
      palette: {
        primary: {
          main: "#BAFD02"
        },
        secondary: {
          main: "#F5B5FF"
        }
      },
      typography: {
        fontFamily: "Inter, sans-serif"
      },
      container: {
        boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.08)",
        borderRadius: "16px",
        height:"full",
        width:"full",
      },
      shape: {
        borderRadius: 16
      },
    },
    
  } as Partial<WidgetConfig>
  
  return (
    <ClientOnly fallback={<WidgetSkeleton config={config} />}>
      <div className='w-full h-full'>
        <LiFiWidget config={config}  integrator="nextjs-example" />
      </div>
    </ClientOnly>
  )
}
