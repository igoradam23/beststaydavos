"use client"

import { Search, Mail, Shield, Car, Send, Clock, CheckCircle2, AlertCircle, Plus, Bot, RefreshCw, ExternalLink, Building2, Phone, User, ChevronRight, FileText, Zap, Eye, Edit3, X, Link2 } from "lucide-react"
import { useState } from "react"

type QuoteStatus = "draft" | "sent" | "pending" | "received" | "approved" | "declined"
type ProviderType = "transport" | "security" | "chef" | "concierge"

interface Provider {
  id: number
  name: string
  type: ProviderType
  email: string
  phone: string
  contact: string
  rating: number
  responseTime: string
  status: "active" | "preferred" | "new"
}

interface QuoteRequest {
  id: string
  provider: Provider
  linkedRequest: { id: string; guest: string; company: string }
  service: string
  details: string
  dates: { start: string; end: string }
  status: QuoteStatus
  aiDraft?: string
  quote?: { amount: string; validUntil: string; notes: string }
  created: string
  lastUpdate: string
}

const providers: Provider[] = [
  {
    id: 1,
    name: "Swiss Executive Transport",
    type: "transport",
    email: "bookings@swissexec.ch",
    phone: "+41 44 555 0100",
    contact: "Hans Müller",
    rating: 4.9,
    responseTime: "< 2 hours",
    status: "preferred"
  },
  {
    id: 2,
    name: "Alpine Security Services",
    type: "security",
    email: "ops@alpinesec.ch",
    phone: "+41 44 555 0200",
    contact: "Klaus Weber",
    rating: 5.0,
    responseTime: "< 1 hour",
    status: "preferred"
  },
  {
    id: 3,
    name: "Davos Elite Chauffeurs",
    type: "transport",
    email: "reservations@davoselite.ch",
    phone: "+41 81 555 0300",
    contact: "Marco Rossi",
    rating: 4.7,
    responseTime: "< 4 hours",
    status: "active"
  },
  {
    id: 4,
    name: "Securitas VIP Division",
    type: "security",
    email: "vip@securitas.ch",
    phone: "+41 44 555 0400",
    contact: "Sarah Schneider",
    rating: 4.8,
    responseTime: "< 3 hours",
    status: "active"
  },
  {
    id: 5,
    name: "Private Chef Collective",
    type: "chef",
    email: "bookings@privatechef.ch",
    phone: "+41 44 555 0500",
    contact: "Jean-Pierre Blanc",
    rating: 4.9,
    responseTime: "< 6 hours",
    status: "active"
  },
]

const quoteRequests: QuoteRequest[] = [
  {
    id: "QR-001",
    provider: providers[0],
    linkedRequest: { id: "REQ-001", guest: "CEO of TechGlobal", company: "TechGlobal Inc." },
    service: "Executive Transport",
    details: "ZRH Airport to Davos, 6 passengers, armored SUV required",
    dates: { start: "Jan 18", end: "Jan 25" },
    status: "received",
    quote: { amount: "€4,500", validUntil: "Jan 15, 2026", notes: "Includes 2x armored Mercedes V-Class, 24/7 driver availability" },
    created: "2h ago",
    lastUpdate: "30m ago"
  },
  {
    id: "QR-002",
    provider: providers[1],
    linkedRequest: { id: "REQ-001", guest: "CEO of TechGlobal", company: "TechGlobal Inc." },
    service: "VIP Security",
    details: "Executive protection for 6 principals, Level 1 protocol",
    dates: { start: "Jan 18", end: "Jan 25" },
    status: "pending",
    aiDraft: "Dear Klaus,\n\nWe have a high-priority request for executive protection services during WEF 2026.\n\nClient: Fortune 500 CEO\nDates: January 18-25, 2026\nPrincipals: 6 executives\nProtocol: Level 1 (discreet, non-visible)\nLocation: Davos Dorf, The Parsenn Penthouse\n\nRequirements:\n- 24/7 close protection team\n- Advance team for venue sweeps\n- Secure transport coordination\n- Emergency extraction protocol\n\nPlease provide your quotation at your earliest convenience.\n\nBest regards,\nBestStayDavos Concierge",
    created: "2h ago",
    lastUpdate: "2h ago"
  },
  {
    id: "QR-003",
    provider: providers[2],
    linkedRequest: { id: "REQ-002", guest: "Goldman Sachs Delegation", company: "Goldman Sachs" },
    service: "Fleet Transport",
    details: "ZRH Airport to Davos, 12 passengers, 3 vehicle convoy",
    dates: { start: "Jan 19", end: "Jan 24" },
    status: "draft",
    aiDraft: "Dear Marco,\n\nWe require fleet transport services for a corporate delegation during WEF 2026.\n\nClient: Major Investment Bank\nDates: January 19-24, 2026\nPassengers: 12 executives\nVehicles: 3x luxury SUV convoy\nPickup: ZRH Private Aviation Terminal\n\nRequirements:\n- Professional chauffeurs\n- Coordination with security team\n- Flexible scheduling for meetings\n- Airport meet & greet service\n\nKindly confirm availability and provide pricing.\n\nBest regards,\nBestStayDavos Concierge",
    created: "1h ago",
    lastUpdate: "1h ago"
  },
]

function ProviderTypeIcon({ type, className = "" }: { type: ProviderType; className?: string }) {
  const icons = {
    transport: <Car className={className} />,
    security: <Shield className={className} />,
    chef: <User className={className} />,
    concierge: <Building2 className={className} />,
  }
  return icons[type]
}

function StatusBadge({ status }: { status: QuoteStatus }) {
  const config = {
    draft: { label: "Draft", color: "bg-[var(--subtle)] text-[var(--subtle-foreground)] border-[var(--border)]", icon: FileText },
    sent: { label: "Sent", color: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: Send },
    pending: { label: "Awaiting Response", color: "bg-amber-500/10 text-amber-500 border-amber-500/20", icon: Clock },
    received: { label: "Quote Received", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20", icon: CheckCircle2 },
    approved: { label: "Approved", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20", icon: CheckCircle2 },
    declined: { label: "Declined", color: "bg-rose-500/10 text-rose-500 border-rose-500/20", icon: X },
  }
  const Icon = config[status].icon
  return (
    <span className={`text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 border inline-flex items-center gap-1 ${config[status].color}`}>
      <Icon className="w-2.5 h-2.5" />
      {config[status].label}
    </span>
  )
}

function ProviderTypeBadge({ type }: { type: ProviderType }) {
  const config = {
    transport: { label: "Transport", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    security: { label: "Security", color: "bg-rose-500/10 text-rose-500 border-rose-500/20" },
    chef: { label: "Private Chef", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
    concierge: { label: "Concierge", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
  }
  return (
    <span className={`text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 border ${config[type].color}`}>
      {config[type].label}
    </span>
  )
}

export default function ProvidersPage() {
  const [activeTab, setActiveTab] = useState<"quotes" | "providers">("quotes")
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(quoteRequests[0])
  const [showNewQuote, setShowNewQuote] = useState(false)
  const [editingDraft, setEditingDraft] = useState(false)
  const [draftText, setDraftText] = useState("")
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null)
  const [typeFilter, setTypeFilter] = useState<ProviderType | "all">("all")

  const filteredProviders = typeFilter === "all"
    ? providers
    : providers.filter(p => p.type === typeFilter)

  const stats = {
    pending: quoteRequests.filter(q => q.status === "pending" || q.status === "sent").length,
    received: quoteRequests.filter(q => q.status === "received").length,
    drafts: quoteRequests.filter(q => q.status === "draft").length,
  }

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 mb-6">
        <div>
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--subtle-foreground)] mb-3 block">Service Partners</span>
          <h1 className="text-4xl font-light tracking-tight text-[var(--foreground)]">Provider Hub</h1>
          <p className="text-[var(--subtle-foreground)] text-sm mt-2">AI-powered quote requests to service partners</p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <button
            onClick={() => setShowNewQuote(true)}
            className="bg-[var(--foreground)] text-[var(--background)] px-6 py-3 text-[10px] font-bold tracking-widest uppercase hover:opacity-90 transition-all flex items-center gap-2"
          >
            <Plus className="w-3 h-3" /> New Quote Request
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Pending Responses", value: stats.pending, icon: Clock, highlight: stats.pending > 0 },
          { label: "Quotes Received", value: stats.received, icon: CheckCircle2 },
          { label: "Drafts Ready", value: stats.drafts, icon: Bot, highlight: stats.drafts > 0 },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-4 flex items-center gap-4">
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

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-[var(--border)]">
        <button
          onClick={() => setActiveTab("quotes")}
          className={`px-6 py-3 text-[10px] font-bold tracking-widest uppercase transition-all border-b-2 -mb-[1px] ${
            activeTab === "quotes"
              ? "border-[var(--foreground)] text-[var(--foreground)]"
              : "border-transparent text-[var(--subtle-foreground)] hover:text-[var(--foreground)]"
          }`}
        >
          Quote Requests
        </button>
        <button
          onClick={() => setActiveTab("providers")}
          className={`px-6 py-3 text-[10px] font-bold tracking-widest uppercase transition-all border-b-2 -mb-[1px] ${
            activeTab === "providers"
              ? "border-[var(--foreground)] text-[var(--foreground)]"
              : "border-transparent text-[var(--subtle-foreground)] hover:text-[var(--foreground)]"
          }`}
        >
          Provider Directory
        </button>
      </div>

      {activeTab === "quotes" ? (
        <div className="flex-1 flex gap-4 overflow-hidden">
          {/* Quotes List */}
          <div className="w-full lg:w-96 flex flex-col gap-3 overflow-y-auto pr-2">
            {quoteRequests.map((quote) => (
              <div
                key={quote.id}
                onClick={() => setSelectedQuote(quote)}
                className={`p-4 cursor-pointer border transition-all ${
                  selectedQuote?.id === quote.id
                    ? "bg-[var(--foreground)] border-[var(--foreground)]"
                    : "glass-card hover:border-[var(--subtle-foreground)]"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <ProviderTypeIcon
                      type={quote.provider.type}
                      className={`w-4 h-4 ${selectedQuote?.id === quote.id ? "text-[var(--background)]" : "text-[var(--subtle-foreground)]"}`}
                    />
                    <span className={`text-[11px] font-bold tracking-wider uppercase ${
                      selectedQuote?.id === quote.id ? "text-[var(--background)]" : "text-[var(--foreground)]"
                    }`}>
                      {quote.provider.name}
                    </span>
                  </div>
                  {selectedQuote?.id !== quote.id && <StatusBadge status={quote.status} />}
                </div>

                <div className={`text-[10px] mb-2 ${
                  selectedQuote?.id === quote.id ? "text-[var(--background)] opacity-80" : "text-[var(--foreground)]"
                }`}>
                  {quote.service}
                </div>

                <div className={`text-[9px] truncate mb-3 ${
                  selectedQuote?.id === quote.id ? "text-[var(--background)] opacity-60" : "text-[var(--subtle-foreground)]"
                }`}>
                  {quote.details}
                </div>

                <div className="flex items-center justify-between">
                  <div className={`text-[8px] font-bold tracking-widest uppercase flex items-center gap-1 ${
                    selectedQuote?.id === quote.id ? "text-[var(--background)] opacity-60" : "text-[var(--subtle-foreground)]"
                  }`}>
                    <Link2 className="w-2.5 h-2.5" />
                    {quote.linkedRequest.guest}
                  </div>
                  <span className={`text-[8px] ${
                    selectedQuote?.id === quote.id ? "text-[var(--background)] opacity-60" : "text-[var(--subtle-foreground)]"
                  }`}>
                    {quote.lastUpdate}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quote Detail */}
          {selectedQuote && (
            <div className="flex-1 glass-card flex flex-col overflow-hidden">
              <div className="p-6 border-b border-[var(--border)] bg-[var(--subtle)]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <ProviderTypeIcon type={selectedQuote.provider.type} className="w-5 h-5 text-[var(--subtle-foreground)]" />
                      <h2 className="text-xl font-light text-[var(--foreground)]">{selectedQuote.provider.name}</h2>
                    </div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)]">
                      {selectedQuote.service} · {selectedQuote.dates.start} – {selectedQuote.dates.end}
                    </p>
                  </div>
                  <StatusBadge status={selectedQuote.status} />
                </div>

                <div className="flex items-center gap-4 p-3 bg-[var(--card-bg)] border border-[var(--border)]">
                  <Link2 className="w-4 h-4 text-[var(--subtle-foreground)]" />
                  <div className="flex-1">
                    <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">Linked to Request</span>
                    <span className="text-[11px] text-[var(--foreground)]">{selectedQuote.linkedRequest.guest} · {selectedQuote.linkedRequest.company}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--subtle-foreground)]" />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Quote Received */}
                {selectedQuote.status === "received" && selectedQuote.quote && (
                  <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 space-y-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-500">Quote Received from Provider</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block mb-1">Quoted Amount</span>
                        <span className="text-2xl font-light text-gold">{selectedQuote.quote.amount}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block mb-1">Valid Until</span>
                        <span className="text-[12px] text-[var(--foreground)]">{selectedQuote.quote.validUntil}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block mb-2">Provider Notes</span>
                      <p className="text-[12px] leading-relaxed text-[var(--foreground)]">{selectedQuote.quote.notes}</p>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button className="px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase bg-emerald-500 text-white hover:bg-emerald-600 transition-all flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3" /> Approve & Add to Offer
                      </button>
                      <button className="px-4 py-2.5 text-[10px] font-bold tracking-widest uppercase border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--subtle)] transition-all">
                        Request Revision
                      </button>
                    </div>
                  </div>
                )}

                {/* AI Draft or Pending */}
                {(selectedQuote.status === "draft" || selectedQuote.status === "pending") && selectedQuote.aiDraft && (
                  <div className="p-5 border-2 border-dashed border-blue-500/30 bg-blue-500/5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-blue-500" />
                        <span className="text-[10px] font-bold tracking-widest uppercase text-blue-500">
                          {selectedQuote.status === "draft" ? "AI-Generated Email Draft" : "Email Sent to Provider"}
                        </span>
                      </div>
                      {selectedQuote.status === "draft" && (
                        <button className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] hover:text-[var(--foreground)] flex items-center gap-1 px-2 py-1 hover:bg-[var(--subtle)] transition-all">
                          <RefreshCw className="w-3 h-3" /> Regenerate
                        </button>
                      )}
                    </div>

                    {editingDraft ? (
                      <div className="space-y-4">
                        <textarea
                          value={draftText}
                          onChange={(e) => setDraftText(e.target.value)}
                          className="w-full bg-[var(--background)] border border-[var(--border)] p-4 text-[12px] font-light leading-relaxed text-[var(--foreground)] focus:outline-none focus:border-blue-500/50 min-h-[250px] resize-none font-mono"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditingDraft(false)}
                            className="px-4 py-2 text-[10px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] hover:text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--subtle-foreground)] transition-all"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => setEditingDraft(false)}
                            className="px-4 py-2 text-[10px] font-bold tracking-widest uppercase bg-blue-500 text-white hover:bg-blue-600 transition-all"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="p-4 bg-[var(--background)] border border-[var(--border)]">
                          <pre className="text-[12px] leading-relaxed text-[var(--foreground)] whitespace-pre-wrap font-sans">
                            {selectedQuote.aiDraft}
                          </pre>
                        </div>

                        {selectedQuote.status === "draft" && (
                          <div className="flex flex-wrap gap-3">
                            <button
                              onClick={() => {
                                setDraftText(selectedQuote.aiDraft || "")
                                setEditingDraft(true)
                              }}
                              className="px-4 py-2.5 text-[10px] font-bold tracking-widest uppercase border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--subtle)] transition-all flex items-center gap-2"
                            >
                              <Edit3 className="w-3 h-3" /> Edit Email
                            </button>
                            <button className="px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase bg-blue-500 text-white hover:bg-blue-600 transition-all flex items-center gap-2">
                              <Send className="w-3 h-3" /> Send to {selectedQuote.provider.name}
                            </button>
                          </div>
                        )}

                        {selectedQuote.status === "pending" && (
                          <div className="flex items-center gap-2 p-3 bg-amber-500/5 border border-amber-500/20">
                            <Clock className="w-4 h-4 text-amber-500" />
                            <span className="text-[10px] text-amber-500">Awaiting response from provider · Sent {selectedQuote.lastUpdate}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}

                {/* Provider Contact Info */}
                <div className="space-y-3">
                  <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">Provider Contact</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-[var(--subtle)] border border-[var(--border)]">
                      <User className="w-4 h-4 text-[var(--subtle-foreground)]" />
                      <div>
                        <span className="text-[9px] text-[var(--subtle-foreground)] block">Contact</span>
                        <span className="text-[11px] text-[var(--foreground)]">{selectedQuote.provider.contact}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[var(--subtle)] border border-[var(--border)]">
                      <Mail className="w-4 h-4 text-[var(--subtle-foreground)]" />
                      <div>
                        <span className="text-[9px] text-[var(--subtle-foreground)] block">Email</span>
                        <span className="text-[11px] text-[var(--foreground)]">{selectedQuote.provider.email}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[var(--subtle)] border border-[var(--border)]">
                      <Phone className="w-4 h-4 text-[var(--subtle-foreground)]" />
                      <div>
                        <span className="text-[9px] text-[var(--subtle-foreground)] block">Phone</span>
                        <span className="text-[11px] text-[var(--foreground)]">{selectedQuote.provider.phone}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[var(--subtle)] border border-[var(--border)]">
                      <Clock className="w-4 h-4 text-[var(--subtle-foreground)]" />
                      <div>
                        <span className="text-[9px] text-[var(--subtle-foreground)] block">Avg. Response</span>
                        <span className="text-[11px] text-[var(--foreground)]">{selectedQuote.provider.responseTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Request Details */}
                <div className="space-y-3">
                  <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">Request Details</span>
                  <p className="text-[12px] leading-relaxed text-[var(--foreground)]">{selectedQuote.details}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Providers Directory */
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-4 mb-4">
            <div className="relative group flex-1 max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--subtle-foreground)] group-focus-within:text-[var(--foreground)] transition-colors" />
              <input
                type="text"
                placeholder="Search providers..."
                className="w-full bg-[var(--subtle)] border border-[var(--border)] py-3 pl-12 pr-4 text-[10px] font-bold tracking-widest uppercase placeholder:text-[var(--subtle-foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20 transition-all text-[var(--foreground)]"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as ProviderType | "all")}
              className="bg-[var(--subtle)] border border-[var(--border)] py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-[var(--foreground)] focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="transport">Transport</option>
              <option value="security">Security</option>
              <option value="chef">Private Chef</option>
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto pb-4">
            {filteredProviders.map((provider) => (
              <div key={provider.id} className="glass-card p-5 space-y-4 group cursor-pointer hover:border-[var(--subtle-foreground)] transition-all">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[var(--subtle)] border border-[var(--border)] group-hover:bg-[var(--foreground)] group-hover:border-[var(--foreground)] transition-all">
                      <ProviderTypeIcon type={provider.type} className="w-5 h-5 text-[var(--subtle-foreground)] group-hover:text-[var(--background)] transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-[12px] font-bold tracking-wider uppercase text-[var(--foreground)]">{provider.name}</h3>
                      <ProviderTypeBadge type={provider.type} />
                    </div>
                  </div>
                  {provider.status === "preferred" && (
                    <span className="text-[8px] font-bold tracking-widest uppercase bg-gold/10 text-gold border border-gold/20 px-2 py-0.5">Preferred</span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[var(--border)]">
                  <div>
                    <span className="text-[8px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block mb-1">Contact</span>
                    <span className="text-[10px] text-[var(--foreground)]">{provider.contact}</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block mb-1">Response Time</span>
                    <span className="text-[10px] text-[var(--foreground)]">{provider.responseTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < Math.floor(provider.rating) ? "bg-gold" : "bg-[var(--border)]"}`} />
                    ))}
                    <span className="text-[10px] text-[var(--subtle-foreground)] ml-1">{provider.rating}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProvider(provider.id)
                      setShowNewQuote(true)
                    }}
                    className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] hover:text-[var(--foreground)] flex items-center gap-1"
                  >
                    Request Quote <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Quote Modal */}
      {showNewQuote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--background)] border border-[var(--border)] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[var(--border)] flex justify-between items-center">
              <div>
                <h2 className="text-xl font-light text-[var(--foreground)]">New Quote Request</h2>
                <p className="text-[10px] text-[var(--subtle-foreground)] mt-1">AI will generate the email for you</p>
              </div>
              <button onClick={() => setShowNewQuote(false)} className="text-[var(--subtle-foreground)] hover:text-[var(--foreground)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-2 p-3 bg-blue-500/5 border border-blue-500/20">
                <Zap className="w-4 h-4 text-blue-500" />
                <span className="text-[10px] text-blue-500">AI will automatically draft the quote request email based on your inputs</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block mb-2">Select Provider</label>
                  <select className="w-full bg-[var(--subtle)] border border-[var(--border)] py-3 px-4 text-[11px] text-[var(--foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20">
                    <option value="">Choose a provider...</option>
                    {providers.map(p => (
                      <option key={p.id} value={p.id} selected={selectedProvider === p.id}>
                        {p.name} ({p.type})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block mb-2">Link to Customer Request</label>
                  <select className="w-full bg-[var(--subtle)] border border-[var(--border)] py-3 px-4 text-[11px] text-[var(--foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20">
                    <option value="">Choose a request...</option>
                    <option value="REQ-001">REQ-001 - CEO of TechGlobal (TechGlobal Inc.)</option>
                    <option value="REQ-002">REQ-002 - Goldman Sachs Delegation</option>
                    <option value="REQ-003">REQ-003 - James Wilson (Tech Corp)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block mb-2">Start Date</label>
                    <input type="date" className="w-full bg-[var(--subtle)] border border-[var(--border)] py-3 px-4 text-[11px] text-[var(--foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20" />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block mb-2">End Date</label>
                    <input type="date" className="w-full bg-[var(--subtle)] border border-[var(--border)] py-3 px-4 text-[11px] text-[var(--foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20" />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block mb-2">Service Requirements</label>
                  <textarea
                    placeholder="Describe what you need from this provider..."
                    className="w-full bg-[var(--subtle)] border border-[var(--border)] py-3 px-4 text-[11px] text-[var(--foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20 min-h-[120px] resize-none placeholder:text-[var(--subtle-foreground)]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
                <button
                  onClick={() => setShowNewQuote(false)}
                  className="px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--subtle)] transition-all"
                >
                  Cancel
                </button>
                <button className="px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-all flex items-center gap-2">
                  <Bot className="w-3 h-3" /> Generate Quote Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
