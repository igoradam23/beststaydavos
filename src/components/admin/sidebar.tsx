"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Mountain, 
  LayoutDashboard, 
  Home, 
  CalendarDays, 
  Users, 
  FileText, 
  MessageSquare, 
  Settings,
  BarChart3
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Properties", href: "/admin/properties", icon: Home },
  { name: "Bookings", href: "/admin/bookings", icon: CalendarDays },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Offers", href: "/admin/offers", icon: FileText },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 bg-charcoal lg:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 px-6 border-b border-white/10">
          <Mountain className="h-8 w-8 text-gold" />
          <span className="text-lg font-semibold text-white">
            BestStay<span className="text-gold">Admin</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/admin" && pathname.startsWith(item.href))
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-gold text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 p-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <span>&larr;</span>
            Back to Website
          </Link>
        </div>
      </div>
    </aside>
  )
}
