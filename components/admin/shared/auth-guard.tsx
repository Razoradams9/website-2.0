"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false)
  const [checking, setChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem("ggg_admin")
    if (stored) {
      try {
        const data = JSON.parse(stored)
        if (data.loggedIn && data.email === "razoradams9@gmail.com") {
          setAuthorized(true)
        } else {
          router.replace("/admin/login")
        }
      } catch {
        router.replace("/admin/login")
      }
    } else {
      router.replace("/admin/login")
    }
    setChecking(false)
  }, [router])

  if (checking) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f8f9fb]">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-[#138808] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  if (!authorized) return null

  return <>{children}</>
}
