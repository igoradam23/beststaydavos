"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Home,
  CalendarDays,
  Users,
  FileText,
  MessageSquare,
  Settings,
  BarChart3,
  LogOut,
  ShieldCheck,
  Truck
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Unified Inbox", href: "/admin/messages", icon: MessageSquare, badge: "2" },
  { name: "Requests", href: "/admin/bookings", icon: CalendarDays },
  { name: "Properties", href: "/admin/properties", icon: Home },
  { name: "Providers", href: "/admin/providers", icon: Truck, badge: "1" },
  { name: "Customer CRM", href: "/admin/customers", icon: Users },
  { name: "Offer Studio", href: "/admin/offers", icon: FileText },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-72 bg-[var(--sidebar-bg)] border-r border-[var(--sidebar-border)] lg:block overflow-hidden theme-transition">
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--subtle)] blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="relative h-full flex flex-col p-8">
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-16">
          <div className="w-8 h-8 bg-[var(--subtle)] border border-[var(--sidebar-border)] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-[var(--sidebar-foreground)] stroke-[1.5px]" />
          </div>
          <span className="text-sm font-light tracking-[0.4em] uppercase text-[var(--sidebar-foreground)]">
            Command<span className="font-bold">Center</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-6">
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--sidebar-muted)] mb-6">
            Main Navigation
          </div>
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center justify-between px-4 py-3 text-[11px] font-bold tracking-widest uppercase transition-all duration-300",
                    isActive
                      ? "bg-[var(--sidebar-active-bg)] text-[var(--sidebar-active-fg)]"
                      : "text-[var(--sidebar-muted)] hover:text-[var(--sidebar-foreground)] hover:bg-[var(--subtle)]"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <item.icon className={cn(
                      "h-4 w-4 stroke-[1.5px]",
                      isActive ? "text-[var(--sidebar-active-fg)]" : "text-[var(--sidebar-muted)] group-hover:text-[var(--sidebar-foreground)]"
                    )} />
                    {item.name}
                  </div>
                  {item.badge && !isActive && (
                    <span className="text-[9px] bg-[var(--subtle)] px-2 py-0.5 rounded-none text-[var(--sidebar-foreground)] font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-[var(--sidebar-border)] space-y-1">
          <Link
            href="/admin/settings"
            className="flex items-center gap-4 px-4 py-3 text-[11px] font-bold tracking-widest uppercase text-[var(--sidebar-muted)] hover:text-[var(--sidebar-foreground)] transition-all"
          >
            <Settings className="h-4 w-4 stroke-[1.5px]" />
            Settings
          </Link>
          <Link
            href="/"
            className="flex items-center gap-4 px-4 py-3 text-[11px] font-bold tracking-widest uppercase text-[var(--sidebar-muted)] hover:text-[var(--sidebar-foreground)] transition-all"
          >
            <LogOut className="h-4 w-4 stroke-[1.5px]" />
            Exit Command
          </Link>
        </div>
      </div>
    </aside>
  )
}
