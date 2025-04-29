"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface MarketOverviewProps {
  isDarkMode?: boolean
}

export function MarketOverview({ isDarkMode = true }: MarketOverviewProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { toast } = useToast()

  const marketData = {
    crypto: [
      { name: "Bitcoin", symbol: "BTC", price: "$65,432.18", change: "+2.4%", direction: "up" },
      { name: "Ethereum", symbol: "ETH", price: "$3,521.47", change: "+1.8%", direction: "up" },
      { name: "Polygon", symbol: "MATIC", price: "$0.75", change: "-0.5%", direction: "down" },
      { name: "Solana", symbol: "SOL", price: "$142.87", change: "+5.2%", direction: "up" },
      { name: "Cardano", symbol: "ADA", price: "$0.58", change: "-1.2%", direction: "down" },
    ],
    forex: [
      { name: "EUR/USD", symbol: "EUR", price: "1.0921", change: "+0.3%", direction: "up" },
      { name: "GBP/USD", symbol: "GBP", price: "1.2745", change: "-0.2%", direction: "down" },
      { name: "USD/JPY", symbol: "JPY", price: "150.32", change: "+0.5%", direction: "up" },
      { name: "USD/CAD", symbol: "CAD", price: "1.3542", change: "-0.1%", direction: "down" },
      { name: "AUD/USD", symbol: "AUD", price: "0.6678", change: "+0.4%", direction: "up" },
    ],
  }

  const handleRefresh = () => {
    setIsRefreshing(true)

    toast({
      title: "Refreshing market data",
      description: "Fetching the latest market information",
    })

    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false)

      toast({
        title: "Market data updated",
        description: "Market information is now up to date",
        variant: "success",
      })
    }, 1500)
  }

  return (
    <Card
      className={`${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-200"} backdrop-blur-sm`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className={isDarkMode ? "text-white" : "text-slate-900"}>Market Overview</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${isDarkMode ? "text-slate-400 hover:text-white hover:bg-slate-700" : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"}`}
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
        <CardDescription className={isDarkMode ? "text-slate-400" : "text-slate-500"}>
          Latest market prices and trends
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="crypto">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
            <TabsTrigger value="forex">Forex</TabsTrigger>
          </TabsList>
          <TabsContent value="crypto">
            <div className="space-y-2">
              {marketData.crypto.map((asset) => (
                <div
                  key={asset.symbol}
                  className={`flex items-center justify-between p-2 rounded-lg ${isDarkMode ? "hover:bg-slate-700/50" : "hover:bg-slate-100"} transition-colors`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        asset.symbol === "BTC"
                          ? "bg-orange-100"
                          : asset.symbol === "ETH"
                            ? "bg-blue-100"
                            : asset.symbol === "MATIC"
                              ? "bg-purple-100"
                              : asset.symbol === "SOL"
                                ? "bg-green-100"
                                : "bg-red-100"
                      }`}
                    >
                      <span className="text-xs font-medium text-slate-900">{asset.symbol}</span>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                        {asset.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                      {asset.price}
                    </p>
                    <div
                      className={`flex items-center justify-end text-xs ${
                        asset.direction === "up" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {asset.direction === "up" ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      <span>{asset.change}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="forex">
            <div className="space-y-2">
              {marketData.forex.map((asset) => (
                <div
                  key={asset.symbol}
                  className={`flex items-center justify-between p-2 rounded-lg ${isDarkMode ? "hover:bg-slate-700/50" : "hover:bg-slate-100"} transition-colors`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center`}>
                      <span className="text-xs font-medium text-slate-900">{asset.symbol}</span>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                        {asset.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                      {asset.price}
                    </p>
                    <div
                      className={`flex items-center justify-end text-xs ${
                        asset.direction === "up" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {asset.direction === "up" ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      <span>{asset.change}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
