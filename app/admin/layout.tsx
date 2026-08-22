"use client"
import { usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/shared/admin-sidebar"
import { AdminTopbar } from "@/components/admin/shared/admin-topbar"
import { AuthGuard } from "@/components/admin/shared/auth-guard"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Login page — no sidebar, no auth check
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  // All other admin pages — require login
  return (
    <AuthGuard>
      <div className="flex h-screen overflow-hidden bg-[#f8f9fb]">
        <AdminSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminTopbar />
          <main className="flex-1 overflow-y-auto p-6 admin-scroll">{children}</main>
        </div>
      </div>
    </AuthGuard>
  )
}
