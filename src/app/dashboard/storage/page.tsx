"use client"
import Image from "next/image"
import { MoreHorizontal } from "lucide-react"
import NavbarDashboard from "@/components/NavbarDashboard"

export default function StoragePage() {
  const storageData = {
    used: "28.6 GB",
    total: "50 GB",
    percentage: 57, // 28.6/50 * 100
  }

  const categories = [
    {
      id: "save",
      title: "Save",
      count: "0 videos",
      color: "bg-purple-500",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.83301 8.33301L9.99967 12.4997L14.1663 8.33301"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M10 12.5V2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "cloud",
      title: "Cloud",
      count: "0 videos",
      color: "bg-purple-400",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.6663 13.3333C17.5507 12.7362 18.2077 11.8507 18.5347 10.8335C18.8617 9.81632 18.8424 8.72289 18.4798 7.71846C18.1172 6.71404 17.4308 5.85249 16.5269 5.28239C15.6231 4.71229 14.5538 4.46633 13.4997 4.58333C13.0598 3.41675 12.2476 2.42689 11.1852 1.78568C10.1227 1.14447 8.87694 0.891129 7.65521 1.06645C6.43348 1.24177 5.31147 1.83598 4.47466 2.75204C3.63786 3.6681 3.13531 4.85121 3.04967 6.10833C2.28094 6.40774 1.61406 6.91657 1.13339 7.57339C0.652722 8.23022 0.379116 9.00984 0.346431 9.81851C0.313746 10.6272 0.523497 11.4268 0.949588 12.1211C1.37568 12.8153 1.99953 13.3759 2.74967 13.7333"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.8337 10L8.33366 12.5L10.8337 15"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.6663 15L14.1663 12.5L16.6663 10"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "draft",
      title: "Draft",
      count: "0 videos",
      color: "bg-pink-400",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.6663 10V15.8333C16.6663 16.2754 16.4907 16.6993 16.1782 17.0118C15.8656 17.3244 15.4417 17.5 14.9997 17.5H4.16634C3.72431 17.5 3.30039 17.3244 2.98782 17.0118C2.67526 16.6993 2.49967 16.2754 2.49967 15.8333V4.16667C2.49967 3.72464 2.67526 3.30072 2.98782 2.98816C3.30039 2.67559 3.72431 2.5 4.16634 2.5H10.833"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.1663 1.66699L17.4997 5.00033L9.99967 12.5003"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ]

  const recentVideos = [
    {
      id: "1",
      title: "Example Photo 1",
      duration: "00:45",
      thumbnail: "/elderly-woman-portrait.png",
    },
    {
      id: "3",
      title: "Example Photo 3",
      duration: "02:35",
      thumbnail: "/elderly-man-smiling-hat.png",
    },
    {
      id: "4",
      title: "Example Photo 4",
      duration: "03:50",
      thumbnail: "/serious-elderly-man.png",
    },
    {
      id: "5",
      title: "Example Photo 5",
      duration: "01:20",
      thumbnail: "/elderly-woman-glasses.png",
    },
    {
      id: "6",
      title: "Example Photo 6",
      duration: "04:15",
      thumbnail: "/middle-aged-man-portrait.png",
    },
    {
      id: "7",
      title: "Example Photo 7",
      duration: "02:40",
      thumbnail: "/elderly-man-beard.png",
    },
  ]

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header - Using NavbarDashboard */}
      <div className="border-b bg-white px-6 py-3">
        <NavbarDashboard title="Storage" showUploadButton={false} />
      </div>

      <div className="p-3 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Category Cards */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`${category.color} rounded-lg p-3 sm:p-4 text-white cursor-pointer hover:opacity-90 transition-opacity`}
                >
                  <div className="flex items-center mb-1 sm:mb-2">
                    <div className="flex-shrink-0">{category.icon}</div>
                    <h3 className="ml-2 font-bold text-sm sm:text-base truncate">{category.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-white/80">{category.count}</p>
                </div>
              ))}
            </div>

            {/* Recent Videos */}
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2C11.3 2 14 4.7 14 8C14 11.3 11.3 14 8 14Z"
                        fill="#9333EA"
                      />
                      <path d="M6 5L11 8L6 11V5Z" fill="#9333EA" />
                    </svg>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold">Recent Videos</h2>
                </div>
                <button>
                  <MoreHorizontal className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {recentVideos.map((video) => (
                  <div key={video.id} className="group">
                    <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        fill
                        className="object-cover"
                      />
                      {/* Green recording indicator */}
                      <div className="absolute top-2 right-2 bg-green-400 rounded-full w-5 sm:w-6 h-5 sm:h-6 flex items-center justify-center">
                        <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <h3 className="font-medium text-xs sm:text-sm truncate">{video.title}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">{video.duration}</span>
                      <button className="bg-indigo-900 text-white text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-md">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm relative">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg font-bold">Your Storage</h2>
                <div className="w-8 sm:w-10 h-8 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="sm:w-5 sm:h-5"
                  >
                    <path
                      d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5"
                      stroke="#3B82F6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.83301 8.33301L9.99967 12.4997L14.1663 8.33301"
                      stroke="#3B82F6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 12.5V2.5"
                      stroke="#3B82F6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
                Supervise your drive space
                <br />
                in the easiest way
              </p>

              <div className="mb-4 sm:mb-6">
                <div className="flex justify-between text-xs sm:text-sm mb-2">
                  <span>{storageData.used}</span>
                  <span>{storageData.total}</span>
                </div>
                <div className="w-full h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${storageData.percentage}%` }}
                  ></div>
                </div>
              </div>

              <button className="w-full bg-white border border-blue-500 text-blue-500 rounded-lg py-1.5 sm:py-2 text-sm font-medium hover:bg-blue-50 transition-colors">
                Get More Storage
              </button>

              {/* Decorative illustration */}
              <div className="mt-6 sm:mt-10 flex justify-center">
                <Image
                  src="/storage-illustration.png"
                  alt="Storage illustration"
                  width={150}
                  height={112}
                  className="w-[150px] sm:w-[200px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
