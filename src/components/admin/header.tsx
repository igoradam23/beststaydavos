"use client"

import { Bell, Search, User, Sun, Moon } from "lucide-react"
import { useState, useEffect } from "react"

interface AdminHeaderProps {
  user: {
    email: string
    user_metadata: {
      full_name: string
    }
  }
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Set initial theme immediately
    const savedTheme = localStorage.getItem("admin-theme") as "light" | "dark" | null
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light")
    setTheme(initialTheme)
    document.documentElement.setAttribute("data-theme", initialTheme)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-theme", theme)
      localStorage.setItem("admin-theme", theme)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <header className="h-24 flex items-center justify-between px-8 border-b border-[var(--border)] glass sticky top-0 z-40 theme-transition">
      <div className="flex items-center gap-8 flex-1">
        <div className="relative w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--subtle-foreground)] group-focus-within:text-[var(--foreground)] transition-colors" />
          <input
            type="text"
            placeholder="Search bookings, properties, or VIPs..."
            className="w-full bg-[var(--subtle)] border border-[var(--border)] py-3 pl-12 pr-4 text-[11px] font-bold tracking-widest uppercase placeholder:text-[var(--subtle-foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20 transition-all text-[var(--foreground)]"
          />
        </div>
      </div>

      <div className="flex items-center gap-10">
        <button
          onClick={toggleTheme}
          className="text-[var(--subtle-foreground)] hover:text-[var(--foreground)] transition-colors p-2 hover:bg-[var(--subtle)] rounded-lg"
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? <Moon className="h-5 w-5 stroke-[1.5px]" /> : <Sun className="h-5 w-5 stroke-[1.5px]" />}
        </button>

        <div className="flex items-center gap-6">
          <button className="relative text-[var(--subtle-foreground)] hover:text-[var(--foreground)] transition-colors group">
            <Bell className="h-5 w-5 stroke-[1.5px]" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[var(--foreground)] group-hover:animate-ping" />
          </button>
        </div>

        <div className="flex items-center gap-4 border-l border-[var(--border)] pl-10">
          <div className="text-right">
            <div className="text-[11px] font-bold tracking-widest uppercase text-[var(--foreground)] leading-none mb-1">
              {user.user_metadata.full_name || "Admin Concierge"}
            </div>
            <div className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] leading-none">
              Head of Operations
            </div>
          </div>
          <div className="w-10 h-10 bg-[var(--subtle)] border border-[var(--border)] flex items-center justify-center overflow-hidden">
            <User className="w-5 h-5 text-[var(--subtle-foreground)]" />
          </div>
        </div>
      </div>
    </header>
  )
}
