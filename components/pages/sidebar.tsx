"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isDarkMode: boolean;
}

export function Sidebar({ isDarkMode }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", href: "/" },
    { label: "Lending / Borrowing", href: "/lending" },
    { label: "AI Advisor", href: "/advisor" },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen p-6 flex flex-col">
      <div className="text-2xl font-bold text-purple-400 mb-10">
        FinX Ultimate
      </div>

      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "px-4 py-2 rounded-md hover:bg-slate-700 transition",
              pathname === item.href && "bg-slate-800 font-semibold"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-auto text-xs text-slate-500">
        &copy; 2025 FinX. All rights reserved.
      </div>
    </aside>
  );
}
