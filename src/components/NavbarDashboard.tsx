"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search, Bell, ChevronDown, Upload } from "lucide-react"

interface NavbarDashboardProps {
  title: string
  subtitle?: string
  showUploadButton?: boolean
  onUploadClick?: () => void
  onLogout?: () => void // Add logout handler
  user: { name: string; email: string; avatarUrl?: string } | null // Add user property
  
}

export default function NavbarDashboard({
  title,
  subtitle,
  showUploadButton = false,
  onUploadClick,
}: NavbarDashboardProps) {
  const router = useRouter()

  const navigateToProfile = () => {
    router.push("/dashboard/profile")
  }

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4 pl-12 md:pl-0">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500">({subtitle})</p>}
        </div>
        {/* Upload Photo Button - Only shown when needed */}
        {showUploadButton && (
          <button
            className="self-start md:ml-6 border border-purple-600 text-purple-600 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5"
            onClick={onUploadClick}
          >
            <Upload size={14} />
            Upload Photo
          </button>
        )}
      </div>

      {/* Desktop Header Actions - Hidden on mobile */}
      <div className="hidden md:flex items-center gap-4">
        <button className="bg-purple-100 text-purple-600 px-4 py-1.5 rounded-full text-sm font-medium">
          Download App
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <Search className="h-4 w-4 text-gray-600" />
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <Bell className="h-4 w-4 text-gray-600" />
        </div>
        <div className="flex items-center gap-2 cursor-pointer" onClick={navigateToProfile}>
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image src="/professional-headshot.png" alt="Rob John Gonzalez" width={32} height={32} />
          </div>
          <span className="text-sm font-medium">Rob John Gonzalez</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>

      {/* Mobile Header Actions */}
      <div className="flex md:hidden items-center justify-between">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <Search className="h-4 w-4 text-gray-600" />
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <Bell className="h-4 w-4 text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  )
}
