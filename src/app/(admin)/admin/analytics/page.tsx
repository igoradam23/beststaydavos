"use client"

import { TrendingUp, TrendingDown, DollarSign, Users, Home, Calendar, ArrowUpRight, ArrowDownRight, BarChart3, PieChart, Activity, Globe, Mail, Phone, MessageCircle, Target } from "lucide-react"

// Mock data
const stats = {
  revenue: {
    current: 245000,
    previous: 198000,
    change: 23.7,
  },
  bookings: {
    current: 18,
    previous: 14,
    change: 28.6,
  },
  occupancy: {
    current: 78,
    previous: 65,
    change: 20,
  },
  avgBookingValue: {
    current: 13611,
    previous: 14143,
    change: -3.8,
  },
}

const monthlyRevenue = [
  { month: "Sep", revenue: 45000, target: 40000 },
  { month: "Oct", revenue: 62000, target: 55000 },
  { month: "Nov", revenue: 78000, target: 70000 },
  { month: "Dec", revenue: 95000, target: 90000 },
  { month: "Jan", revenue: 245000, target: 200000 },
]

const topProperties = [
  { name: "Alpine Luxury Chalet", bookings: 5, revenue: 92500, occupancy: 92 },
  { name: "Executive Penthouse", bookings: 4, revenue: 96000, occupancy: 88 },
  { name: "Congress Center Suite", bookings: 6, revenue: 55200, occupancy: 75 },
  { name: "Mountain View Residence", bookings: 3, revenue: 38400, occupancy: 68 },
]

const bookingsBySource = [
  { source: "Website", count: 12, percentage: 48, icon: Globe },
  { source: "Email", count: 8, percentage: 32, icon: Mail },
  { source: "WhatsApp", count: 4, percentage: 16, icon: MessageCircle },
  { source: "Phone", count: 1, percentage: 4, icon: Phone },
]

const conversionFunnel = [
  { stage: "Requests Received", count: 45, percentage: 100 },
  { stage: "Offers Sent", count: 32, percentage: 71 },
  { stage: "Offers Viewed", count: 28, percentage: 62 },
  { stage: "Offers Accepted", count: 18, percentage: 40 },
  { stage: "Bookings Confirmed", count: 15, percentage: 33 },
]

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export default function AnalyticsPage() {
  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue))

  return (
    <div className="space-y-12 animate-fade-in">

      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6">
        <div>
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--subtle-foreground)] mb-3 block">
            Business Intelligence
          </span>
          <h1 className="text-4xl font-light tracking-tight text-[var(--foreground)]">Analytics</h1>
          <p className="text-[var(--subtle-foreground)] text-sm mt-2">Performance metrics and insights for WEF 2026</p>
        </div>
        <div className="flex items-center gap-3">
          {["7D", "30D", "90D", "YTD"].map((period, i) => (
            <button
              key={period}
              className={`px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all ${
                i === 1
                  ? "bg-[var(--foreground)] text-[var(--background)]"
                  : "text-[var(--subtle-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--subtle)]"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Revenue", value: stats.revenue.current, change: stats.revenue.change, icon: DollarSign, format: "currency" },
          { label: "Bookings", value: stats.bookings.current, change: stats.bookings.change, icon: Calendar, format: "number" },
          { label: "Occupancy", value: stats.occupancy.current, change: stats.occupancy.change, icon: Home, format: "percent" },
          { label: "Avg. Value", value: stats.avgBookingValue.current, change: stats.avgBookingValue.change, icon: TrendingUp, format: "currency" },
        ].map((metric, i) => (
          <div key={i} className="analytics-card p-6 group">
            <div className="flex items-start justify-between mb-6">
              <div className="p-3 bg-[var(--subtle)] border border-[var(--border)] group-hover:border-gold/30 transition-colors">
                <metric.icon className="w-5 h-5 text-[var(--subtle-foreground)] group-hover:text-gold transition-colors" />
              </div>
              <div className={`flex items-center gap-1 text-[11px] font-bold ${
                metric.change >= 0 ? "text-emerald-500" : "text-rose-500"
              }`}>
                {metric.change >= 0 ? (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5" />
                )}
                {metric.change >= 0 ? "+" : ""}{metric.change}%
              </div>
            </div>
            <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--subtle-foreground)] mb-1">
              {metric.label}
            </div>
            <div className="text-3xl font-light text-[var(--foreground)] tracking-tight">
              {metric.format === "currency" ? formatCurrency(metric.value) :
               metric.format === "percent" ? `${metric.value}%` : metric.value}
            </div>
            <div className="text-[10px] text-[var(--subtle-foreground)] mt-2">vs last period</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Revenue Chart */}
        <div className="analytics-card p-6">
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-[var(--subtle)] border border-[var(--border)]">
                  <BarChart3 className="w-4 h-4 text-[var(--subtle-foreground)]" />
                </div>
                <h3 className="text-lg font-light text-[var(--foreground)]">Revenue Trend</h3>
              </div>
              <p className="text-[11px] text-[var(--subtle-foreground)]">Monthly revenue vs target</p>
            </div>
            <div className="flex items-center gap-4 text-[10px]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gold rounded-sm" />
                <span className="text-[var(--subtle-foreground)]">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[var(--subtle-foreground)] opacity-30 rounded-sm" />
                <span className="text-[var(--subtle-foreground)]">Target</span>
              </div>
            </div>
          </div>

          <div className="h-52 flex items-end gap-3">
            {monthlyRevenue.map((item, index) => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full relative" style={{ height: `${(item.revenue / maxRevenue) * 180}px` }}>
                  {/* Target indicator */}
                  <div
                    className="absolute w-full border-t-2 border-dashed border-[var(--subtle-foreground)] opacity-30"
                    style={{ bottom: `${(item.target / item.revenue) * 100}%` }}
                  />
                  {/* Actual bar */}
                  <div
                    className={`absolute bottom-0 w-full rounded-t transition-all duration-500 ${
                      index === monthlyRevenue.length - 1 ? "bg-gold" : "bg-[var(--subtle-foreground)] opacity-20"
                    }`}
                    style={{ height: "100%" }}
                  />
                </div>
                <div className="text-center">
                  <span className="text-[10px] font-bold text-[var(--subtle-foreground)]">{item.month}</span>
                  {index === monthlyRevenue.length - 1 && (
                    <div className="text-[9px] font-bold text-gold mt-0.5">
                      {formatCurrency(item.revenue)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="analytics-card p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-[var(--subtle)] border border-[var(--border)]">
              <Target className="w-4 h-4 text-[var(--subtle-foreground)]" />
            </div>
            <div>
              <h3 className="text-lg font-light text-[var(--foreground)]">Conversion Funnel</h3>
              <p className="text-[11px] text-[var(--subtle-foreground)]">Request to booking journey</p>
            </div>
          </div>

          <div className="space-y-5">
            {conversionFunnel.map((stage, index) => (
              <div key={stage.stage} className="group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-medium text-[var(--foreground)]">{stage.stage}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-[var(--foreground)]">{stage.count}</span>
                    <span className="text-[10px] text-[var(--subtle-foreground)] w-10 text-right">{stage.percentage}%</span>
                  </div>
                </div>
                <div className="h-2 bg-[var(--subtle)] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      index === 0 ? "bg-[var(--foreground)] opacity-20" :
                      index === conversionFunnel.length - 1 ? "bg-gold" :
                      "bg-[var(--foreground)] opacity-15"
                    }`}
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
                {index < conversionFunnel.length - 1 && (
                  <div className="text-[9px] text-[var(--subtle-foreground)] mt-1.5">
                    {Math.round((conversionFunnel[index + 1].count / stage.count) * 100)}% conversion
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Top Properties */}
        <div className="analytics-card p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--subtle)] border border-[var(--border)]">
                <Home className="w-4 h-4 text-[var(--subtle-foreground)]" />
              </div>
              <div>
                <h3 className="text-lg font-light text-[var(--foreground)]">Top Properties</h3>
                <p className="text-[11px] text-[var(--subtle-foreground)]">By revenue this period</p>
              </div>
            </div>
            <button className="text-[10px] font-bold tracking-wider uppercase text-[var(--subtle-foreground)] hover:text-[var(--foreground)] transition-colors">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {topProperties.map((property, index) => (
              <div key={property.name} className="flex items-center gap-4 p-4 bg-[var(--subtle)] group hover:bg-[var(--border)] transition-colors">
                <div className="w-8 h-8 flex items-center justify-center text-[11px] font-bold text-[var(--subtle-foreground)] bg-[var(--background)] border border-[var(--border)]">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-medium text-[var(--foreground)] truncate">{property.name}</div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-[var(--subtle-foreground)]">{property.bookings} bookings</span>
                    <span className="text-[var(--border)]">·</span>
                    <span className="text-[10px] text-[var(--subtle-foreground)]">{property.occupancy}% occ.</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gold">{formatCurrency(property.revenue)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bookings by Source */}
        <div className="analytics-card p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-[var(--subtle)] border border-[var(--border)]">
              <PieChart className="w-4 h-4 text-[var(--subtle-foreground)]" />
            </div>
            <div>
              <h3 className="text-lg font-light text-[var(--foreground)]">Booking Sources</h3>
              <p className="text-[11px] text-[var(--subtle-foreground)]">Where inquiries originate</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {bookingsBySource.map((source) => (
              <div key={source.source} className="p-4 bg-[var(--subtle)] group hover:bg-[var(--border)] transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[var(--background)] border border-[var(--border)]">
                    <source.icon className="w-3.5 h-3.5 text-[var(--subtle-foreground)]" />
                  </div>
                  <span className="text-[11px] font-medium text-[var(--foreground)]">{source.source}</span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-light text-[var(--foreground)]">{source.count}</div>
                    <div className="text-[10px] text-[var(--subtle-foreground)]">inquiries</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gold">{source.percentage}%</div>
                  </div>
                </div>
                <div className="mt-3 h-1.5 bg-[var(--background)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold rounded-full transition-all duration-500"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="analytics-card p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--subtle)] border border-[var(--border)]">
              <Activity className="w-4 h-4 text-[var(--subtle-foreground)]" />
            </div>
            <div>
              <h3 className="text-lg font-light text-[var(--foreground)]">Weekly Activity</h3>
              <p className="text-[11px] text-[var(--subtle-foreground)]">Booking requests by day</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-3">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
            const activity = [3, 5, 4, 7, 8, 2, 1][i]
            const maxActivity = 8
            return (
              <div key={day} className="text-center">
                <div className="h-32 flex items-end justify-center mb-2">
                  <div
                    className={`w-full max-w-[40px] rounded-t transition-all duration-500 ${
                      activity === maxActivity ? "bg-gold" : "bg-[var(--foreground)] opacity-15"
                    }`}
                    style={{ height: `${(activity / maxActivity) * 100}%` }}
                  />
                </div>
                <div className="text-[10px] font-bold text-[var(--subtle-foreground)]">{day}</div>
                <div className="text-[11px] font-medium text-[var(--foreground)] mt-1">{activity}</div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
