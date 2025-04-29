// app/layout-wrapper.tsx
"use client"; // VERY IMPORTANT!

import { Sidebar } from "@/components/sidebar";
import { WalletProvider } from "@/components/wallet-context";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      <div className="flex flex-1 min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </WalletProvider>
  );
}
