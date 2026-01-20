"use client"

import Link from "next/link"
import {
  MessageSquare,
  TrendingUp,
  Shield,
  ArrowUpRight,
  Calendar,
  Users,
  Banknote,
  BarChart3
} from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-12 animate-fade-in">

      {/* Page Header */}
      <div>
        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--subtle-foreground)] mb-3 block">
          Command Center
        </span>
        <h1 className="text-4xl font-light tracking-tight text-[var(--foreground)]">Dashboard</h1>
        <p className="text-[var(--subtle-foreground)] text-sm mt-2">WEF 2026 Operations Overview</p>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Projected Revenue", value: "€1.42M", trend: "+12.5%", icon: Banknote, positive: true },
          { label: "WEF Occupancy", value: "68%", trend: "Critical Week", icon: Calendar, positive: false, highlight: true },
          { label: "Active Inquiries", value: "24", trend: "3 New Today", icon: Users, positive: true },
          { label: "Offer Conversion", value: "42%", trend: "+5% vs 2025", icon: BarChart3, positive: true },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 group">
            <div className="flex items-start justify-between mb-6">
              <div className="p-3 bg-[var(--subtle)] border border-[var(--border)] group-hover:border-gold/30 transition-colors">
                <stat.icon className="w-5 h-5 text-[var(--subtle-foreground)] group-hover:text-gold transition-colors" />
              </div>
              {stat.positive ? (
                <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> {stat.trend}
                </span>
              ) : (
                <span className={`text-[10px] font-bold ${stat.highlight ? 'text-amber-500' : 'text-[var(--subtle-foreground)]'}`}>
                  {stat.trend}
                </span>
              )}
            </div>
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--subtle-foreground)] block mb-1">
              {stat.label}
            </span>
            <span className={`text-3xl font-light tracking-tight ${stat.highlight ? 'text-amber-500' : 'text-[var(--foreground)]'}`}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* WEF Timeline Visualization */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-lg font-light text-[var(--foreground)] mb-1">WEF 2026 Timeline</h2>
              <p className="text-[11px] text-[var(--subtle-foreground)]">Occupancy overview for congress week</p>
            </div>
            <Link
              href="/admin/bookings"
              className="text-[10px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] hover:text-[var(--foreground)] transition-all flex items-center gap-2"
            >
              Manage <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex justify-between mb-6">
            {["Jan 18", "Jan 19", "Jan 20", "Jan 21", "Jan 22", "Jan 23", "Jan 24"].map((date, i) => {
              const heights = [45, 92, 78, 65, 88, 72, 55]
              const isWef = i >= 1 && i <= 5
              return (
                <div key={i} className="text-center flex-1">
                  <div className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] mb-3">{date}</div>
                  <div className="h-32 flex items-end justify-center">
                    <div
                      className={`w-6 rounded-t transition-all duration-500 ${
                        isWef ? 'bg-gold' : 'bg-[var(--foreground)] opacity-15'
                      }`}
                      style={{ height: `${heights[i]}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex gap-6 pt-4 border-t border-[var(--border)]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gold rounded-sm" />
              <span className="text-[10px] text-[var(--subtle-foreground)]">WEF Period</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[var(--foreground)] opacity-15 rounded-sm" />
              <span className="text-[10px] text-[var(--subtle-foreground)]">Pre/Post Event</span>
            </div>
          </div>
        </div>

        {/* Priority Inquiries */}
        <div className="glass-card p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-light text-[var(--foreground)] mb-1">Active Inquiries</h2>
              <p className="text-[11px] text-[var(--subtle-foreground)]">Attention required</p>
            </div>
            <span className="text-[9px] font-bold tracking-widest bg-gold text-black px-2 py-1">3 NEW</span>
          </div>

          <div className="space-y-3">
            {[
              { name: "Goldman Sachs Delegation", time: "2h ago", status: "Waitlist", type: "WhatsApp" },
              { name: "CEO of TechGlobal", time: "5h ago", status: "Offer Studio", type: "Email" },
              { name: "Sovereign Wealth Fund", time: "1d ago", status: "In Review", type: "WhatsApp" },
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 bg-[var(--subtle)] group cursor-pointer hover:bg-[var(--border)] transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-[11px] font-bold tracking-wider uppercase text-[var(--foreground)]">
                    {item.name}
                  </div>
                  <span className="text-[9px] font-bold tracking-widest uppercase border border-[var(--border)] px-2 py-0.5 text-[var(--subtle-foreground)] group-hover:border-[var(--foreground)] group-hover:text-[var(--foreground)] transition-all">
                    {item.status}
                  </span>
                </div>
                <div className="text-[9px] font-medium text-[var(--subtle-foreground)]">
                  {item.time} · {item.type}
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/admin/messages"
            className="mt-4 block text-center text-[10px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] hover:text-[var(--foreground)] transition-all py-3 border border-[var(--border)] hover:border-[var(--foreground)] hover:border-opacity-30"
          >
            View All Inquiries
          </Link>
        </div>
      </div>

      {/* Operation Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[
          { icon: Shield, label: "Security Protocols", status: "Active & Synced", statusColor: "text-emerald-500" },
          { icon: TrendingUp, label: "Market Demand", status: "High Velocity", statusColor: "text-gold" },
          { icon: MessageSquare, label: "Support Status", status: "System Normal", statusColor: "text-emerald-500" },
        ].map((item, i) => (
          <div key={i} className="glass-card p-5 flex items-center gap-5">
            <div className="p-3 bg-[var(--subtle)] border border-[var(--border)]">
              <item.icon className="w-4 h-4 text-[var(--subtle-foreground)]" />
            </div>
            <div>
              <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--subtle-foreground)] mb-0.5">
                {item.label}
              </div>
              <div className={`text-[11px] font-bold tracking-widest uppercase ${item.statusColor}`}>
                {item.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
