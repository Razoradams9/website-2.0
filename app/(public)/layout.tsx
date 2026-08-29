import { PublicHeader } from "@/components/layout/public-header"
import { PublicFooter } from "@/components/layout/public-footer"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Fixed campus photo behind the whole site — the visual centerpiece */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/campus-hero.jpg')" }}
      />
      {/* Very light veil — just enough to soften, photo stays clearly visible */}
      <div className="fixed inset-0 -z-10 bg-white/25" />

      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  )
}
