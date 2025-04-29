"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Send, QrCode, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface PaymentSectionProps {
  balance: string
  isDarkMode?: boolean
}

export function PaymentSection({ balance, isDarkMode = true }: PaymentSectionProps) {
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const handleSendPayment = () => {
    if (!recipient || !amount) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    toast({
      title: "Processing payment",
      description: "Your payment is being processed",
    })

    // Simulate payment processing delay
    setTimeout(() => {
      setIsProcessing(false)
      setRecipient("")
      setAmount("")
      setNote("")

      toast({
        title: "Payment sent",
        description: `Successfully sent ${amount} USDC to ${recipient}`,
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
          <CardTitle className={isDarkMode ? "text-white" : "text-slate-900"}>Payments</CardTitle>
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
            <CreditCard className="h-4 w-4 text-white" />
          </div>
        </div>
        <CardDescription className={isDarkMode ? "text-slate-400" : "text-slate-500"}>
          Send and receive crypto payments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="send">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="send">Send</TabsTrigger>
            <TabsTrigger value="receive">Receive</TabsTrigger>
          </TabsList>
          <TabsContent value="send">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="recipient" className={isDarkMode ? "text-slate-300" : "text-slate-700"}>
                    Recipient Address
                  </Label>
                </div>
                <Input
                  id="recipient"
                  placeholder="0x..."
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className={`${isDarkMode ? "bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400" : "bg-slate-100 border-slate-300 text-slate-900 placeholder:text-slate-500"} focus-visible:ring-indigo-500`}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="amount" className={isDarkMode ? "text-slate-300" : "text-slate-700"}>
                    Amount (USDC)
                  </Label>
                  <span className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Balance: ${balance}
                  </span>
                </div>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`${isDarkMode ? "bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400" : "bg-slate-100 border-slate-300 text-slate-900 placeholder:text-slate-500"} focus-visible:ring-indigo-500`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="note" className={isDarkMode ? "text-slate-300" : "text-slate-700"}>
                  Note (Optional)
                </Label>
                <Input
                  id="note"
                  placeholder="What's this for?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className={`${isDarkMode ? "bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400" : "bg-slate-100 border-slate-300 text-slate-900 placeholder:text-slate-500"} focus-visible:ring-indigo-500`}
                />
              </div>

              <div className={`rounded-lg ${isDarkMode ? "bg-slate-700/30" : "bg-slate-100"} p-3`}>
                <div className="flex items-center justify-between text-xs">
                  <span className={isDarkMode ? "text-slate-400" : "text-slate-500"}>Network Fee</span>
                  <span className={isDarkMode ? "text-slate-300" : "text-slate-700"}>~0.001 MATIC</span>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="receive">
            <div className="flex flex-col items-center justify-center p-4">
              <div
                className={`w-48 h-48 ${isDarkMode ? "bg-white" : "bg-slate-100"} rounded-lg flex items-center justify-center mb-4`}
              >
                <QrCode className="h-32 w-32 text-slate-900" />
              </div>
              <p className={`text-sm font-medium mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                Your Wallet Address
              </p>
              <p className={`text-xs mb-4 ${isDarkMode ? "text-slate-400" : "text-slate-600"} text-center`}>
                0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t
              </p>
              <Button
                variant="outline"
                size="sm"
                className={
                  isDarkMode
                    ? "border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                    : "border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }
              >
                Copy Address
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0"
          onClick={handleSendPayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Payment
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
