"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Settings, Crown, HelpCircle, Upload, ChevronRight } from "lucide-react"

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
}

const SidebarItem = ({ icon, label, href, active }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        active ? "bg-purple-100 text-purple-600" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <div className={`${active ? "text-purple-600" : "text-gray-500"}`}>{icon}</div>
      <span className="font-medium text-sm">{label}</span>
      {active && <ChevronRight className="ml-auto h-4 w-4 text-purple-600" />}
    </Link>
  )
}

export default function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const sidebarItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      href: "/dashboard/settings",
    },
    {
      icon: <Crown size={20} />,
      label: "Premium",
      href: "/dashboard/premium",
    },
    {
      icon: <HelpCircle size={20} />,
      label: "Help Center",
      href: "/dashboard/help",
    },
  ]

  return (
    <>
      {/* Mobile Toggle Button - Visible only on mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-md shadow-md"
        aria-label="Toggle Sidebar"
      >
        {isCollapsed ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        )}
      </button>

      {/* Sidebar - Hidden on mobile when collapsed */}
      <aside
        className={`w-[240px] min-h-screen border-r border-gray-200 bg-white flex flex-col fixed md:relative z-40 transition-all duration-300 ${
          isCollapsed ? "-translate-x-full" : "translate-x-0"
        } md:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6">
          <Link href="/dashboard">
            <Image src="/joss-logo.png" alt="JOSS" width={80} height={30} priority />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={pathname === item.href}
              />
            ))}
          </div>
        </nav>

        {/* Sign Out Button */}
        <div className="p-4 mt-auto">
          <button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <Upload size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile - only visible when sidebar is open on mobile */}
      {!isCollapsed && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={toggleSidebar} aria-hidden="true" />
      )}
    </>
  )
}
