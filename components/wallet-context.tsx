"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// Define the WalletContext type
interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

// Create the WalletContext
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Create the Provider
export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    // Try to load saved wallet data from localStorage
    const storedWallet = localStorage.getItem("finx_wallet_data");
    if (storedWallet) {
      try {
        const { address } = JSON.parse(storedWallet);
        if (typeof address === "string") {
          setWalletAddress(address);
          setIsConnected(true);
        }
      } catch (error) {
        console.error("Failed to parse stored wallet data:", error);
      }
    }
  }, []);

  // Connect wallet (generate random address for demo)
  const connectWallet = () => {
    const randomAddress = generateRandomAddress();
    const walletType = "demo"; // You can set actual type later if needed

    if (typeof randomAddress === "string" && typeof walletType === "string") {
      localStorage.setItem(
        "finx_wallet_data",
        JSON.stringify({
          address: randomAddress,
          type: walletType,
        })
      );

      setWalletAddress(randomAddress);
      setIsConnected(true);
    } else {
      console.error("Invalid wallet data:", { randomAddress, walletType });
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    localStorage.removeItem("finx_wallet_data");
    setWalletAddress(null);
    setIsConnected(false);
  };

  return (
    <WalletContext.Provider value={{ isConnected, walletAddress, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

// Hook to use WalletContext easily
export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}

// Utility function to generate random wallet address
function generateRandomAddress() {
  const chars = "abcdef0123456789";
  let address = "0x";
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
}
