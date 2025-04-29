"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownLeft, ArrowUpRight, ExternalLink, Filter, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface TransactionHistoryProps {
  isDarkMode?: boolean
}

export function TransactionHistory({ isDarkMode = true }: TransactionHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string[]>(["completed", "pending"])
  const [typeFilter, setTypeFilter] = useState<string[]>(["incoming", "outgoing"])
  const { toast } = useToast()

  const transactions = [
    {
      id: "tx1",
      type: "incoming",
      amount: "50.00",
      token: "USDC",
      from: "0x1a2b3c4d5e6f7g8h9i0j",
      date: "Today, 10:45 AM",
      status: "completed",
    },
    {
      id: "tx2",
      type: "outgoing",
      amount: "25.50",
      token: "USDC",
      to: "0x9s8r7q6p5o4n3m2l1k0j",
      date: "Yesterday, 3:20 PM",
      status: "completed",
    },
    {
      id: "tx3",
      type: "incoming",
      amount: "0.25",
      token: "MATIC",
      from: "0x2c3d4e5f6g7h8i9j0k1l",
      date: "Yesterday, 11:30 AM",
      status: "completed",
    },
    {
      id: "tx4",
      type: "outgoing",
      amount: "100.00",
      token: "USDC",
      to: "0x8h7g6f5e4d3c2b1a0z9y",
      date: "Jun 22, 2023, 9:15 AM",
      status: "pending",
    },
    {
      id: "tx5",
      type: "incoming",
      amount: "0.005",
      token: "BTC",
      from: "0x3d4e5f6g7h8i9j0k1l2m",
      date: "Jun 21, 2023, 2:45 PM",
      status: "completed",
    },
    {
      id: "tx6",
      type: "outgoing",
      amount: "0.08",
      token: "ETH",
      to: "0x7g6f5e4d3c2b1a0z9y8x",
      date: "Jun 20, 2023, 11:10 AM",
      status: "failed",
    },
  ]

  const filteredTransactions = transactions.filter((tx) => {
    // Filter by search query
    const matchesSearch =
      searchQuery === "" ||
      tx.token.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.amount.includes(searchQuery) ||
      (tx.from && tx.from.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (tx.to && tx.to.toLowerCase().includes(searchQuery.toLowerCase()))

    // Filter by status
    const matchesStatus = statusFilter.includes(tx.status)

    // Filter by type
    const matchesType = typeFilter.includes(tx.type)

    return matchesSearch && matchesStatus && matchesType
  })

  const handleViewTransaction = (txId: string) => {
    toast({
      title: "Transaction Details",
      description: `Viewing details for transaction ${txId}`,
    })
  }

  return (
    <Card
      className={`${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-200"} backdrop-blur-sm`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={isDarkMode ? "text-white" : "text-slate-900"}>Recent Transactions</CardTitle>
          <Badge
            variant="outline"
            className={`text-xs ${isDarkMode ? "bg-slate-700/50 text-slate-300 hover:bg-slate-700 border-slate-600" : "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300"}`}
          >
            View All
          </Badge>
        </div>
        <CardDescription className={isDarkMode ? "text-slate-400" : "text-slate-500"}>
          Your latest financial activities
        </CardDescription>

        <div className="flex items-center gap-2 mt-2">
          <div className="relative flex-1">
            <Search
              className={`absolute left-2.5 top-2.5 h-4 w-4 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
            />
            <Input
              type="search"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-8 ${isDarkMode ? "bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400" : "bg-slate-100 border-slate-300 text-slate-900 placeholder:text-slate-500"} focus-visible:ring-indigo-500`}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={
                  isDarkMode
                    ? "border-slate-600 bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white"
                    : "border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
                }
              >
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className={
                isDarkMode ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-white border-slate-200 text-slate-900"
              }
            >
              <DropdownMenuLabel>Filter Transactions</DropdownMenuLabel>
              <DropdownMenuSeparator className={isDarkMode ? "bg-slate-700" : "bg-slate-200"} />
              <DropdownMenuLabel className="text-xs font-normal">Status</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("completed")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setStatusFilter([...statusFilter, "completed"])
                  } else {
                    setStatusFilter(statusFilter.filter((s) => s !== "completed"))
                  }
                }}
              >
                Completed
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("pending")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setStatusFilter([...statusFilter, "pending"])
                  } else {
                    setStatusFilter(statusFilter.filter((s) => s !== "pending"))
                  }
                }}
              >
                Pending
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("failed")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setStatusFilter([...statusFilter, "failed"])
                  } else {
                    setStatusFilter(statusFilter.filter((s) => s !== "failed"))
                  }
                }}
              >
                Failed
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator className={isDarkMode ? "bg-slate-700" : "bg-slate-200"} />
              <DropdownMenuLabel className="text-xs font-normal">Type</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={typeFilter.includes("incoming")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setTypeFilter([...typeFilter, "incoming"])
                  } else {
                    setTypeFilter(typeFilter.filter((t) => t !== "incoming"))
                  }
                }}
              >
                Incoming
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={typeFilter.includes("outgoing")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setTypeFilter([...typeFilter, "outgoing"])
                  } else {
                    setTypeFilter(typeFilter.filter((t) => t !== "outgoing"))
                  }
                }}
              >
                Outgoing
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredTransactions.length === 0 ? (
            <div className={`text-center py-8 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
              No transactions found matching your filters
            </div>
          ) : (
            filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  isDarkMode ? "bg-slate-700/30 hover:bg-slate-700/50" : "bg-slate-100 hover:bg-slate-200"
                } transition-colors cursor-pointer`}
                onClick={() => handleViewTransaction(tx.id)}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`rounded-full p-2 ${
                      tx.type === "incoming"
                        ? "bg-green-500/20"
                        : tx.status === "failed"
                          ? "bg-red-500/20"
                          : "bg-red-500/20"
                    }`}
                  >
                    {tx.type === "incoming" ? (
                      <ArrowDownLeft
                        className={`h-4 w-4 ${tx.type === "incoming" ? "text-green-500" : "text-red-500"}`}
                      />
                    ) : (
                      <ArrowUpRight className={`h-4 w-4 ${tx.status === "failed" ? "text-red-500" : "text-red-500"}`} />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                        {tx.type === "incoming" ? "Received" : "Sent"} {tx.amount} {tx.token}
                      </p>
                      <div
                        className={`ml-2 w-1.5 h-1.5 rounded-full ${
                          tx.status === "completed"
                            ? "bg-green-500"
                            : tx.status === "pending"
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }`}
                      ></div>
                    </div>
                    <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                      {tx.type === "incoming" ? "From" : "To"}: {tx.type === "incoming" ? tx.from : tx.to}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>{tx.date}</div>
                  <div className={`flex items-center text-xs ${isDarkMode ? "text-slate-500" : "text-slate-600"} mt-1`}>
                    <ExternalLink className="h-3 w-3 mr-1" />
                    <span>View</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
