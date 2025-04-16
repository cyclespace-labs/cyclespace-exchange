"use client";

import { useState, useEffect } from "react";
import { Route, Token } from '@lifi/sdk'; // Import Token here
import { WidgetEvent, useWidgetEvents } from '@lifi/widget';
import { FullChart } from "../FullChart";
import { Widget } from './Widget';
import { useTokenId } from "@/lib/token-mapping";

export function TokenDashboard() {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const widgetEvents = useWidgetEvents();

  useEffect(() => {
    const onRouteExecutionStarted = (route: Route) => {
      setSelectedToken(route.fromToken);
    };
    widgetEvents.on(WidgetEvent.RouteExecutionStarted, onRouteExecutionStarted);
    return () => widgetEvents.off(WidgetEvent.RouteExecutionStarted, onRouteExecutionStarted);
  }, [widgetEvents]);

  const tokenId = useTokenId(selectedToken);

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* LI.FI Widget */}
      <Widget />

      {/* Token Chart */}
      <div className="w-full h-[400px]">
        {tokenId ? (
          <FullChart tokenId={tokenId} />
        ) : (
          <p>Selected token not found on CoinGecko.</p>
        )}
      </div>
    </div>
  );
}