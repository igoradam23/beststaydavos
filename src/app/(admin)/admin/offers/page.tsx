"use client"

import { FileText, Send, Shield, Car, CheckCircle2, Download, Printer, Share2, Plus, Sparkles } from "lucide-react"
import Image from "next/image"

export default function OfferStudioPage() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col xl:flex-row gap-8 animate-fade-in">

      {/* Editor Side */}
      <div className="w-full xl:w-[420px] flex flex-col gap-8 xl:overflow-y-auto pr-2">
        <div className="space-y-2">
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--subtle-foreground)] block">Offer Studio</span>
          <h1 className="text-3xl font-light tracking-tight text-[var(--foreground)]">Bespoke Curation</h1>
          <p className="text-[var(--subtle-foreground)] text-sm">Create personalized offers for VIP guests</p>
        </div>

        {/* Residency Selection */}
        <div className="space-y-4">
          <label className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">Selected Residency</label>
          <div className="glass-card p-5 flex items-center gap-5 group cursor-pointer">
            <div className="relative w-16 h-12 bg-[var(--subtle)] overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1600607687940-467f4b6020c2?q=80&w=200" alt="Residency" fill className="object-cover grayscale group-hover:grayscale-0 transition-all" />
            </div>
            <div className="flex-1">
              <div className="text-[11px] font-bold tracking-widest uppercase text-[var(--foreground)]">The Parsenn Penthouse</div>
              <div className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] mt-1">Davos Dorf · WEF Available</div>
            </div>
            <Plus className="w-4 h-4 text-[var(--subtle-foreground)] group-hover:text-[var(--foreground)] transition-colors" />
          </div>
        </div>

        {/* Logistics & Security Add-ons */}
        <div className="space-y-4">
          <label className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">Carefree Support Packages</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Shield className="w-4 h-4" />, label: "VIP Security", status: "Enabled", active: true },
              { icon: <Car className="w-4 h-4" />, label: "Elite Transport", status: "ZRH-Davos", active: true },
              { icon: <Sparkles className="w-4 h-4" />, label: "Private Chef", status: "Bespoke", active: false },
              { icon: <Plus className="w-4 h-4" />, label: "Add Service", status: "Custom", active: false },
            ].map((service, i) => (
              <div key={i} className={`p-5 border transition-all cursor-pointer ${
                service.active
                  ? "bg-[var(--foreground)] border-[var(--foreground)]"
                  : "bg-[var(--subtle)] border-[var(--border)] hover:border-[var(--subtle-foreground)]"
              }`}>
                <div className={`mb-3 ${service.active ? "text-[var(--background)]" : "text-[var(--subtle-foreground)]"}`}>{service.icon}</div>
                <div className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${service.active ? "text-[var(--background)]" : "text-[var(--foreground)]"}`}>{service.label}</div>
                <div className={`text-[8px] font-bold tracking-widest uppercase ${service.active ? "text-[var(--background)] opacity-60" : "text-[var(--subtle-foreground)]"}`}>{service.status}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="space-y-4 border-t border-[var(--border)] pt-8">
          <div className="flex justify-between items-baseline">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)]">Base Residency</span>
            <span className="text-lg font-light text-[var(--foreground)]">€18,500.00</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)]">Logistics & Security</span>
            <span className="text-lg font-light text-[var(--foreground)]">€6,500.00</span>
          </div>
          <div className="flex justify-between items-baseline pt-4 border-t border-[var(--border)]">
            <span className="text-[10px] font-bold tracking-widest uppercase text-gold">Total Valuation</span>
            <span className="text-2xl font-light text-gold">€25,000.00</span>
          </div>
        </div>

        {/* Send Action */}
        <button className="w-full bg-[var(--foreground)] text-[var(--background)] py-5 text-[11px] font-bold tracking-[0.3em] uppercase hover:opacity-90 transition-all flex items-center justify-center gap-4">
          <Send className="w-4 h-4" />
          Send to Customer
        </button>
      </div>

      {/* Preview Side */}
      <div className="flex-1 glass-card p-8 xl:p-12 flex flex-col items-center xl:overflow-y-auto bg-[var(--subtle)]">
        <div className="w-full max-w-[700px] aspect-[1/1.414] bg-white p-12 xl:p-16 shadow-2xl relative flex flex-col">
          {/* PDF Branding */}
          <div className="flex justify-between items-start mb-16">
            <div className="space-y-3">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-black">BestStayDavos</span>
              <h1 className="text-3xl font-extralight tracking-tight text-black leading-none italic font-serif">Executive Residency <br />Offer</h1>
            </div>
            <div className="text-right space-y-1">
              <div className="text-[9px] font-bold tracking-widest uppercase text-black/40">Offer No.</div>
              <div className="text-[11px] font-bold text-black tracking-widest uppercase">BSD-2026-X129</div>
            </div>
          </div>

          {/* PDF Body */}
          <div className="flex-1 space-y-12">
            <div className="grid grid-cols-2 gap-8 border-y border-black/5 py-8">
              <div className="space-y-1">
                <span className="text-[8px] font-bold tracking-widest uppercase text-black/40 block">Principal Guest</span>
                <p className="text-[12px] font-medium text-black">CEO of TechGlobal</p>
              </div>
              <div className="space-y-1 text-right">
                <span className="text-[8px] font-bold tracking-widest uppercase text-black/40 block">Stay Duration</span>
                <p className="text-[12px] font-medium text-black">Jan 18 – Jan 25, 2026</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative h-48 w-full bg-black/5 overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1600607687940-467f4b6020c2?q=80&w=800" alt="Residency" fill className="object-cover" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-light tracking-tight text-black">The Parsenn Penthouse</h3>
                <p className="text-[11px] leading-relaxed text-black/60 font-light">
                  A sanctuary of absolute discretion. Featuring 4 master suites, panoramic Alpine views, and dedicated secure workspace. Located 200m from the Davos Promenade.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-bold tracking-widest uppercase text-black">Included Carefree Services</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-black/40 stroke-[1px]" />
                  <span className="text-[10px] font-light text-black/60">Executive Protection Service</span>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="w-4 h-4 text-black/40 stroke-[1px]" />
                  <span className="text-[10px] font-light text-black/60">Elite ZRH-Davos Transfers</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-black/40 stroke-[1px]" />
                  <span className="text-[10px] font-light text-black/60">24/7 Priority Concierge</span>
                </div>
              </div>
            </div>
          </div>

          {/* PDF Footer */}
          <div className="border-t border-black/5 pt-8 mt-auto">
            <div className="flex justify-between items-end">
              <p className="text-[8px] leading-relaxed text-black/40 max-w-xs">
                This offer is valid for 48 hours. Secure handling protocols apply to all guest data and logistical arrangements.
              </p>
              <div className="text-right">
                <span className="text-[9px] font-bold tracking-widest uppercase text-black/40 block mb-1">Total Valuation</span>
                <span className="text-2xl font-light text-black italic font-serif">€25,000.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Actions */}
        <div className="flex flex-wrap gap-6 mt-8 justify-center">
          <button className="text-[var(--subtle-foreground)] hover:text-[var(--foreground)] flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" /> <span className="text-[10px] font-bold tracking-widest uppercase">Download</span>
          </button>
          <button className="text-[var(--subtle-foreground)] hover:text-[var(--foreground)] flex items-center gap-2 transition-colors">
            <Printer className="w-4 h-4" /> <span className="text-[10px] font-bold tracking-widest uppercase">Print</span>
          </button>
          <button className="text-[var(--subtle-foreground)] hover:text-[var(--foreground)] flex items-center gap-2 transition-colors">
            <Share2 className="w-4 h-4" /> <span className="text-[10px] font-bold tracking-widest uppercase">External Link</span>
          </button>
        </div>
      </div>

    </div>
  )
}
