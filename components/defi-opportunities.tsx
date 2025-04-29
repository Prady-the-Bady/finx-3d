"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PiggyBank, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface DeFiOpportunitiesProps {
  isDarkMode?: boolean
}

export function DeFiOpportunities({ isDarkMode = true }: DeFiOpportunitiesProps) {
  const { toast } = useToast()

  const defiOptions = [
    { name: "USDC Lending", platform: "Aave", apy: "3.8%", risk: "Low" },
    { name: "ETH Staking", platform: "Lido", apy: "4.2%", risk: "Medium" },
    { name: "MATIC Farming", platform: "QuickSwap", apy: "12.5%", risk: "High" },
  ]

  const handleViewOpportunity = (name: string) => {
    toast({
      title: "DeFi Opportunity",
      description: `Viewing details for ${name}`,
    })
  }

  return (
    <Card
      className={`${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-200"} backdrop-blur-sm`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={isDarkMode ? "text-white" : "text-slate-900"}>DeFi Opportunities</CardTitle>
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
            <PiggyBank className="h-4 w-4 text-white" />
          </div>
        </div>
        <CardDescription className={isDarkMode ? "text-slate-400" : "text-slate-500"}>
          Earn passive income on your assets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {defiOptions.map((option) => (
            <div
              key={option.name}
              className={`rounded-lg ${isDarkMode ? "bg-slate-700/30 hover:bg-slate-700/50" : "bg-slate-100 hover:bg-slate-200"} p-3 transition-colors cursor-pointer`}
              onClick={() => handleViewOpportunity(option.name)}
            >
              <div className="flex items-center justify-between mb-1">
                <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`}>{option.name}</p>
                <div
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    option.risk === "Low"
                      ? "bg-green-500/20 text-green-500"
                      : option.risk === "Medium"
                        ? "bg-amber-500/20 text-amber-500"
                        : "bg-red-500/20 text-red-500"
                  }`}
                >
                  {option.risk} Risk
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>on {option.platform}</p>
                <p className={`text-sm font-medium ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`}>
                  {option.apy} APY
                </p>
              </div>
              <div className="flex items-center justify-end mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-7 px-2 text-xs ${isDarkMode ? "text-slate-300 hover:text-white hover:bg-slate-700" : "text-slate-700 hover:text-slate-900 hover:bg-slate-200"}`}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
