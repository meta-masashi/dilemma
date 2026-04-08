"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  User,
  CreditCard,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navItems = [
  { href: "/dashboard", label: "ダッシュボード", icon: LayoutDashboard },
  { href: "/scenarios", label: "シナリオ", icon: BookOpen },
  { href: "/profile", label: "プロフィール", icon: User },
  { href: "/billing", label: "クレジット", icon: CreditCard },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-60 flex-col border-r border-border-muted bg-bg-primary">
      <div className="flex items-center gap-2 px-4 py-5">
        <span className="text-lg font-bold text-accent-500">DILEMMA</span>
      </div>

      <nav className="flex-1 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-l-2 border-accent-500 bg-bg-hover text-text-primary"
                  : "text-text-secondary hover:bg-bg-hover hover:text-text-primary"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border-muted px-4 py-3">
        <ThemeToggle />
      </div>
    </aside>
  );
}
