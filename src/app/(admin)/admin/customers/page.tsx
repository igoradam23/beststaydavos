"use client"

import { Search, Filter, Star, Clock, Globe } from "lucide-react"

const vips = [
  {
    name: "CEO of TechGlobal",
    company: "TechGlobal Inc.",
    level: "Platinum VIP",
    ltv: "€145k",
    security: "Level 1 (Armored)",
    lastStay: "WEF 2025",
    status: "In Negotiation"
  },
  {
    name: "Sovereign Wealth Director",
    company: "GIC Funds",
    level: "Ultra VIP",
    ltv: "€280k",
    security: "Bespoke (Level 2)",
    lastStay: "WEF 2024",
    status: "Confirmed"
  },
  {
    name: "Goldman Sachs Delegation",
    company: "Goldman Sachs",
    level: "Corporate VIP",
    ltv: "€95k",
    security: "Standard Protocol",
    lastStay: "WEF 2025",
    status: "Lead"
  },
]

export default function CustomersPage() {
  return (
    <div className="space-y-12 animate-fade-in">

      {/* CRM Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6">
        <div>
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--subtle-foreground)] mb-3 block">Relationship Management</span>
          <h1 className="text-4xl font-light tracking-tight text-[var(--foreground)]">VIP Registry</h1>
          <p className="text-[var(--subtle-foreground)] text-sm mt-2">High-value client relationships</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="relative group w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--subtle-foreground)] group-focus-within:text-[var(--foreground)] transition-colors" />
            <input
              type="text"
              placeholder="Search VIPs..."
              className="w-full bg-[var(--subtle)] border border-[var(--border)] py-3.5 pl-12 pr-4 text-[10px] font-bold tracking-widest uppercase placeholder:text-[var(--subtle-foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20 transition-all text-[var(--foreground)]"
            />
          </div>
          <button className="bg-[var(--foreground)] text-[var(--background)] px-8 py-3.5 text-[10px] font-bold tracking-widest uppercase hover:opacity-90 transition-all flex items-center gap-3">
            <Filter className="w-3 h-3" /> Filter Grade
          </button>
        </div>
      </div>

      {/* Stats Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active WEF Leads", value: "24 Executives" },
          { label: "High Net-Worth", value: "€4.2M Asset Value", highlight: true },
          { label: "Security Synced", value: "100% Protocol" },
          { label: "Global Reach", value: "12 Countries" },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6">
            <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block mb-2">{stat.label}</span>
            <span className={`text-xl font-light ${stat.highlight ? 'text-gold' : 'text-[var(--foreground)]'}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* VIP Profiles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {vips.map((vip, i) => (
          <div key={i} className="glass-card group cursor-pointer">
            <div className="p-8 space-y-8">
              {/* Profile Top */}
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[8px] font-bold tracking-widest uppercase bg-[var(--subtle)] text-[var(--subtle-foreground)] px-2 py-0.5 border border-[var(--border)]">{vip.level}</span>
                    <Star className="w-3 h-3 text-gold fill-gold" />
                  </div>
                  <h3 className="text-xl font-light tracking-tight text-[var(--foreground)]">{vip.name}</h3>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)]">{vip.company}</p>
                </div>
                <div className="w-12 h-12 bg-[var(--subtle)] border border-[var(--border)] flex items-center justify-center group-hover:bg-[var(--foreground)] transition-all duration-700">
                  <Globe className="w-5 h-5 text-[var(--subtle-foreground)] group-hover:text-[var(--background)] transition-colors" />
                </div>
              </div>

              {/* Profile Details */}
              <div className="grid grid-cols-2 gap-6 border-t border-[var(--border)] pt-8">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">Lifetime Valuation</span>
                  <p className="text-[13px] font-light text-[var(--foreground)]">{vip.ltv}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">Security Grade</span>
                  <p className="text-[13px] font-light text-[var(--foreground)]">{vip.security}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">Last Presence</span>
                  <p className="text-[13px] font-light text-[var(--subtle-foreground)]">{vip.lastStay}</p>
                </div>
                <div className="space-y-1 text-right">
                  <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">Status</span>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-gold">{vip.status}</p>
                </div>
              </div>

              {/* Profile Actions */}
              <div className="pt-4 flex gap-4">
                <button className="text-[10px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] hover:text-[var(--foreground)] border-b border-[var(--border)] pb-1 hover:border-[var(--foreground)] transition-all">View History</button>
                <button className="text-[10px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] hover:text-[var(--foreground)] border-b border-[var(--border)] pb-1 hover:border-[var(--foreground)] transition-all">Direct WhatsApp</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Activity Feed */}
      <div className="glass-card p-8 space-y-8">
        <div>
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--subtle-foreground)] mb-2 block">Operational Continuity</span>
          <h2 className="text-xl font-light tracking-tight text-[var(--foreground)]">Recent Interactions</h2>
        </div>

        <div className="space-y-0">
          {[
            { action: "Offer Version 2.1 Generated", actor: "Admin Concierge", context: "Sovereign Wealth Director", time: "2h ago" },
            { action: "Security Protocol Synced", actor: "External Security Team", context: "CEO of TechGlobal", time: "5h ago" },
            { action: "New WhatsApp Inquiry", actor: "System Lead Gen", context: "Goldman Sachs Delegation", time: "1d ago" },
          ].map((activity, i) => (
            <div key={i} className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 py-6 border-b border-[var(--border)] last:border-0 hover:bg-[var(--subtle)] px-4 transition-colors">
              <div className="flex items-center gap-6">
                <div className="w-1.5 h-1.5 bg-[var(--subtle-foreground)] rounded-full" />
                <div>
                  <div className="text-[11px] font-bold tracking-widest uppercase text-[var(--foreground)] mb-1">{activity.action}</div>
                  <div className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)]">{activity.actor}</div>
                </div>
              </div>
              <div className="text-right sm:text-right ml-7 sm:ml-0">
                <div className="text-[10px] font-light text-[var(--subtle-foreground)] mb-1">{activity.context}</div>
                <div className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] flex items-center gap-2 sm:justify-end">
                  <Clock className="w-2.5 h-2.5" /> {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
