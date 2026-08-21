import React from "react"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface PageHeroProps {
  title: string
  subtitle?: string
  breadcrumbs?: { label: string; href?: string }[]
}

export function PageHero({ title, subtitle, breadcrumbs = [] }: PageHeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-[#1a3c6e] via-[#0d1f3c] to-[#1a3c6e] text-white overflow-hidden">
      {/* Pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c8a951]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-16 md:py-20 relative">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Home className="w-3 h-3" /> Home
          </Link>
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              <ChevronRight className="w-3 h-3 text-gray-600" />
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-white transition-colors">{crumb.label}</Link>
              ) : (
                <span className="text-[#c8a951]">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">{title}</h1>
        {subtitle && <p className="mt-3 text-gray-300 text-base md:text-lg max-w-2xl">{subtitle}</p>}
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 40" fill="none" className="w-full h-6 md:h-10 text-white">
          <path d="M0 40V20C360 0 720 0 1080 20C1260 30 1350 35 1440 40V40H0Z" fill="currentColor"/>
        </svg>
      </div>
    </section>
  )
}
