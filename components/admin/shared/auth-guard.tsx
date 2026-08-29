"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAdminLoggedIn } from "@/lib/admin-session"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false)
  const [checking, setChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (isAdminLoggedIn()) {
      setAuthorized(true)
    } else {
      router.replace("/admin/login")
    }
    setChecking(false)
  }, [router])

  if (checking) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f8f9fb]">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-[#1e40af] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  if (!authorized) return null

  return <>{children}</>
}
