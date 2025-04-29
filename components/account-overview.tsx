"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, TrendingUp, RefreshCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface AccountOverviewProps {
  balance: {
    matic: string
    usdc: string
    eth: string
    btc: string
    total: string
  }
  isDarkMode?: boolean
}

export function AccountOverview({ balance, isDarkMode = true }: AccountOverviewProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { toast } = useToast()

  const handleRefresh = () => {
    setIsRefreshing(true)

    toast({
      title: "Refreshing balances",
      description: "Fetching the latest balance information",
    })

    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false)

      toast({
        title: "Balances updated",
        description: "Your portfolio information is now up to date",
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
          <CardTitle className={isDarkMode ? "text-white" : "text-slate-900"}>Portfolio Overview</CardTitle>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
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
        </div>
        <CardDescription className={isDarkMode ? "text-slate-400" : "text-slate-500"}>
          Your current assets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Total Balance</p>
              <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>${balance.total}</p>
            </div>
            <div className="bg-green-500/10 text-green-500 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +5.2% today
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 33 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M16.5 0C25.3604 0 32.5 6.93959 32.5 15.5C32.5 24.0604 25.3604 31 16.5 31C7.63959 31 0.5 24.0604 0.5 15.5C0.5 6.93959 7.63959 0 16.5 0Z"
                        fill="#F7931A"
                      />
                      <path
                        d="M22.2571 13.5286C22.5607 11.4143 21.0036 10.2714 18.8893 9.5357L19.6964 6.4L17.9107 5.95714L17.1357 8.99286C16.6607 8.87143 16.1857 8.75 15.7107 8.65L16.4857 5.59286L14.7 5.15L13.8929 8.28571C13.5 8.2 13.1071 8.11429 12.7143 8.02857V8.01429L10.2857 7.42857L9.82143 9.35714C9.82143 9.35714 11.1429 9.67143 11.1143 9.68571C11.8179 9.85714 11.9393 10.3143 11.9179 10.6857L11 14.2C11.0536 14.2143 11.1214 14.2429 11.1964 14.2857L11 14.2143L9.72857 19.1571C9.65 19.3714 9.42857 19.6857 8.95 19.5714C8.96429 19.6 7.65714 19.2429 7.65714 19.2429L6.75 21.3143L9.02857 21.8714C9.46429 21.9857 9.88571 22.1 10.3 22.2143L9.47857 25.3857L11.2643 25.8286L12.0714 22.7C12.5643 22.8429 13.0429 22.9714 13.5071 23.0857L12.7071 26.1857L14.4929 26.6286L15.3143 23.4714C18.2357 24.0143 20.4 23.7714 21.3857 21.1286C22.1714 19.0143 21.4714 17.7857 19.9857 17.0143C21.0714 16.7857 21.9 16.0714 22.2571 13.5286ZM17.8714 19.7C17.3143 21.8143 13.7857 20.6714 12.6143 20.3714L13.7 16.1571C14.8714 16.4571 18.4571 17.5 17.8714 19.7ZM18.4286 13.4857C17.9286 15.4 14.9857 14.4286 14.0143 14.1714L15 10.3571C15.9714 10.6143 18.95 11.4857 18.4286 13.4857Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`}>Bitcoin</p>
                    <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>BTC</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    {balance.btc} BTC
                  </p>
                  <div className="flex items-center justify-end text-xs text-green-500">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>4.2%</span>
                  </div>
                </div>
              </div>
              <Progress value={35} className={`h-1.5 ${isDarkMode ? "bg-slate-700" : "bg-slate-200"}`}>
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full" />
              </Progress>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0Z"
                        fill="#627EEA"
                      />
                      <path d="M12.3735 3V9.6525L17.9963 12.165L12.3735 3Z" fill="white" fillOpacity="0.602" />
                      <path d="M12.3735 3L6.75 12.165L12.3735 9.6525V3Z" fill="white" />
                      <path d="M12.3735 16.476V20.9963L18 13.212L12.3735 16.476Z" fill="white" fillOpacity="0.602" />
                      <path d="M12.3735 20.9963V16.4753L6.75 13.212L12.3735 20.9963Z" fill="white" />
                      <path
                        d="M12.3735 15.4298L17.9963 12.165L12.3735 9.6543V15.4298Z"
                        fill="white"
                        fillOpacity="0.2"
                      />
                      <path d="M6.75 12.165L12.3735 15.4298V9.6543L6.75 12.165Z" fill="white" fillOpacity="0.602" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`}>Ethereum</p>
                    <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>ETH</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    {balance.eth} ETH
                  </p>
                  <div className="flex items-center justify-end text-xs text-green-500">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>2.8%</span>
                  </div>
                </div>
              </div>
              <Progress value={25} className={`h-1.5 ${isDarkMode ? "bg-slate-700" : "bg-slate-200"}`}>
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full" />
              </Progress>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M39.9999 0L7.27271 23.619L39.9999 47.2381L72.7272 23.619L39.9999 0Z" fill="#8247E5" />
                      <path
                        d="M7.27271 32.3809L39.9999 56L72.7272 32.3809L39.9999 56L7.27271 32.3809Z"
                        fill="#8247E5"
                      />
                      <path d="M7.27271 56L39.9999 79.6191L72.7272 56L39.9999 79.6191L7.27271 56Z" fill="#8247E5" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`}>Polygon</p>
                    <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>MATIC</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    {balance.matic} MATIC
                  </p>
                  <div className="flex items-center justify-end text-xs text-green-500">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>2.5%</span>
                  </div>
                </div>
              </div>
              <Progress value={15} className={`h-1.5 ${isDarkMode ? "bg-slate-700" : "bg-slate-200"}`}>
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full" />
              </Progress>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                        fill="#2775CA"
                      />
                      <path
                        d="M15.9 10.0001C15.9 8.30008 14.7 7.80008 13 7.60008V5.90008H11.3V7.50008H10.2V5.90008H8.5V7.60008C8.1 7.60008 6.7 7.60008 6.7 7.60008V9.40008C6.7 9.40008 7.8 9.40008 7.8 9.30008C8.3 9.30008 8.5 9.50008 8.5 9.80008V14.2001C8.4 14.6001 8.1 14.7001 7.7 14.7001C7.7 14.7001 6.6 14.7001 6.6 14.7001V16.5001H8.5V18.2001H10.2V16.5001H11.3V18.2001H13V16.5001C15.2 16.3001 16.5 15.5001 16.5 13.4001C16.5 12.0001 15.7 11.2001 14.5 11.0001C15.4 10.7001 15.9 10.0001 15.9 10.0001ZM11.3 14.7001H10.2V12.5001H11.3V14.7001ZM11.3 11.2001H10.2V9.30008H11.3V11.2001ZM13.7 13.8001C13.7 14.4001 13.2 14.7001 12.3 14.7001H11.9V12.9001H12.3C13.2 12.9001 13.7 13.2001 13.7 13.8001Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`}>USD Coin</p>
                    <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>USDC</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    ${balance.usdc}
                  </p>
                  <div className="flex items-center justify-end text-xs text-red-500">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    <span>0.1%</span>
                  </div>
                </div>
              </div>
              <Progress value={25} className={`h-1.5 ${isDarkMode ? "bg-slate-700" : "bg-slate-200"}`}>
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full" />
              </Progress>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
