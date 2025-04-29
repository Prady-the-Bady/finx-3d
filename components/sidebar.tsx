// components/Sidebar.tsx
"use client";

import { Home, Wallet, Send, Repeat, Banknote, LineChart, Settings, LogOut } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-gray-300 flex flex-col h-full border-r border-gray-800">
      {/* Logo */}
      <div className="p-6 text-purple-500 font-bold text-2xl">
        FinX Ultimate
      </div>

      {/* Connection Status */}
      <div className="px-6 pb-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-xs truncate">Connected to Polygon</span>
        </div>
      </div>

      {/* Core Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        <div className="text-xs text-gray-500 uppercase tracking-wide">Core</div>
        <Link href="/" className="flex items-center p-2 rounded-lg hover:bg-gray-800">
          <Home className="w-5 h-5 mr-3" /> Dashboard
        </Link>
        <Link href="/asset-bridge" className="flex items-center p-2 rounded-lg hover:bg-gray-800">
          <Repeat className="w-5 h-5 mr-3" /> Asset Bridge
        </Link>
        <Link href="/ai-advisor" className="flex items-center p-2 rounded-lg hover:bg-gray-800">
          <Wallet className="w-5 h-5 mr-3" /> AI Advisor
        </Link>
        <Link href="/payments" className="flex items-center p-2 rounded-lg hover:bg-gray-800">
          <Send className="w-5 h-5 mr-3" /> Payments
        </Link>

        {/* Finance */}
        <div className="text-xs text-gray-500 uppercase tracking-wide mt-6">Finance</div>
        <Link href="/lending-borrowing" className="flex items-center p-2 rounded-lg hover:bg-gray-800">
          <Banknote className="w-5 h-5 mr-3" /> Lending/Borrowing
        </Link>
        <Link href="/nft-marketplace" className="flex items-center p-2 rounded-lg hover:bg-gray-800">
          <Wallet className="w-5 h-5 mr-3" /> NFT Marketplace
        </Link>
        <Link href="/insurance" className="flex items-center p-2 rounded-lg hover:bg-gray-800">
          <Wallet className="w-5 h-5 mr-3" /> Insurance
        </Link>
        <Link href="/governance" className="flex items-center p-2 rounded-lg hover:bg-gray-800">
          <Wallet className="w-5 h-5 mr-3" /> Governance
        </Link>
        <Link href="/analytics" className="flex items-center p-2 rounded-lg hover:bg-gray-800">
          <LineChart className="w-5 h-5 mr-3" /> Analytics
        </Link>
      </nav>

      {/* Bottom settings */}
      <div className="px-6 py-4 border-t border-gray-800">
        <Link href="/settings" className="flex items-center space-x-3">
          <Settings className="w-5 h-5" /> <span>Settings</span>
        </Link>
        <Link href="/logout" className="flex items-center space-x-3 mt-4 text-red-500">
          <LogOut className="w-5 h-5" /> <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}
