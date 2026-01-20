"use client"

import { Search, Filter, Mail, MessageSquare, Globe, Phone, FileText, Send, CheckCircle2, XCircle, Clock, ChevronDown, MoreHorizontal, Shield, Car, Sparkles, Users, Calendar, Home, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

type RequestStatus = "new" | "in_progress" | "offer_sent" | "confirmed" | "declined"
type Channel = "whatsapp" | "email" | "form" | "phone"

interface Request {
  id: string
  guest: string
  company: string
  channel: Channel
  dates: { start: string; end: string }
  property: { name: string; available: boolean; price: string; img: string }
  guests: number
  services: string[]
  status: RequestStatus
  created: string
  priority: "high" | "medium" | "low"
}

const requests: Request[] = [
  {
    id: "REQ-001",
    guest: "CEO of TechGlobal",
    company: "TechGlobal Inc.",
    channel: "whatsapp",
    dates: { start: "Jan 18", end: "Jan 25" },
    property: { name: "The Parsenn Penthouse", available: true, price: "€25,000", img: "https://images.unsplash.com/photo-1600607687940-467f4b6020c2?q=80&w=200" },
    guests: 6,
    services: ["VIP Security", "Elite Transport"],
    status: "in_progress",
    created: "2h ago",
    priority: "high"
  },
  {
    id: "REQ-002",
    guest: "Goldman Sachs Delegation",
    company: "Goldman Sachs",
    channel: "email",
    dates: { start: "Jan 19", end: "Jan 24" },
    property: { name: "Chalet Jakobshorn", available: false, price: "€45,000", img: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=200" },
    guests: 12,
    services: ["VIP Security", "Private Chef", "Elite Transport"],
    status: "new",
    created: "5h ago",
    priority: "high"
  },
  {
    id: "REQ-003",
    guest: "James Wilson",
    company: "Tech Corp",
    channel: "email",
    dates: { start: "Jan 20", end: "Jan 23" },
    property: { name: "The Clavadel Sanctuary", available: true, price: "€18,000", img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=200" },
    guests: 4,
    services: ["Elite Transport"],
    status: "offer_sent",
    created: "1d ago",
    priority: "medium"
  },
  {
    id: "REQ-004",
    guest: "Sovereign Wealth Director",
    company: "GIC Funds",
    channel: "whatsapp",
    dates: { start: "Jan 18", end: "Jan 26" },
    property: { name: "Belvedere Executive Suite", available: true, price: "€12,000", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=200" },
    guests: 2,
    services: ["VIP Security"],
    status: "confirmed",
    created: "2d ago",
    priority: "high"
  },
  {
    id: "REQ-005",
    guest: "Maria Santos",
    company: "Private Client",
    channel: "form",
    dates: { start: "Jan 19", end: "Jan 22" },
    property: { name: "Alpine Grand Residence", available: true, price: "€35,000", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=200" },
    guests: 8,
    services: ["Private Chef"],
    status: "new",
    created: "3d ago",
    priority: "low"
  },
  {
    id: "REQ-006",
    guest: "David Chen",
    company: "Sequoia Capital",
    channel: "phone",
    dates: { start: "Jan 21", end: "Jan 25" },
    property: { name: "The Parsenn Penthouse", available: true, price: "€25,000", img: "https://images.unsplash.com/photo-1600607687940-467f4b6020c2?q=80&w=200" },
    guests: 4,
    services: ["VIP Security", "Elite Transport"],
    status: "declined",
    created: "4d ago",
    priority: "medium"
  },
]

function ChannelIcon({ channel, className = "" }: { channel: Channel; className?: string }) {
  const icons = {
    whatsapp: <MessageSquare className={`text-emerald-500 ${className}`} />,
    email: <Mail className={`text-blue-500 ${className}`} />,
    form: <Globe className={`text-purple-500 ${className}`} />,
    phone: <Phone className={`text-amber-500 ${className}`} />,
  }
  return icons[channel]
}

function ChannelBadge({ channel }: { channel: Channel }) {
  const colors = {
    whatsapp: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    email: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    form: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    phone: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  }
  const labels = { whatsapp: "WhatsApp", email: "Email", form: "Web Form", phone: "Phone" }
  return (
    <span className={`text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 border inline-flex items-center gap-1.5 ${colors[channel]}`}>
      <ChannelIcon channel={channel} className="w-2.5 h-2.5" />
      {labels[channel]}
    </span>
  )
}

function StatusBadge({ status }: { status: RequestStatus }) {
  const config = {
    new: { label: "New", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    in_progress: { label: "In Progress", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
    offer_sent: { label: "Offer Sent", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
    confirmed: { label: "Confirmed", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
    declined: { label: "Declined", color: "bg-rose-500/10 text-rose-500 border-rose-500/20" },
  }
  return (
    <span className={`text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 border ${config[status].color}`}>
      {config[status].label}
    </span>
  )
}

function ServiceIcon({ service }: { service: string }) {
  if (service.includes("Security")) return <Shield className="w-3 h-3" />
  if (service.includes("Transport")) return <Car className="w-3 h-3" />
  if (service.includes("Chef")) return <Sparkles className="w-3 h-3" />
  return null
}

function AvailabilityBadge({ available }: { available: boolean }) {
  return available ? (
    <span className="text-[8px] font-bold tracking-widest uppercase text-emerald-500 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 inline-flex items-center gap-1">
      <CheckCircle2 className="w-2.5 h-2.5" /> Available
    </span>
  ) : (
    <span className="text-[8px] font-bold tracking-widest uppercase text-rose-500 bg-rose-500/10 px-2 py-0.5 border border-rose-500/20 inline-flex items-center gap-1">
      <XCircle className="w-2.5 h-2.5" /> Booked
    </span>
  )
}

export default function RequestsPage() {
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "all">("all")
  const [channelFilter, setChannelFilter] = useState<Channel | "all">("all")

  const filteredRequests = requests.filter(r => {
    if (statusFilter !== "all" && r.status !== statusFilter) return false
    if (channelFilter !== "all" && r.channel !== channelFilter) return false
    return true
  })

  const stats = {
    total: requests.length,
    new: requests.filter(r => r.status === "new").length,
    inProgress: requests.filter(r => r.status === "in_progress").length,
    confirmed: requests.filter(r => r.status === "confirmed").length,
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6">
        <div>
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--subtle-foreground)] mb-3 block">Booking Management</span>
          <h1 className="text-4xl font-light tracking-tight text-[var(--foreground)]">Requests</h1>
          <p className="text-[var(--subtle-foreground)] text-sm mt-2">Manage incoming booking requests for WEF 2026</p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative group w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--subtle-foreground)] group-focus-within:text-[var(--foreground)] transition-colors" />
            <input
              type="text"
              placeholder="Search requests..."
              className="w-full bg-[var(--subtle)] border border-[var(--border)] py-3 pl-12 pr-4 text-[10px] font-bold tracking-widest uppercase placeholder:text-[var(--subtle-foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20 transition-all text-[var(--foreground)]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as RequestStatus | "all")}
            className="bg-[var(--subtle)] border border-[var(--border)] py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-[var(--foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="offer_sent">Offer Sent</option>
            <option value="confirmed">Confirmed</option>
            <option value="declined">Declined</option>
          </select>
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value as Channel | "all")}
            className="bg-[var(--subtle)] border border-[var(--border)] py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-[var(--foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20"
          >
            <option value="all">All Channels</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="email">Email</option>
            <option value="form">Web Form</option>
            <option value="phone">Phone</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Requests", value: stats.total, icon: Home },
          { label: "New Inquiries", value: stats.new, icon: Clock, highlight: stats.new > 0 },
          { label: "In Progress", value: stats.inProgress, icon: FileText },
          { label: "Confirmed", value: stats.confirmed, icon: CheckCircle2 },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-5 flex items-center gap-4">
            <div className={`p-3 border ${stat.highlight ? "bg-blue-500/10 border-blue-500/20" : "bg-[var(--subtle)] border-[var(--border)]"}`}>
              <stat.icon className={`w-4 h-4 ${stat.highlight ? "text-blue-500" : "text-[var(--subtle-foreground)]"}`} />
            </div>
            <div>
              <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">{stat.label}</span>
              <span className={`text-xl font-light ${stat.highlight ? "text-blue-500" : "text-[var(--foreground)]"}`}>{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Requests Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--subtle)]">
                <th className="p-4 text-left text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)]">Guest / Company</th>
                <th className="p-4 text-left text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)]">Channel</th>
                <th className="p-4 text-left text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)]">Dates</th>
                <th className="p-4 text-left text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)]">Property</th>
                <th className="p-4 text-left text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)]">Services</th>
                <th className="p-4 text-left text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)]">Status</th>
                <th className="p-4 text-right text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id} className="border-b border-[var(--border)] hover:bg-[var(--subtle)] transition-colors group">
                  {/* Guest */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        request.priority === "high" ? "bg-rose-500" :
                        request.priority === "medium" ? "bg-amber-500" : "bg-[var(--subtle-foreground)]"
                      }`} />
                      <div>
                        <div className="text-[11px] font-bold tracking-wider uppercase text-[var(--foreground)]">{request.guest}</div>
                        <div className="text-[9px] text-[var(--subtle-foreground)]">{request.company}</div>
                      </div>
                    </div>
                  </td>

                  {/* Channel */}
                  <td className="p-4">
                    <ChannelBadge channel={request.channel} />
                  </td>

                  {/* Dates */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-[var(--subtle-foreground)]" />
                      <span className="text-[10px] text-[var(--foreground)]">{request.dates.start} – {request.dates.end}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Users className="w-3 h-3 text-[var(--subtle-foreground)]" />
                      <span className="text-[9px] text-[var(--subtle-foreground)]">{request.guests} guests</span>
                    </div>
                  </td>

                  {/* Property */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-10 bg-[var(--subtle)] overflow-hidden flex-shrink-0">
                        <Image src={request.property.img} alt={request.property.name} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold tracking-wider uppercase text-[var(--foreground)]">{request.property.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[9px] text-[var(--subtle-foreground)]">{request.property.price}/wk</span>
                          <AvailabilityBadge available={request.property.available} />
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Services */}
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1.5">
                      {request.services.map((service, i) => (
                        <span key={i} className="text-[8px] font-bold tracking-widest uppercase bg-[var(--subtle)] border border-[var(--border)] px-2 py-1 text-[var(--subtle-foreground)] inline-flex items-center gap-1">
                          <ServiceIcon service={service} />
                          {service}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <StatusBadge status={request.status} />
                    <div className="text-[8px] text-[var(--subtle-foreground)] mt-1">{request.created}</div>
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                      {request.status !== "confirmed" && request.status !== "declined" && (
                        <>
                          <button
                            className="p-2 text-[var(--subtle-foreground)] hover:text-gold hover:bg-gold/10 transition-all"
                            title="Generate Offer"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                          <button
                            className={`p-2 transition-all ${
                              request.channel === "whatsapp" ? "text-emerald-500 hover:bg-emerald-500/10" :
                              request.channel === "email" ? "text-blue-500 hover:bg-blue-500/10" :
                              request.channel === "phone" ? "text-amber-500 hover:bg-amber-500/10" :
                              "text-purple-500 hover:bg-purple-500/10"
                            }`}
                            title={`Send via ${request.channel}`}
                          >
                            <ChannelIcon channel={request.channel} className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button
                        className="p-2 text-[var(--subtle-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--subtle)] transition-all"
                        title="More options"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRequests.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-[var(--subtle-foreground)] text-sm">No requests match your filters</p>
          </div>
        )}
      </div>

      {/* Quick Actions Footer */}
      <div className="flex justify-between items-center">
        <p className="text-[10px] text-[var(--subtle-foreground)]">
          Showing {filteredRequests.length} of {requests.length} requests
        </p>
        <button className="text-[10px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] hover:text-[var(--foreground)] transition-all border border-[var(--border)] hover:border-[var(--foreground)] hover:border-opacity-30 px-6 py-3 flex items-center gap-2">
          Export Requests <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}
