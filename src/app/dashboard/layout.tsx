// src/app/dashboard/layout.tsx
import type React from "react"
// import Sidebar from "@/components/dashboard/sidebar"
import Sidebar from "@/components/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  )
}