"use client"

import { Search, Mail, MessageSquare, Send, Shield, User, Paperclip, MoreVertical, Phone, Globe, Plus, Car, Sparkles, CheckCircle2, X, FileText, Bot, Edit3, RefreshCw, Zap, Clock, Check, AlertCircle } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

type AIStatus = "pending" | "draft_ready" | "sent" | "approved"

interface Thread {
  id: number
  name: string
  company: string
  last: string
  time: string
  unread: boolean
  channel: "whatsapp" | "email" | "form" | "phone"
  avatar: string | null
  aiStatus: AIStatus
  autoResponseSent: boolean
  aiDraft?: string
}

const threads: Thread[] = [
  {
    id: 1,
    name: "CEO of TechGlobal",
    company: "TechGlobal Inc.",
    last: "Looking for 4 master suites...",
    time: "12m ago",
    unread: true,
    channel: "whatsapp",
    avatar: null,
    aiStatus: "draft_ready",
    autoResponseSent: true,
    aiDraft: "Thank you for your interest in our executive residencies for WEF 2026. Based on your requirements for 4 master suites with dedicated workspace, I recommend The Parsenn Penthouse in Davos Dorf - it offers exactly what you're looking for with panoramic Alpine views and 200m proximity to the Promenade. I'm preparing a comprehensive offer including our Elite Transport package for your ZRH transfers. Would you prefer armored vehicle service for your delegation?"
  },
  {
    id: 2,
    name: "Goldman Sachs Delegation",
    company: "Goldman Sachs",
    last: "Transport confirmation for ZRH...",
    time: "45m ago",
    unread: true,
    channel: "email",
    avatar: null,
    aiStatus: "pending",
    autoResponseSent: true,
    aiDraft: "Thank you for confirming the transport requirements. I've coordinated with our elite transport partner for armored SUV service. Your delegation of 12 will be met at ZRH Private Aviation Terminal on January 19th at 14:00. The convoy will include 3 vehicles with trained security drivers. I'm attaching the detailed itinerary and security protocols for your review."
  },
  {
    id: 3,
    name: "James Wilson",
    company: "Tech Corp",
    last: "Offer accepted. Please send contract.",
    time: "2h ago",
    unread: false,
    channel: "email",
    avatar: null,
    aiStatus: "sent",
    autoResponseSent: true
  },
  {
    id: 4,
    name: "Sovereign Wealth Fund",
    company: "GIC Funds",
    last: "Security protocols for residency...",
    time: "1d ago",
    unread: false,
    channel: "whatsapp",
    avatar: null,
    aiStatus: "approved",
    autoResponseSent: true
  },
  {
    id: 5,
    name: "Maria Santos",
    company: "Private Client",
    last: "Inquiry about WEF availability",
    time: "2d ago",
    unread: false,
    channel: "form",
    avatar: null,
    aiStatus: "draft_ready",
    autoResponseSent: true,
    aiDraft: "Welcome to BestStayDavos. Thank you for your inquiry regarding WEF 2026 accommodations. We have exceptional availability across our portfolio of luxury residencies. To curate the perfect experience for you, could you share your preferred dates, party size, and any specific requirements such as security, private chef, or transport services?"
  },
]

interface Message {
  id: number
  text: string
  sender: "inbound" | "outbound" | "system"
  time: string
  channel: string
  isAutoResponse?: boolean
  isAIDraft?: boolean
}

const messagesData: Record<number, Message[]> = {
  1: [
    { id: 0, text: "Thank you for reaching out to BestStayDavos. Our concierge team has received your inquiry and will connect with you shortly with personalized recommendations for your WEF 2026 stay.", sender: "system", time: "Yesterday, 14:21", channel: "whatsapp", isAutoResponse: true },
    { id: 1, text: "Hi, we are interested in a high-security residency for our executive team during WEF 2026.", sender: "inbound", time: "Yesterday, 14:20", channel: "form" },
    { id: 2, text: "Welcome. We have several options in Davos Dorf with discreet access and full security coordination. How many master suites are required?", sender: "outbound", time: "Yesterday, 14:45", channel: "whatsapp" },
    { id: 3, text: "We need 4 master suites and a dedicated workspace for 10 people.", sender: "inbound", time: "12:05", channel: "whatsapp" },
    { id: 4, text: "Understood. I am preparing a bespoke collection for you now. I will include our elite transport package for the ZRH transfers.", sender: "outbound", time: "12:15", channel: "whatsapp" },
  ],
  2: [
    { id: 0, text: "Thank you for reaching out to BestStayDavos. Our concierge team has received your inquiry and will connect with you shortly with personalized recommendations for your WEF 2026 stay.", sender: "system", time: "3h ago", channel: "email", isAutoResponse: true },
    { id: 1, text: "We need to confirm transport arrangements for our delegation of 12 executives arriving January 19th.", sender: "inbound", time: "3h ago", channel: "email" },
    { id: 2, text: "Confirming receipt of your transport request. We're coordinating with our partners for armored vehicle service.", sender: "outbound", time: "2h ago", channel: "email" },
  ],
  5: [
    { id: 0, text: "Thank you for reaching out to BestStayDavos. Our concierge team has received your inquiry and will connect with you shortly with personalized recommendations for your WEF 2026 stay.", sender: "system", time: "2d ago", channel: "email", isAutoResponse: true },
    { id: 1, text: "Hello, I'm looking for a luxury chalet for the WEF period. What do you have available?", sender: "inbound", time: "2d ago", channel: "form" },
  ],
}

const properties = [
  { id: 1, name: "The Parsenn Penthouse", location: "Davos Dorf", price: "€25,000", img: "https://images.unsplash.com/photo-1600607687940-467f4b6020c2?q=80&w=200", available: true },
  { id: 2, name: "Chalet Jakobshorn", location: "Davos Platz", price: "€45,000", img: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=200", available: false },
  { id: 3, name: "The Clavadel Sanctuary", location: "Clavadelerstrasse", price: "€18,000", img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=200", available: true },
]

const services = [
  { id: 1, icon: Shield, label: "VIP Security", price: "€3,500" },
  { id: 2, icon: Car, label: "Elite Transport", price: "€2,500" },
  { id: 3, icon: Sparkles, label: "Private Chef", price: "€4,000" },
]

function ChannelIcon({ channel, className = "" }: { channel: string; className?: string }) {
  switch (channel) {
    case "whatsapp":
      return <MessageSquare className={`text-emerald-500 ${className}`} />
    case "email":
      return <Mail className={`text-blue-500 ${className}`} />
    case "phone":
      return <Phone className={`text-amber-500 ${className}`} />
    case "form":
      return <Globe className={`text-purple-500 ${className}`} />
    default:
      return <Mail className={className} />
  }
}

function ChannelBadge({ channel }: { channel: string }) {
  const colors = {
    whatsapp: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    email: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    phone: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    form: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  }
  const labels = {
    whatsapp: "WhatsApp",
    email: "Email",
    phone: "Phone",
    form: "Web Form",
  }
  return (
    <span className={`text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 border ${colors[channel as keyof typeof colors] || colors.email}`}>
      {labels[channel as keyof typeof labels] || channel}
    </span>
  )
}

function AIStatusBadge({ status }: { status: AIStatus }) {
  const config = {
    pending: { label: "AI Processing", color: "bg-amber-500/10 text-amber-500 border-amber-500/20", icon: Clock },
    draft_ready: { label: "Draft Ready", color: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: Bot },
    sent: { label: "Sent", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20", icon: Check },
    approved: { label: "Approved", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20", icon: CheckCircle2 },
  }
  const Icon = config[status].icon
  return (
    <span className={`text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 border inline-flex items-center gap-1 ${config[status].color}`}>
      <Icon className="w-2.5 h-2.5" />
      {config[status].label}
    </span>
  )
}

export default function MessagesPage() {
  const [showOfferStudio, setShowOfferStudio] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<number | null>(1)
  const [selectedServices, setSelectedServices] = useState<number[]>([1, 2])
  const [activeThread, setActiveThread] = useState(1)
  const [editingDraft, setEditingDraft] = useState(false)
  const [draftText, setDraftText] = useState("")

  const currentThread = threads.find(t => t.id === activeThread)
  const currentMessages = messagesData[activeThread] || messagesData[1]

  const toggleService = (id: number) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const handleEditDraft = () => {
    setDraftText(currentThread?.aiDraft || "")
    setEditingDraft(true)
  }

  const basePrice = selectedProperty ? properties.find(p => p.id === selectedProperty)?.price.replace("€", "").replace(",", "") : "0"
  const servicesTotal = selectedServices.reduce((acc, id) => {
    const service = services.find(s => s.id === id)
    return acc + (service ? parseInt(service.price.replace("€", "").replace(",", "")) : 0)
  }, 0)
  const totalPrice = parseInt(basePrice || "0") + servicesTotal

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col lg:flex-row gap-4 animate-fade-in">

      {/* Threads Sidebar */}
      <div className="w-full lg:w-80 flex flex-col gap-4 flex-shrink-0">
        <div className="flex justify-between items-end px-2">
          <div>
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--subtle-foreground)] mb-2 block">AI-Powered Inbox</span>
            <h2 className="text-2xl font-light tracking-tight text-[var(--foreground)]">Conversations</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-bold tracking-widest uppercase bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2 py-0.5 flex items-center gap-1">
              <Bot className="w-2.5 h-2.5" /> 2 Drafts
            </span>
          </div>
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--subtle-foreground)] group-focus-within:text-[var(--foreground)] transition-colors" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full bg-[var(--subtle)] border border-[var(--border)] py-3 pl-12 pr-4 text-[10px] font-bold tracking-widest uppercase placeholder:text-[var(--subtle-foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20 transition-all text-[var(--foreground)]"
          />
        </div>

        {/* Channel Filters */}
        <div className="flex gap-2 px-1">
          {["all", "whatsapp", "email", "form"].map((filter) => (
            <button
              key={filter}
              className="text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 text-[var(--subtle-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--subtle)] transition-all"
            >
              {filter === "all" ? "All" : filter}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto space-y-1 pr-1">
          {threads.map((thread) => (
            <div
              key={thread.id}
              onClick={() => {
                setActiveThread(thread.id)
                setEditingDraft(false)
              }}
              className={`p-4 cursor-pointer border transition-all duration-300 ${
                thread.id === activeThread
                  ? "bg-[var(--foreground)] border-[var(--foreground)]"
                  : "bg-[var(--subtle)] border-transparent hover:bg-[var(--border)]"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <ChannelIcon channel={thread.channel} className="w-3.5 h-3.5" />
                  <span className={`text-[11px] font-bold tracking-wider uppercase ${thread.id === activeThread ? "text-[var(--background)]" : "text-[var(--foreground)]"}`}>
                    {thread.name}
                  </span>
                </div>
                <div className={`text-[9px] font-bold tracking-widest uppercase ${thread.id === activeThread ? "text-[var(--background)] opacity-60" : "text-[var(--subtle-foreground)]"}`}>
                  {thread.time}
                </div>
              </div>
              <div className={`text-[10px] font-light leading-relaxed truncate mb-2 ${thread.id === activeThread ? "text-[var(--background)] opacity-70" : "text-[var(--subtle-foreground)]"}`}>
                {thread.last}
              </div>
              <div className="flex justify-between items-center gap-2">
                <ChannelBadge channel={thread.channel} />
                <div className="flex items-center gap-2">
                  {thread.aiStatus === "draft_ready" && thread.id !== activeThread && (
                    <span className="text-[8px] font-bold tracking-widest uppercase bg-blue-500/10 text-blue-500 border border-blue-500/20 px-1.5 py-0.5 flex items-center gap-1">
                      <Bot className="w-2 h-2" /> Draft
                    </span>
                  )}
                  {thread.unread && thread.id !== activeThread && (
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 glass-card flex flex-col overflow-hidden min-w-0">
        {/* Chat Header */}
        <div className="p-4 border-b border-[var(--border)] flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-[var(--subtle)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--subtle)] border border-[var(--border)] flex items-center justify-center">
              <User className="w-5 h-5 text-[var(--subtle-foreground)]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[12px] font-bold tracking-[0.15em] uppercase text-[var(--foreground)]">{currentThread?.name}</h3>
                <ChannelBadge channel={currentThread?.channel || "email"} />
              </div>
              <p className="text-[10px] font-medium tracking-wider text-[var(--subtle-foreground)] mt-0.5 flex items-center gap-2">
                <ChannelIcon channel={currentThread?.channel || "email"} className="w-3 h-3" />
                {currentThread?.company} · Davos, CH
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AIStatusBadge status={currentThread?.aiStatus || "pending"} />
            <button className="text-[var(--subtle-foreground)] hover:text-[var(--foreground)] transition-colors p-2 hover:bg-[var(--subtle)]">
              <MoreVertical className="h-4 w-4" />
            </button>
            <button
              onClick={() => setShowOfferStudio(!showOfferStudio)}
              className={`px-5 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all flex items-center gap-2 ${
                showOfferStudio
                  ? "bg-gold text-black"
                  : "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              {showOfferStudio ? "Hide Offer" : "Create Offer"}
            </button>
          </div>
        </div>

        {/* Messages + Offer Studio */}
        <div className="flex-1 flex overflow-hidden">
          {/* Messages Feed */}
          <div className={`flex-1 overflow-y-auto p-6 space-y-6 ${showOfferStudio ? "hidden xl:block" : ""}`}>
            {currentMessages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === "outbound" ? "items-end" : msg.sender === "system" ? "items-center" : "items-start"}`}>
                {msg.sender === "system" ? (
                  <div className="max-w-[90%] p-4 bg-blue-500/5 border border-blue-500/20 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Bot className="w-4 h-4 text-blue-500" />
                      <span className="text-[9px] font-bold tracking-widest uppercase text-blue-500">AI Auto-Response</span>
                    </div>
                    <p className="text-[12px] leading-[1.6] font-light text-[var(--foreground)]">{msg.text}</p>
                  </div>
                ) : (
                  <div className={`max-w-[80%] p-5 ${
                    msg.sender === "outbound"
                      ? "bg-[var(--foreground)] text-[var(--background)]"
                      : "glass-card text-[var(--foreground)]"
                  }`}>
                    <p className="text-[13px] leading-[1.6] font-light">{msg.text}</p>
                  </div>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-[var(--subtle-foreground)]">{msg.time}</span>
                  <ChannelIcon channel={msg.channel} className="w-3 h-3" />
                </div>
              </div>
            ))}

            {/* AI Draft Response Card */}
            {currentThread?.aiStatus === "draft_ready" && currentThread?.aiDraft && (
              <div className="mt-8 p-5 border-2 border-dashed border-blue-500/30 bg-blue-500/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-blue-500" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-blue-500">AI-Generated Draft</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {/* Regenerate logic */}}
                      className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] hover:text-[var(--foreground)] flex items-center gap-1 px-2 py-1 hover:bg-[var(--subtle)] transition-all"
                    >
                      <RefreshCw className="w-3 h-3" /> Regenerate
                    </button>
                  </div>
                </div>

                {editingDraft ? (
                  <div className="space-y-4">
                    <textarea
                      value={draftText}
                      onChange={(e) => setDraftText(e.target.value)}
                      className="w-full bg-[var(--background)] border border-[var(--border)] p-4 text-[13px] font-light leading-relaxed text-[var(--foreground)] focus:outline-none focus:border-blue-500/50 min-h-[150px] resize-none"
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
                    <p className="text-[13px] leading-[1.7] font-light text-[var(--foreground)] mb-5">
                      {currentThread.aiDraft}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={handleEditDraft}
                        className="px-4 py-2.5 text-[10px] font-bold tracking-widest uppercase border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--subtle)] transition-all flex items-center gap-2"
                      >
                        <Edit3 className="w-3 h-3" /> Edit Draft
                      </button>
                      <button className="px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase bg-emerald-500 text-white hover:bg-emerald-600 transition-all flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3" /> Approve & Send
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Offer Studio Panel */}
          {showOfferStudio && (
            <div className="w-full xl:w-[380px] border-l border-[var(--border)] flex flex-col overflow-hidden bg-[var(--background)]">
              <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
                <div>
                  <h3 className="text-[11px] font-bold tracking-widest uppercase text-[var(--foreground)]">Offer Studio</h3>
                  <p className="text-[9px] text-[var(--subtle-foreground)] mt-0.5">Create bespoke offer</p>
                </div>
                <button
                  onClick={() => setShowOfferStudio(false)}
                  className="text-[var(--subtle-foreground)] hover:text-[var(--foreground)] p-1 xl:hidden"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-5">
                {/* Property Selection */}
                <div className="space-y-3">
                  <label className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">Select Property</label>
                  <div className="space-y-2">
                    {properties.map((property) => (
                      <div
                        key={property.id}
                        onClick={() => property.available && setSelectedProperty(property.id)}
                        className={`p-3 border transition-all cursor-pointer flex items-center gap-3 ${
                          selectedProperty === property.id
                            ? "bg-[var(--foreground)] border-[var(--foreground)]"
                            : property.available
                              ? "bg-[var(--subtle)] border-[var(--border)] hover:border-[var(--subtle-foreground)]"
                              : "bg-[var(--subtle)] border-[var(--border)] opacity-50 cursor-not-allowed"
                        }`}
                      >
                        <div className="relative w-12 h-10 bg-[var(--subtle)] overflow-hidden flex-shrink-0">
                          <Image src={property.img} alt={property.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-[10px] font-bold tracking-wider uppercase truncate ${
                            selectedProperty === property.id ? "text-[var(--background)]" : "text-[var(--foreground)]"
                          }`}>
                            {property.name}
                          </div>
                          <div className={`text-[9px] ${
                            selectedProperty === property.id ? "text-[var(--background)] opacity-60" : "text-[var(--subtle-foreground)]"
                          }`}>
                            {property.location} · {property.price}/wk
                          </div>
                        </div>
                        {!property.available && (
                          <span className="text-[8px] font-bold tracking-widest uppercase text-rose-500 bg-rose-500/10 px-2 py-0.5">Booked</span>
                        )}
                        {property.available && selectedProperty === property.id && (
                          <CheckCircle2 className="w-4 h-4 text-[var(--background)]" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div className="space-y-3">
                  <label className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">Add Services</label>
                  <div className="grid grid-cols-1 gap-2">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => toggleService(service.id)}
                        className={`p-3 border transition-all cursor-pointer flex items-center gap-3 ${
                          selectedServices.includes(service.id)
                            ? "bg-[var(--foreground)] border-[var(--foreground)]"
                            : "bg-[var(--subtle)] border-[var(--border)] hover:border-[var(--subtle-foreground)]"
                        }`}
                      >
                        <service.icon className={`w-4 h-4 ${
                          selectedServices.includes(service.id) ? "text-[var(--background)]" : "text-[var(--subtle-foreground)]"
                        }`} />
                        <div className="flex-1">
                          <div className={`text-[10px] font-bold tracking-wider uppercase ${
                            selectedServices.includes(service.id) ? "text-[var(--background)]" : "text-[var(--foreground)]"
                          }`}>
                            {service.label}
                          </div>
                        </div>
                        <span className={`text-[10px] font-medium ${
                          selectedServices.includes(service.id) ? "text-[var(--background)] opacity-70" : "text-[var(--subtle-foreground)]"
                        }`}>
                          {service.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="space-y-2 pt-4 border-t border-[var(--border)]">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)]">Property</span>
                    <span className="text-[11px] text-[var(--foreground)]">€{parseInt(basePrice || "0").toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)]">Services</span>
                    <span className="text-[11px] text-[var(--foreground)]">€{servicesTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[var(--border)]">
                    <span className="text-[9px] font-bold tracking-widest uppercase text-gold">Total</span>
                    <span className="text-lg font-light text-gold">€{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Send Offer */}
              <div className="p-4 border-t border-[var(--border)]">
                <button className="w-full bg-gold text-black py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:opacity-90 transition-all flex items-center justify-center gap-2">
                  <Send className="w-3.5 h-3.5" />
                  Send Offer via {currentThread?.channel === "whatsapp" ? "WhatsApp" : currentThread?.channel === "email" ? "Email" : "Email"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Reply Area */}
        <div className="p-4 border-t border-[var(--border)] bg-[var(--subtle)]">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[9px] font-bold tracking-widest uppercase text-amber-500">AI will auto-generate response suggestions</span>
          </div>
          <div className="relative group">
            <textarea
              placeholder={`Reply via ${currentThread?.channel === "whatsapp" ? "WhatsApp" : "Email"}...`}
              className="w-full bg-[var(--card-bg)] border border-[var(--border)] p-4 pr-28 text-[12px] font-light tracking-wide text-[var(--foreground)] placeholder:text-[var(--subtle-foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20 transition-all min-h-[80px] resize-none"
            />
            <div className="absolute right-3 bottom-3 flex items-center gap-2">
              <button className="text-[var(--subtle-foreground)] hover:text-[var(--foreground)] transition-colors p-2">
                <Paperclip className="h-4 w-4" />
              </button>
              <button className="bg-[var(--foreground)] text-[var(--background)] px-5 py-2 text-[10px] font-bold tracking-widest uppercase hover:opacity-90 transition-all flex items-center gap-2">
                <ChannelIcon channel={currentThread?.channel || "email"} className="w-3 h-3 text-[var(--background)]" />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Context Sidebar */}
      <div className="hidden 2xl:flex w-64 flex-col gap-4 flex-shrink-0">
        <div className="glass-card p-4 space-y-4">
          <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--subtle-foreground)] block">AI Agent Status</span>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-emerald-500/5 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-500 block">Auto-Response Sent</span>
                <span className="text-[9px] text-[var(--subtle-foreground)]">Acknowledgment delivered</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-500/5 border border-blue-500/20">
              <Bot className="w-4 h-4 text-blue-500" />
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-blue-500 block">Draft Ready</span>
                <span className="text-[9px] text-[var(--subtle-foreground)]">Awaiting your approval</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-4 space-y-4">
          <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--subtle-foreground)] block">Guest Profile</span>
          <div className="space-y-3">
            <div>
              <span className="text-[8px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block mb-1">Company</span>
              <p className="text-[11px] text-[var(--foreground)]">{currentThread?.company}</p>
            </div>
            <div>
              <span className="text-[8px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block mb-1">VIP Level</span>
              <span className="text-[9px] font-bold tracking-widest uppercase bg-gold/10 text-gold px-2 py-0.5 border border-gold/20">Platinum</span>
            </div>
            <div>
              <span className="text-[8px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block mb-1">Requested Dates</span>
              <p className="text-[11px] text-[var(--foreground)]">Jan 18 – Jan 25, 2026</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-4 space-y-4">
          <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--subtle-foreground)] block">Requirements</span>
          <div className="flex flex-wrap gap-1.5">
            {["4 Suites", "Workspace", "Security", "ZRH Transfer"].map((tag) => (
              <span key={tag} className="text-[8px] font-bold tracking-widest uppercase border border-[var(--border)] px-2 py-1 text-[var(--subtle-foreground)]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
