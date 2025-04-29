"use client";

import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    async function connectWallet() {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);
      }
    }
    connectWallet();
  }, []);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-white mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Wallet Card */}
        <div className="bg-[#1b1b2f] rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-purple-400 mb-2">Wallet Address</h2>
          <p className="break-words text-gray-300">
            {walletAddress ? walletAddress : "🔌 Connect Wallet to view"}
          </p>
        </div>

        {/* AI Tip Card */}
        <div className="bg-[#1b1b2f] rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-purple-400 mb-2">AI Market Tip</h2>
          <p className="text-gray-300">
            📈 "Diversify investments between stablecoins and emerging DeFi projects."
          </p>
        </div>

        {/* Balance / Portfolio */}
        <div className="bg-[#1b1b2f] rounded-xl p-6 shadow-lg col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold text-purple-400 mb-2">Portfolio Overview</h2>
          <p className="text-gray-300">
            💰 Current Balance: <strong>0.00 MATIC</strong> (Polygon Network)
          </p>
          <p className="text-gray-400 mt-2 text-sm">
            *(Actual balance fetch coming soon with live Web3 connection!)*
          </p>
        </div>
      </div>
    </div>
  );
}
