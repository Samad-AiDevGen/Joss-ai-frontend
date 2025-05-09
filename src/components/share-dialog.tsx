"use client"

import { useState, useRef } from "react"
import { X, Copy, Check } from "lucide-react"

interface ShareDialogProps {
  isOpen: boolean
  onClose: () => void
  videoId: string
  videoTitle: string
}

export default function ShareDialog({ isOpen, onClose, videoId, videoTitle }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)
  const linkRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  // Generate a shareable link based on the video ID
  const shareableLink = `https://www.jossai.com/video/${videoId}/${encodeURIComponent(videoTitle)}`

  const handleCopyLink = () => {
    if (linkRef.current) {
      linkRef.current.select()
      document.execCommand("copy")
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareOptions = [
    {
      name: "Chat",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#FFFFFF",
      textColor: "#111111",
    },
    {
      name: "Telegram",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 2L11 13" stroke="#229ED9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M22 2L15 22L11 13L2 9L22 2Z"
            stroke="#229ED9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#FFFFFF",
      textColor: "#229ED9",
    },
    {
      name: "Twitter",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M23 3.00005C22.0424 3.67552 20.9821 4.19216 19.86 4.53005C19.2577 3.83756 18.4573 3.34674 17.567 3.12397C16.6767 2.90121 15.7395 2.95724 14.8821 3.2845C14.0247 3.61176 13.2884 4.19445 12.773 4.95376C12.2575 5.71308 11.9877 6.61238 12 7.53005V8.53005C10.2426 8.57561 8.50127 8.18586 6.93101 7.39549C5.36074 6.60513 4.01032 5.43868 3 4.00005C3 4.00005 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.50005C20.9991 7.2215 20.9723 6.94364 20.92 6.67005C21.9406 5.66354 22.6608 4.39276 23 3.00005Z"
            stroke="#1DA1F2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#FFFFFF",
      textColor: "#1DA1F2",
    },
    {
      name: "Whatsapp",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.5025 3.49246C18.2486 1.24284 15.2548 0 12.0482 0C5.46314 0 0.100296 5.34822 0.100296 11.9146C0.100296 14.0208 0.651867 16.0743 1.70296 17.8714L0 24L6.29349 22.3344C8.0219 23.2839 9.9996 23.7867 12.0429 23.7867H12.0482C18.628 23.7867 24 18.4385 24 11.8721C24 8.67471 22.7564 5.74208 20.5025 3.49246ZM12.0482 21.7866C10.2667 21.7866 8.52456 21.3046 7.02456 20.4077L6.66667 20.1929L2.89526 21.1424L3.86314 17.4734L3.62456 17.1013C2.63526 15.5505 2.11053 13.7587 2.11053 11.9146C2.11053 6.45316 6.57193 2.00526 12.0535 2.00526C14.7083 2.00526 17.1822 3.03683 19.0454 4.89474C20.9086 6.75264 21.9947 9.22208 21.9894 11.8721C21.9894 17.3388 17.528 21.7866 12.0482 21.7866ZM17.4954 14.4077C17.1905 14.2557 15.7128 13.5344 15.4345 13.4344C15.1562 13.3344 14.9548 13.2876 14.7534 13.5928C14.552 13.8981 13.9799 14.5663 13.8051 14.7678C13.6303 14.9692 13.4556 14.9905 13.1506 14.8385C12.8457 14.6865 11.8617 14.3678 10.7031 13.3344C9.79526 12.5238 9.18667 11.5319 9.01193 11.2266C8.8372 10.9214 8.99349 10.7587 9.14456 10.6067C9.28035 10.4706 9.44456 10.2505 9.59563 10.0759C9.7467 9.90139 9.79349 9.77471 9.89349 9.57322C9.99349 9.37173 9.9467 9.19722 9.8734 9.04522C9.79349 8.89322 9.18667 7.41897 8.93877 6.80834C8.69088 6.21302 8.43667 6.29302 8.25193 6.28249C8.0672 6.27197 7.86579 6.27197 7.66438 6.27197C7.46297 6.27197 7.13807 6.35197 6.85982 6.65723C6.58158 6.96249 5.81193 7.68379 5.81193 9.15804C5.81193 10.6323 6.88158 12.0539 7.03265 12.2554C7.18372 12.4569 9.18035 15.5399 12.2443 16.8349C12.9548 17.1401 13.5112 17.3282 13.9428 17.4734C14.6534 17.7154 15.3006 17.6792 15.8143 17.5964C16.3862 17.5029 17.5765 16.8667 17.8244 16.1507C18.0723 15.4347 18.0723 14.8241 17.9923 14.7678C17.9123 14.7116 17.7003 14.6597 17.4954 14.4077Z"
            fill="#25D366"
          />
        </svg>
      ),
      color: "#FFFFFF",
      textColor: "#25D366",
    },
    {
      name: "Email",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
            stroke="#6366F1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#EEF2FF"
          />
          <path d="M22 6L12 13L2 6" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      color: "#EEF2FF",
      textColor: "#6366F1",
    },
    {
      name: "More",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#FFFFFF",
      textColor: "#111111",
    },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Share with</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Share options */}
        <div className="grid grid-cols-6 gap-4 mb-8">
          {shareOptions.map((option) => (
            <div key={option.name} className="flex flex-col items-center">
              <button
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-1`}
                style={{ backgroundColor: option.color }}
              >
                {option.icon}
              </button>
              <span className="text-xs" style={{ color: option.textColor }}>
                {option.name}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-gray-500 mb-4">Or share with link</div>

        {/* Shareable link */}
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <input
            ref={linkRef}
            type="text"
            value={shareableLink}
            readOnly
            className="flex-1 px-3 py-2 outline-none text-sm"
          />
          <button
            onClick={handleCopyLink}
            className="bg-white px-3 py-2 text-gray-600 hover:text-gray-900"
            title={copied ? "Copied!" : "Copy to clipboard"}
          >
            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
          </button>
        </div>
      </div>
    </div>
  )
}
