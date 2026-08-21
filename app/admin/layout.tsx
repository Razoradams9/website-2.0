import { AdminSidebar } from "@/components/admin/shared/admin-sidebar"
import { AdminTopbar } from "@/components/admin/shared/admin-topbar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9fb]">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminTopbar />
        <main className="flex-1 overflow-y-auto p-6 admin-scroll">{children}</main>
      </div>
    </div>
  )
}
