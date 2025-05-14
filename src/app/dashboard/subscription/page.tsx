"use client"

import { useState } from "react"
import { ChevronDown, CreditCard, Lock } from "lucide-react"
import { Input } from "@/components/ui/input"
import NavbarDashboard from "@/components/NavbarDashboard"

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState("quarterly")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("creditCard")

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header - Using NavbarDashboard */}
      <div className="border-b bg-white px-6 py-3">
        <NavbarDashboard
          title="Payment"
          showUploadButton={false}
          // user={{ name: "Jane Smith", email: "jane.smith@example.com" }}
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Payment Details */}
          <div className="lg:col-span-2">
            {/* Upgrade Section */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-bold mb-1">Upgrade Premium to Get More Features</h2>
              <p className="text-sm sm:text-base text-gray-500">
                Enjoy all features & benefits without any restrictions.
              </p>
            </div>

            {/* Billing Information */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Billed To</label>
              <Input
                type="text"
                placeholder="Jane Smith"
                defaultValue="Jane Smith"
                className="w-full p-2 sm:p-3 border border-gray-200 rounded-md"
              />
            </div>

            {/* Payment Methods Tabs */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Payment Details</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-6">
                <button
                  className={`flex items-center justify-center p-3 sm:p-4 rounded-md ${
                    selectedPaymentMethod === "creditCard"
                      ? "bg-purple-100 border-2 border-purple-600"
                      : "bg-white border border-gray-200"
                  }`}
                  onClick={() => setSelectedPaymentMethod("creditCard")}
                >
                  <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mr-2" />
                  <span className="text-xs sm:text-sm font-medium">Credit Card</span>
                </button>

                <button
                  className={`flex items-center justify-center p-3 sm:p-4 rounded-md ${
                    selectedPaymentMethod === "bankTransfer"
                      ? "bg-purple-100 border-2 border-purple-600"
                      : "bg-white border border-gray-200"
                  }`}
                  onClick={() => setSelectedPaymentMethod("bankTransfer")}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 sm:w-5 sm:h-5"
                  >
                    <rect x="2" y="6" width="20" height="12" rx="2" stroke="#6b7280" strokeWidth="2" />
                    <path d="M22 10H2" stroke="#6b7280" strokeWidth="2" />
                  </svg>
                  <span className="text-xs sm:text-sm font-medium">Bank Transfer</span>
                </button>

                <button
                  className={`flex items-center justify-center p-3 sm:p-4 rounded-md ${
                    selectedPaymentMethod === "paypal"
                      ? "bg-purple-100 border-2 border-purple-600"
                      : "bg-white border border-gray-200"
                  }`}
                  onClick={() => setSelectedPaymentMethod("paypal")}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 sm:w-5 sm:h-5"
                  >
                    <path
                      d="M19.5 8.5h-2a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2z"
                      stroke="#6b7280"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 12.5v3.5a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v3"
                      stroke="#6b7280"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-xs sm:text-sm font-medium">Paypal</span>
                </button>
              </div>

              {/* Credit Card Form */}
              {selectedPaymentMethod === "creditCard" && (
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Card Number"
                      defaultValue="6508 8234 3354 7832"
                      className="w-full p-2 sm:p-3 border border-gray-200 rounded-md pr-12"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="20" rx="2" fill="#F7F7F7" />
                        <circle cx="12" cy="10" r="6" fill="#EB001B" fillOpacity="0.8" />
                        <circle cx="20" cy="10" r="6" fill="#F79E1B" fillOpacity="0.8" />
                        <path
                          d="M16 14.5C17.3807 13.4157 18.2 11.7893 18.2 10C18.2 8.21066 17.3807 6.58433 16 5.5C14.6193 6.58433 13.8 8.21066 13.8 10C13.8 11.7893 14.6193 13.4157 16 14.5Z"
                          fill="#FF8000"
                          fillOpacity="0.7"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="text"
                      placeholder="MM/YY"
                      defaultValue="21/04"
                      className="w-full p-2 sm:p-3 border border-gray-200 rounded-md"
                    />
                    <Input
                      type="text"
                      placeholder="CVC"
                      defaultValue="786"
                      className="w-full p-2 sm:p-3 border border-gray-200 rounded-md"
                    />
                  </div>

                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Country"
                      defaultValue="United States"
                      className="w-full p-2 sm:p-3 border border-gray-200 rounded-md"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Terms */}
            <div className="text-xs text-gray-500 mb-6">
              By providing your card information, you allow us to charge your card for future payment in accordance with
              their terms.
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 border border-gray-200 rounded-md text-gray-700 font-medium order-2 sm:order-1">
                Cancel
              </button>
              <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-purple-600 text-white rounded-md font-medium order-1 sm:order-2">
                Subscribe
              </button>
            </div>
          </div>

          {/* Right Column - Subscription Plans */}
          <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-100 relative">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="#9333EA" strokeWidth="2" />
                  <path d="M3 10H21" stroke="#9333EA" strokeWidth="2" />
                  <path d="M7 15H13" stroke="#9333EA" strokeWidth="2" />
                </svg>
              </div>
              <h2 className="text-base sm:text-lg font-bold">Subscription Plan</h2>
            </div>

            {/* Plan Options */}
            <div className="space-y-3 sm:space-y-4">
              {/* Monthly Plan */}
              <div
                className={`border rounded-lg p-3 sm:p-4 ${
                  selectedPlan === "monthly" ? "border-purple-600" : "border-gray-200"
                } cursor-pointer`}
                onClick={() => setSelectedPlan("monthly")}
              >
                <div className="flex items-center">
                  <div className="mr-3">
                    <div
                      className={`w-5 h-5 rounded-full border ${
                        selectedPlan === "monthly" ? "border-purple-600" : "border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {selectedPlan === "monthly" && <div className="w-3 h-3 rounded-full bg-purple-600"></div>}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base">Pay Monthly</h3>
                    <p className="text-xs sm:text-sm text-blue-500">$20 / Month</p>
                  </div>
                </div>
              </div>

              {/* Quarterly Plan */}
              <div
                className={`border rounded-lg p-3 sm:p-4 ${
                  selectedPlan === "quarterly" ? "border-purple-600 bg-purple-50" : "border-gray-200"
                } cursor-pointer`}
                onClick={() => setSelectedPlan("quarterly")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <div
                        className={`w-5 h-5 rounded-full border ${
                          selectedPlan === "quarterly" ? "border-purple-600" : "border-gray-300"
                        } flex items-center justify-center`}
                      >
                        {selectedPlan === "quarterly" && <div className="w-3 h-3 rounded-full bg-purple-600"></div>}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm sm:text-base">Pay Quarterly</h3>
                      <p className="text-xs sm:text-sm text-blue-500">$60 / Quarterly</p>
                    </div>
                  </div>
                  <div className="bg-purple-600 text-white text-xs px-2 py-1 rounded">Save 15%</div>
                </div>
              </div>

              {/* Annual Plan */}
              <div
                className={`border rounded-lg p-3 sm:p-4 ${
                  selectedPlan === "annual" ? "border-purple-600" : "border-gray-200"
                } cursor-pointer`}
                onClick={() => setSelectedPlan("annual")}
              >
                <div className="flex items-center">
                  <div className="mr-3">
                    <div
                      className={`w-5 h-5 rounded-full border ${
                        selectedPlan === "annual" ? "border-purple-600" : "border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {selectedPlan === "annual" && <div className="w-3 h-3 rounded-full bg-purple-600"></div>}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base">Pay Annual</h3>
                    <p className="text-xs sm:text-sm text-blue-500">$120 / Annual</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="mt-6 sm:mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm sm:text-base">Total</h3>
                <div className="text-lg sm:text-xl font-bold">$16 / Month</div>
              </div>

              <div className="flex items-start text-xs text-gray-500">
                <Lock className="h-4 w-4 mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                <p>
                  Guaranteed to be safe & secure, all transactions are protected with the highest level of security.
                </p>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="hidden sm:block absolute bottom-0 right-0 opacity-20 pointer-events-none">
              <svg width="120" height="120" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="100" fill="url(#paint0_linear)" />
                <defs>
                  <linearGradient id="paint0_linear" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9333EA" />
                    <stop offset="1" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
