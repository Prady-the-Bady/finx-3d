"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeftRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface CrossChainBridgeProps {
  isDarkMode?: boolean
}

export function CrossChainBridge({ isDarkMode = true }: CrossChainBridgeProps) {
  const { toast } = useToast()

  const bridgeOptions = [
    { from: "Ethereum", to: "Polygon", fee: "0.002 ETH", time: "~15 min" },
    { from: "Polygon", to: "Ethereum", fee: "0.1 MATIC", time: "~30 min" },
    { from: "Ethereum", to: "Arbitrum", fee: "0.001 ETH", time: "~5 min" },
  ]

  const handleViewBridge = (from: string, to: string) => {
    toast({
      title: "Bridge Details",
      description: `Viewing bridge from ${from} to ${to}`,
    })
  }

  return (
    <Card
      className={`${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-200"} backdrop-blur-sm`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={isDarkMode ? "text-white" : "text-slate-900"}>Cross-Chain Bridge</CardTitle>
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
            <ArrowLeftRight className="h-4 w-4 text-white" />
          </div>
        </div>
        <CardDescription className={isDarkMode ? "text-slate-400" : "text-slate-500"}>
          Move assets between blockchains
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {bridgeOptions.map((option) => (
            <div
              key={`${option.from}-${option.to}`}
              className={`rounded-lg ${isDarkMode ? "bg-slate-700/30 hover:bg-slate-700/50" : "bg-slate-100 hover:bg-slate-200"} p-3 transition-colors cursor-pointer`}
              onClick={() => handleViewBridge(option.from, option.to)}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`}>{option.from}</p>
                  <ArrowLeftRight className={`h-3 w-3 mx-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`} />
                  <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`}>{option.to}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Fee: {option.fee}</p>
                <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Time: {option.time}</p>
              </div>
              <div className="flex items-center justify-end mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-7 px-2 text-xs ${isDarkMode ? "text-slate-300 hover:text-white hover:bg-slate-700" : "text-slate-700 hover:text-slate-900 hover:bg-slate-200"}`}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Bridge Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
