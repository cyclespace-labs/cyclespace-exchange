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
    <NavigationMenu className="w-full flex justify-between items-center gap-8 h-ful px-3 bg-transparent">
      <NavigationMenuList className="w-full justify-between h-full items-center font-normal text-foreground">
                  <NavigationMenuItem>
            <Link href="/" className={`${_tourney.className} antialiased text-xl md:text-2xl font-semibold bg-gradient-to-r from-[#4400FF] to-[#7E63F7] text-transparent bg-clip-text`}>
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

          <NavigationMenuItem className="font-light flex gap-1">
            <Link href="/trade" passHref >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Trade
              </NavigationMenuLink>
            </Link>
            <Link href="/sentiment" passHref >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Sentiment
              </NavigationMenuLink>
            </Link>
            <Link href="/analysis" passHref >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Analysis
              </NavigationMenuLink>
            </Link>
            <Link href="/vault" passHref >
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
            "block select-none space-y-1 text-zinc-100 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <p className="text-sm font-normal leading-none text-zinc-100">{title}</p>
          <p className="line-clamp-2 text-sm leading-snug text-zinc-100 font-light">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
