"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDownUp, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CurrencyConverterProps {
  balance: {
    matic: string
    usdc: string
    eth: string
    btc: string
    total: string
  }
  isDarkMode?: boolean
}

// Mock exchange rates
const exchangeRates = {
  btc: { usd: 65000, eur: 60000, gbp: 52000, jpy: 9750000, aud: 97500 },
  eth: { usd: 3500, eur: 3200, gbp: 2800, jpy: 525000, aud: 5250 },
  matic: { usd: 0.75, eur: 0.69, gbp: 0.6, jpy: 112.5, aud: 1.13 },
  usdc: { usd: 1, eur: 0.92, gbp: 0.8, jpy: 150, aud: 1.5 },
  usd: { btc: 0.000015, eth: 0.00029, matic: 1.33, usdc: 1, eur: 0.92, gbp: 0.8, jpy: 150, aud: 1.5 },
  eur: { btc: 0.000017, eth: 0.00031, matic: 1.45, usdc: 1.09, usd: 1.09, gbp: 0.87, jpy: 163, aud: 1.63 },
  gbp: { btc: 0.000019, eth: 0.00036, matic: 1.67, usdc: 1.25, usd: 1.25, eur: 1.15, jpy: 187.5, aud: 1.88 },
  jpy: {
    btc: 0.0000001,
    eth: 0.0000019,
    matic: 0.0089,
    usdc: 0.0067,
    usd: 0.0067,
    eur: 0.0061,
    gbp: 0.0053,
    aud: 0.01,
  },
  aud: { btc: 0.00001, eth: 0.00019, matic: 0.89, usdc: 0.67, usd: 0.67, eur: 0.61, gbp: 0.53, jpy: 100 },
}

export function CurrencyConverter({ balance, isDarkMode = true }: CurrencyConverterProps) {
  const [fromCurrency, setFromCurrency] = useState("btc")
  const [toCurrency, setToCurrency] = useState("usd")
  const [fromAmount, setFromAmount] = useState("0.01")
  const [toAmount, setToAmount] = useState("")
  const [isTraditional, setIsTraditional] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const { toast } = useToast()

  const cryptoCurrencies = ["btc", "eth", "matic", "usdc"]
  const traditionalCurrencies = ["usd", "eur", "gbp", "jpy", "aud"]

  useEffect(() => {
    convertCurrency(fromAmount, fromCurrency, toCurrency)
  }, [fromCurrency, toCurrency, fromAmount])

  const convertCurrency = (amount: string, from: string, to: string) => {
    const numAmount = Number.parseFloat(amount)
    if (isNaN(numAmount)) {
      setToAmount("")
      return
    }

    let result: number

    // Convert from crypto to traditional
    if (cryptoCurrencies.includes(from) && traditionalCurrencies.includes(to)) {
      result = numAmount * exchangeRates[from][to]
    }
    // Convert from traditional to crypto
    else if (traditionalCurrencies.includes(from) && cryptoCurrencies.includes(to)) {
      result = numAmount * exchangeRates[from][to]
    }
    // Convert between cryptos or between traditional currencies
    else {
      // First convert to USD as intermediate
      let usdValue: number
      if (cryptoCurrencies.includes(from)) {
        usdValue = numAmount * exchangeRates[from].usd
      } else {
        usdValue = numAmount * exchangeRates[from].usd
      }

      // Then convert from USD to target
      if (cryptoCurrencies.includes(to)) {
        result = usdValue * exchangeRates.usd[to]
      } else {
        result = usdValue * exchangeRates.usd[to]
      }
    }

    // Format based on currency type
    if (cryptoCurrencies.includes(to)) {
      if (to === "btc") {
        setToAmount(result.toFixed(8))
      } else {
        setToAmount(result.toFixed(6))
      }
    } else {
      setToAmount(result.toFixed(2))
    }
  }

  const handleSwap = () => {
    const temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
    setFromAmount(toAmount)
  }

  const toggleCurrencyType = () => {
    setIsTraditional(!isTraditional)
    // Reset selections when toggling
    if (!isTraditional) {
      setFromCurrency("usd")
      setToCurrency("btc")
    } else {
      setFromCurrency("btc")
      setToCurrency("usd")
    }
  }

  const handleConvert = () => {
    setIsConverting(true)

    toast({
      title: "Processing conversion",
      description: "Please wait while we process your conversion",
    })

    // Simulate conversion delay
    setTimeout(() => {
      setIsConverting(false)

      toast({
        title: "Conversion successful",
        description: `Converted ${fromAmount} ${fromCurrency.toUpperCase()} to ${toAmount} ${toCurrency.toUpperCase()}`,
        variant: "success",
      })
    }, 1500)
  }

  return (
    <Card
      className={`${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-200"} backdrop-blur-sm`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={isDarkMode ? "text-white" : "text-slate-900"}>Currency Converter</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleCurrencyType}
            className={
              isDarkMode
                ? "border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                : "border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            }
          >
            {isTraditional ? "Crypto Mode" : "Banking Mode"}
          </Button>
        </div>
        <CardDescription className={isDarkMode ? "text-slate-400" : "text-slate-500"}>
          Convert between crypto and traditional currencies
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="fromAmount" className={isDarkMode ? "text-slate-300" : "text-slate-700"}>
              From
            </Label>
            {fromCurrency in balance && (
              <span className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                Balance: {balance[fromCurrency as keyof typeof balance]} {fromCurrency.toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                id="fromAmount"
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className={`${isDarkMode ? "bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400" : "bg-slate-100 border-slate-300 text-slate-900 placeholder:text-slate-500"} focus-visible:ring-indigo-500`}
              />
            </div>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger
                className={`w-[110px] ${isDarkMode ? "bg-slate-700/50 border-slate-600 text-white" : "bg-slate-100 border-slate-300 text-slate-900"} focus:ring-indigo-500`}
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent
                className={
                  isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-900"
                }
              >
                {isTraditional
                  ? traditionalCurrencies.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency.toUpperCase()}
                      </SelectItem>
                    ))
                  : cryptoCurrencies.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency.toUpperCase()}
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>
          </div>
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

        <div className="space-y-2">
          <Label htmlFor="toAmount" className={isDarkMode ? "text-slate-300" : "text-slate-700"}>
            To
          </Label>
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                id="toAmount"
                type="text"
                value={toAmount}
                readOnly
                className={`${isDarkMode ? "bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400" : "bg-slate-100 border-slate-300 text-slate-900 placeholder:text-slate-500"} focus-visible:ring-indigo-500`}
              />
            </div>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger
                className={`w-[110px] ${isDarkMode ? "bg-slate-700/50 border-slate-600 text-white" : "bg-slate-100 border-slate-300 text-slate-900"} focus:ring-indigo-500`}
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent
                className={
                  isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-900"
                }
              >
                {!isTraditional
                  ? traditionalCurrencies.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency.toUpperCase()}
                      </SelectItem>
                    ))
                  : cryptoCurrencies.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency.toUpperCase()}
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className={`${isDarkMode ? "bg-slate-700/30" : "bg-slate-100"} rounded-lg p-3`}>
          <div className="flex items-center justify-between text-xs">
            <span className={isDarkMode ? "text-slate-400" : "text-slate-500"}>Exchange Rate</span>
            <span className={isDarkMode ? "text-slate-300" : "text-slate-700"}>
              1 {fromCurrency.toUpperCase()} ≈ {(convertCurrency("1", fromCurrency, toCurrency), toAmount)}{" "}
              {toCurrency.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs mt-2">
            <span className={isDarkMode ? "text-slate-400" : "text-slate-500"}>Network Fee</span>
            <span className={isDarkMode ? "text-slate-300" : "text-slate-700"}>~0.001 MATIC</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0"
          onClick={handleConvert}
          disabled={isConverting}
        >
          {isConverting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Converting...
            </>
          ) : (
            "Convert Currency"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
