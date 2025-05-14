"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search, Bell, ChevronDown, Upload } from "lucide-react"
import { useState, useEffect } from "react" // Add these imports

interface NavbarDashboardProps {
  title: string
  subtitle?: string
  showUploadButton?: boolean
  onUploadClick?: () => void
  onLogout?: () => void
  user?: { name: string; email: string; avatarUrl?: string } | null // Make user optional
}

export default function NavbarDashboard({
  title,
  subtitle,
  showUploadButton = false,
  onUploadClick,
  user: propUser // Rename to propUser to avoid conflicts
}: NavbarDashboardProps) {
  const router = useRouter()
  const [userData, setUserData] = useState<{ name: string; email: string; avatarUrl?: string } | null>(propUser || null)

  // Fetch user data within the component
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user data from localStorage
        const userString = localStorage.getItem("user")
        if (!userString) return
        
        const user = JSON.parse(userString)
        
        // Fetch profile data from API
        const response = await fetch(`/api/profile?id=${user.id}`)
        const data = await response.json()
        
        if (data.success) {
          setUserData({
            name: data.profile.name,
            email: data.profile.email,
            avatarUrl: data.profile.profilePicture || ""
          })
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }
    
    // Only fetch if no user data was provided through props
    if (!propUser || !propUser.name) {
      fetchUserData()
    }
  }, [propUser])

  const navigateToProfile = () => {
    router.push("/dashboard/profile")
  }

  // Use the component's userData state instead of the prop
  const displayName = userData?.name || "User"
  const avatarUrl = userData?.avatarUrl || "/professional-headshot.png"

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
            <Image 
              src={avatarUrl} 
              alt={displayName} 
              width={32} 
              height={32} 
            />
          </div>
          <span className="text-sm font-medium">{displayName}</span>
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