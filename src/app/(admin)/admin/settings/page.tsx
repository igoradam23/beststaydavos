"use client"

import { Save, Mail, MessageSquare, Bell, Globe } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--subtle-foreground)] mb-3 block">
          System Configuration
        </span>
        <h1 className="text-4xl font-light tracking-tight text-[var(--foreground)]">Settings</h1>
        <p className="text-[var(--subtle-foreground)] text-sm mt-2">Configure your application settings and integrations</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[var(--border)] pb-4">
        {[
          { id: "general", label: "General", icon: Globe },
          { id: "email", label: "Email", icon: Mail },
          { id: "whatsapp", label: "WhatsApp", icon: MessageSquare },
          { id: "notifications", label: "Notifications", icon: Bell },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-[var(--foreground)] text-[var(--background)]"
                : "text-[var(--subtle-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--subtle)]"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === "general" && (
        <div className="space-y-8">
          <div className="glass-card p-8 space-y-6">
            <div>
              <h2 className="text-lg font-light text-[var(--foreground)] mb-1">Business Information</h2>
              <p className="text-[11px] text-[var(--subtle-foreground)]">Basic information about your business</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">Business Name</label>
                <input
                  type="text"
                  defaultValue="BestStayDavos"
                  className="w-full bg-[var(--subtle)] border border-[var(--border)] py-3 px-4 text-[12px] text-[var(--foreground)] placeholder:text-[var(--subtle-foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">Website URL</label>
                <input
                  type="text"
                  defaultValue="https://beststaydavos.ch"
                  className="w-full bg-[var(--subtle)] border border-[var(--border)] py-3 px-4 text-[12px] text-[var(--foreground)] placeholder:text-[var(--subtle-foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">Phone Number</label>
                <input
                  type="text"
                  defaultValue="+41 00 000 00 00"
                  className="w-full bg-[var(--subtle)] border border-[var(--border)] py-3 px-4 text-[12px] text-[var(--foreground)] placeholder:text-[var(--subtle-foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">Contact Email</label>
                <input
                  type="email"
                  defaultValue="info@beststaydavos.ch"
                  className="w-full bg-[var(--subtle)] border border-[var(--border)] py-3 px-4 text-[12px] text-[var(--foreground)] placeholder:text-[var(--subtle-foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">Address</label>
              <textarea
                defaultValue="Davos, Switzerland"
                rows={2}
                className="w-full bg-[var(--subtle)] border border-[var(--border)] py-3 px-4 text-[12px] text-[var(--foreground)] placeholder:text-[var(--subtle-foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20 transition-all resize-none"
              />
            </div>
          </div>

          <div className="glass-card p-8 space-y-6">
            <div>
              <h2 className="text-lg font-light text-[var(--foreground)] mb-1">Offer Settings</h2>
              <p className="text-[11px] text-[var(--subtle-foreground)]">Default settings for generated offers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">Offer Validity (days)</label>
                <input
                  type="number"
                  defaultValue="7"
                  className="w-full bg-[var(--subtle)] border border-[var(--border)] py-3 px-4 text-[12px] text-[var(--foreground)] placeholder:text-[var(--subtle-foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">Deposit Percentage</label>
                <input
                  type="number"
                  defaultValue="50"
                  className="w-full bg-[var(--subtle)] border border-[var(--border)] py-3 px-4 text-[12px] text-[var(--foreground)] placeholder:text-[var(--subtle-foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">Default Terms & Conditions</label>
              <textarea
                rows={4}
                defaultValue={`• A 50% deposit is required to confirm the booking.
• The remaining balance is due 30 days before check-in.
• Cancellation within 60 days of check-in: 50% refund.
• Cancellation within 30 days of check-in: No refund.`}
                className="w-full bg-[var(--subtle)] border border-[var(--border)] py-3 px-4 text-[12px] text-[var(--foreground)] placeholder:text-[var(--subtle-foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20 transition-all resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-gold text-black px-8 py-3.5 text-[10px] font-bold tracking-widest uppercase hover:opacity-90 transition-all flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Email Settings */}
      {activeTab === "email" && (
        <div className="space-y-8">
          <div className="glass-card p-8 space-y-6">
            <div>
              <h2 className="text-lg font-light text-[var(--foreground)] mb-1">Email Configuration</h2>
              <p className="text-[11px] text-[var(--subtle-foreground)]">Configure your email sending settings (Resend)</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">Resend API Key</label>
                <input
                  type="password"
                  placeholder="re_xxxxxxxxxx"
                  className="w-full bg-[var(--subtle)] border border-[var(--border)] py-3 px-4 text-[12px] text-[var(--foreground)] placeholder:text-[var(--subtle-foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20 transition-all"
                />
                <p className="text-[10px] text-[var(--subtle-foreground)]">
                  Get your API key from <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">resend.com</a>
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">From Email Address</label>
                <input
                  type="email"
                  defaultValue="bookings@beststaydavos.ch"
                  className="w-full bg-[var(--subtle)] border border-[var(--border)] py-3 px-4 text-[12px] text-[var(--foreground)] placeholder:text-[var(--subtle-foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">Reply-To Email Address</label>
                <input
                  type="email"
                  defaultValue="info@beststaydavos.ch"
                  className="w-full bg-[var(--subtle)] border border-[var(--border)] py-3 px-4 text-[12px] text-[var(--foreground)] placeholder:text-[var(--subtle-foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="glass-card p-8 space-y-6">
            <div>
              <h2 className="text-lg font-light text-[var(--foreground)] mb-1">Email Templates</h2>
              <p className="text-[11px] text-[var(--subtle-foreground)]">Customize your automated email templates</p>
            </div>
            <div className="space-y-3">
              {[
                { name: "Booking Confirmation", desc: "Sent when a new booking request is received" },
                { name: "Offer Sent", desc: "Sent with the personalized offer PDF" },
                { name: "Payment Reminder", desc: "Reminder for pending payments" },
              ].map((template, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-[var(--subtle)] border border-[var(--border)]">
                  <div>
                    <p className="text-[12px] font-medium text-[var(--foreground)]">{template.name}</p>
                    <p className="text-[10px] text-[var(--subtle-foreground)]">{template.desc}</p>
                  </div>
                  <button className="text-[10px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] hover:text-[var(--foreground)] border border-[var(--border)] px-4 py-2 hover:border-[var(--foreground)] hover:border-opacity-30 transition-all">
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-gold text-black px-8 py-3.5 text-[10px] font-bold tracking-widest uppercase hover:opacity-90 transition-all flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* WhatsApp Settings */}
      {activeTab === "whatsapp" && (
        <div className="space-y-8">
          <div className="glass-card p-8 space-y-6">
            <div>
              <h2 className="text-lg font-light text-[var(--foreground)] mb-1">WhatsApp Business API</h2>
              <p className="text-[11px] text-[var(--subtle-foreground)]">Connect your WhatsApp Business account for automated messaging</p>
            </div>
            <div className="p-4 bg-[var(--subtle)] border border-[var(--border)]">
              <p className="text-[11px] text-[var(--subtle-foreground)]">
                WhatsApp Business API integration requires a verified Meta Business account.
                <a href="https://business.whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline ml-1">
                  Learn more
                </a>
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">Phone Number ID</label>
                <input
                  type="text"
                  placeholder="Enter your WhatsApp Phone Number ID"
                  className="w-full bg-[var(--subtle)] border border-[var(--border)] py-3 px-4 text-[12px] text-[var(--foreground)] placeholder:text-[var(--subtle-foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">Access Token</label>
                <input
                  type="password"
                  placeholder="Enter your access token"
                  className="w-full bg-[var(--subtle)] border border-[var(--border)] py-3 px-4 text-[12px] text-[var(--foreground)] placeholder:text-[var(--subtle-foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block">Verify Token</label>
                <input
                  type="text"
                  placeholder="Enter your webhook verify token"
                  className="w-full bg-[var(--subtle)] border border-[var(--border)] py-3 px-4 text-[12px] text-[var(--foreground)] placeholder:text-[var(--subtle-foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-20 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-gold text-black px-8 py-3.5 text-[10px] font-bold tracking-widest uppercase hover:opacity-90 transition-all flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Notification Settings */}
      {activeTab === "notifications" && (
        <div className="space-y-8">
          <div className="glass-card p-8 space-y-6">
            <div>
              <h2 className="text-lg font-light text-[var(--foreground)] mb-1">Admin Notifications</h2>
              <p className="text-[11px] text-[var(--subtle-foreground)]">Configure when and how you receive notifications</p>
            </div>
            <div className="space-y-4">
              {[
                { name: "New Booking Request", desc: "Get notified when a new booking request arrives", default: true },
                { name: "Offer Accepted", desc: "Get notified when a guest accepts an offer", default: true },
                { name: "New Message", desc: "Get notified for new customer messages", default: true },
                { name: "Offer Expiring", desc: "Get reminded before an offer expires", default: true },
              ].map((notification, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-[var(--subtle)] border border-[var(--border)]">
                  <div>
                    <p className="text-[12px] font-medium text-[var(--foreground)]">{notification.name}</p>
                    <p className="text-[10px] text-[var(--subtle-foreground)]">{notification.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked={notification.default}
                    className="h-4 w-4 accent-gold"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-gold text-black px-8 py-3.5 text-[10px] font-bold tracking-widest uppercase hover:opacity-90 transition-all flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
