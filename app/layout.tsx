// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import { LayoutWrapper } from "./layout-wrapper";  // new import

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FinX Ultimate",
  description: "FinX Ultimate Crypto Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-[#0e0e1b] text-white min-h-screen flex">
        <LayoutWrapper>{children}</LayoutWrapper> {/* new wrapper */}
      </body>
    </html>
  );
}
