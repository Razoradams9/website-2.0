import Link from "next/link"
import { GraduationCap, LogOut, Home } from "lucide-react"

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* Portal Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="https://lh3.googleusercontent.com/d/1sIthpiMwvMfJRQ-bAibcvKZrOMZqB0Pi" alt="GGG" className="w-8 h-8 rounded-lg object-contain" />
            <span className="font-bold text-[#138808] text-sm hidden sm:block">Guru Gorakshnath Gyanasthali</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs text-gray-500 hover:text-[#138808] flex items-center gap-1 transition-colors">
              <Home className="w-3.5 h-3.5" /> School Website
            </Link>
            <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-600 transition-colors">
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
