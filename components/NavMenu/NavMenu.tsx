"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { TokenPicker } from './../Swap/components/tokenPicker';
import { useState } from "react"
import { ThemeToggle } from "../ThemeToggle"
import { Tourney } from "next/font/google"

const _tourney = Tourney({ subsets: ['latin'] })

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },

  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function NavMenu() {
  const [token, setToken] = React.useState<string | null>(null);
  const [fromToken, setFromToken] = useState("usdc")

  const onTokenChange = (newToken: string) => {
    setToken(newToken);
  };

  return (
    <NavigationMenu className="w-full flex justify-between items-center gap-8 h-ful px-3">
      <NavigationMenuList className="w-full justify-between h-full items-center font-normal">
                  <NavigationMenuItem>
            <Link href="/" className={`${_tourney.className} antialiased text-xl md:text-2xl font-semibold text-gray-800 dark:text-blue-400`}>
              CYCLESPACE
            </Link>
          </NavigationMenuItem>
        <NavigationMenuItem className="">

          {/* <div className="h-fit sm:w-full sm:mr-2 rounded-full font-semibold">
            <TokenPicker
              value={fromToken}
              onValueChange={setFromToken}
              label="From"
            />
          </div> */}

        </NavigationMenuItem>

        <NavigationMenuItem className="font-light">
          <Link href="/docs" passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Trade
            </NavigationMenuLink>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Sentiment
            </NavigationMenuLink>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Analysis
            </NavigationMenuLink>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Vault
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

      </NavigationMenuList>
      <NavigationMenuList className="w-full gap-3">

        <div className="">
          <ThemeToggle />
        </div>

        <div className="text-[12px] ">
          <ConnectButton />
        </div>

      </NavigationMenuList>

    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-normal leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground font-light">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
