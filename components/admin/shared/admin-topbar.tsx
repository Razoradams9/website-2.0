"use client"
import React from "react"
import { Bell, Search, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function AdminTopbar() {
  return (
    <header className="h-16 lg:h-20 border-b border-gray-100 bg-white flex items-center justify-between px-6 flex-shrink-0">
      {/* Search */}
      <div className="relative w-full max-w-sm hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input placeholder="Search students, staff, notices..." className="pl-9 bg-gray-50 border-gray-200 h-9 text-sm" />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 ml-auto">
        <button className="relative w-9 h-9 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors">
          <Bell className="w-4 h-4 text-gray-600" />
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white text-[8px] text-white font-bold flex items-center justify-center">3</span>
        </button>

        <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
          <div className="w-8 h-8 rounded-lg bg-[#138808] flex items-center justify-center text-white font-bold text-xs">SA</div>
          <div className="hidden md:block">
            <p className="text-xs font-semibold text-gray-800 leading-tight">Super Admin</p>
            <p className="text-[10px] text-gray-400">superadmin@dav...</p>
          </div>
        </div>
      </div>
    </header>
  )
}
