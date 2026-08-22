"use client"
import React from "react"
import { Search, LogOut, Home } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function AdminTopbar() {
  function handleLogout() {
    localStorage.removeItem("ggg_admin")
    window.location.href = "/admin/login"
  }

  return (
    <header className="h-16 lg:h-20 border-b border-gray-100 bg-white flex items-center justify-between px-6 flex-shrink-0">
      {/* Search */}
      <div className="relative w-full max-w-sm hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input placeholder="Search..." className="pl-9 bg-gray-50 border-gray-200 h-9 text-sm" />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 ml-auto">
        <Link href="/" target="_blank" className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#138808] transition-colors">
          <Home className="w-3.5 h-3.5" /> View Website
        </Link>

        <div className="w-px h-6 bg-gray-200" />

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#138808] flex items-center justify-center text-white font-bold text-xs">A</div>
          <div className="hidden md:block">
            <p className="text-xs font-semibold text-gray-800 leading-tight">Admin</p>
            <p className="text-[10px] text-gray-400">School Administrator</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-600 transition-colors ml-2 px-2 py-1.5 rounded-lg hover:bg-red-50"
        >
          <LogOut className="w-3.5 h-3.5" /> Logout
        </button>
      </div>
    </header>
  )
}
