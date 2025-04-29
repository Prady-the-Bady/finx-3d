"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Sparkles, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface AdvisorSectionProps {
  balance: {
    matic: string
    usdc: string
    eth: string
    btc: string
    total: string
  }
  isDarkMode?: boolean
}

export function AdvisorSection({ balance, isDarkMode = true }: AdvisorSectionProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showAdvice, setShowAdvice] = useState(false)
  const { toast } = useToast()

  const handleGetAdvice = () => {
    setIsLoading(true)

    toast({
      title: "Analyzing portfolio",
      description: "Our AI advisor is analyzing your portfolio",
    })

    // Simulate AI processing delay
    setTimeout(() => {
      setIsLoading(false)
      setShowAdvice(true)

      toast({
        title: "Analysis complete",
        description: "Portfolio recommendations are ready",
        variant: "success",
      })
    }, 2000)
  }

  return (
    <Card
      className={`${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-200"} backdrop-blur-sm`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={isDarkMode ? "text-white" : "text-slate-900"}>AI Advisor</CardTitle>
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
            <Brain className="h-4 w-4 text-white" />
          </div>
        </div>
        <CardDescription className={isDarkMode ? "text-slate-400" : "text-slate-500"}>
          Get personalized investment advice
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!showAdvice ? (
          <div className={`rounded-lg ${isDarkMode ? "bg-slate-700/30" : "bg-slate-100"} p-4 text-center`}>
            <Sparkles className={`h-10 w-10 mx-auto mb-3 ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`} />
            <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              Portfolio Insights
            </h3>
            <p className={`text-sm mb-4 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              Our AI can analyze your portfolio and provide personalized recommendations based on market trends.
            </p>
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0"
              onClick={handleGetAdvice}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Get Advice"
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`rounded-lg ${isDarkMode ? "bg-slate-700/30" : "bg-slate-100"} p-4`}>
              <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                Portfolio Analysis
              </h4>
              <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                Your portfolio is heavily weighted towards stablecoins (USDC). Consider diversifying into more growth
                assets.
              </p>
            </div>

            <div className={`rounded-lg ${isDarkMode ? "bg-slate-700/30" : "bg-slate-100"} p-4`}>
              <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                Recommendations
              </h4>
              <ul className={`text-xs space-y-2 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                <li className="flex items-start">
                  <ArrowRight className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                  <span>Increase ETH allocation by 15% to capitalize on upcoming network upgrades</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                  <span>Consider staking your MATIC for passive income (current APY: 5.2%)</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                  <span>Explore DeFi yield opportunities for your USDC holdings</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          variant="link"
          className={`w-full ${isDarkMode ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-700"}`}
        >
          View detailed analysis
        </Button>
      </CardFooter>
    </Card>
  )
}
