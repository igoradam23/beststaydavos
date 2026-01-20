"use client"

import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/header"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // For the visual demo, we bypass auth and use a dummy user
  const dummyUser = {
    email: "concierge@beststaydavos.ch",
    user_metadata: { full_name: "Admin Concierge" }
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] theme-transition">
      <AdminSidebar />
      <div className="lg:pl-72">
        <AdminHeader user={dummyUser as any} />
        <main className="p-8 max-w-[1600px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
