"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { WalletProvider, useWallet } from "@/components/wallet-context";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
}

function PageLayoutContent({ children, title }: PageLayoutProps) {
  const { isConnected, walletAddress, connectWallet, disconnectWallet } = useWallet();
  const [isDarkMode] = useState(true); // You can wire up toggling later

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <Sidebar isDarkMode={isDarkMode} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          isConnected={isConnected}
          walletAddress={walletAddress}
          onConnect={connectWallet}
          onDisconnect={disconnectWallet}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => {}}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

export function PageLayout(props: PageLayoutProps) {
  return (
    <WalletProvider>
      <PageLayoutContent {...props} />
    </WalletProvider>
  );
}
