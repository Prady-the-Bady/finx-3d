"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDownUp, Loader2, TrendingDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CurrencyExchangeComparisonProps {
  isDarkMode?: boolean
}

// Exchange rates and fees
const exchangeRates = {
  aed: { inr: 22.68, usd: 0.27, eur: 0.25, gbp: 0.22 },
  inr: { aed: 0.044, usd: 0.012, eur: 0.011, gbp: 0.0095 },
  usd: { aed: 3.67, inr: 83.12, eur: 0.92, gbp: 0.8 },
  eur: { aed: 4.0, inr: 90.35, usd: 1.09, gbp: 0.87 },
  gbp: { aed: 4.6, inr: 104.0, usd: 1.25, eur: 1.15 },
}

// Traditional exchange fees (percentage)
const traditionalFees = {
  aed_inr: 3.5,
  inr_aed: 3.5,
  aed_usd: 2.8,
  usd_aed: 2.8,
  inr_usd: 3.2,
  usd_inr: 3.2,
}

// Crypto exchange fees (percentage)
const cryptoFees = {
  all: 0.8, // Flat fee for all crypto exchanges
}

export function CurrencyExchangeComparison({ isDarkMode = true }: CurrencyExchangeComparisonProps) {
  const [fromCurrency, setFromCurrency] = useState("aed")
  const [toCurrency, setToCurrency] = useState("inr")
  const [amount, setAmount] = useState("1000")
  const [isCalculating, setIsCalculating] = useState(false)
  const [results, setResults] = useState<any>(null)
  const { toast } = useToast()

  // Calculate exchange results
  const calculateExchange = () => {
    const numAmount = Number.parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) return null

    // Get exchange rate
    const rate = exchangeRates[fromCurrency][toCurrency]

    // Calculate traditional exchange
    const traditionalFeeKey = `${fromCurrency}_${toCurrency}`
    const traditionalFeePercent = traditionalFees[traditionalFeeKey] || 3.0 // Default fee if not specified
    const traditionalFeeAmount = numAmount * (traditionalFeePercent / 100)
    const traditionalTotal = numAmount * rate
    const traditionalReceived = traditionalTotal - traditionalFeeAmount

    // Calculate crypto exchange
    const cryptoFeePercent = cryptoFees.all
    const cryptoFeeAmount = numAmount * (cryptoFeePercent / 100)
    const cryptoTotal = numAmount * rate
    const cryptoReceived = cryptoTotal - cryptoFeeAmount

    // Calculate savings
    const savings = cryptoReceived - traditionalReceived
    const savingsPercent = (savings / traditionalReceived) * 100

    return {
      traditionalFeePercent,
      traditionalFeeAmount,
      traditionalTotal,
      traditionalReceived,
      cryptoFeePercent,
      cryptoFeeAmount,
      cryptoTotal,
      cryptoReceived,
      savings,
      savingsPercent,
      rate,
    }
  }

  // Update results when inputs change
  useEffect(() => {
    const newResults = calculateExchange()
    setResults(newResults)
  }, [fromCurrency, toCurrency, amount])

  const handleSwap = () => {
    const temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
  }

  const handleCalculate = () => {
    setIsCalculating(true)

    toast({
      title: "Calculating exchange rates",
      description: "Fetching the latest rates and fees",
    })

    // Simulate calculation delay
    setTimeout(() => {
      setIsCalculating(false)

      if (results) {
        toast({
          title: "Calculation complete",
          description: `You save ${results.savingsPercent.toFixed(2)}% using crypto exchange!`,
          variant: "success",
        })
      }
    }, 1500)
  }

  return (
    <Card
      className={`${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-200"} backdrop-blur-sm h-full`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={isDarkMode ? "text-white" : "text-slate-900"}>Currency Exchange Comparison</CardTitle>
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-600 to-teal-600 flex items-center justify-center">
            <TrendingDown className="h-4 w-4 text-white" />
          </div>
        </div>
        <CardDescription className={isDarkMode ? "text-slate-400" : "text-slate-500"}>
          Compare traditional vs crypto exchange rates and fees
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="amount" className={isDarkMode ? "text-slate-300" : "text-slate-700"}>
              Amount
            </Label>
          </div>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`${isDarkMode ? "bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400" : "bg-slate-100 border-slate-300 text-slate-900 placeholder:text-slate-500"} focus-visible:ring-indigo-500`}
          />
        </div>

        <div className="grid grid-cols-5 gap-2 items-center">
          <div className="col-span-2">
            <Label htmlFor="fromCurrency" className={isDarkMode ? "text-slate-300" : "text-slate-700"}>
              From
            </Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger
                className={`mt-1 ${isDarkMode ? "bg-slate-700/50 border-slate-600 text-white" : "bg-slate-100 border-slate-300 text-slate-900"} focus:ring-indigo-500`}
              >
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent
                className={
                  isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-900"
                }
              >
                <SelectItem value="aed">AED (UAE Dirham)</SelectItem>
                <SelectItem value="inr">INR (Indian Rupee)</SelectItem>
                <SelectItem value="usd">USD (US Dollar)</SelectItem>
                <SelectItem value="eur">EUR (Euro)</SelectItem>
                <SelectItem value="gbp">GBP (British Pound)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSwap}
              className={`rounded-full ${isDarkMode ? "bg-slate-700/50 hover:bg-slate-700 text-slate-300" : "bg-slate-200/50 hover:bg-slate-200 text-slate-700"}`}
            >
              <ArrowDownUp className="h-5 w-5" />
            </Button>
          </div>

          <div className="col-span-2">
            <Label htmlFor="toCurrency" className={isDarkMode ? "text-slate-300" : "text-slate-700"}>
              To
            </Label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger
                className={`mt-1 ${isDarkMode ? "bg-slate-700/50 border-slate-600 text-white" : "bg-slate-100 border-slate-300 text-slate-900"} focus:ring-indigo-500`}
              >
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent
                className={
                  isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-900"
                }
              >
                <SelectItem value="aed">AED (UAE Dirham)</SelectItem>
                <SelectItem value="inr">INR (Indian Rupee)</SelectItem>
                <SelectItem value="usd">USD (US Dollar)</SelectItem>
                <SelectItem value="eur">EUR (Euro)</SelectItem>
                <SelectItem value="gbp">GBP (British Pound)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {results && (
          <div className={`mt-6 rounded-lg ${isDarkMode ? "bg-slate-700/30" : "bg-slate-100"} p-4`}>
            <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              Exchange Comparison
            </h3>

            <div className="space-y-4">
              <div>
                <p className={`text-sm mb-2 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                  Exchange Rate: 1 {fromCurrency.toUpperCase()} = {results.rate.toFixed(2)} {toCurrency.toUpperCase()}
                </p>
              </div>

              <div className={`p-3 rounded-lg ${isDarkMode ? "bg-slate-800" : "bg-white"}`}>
                <div className="flex justify-between mb-1">
                  <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    Traditional Exchange
                  </p>
                  <p className={`text-sm font-medium ${isDarkMode ? "text-red-400" : "text-red-600"}`}>
                    {results.traditionalFeePercent}% fee
                  </p>
                </div>
                <div className="flex justify-between text-xs mb-2">
                  <span className={isDarkMode ? "text-slate-400" : "text-slate-500"}>
                    {amount} {fromCurrency.toUpperCase()}
                  </span>
                  <span className={isDarkMode ? "text-slate-400" : "text-slate-500"}>
                    Fee: {results.traditionalFeeAmount.toFixed(2)} {fromCurrency.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>You receive:</span>
                  <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    {results.traditionalReceived.toFixed(2)} {toCurrency.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className={`p-3 rounded-lg ${isDarkMode ? "bg-slate-800" : "bg-white"}`}>
                <div className="flex justify-between mb-1">
                  <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    Crypto Exchange
                  </p>
                  <p className={`text-sm font-medium ${isDarkMode ? "text-green-400" : "text-green-600"}`}>
                    {results.cryptoFeePercent}% fee
                  </p>
                </div>
                <div className="flex justify-between text-xs mb-2">
                  <span className={isDarkMode ? "text-slate-400" : "text-slate-500"}>
                    {amount} {fromCurrency.toUpperCase()}
                  </span>
                  <span className={isDarkMode ? "text-slate-400" : "text-slate-500"}>
                    Fee: {results.cryptoFeeAmount.toFixed(2)} {fromCurrency.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>You receive:</span>
                  <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    {results.cryptoReceived.toFixed(2)} {toCurrency.toUpperCase()}
                  </span>
                </div>
              </div>

              <div
                className={`p-3 rounded-lg bg-gradient-to-r ${isDarkMode ? "from-green-900/50 to-teal-900/50 border border-green-800" : "from-green-100 to-teal-100 border border-green-200"}`}
              >
                <div className="flex justify-between mb-1">
                  <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    Your Savings with Crypto
                  </p>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                    Additional amount:
                  </span>
                  <span className={`text-sm font-medium ${isDarkMode ? "text-green-400" : "text-green-600"}`}>
                    +{results.savings.toFixed(2)} {toCurrency.toUpperCase()} ({results.savingsPercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white border-0"
          onClick={handleCalculate}
          disabled={isCalculating}
        >
          {isCalculating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calculating...
            </>
          ) : (
            "Calculate Savings"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
