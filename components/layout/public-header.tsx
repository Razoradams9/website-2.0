"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu, X, ChevronDown, Phone, Mail, Facebook, Instagram,
  GraduationCap, BookOpen, Users, Building2, Image, Info,
  MapPin
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

function LogoImage({ className }: { className?: string }) {
  return (
    <img
      src="/images/logo.jpeg"
      alt="Guru Gorakshnath Gyanasthali"
      className={cn("object-contain drop-shadow-md", className)}
    />
  )
}

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    icon: Info,
    children: [
      { label: "History & Vision", href: "/about/history", icon: BookOpen, desc: "Our journey and founding values" },
      { label: "Mission & Objectives", href: "/about/mission", icon: GraduationCap, desc: "What drives us every day" },
      { label: "Infrastructure", href: "/about/infrastructure", icon: Building2, desc: "World-class facilities" },
      { label: "Campus & Facilities", href: "/about/campus", icon: MapPin, desc: "Explore our campus" },
    ],
  },
  {
    label: "Administration",
    href: "/administration",
    icon: Users,
    children: [
      { label: "Chairman's Message", href: "/administration/chairman", icon: Users, desc: "Shri Raghavendra Pratap Singh" },
      { label: "Director's Message", href: "/administration/director", icon: Users, desc: "Shri Pradeep Kumar Singh" },
      { label: "Director's Message", href: "/administration/director-2", icon: Users, desc: "Shri Praveen Pandey" },
      { label: "Principal's Message", href: "/administration/principal", icon: Users, desc: "Shri Girish Nair Rishi" },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    icon: GraduationCap,
    children: [
      { label: "Curriculum", href: "/academics/curriculum", icon: BookOpen, desc: "CBSE syllabus overview" },
      { label: "Classes & Subjects", href: "/academics/classes", icon: GraduationCap, desc: "Nursery to Class X" },
    ],
  },
  {
    label: "Gallery",
    href: "/gallery",
    icon: Image,
    children: [
      { label: "Photo Gallery", href: "/gallery/photos", icon: Image, desc: "Moments captured" },
      { label: "Video Gallery", href: "/gallery/videos", icon: Image, desc: "Watch our stories" },
      { label: "Annual Day", href: "/gallery/annual-day", icon: Image, desc: "Cultural celebrations" },
      { label: "Sports Day", href: "/gallery/sports-day", icon: Image, desc: "Athletic achievements" },
    ],
  },
  { label: "Contact", href: "/contact" },
  { label: "CBSE Disclosure", href: "/cbse-disclosure" },
]

export function PublicHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-[#0a4d0a] text-white text-xs">
        <div className="container mx-auto flex items-center justify-between py-2 px-4">
          <div className="flex items-center gap-6">
            <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-1.5 hover:text-[#FF9933] transition-colors">
              <Phone className="w-3 h-3" />
              {siteConfig.contact.phone}
            </a>
            <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-1.5 hover:text-[#FF9933] transition-colors">
              <Mail className="w-3 h-3" />
              {siteConfig.contact.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-400">CBSE Affiliation No: {siteConfig.cbse.affiliationNo}</span>
            <span className="text-gray-600">|</span>
            <div className="flex items-center gap-2">
              {[
                { icon: Facebook, href: "https://www.facebook.com/61555972687989/" },
                { icon: Instagram, href: "https://www.instagram.com/gurugorakshnathgyansthali/" },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="hover:text-[#FF9933] transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-white shadow-sm"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex h-16 lg:h-18 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <LogoImage className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 border-[#138808]/20 p-0.5 bg-white shadow-sm" />
              <div className="hidden sm:block">
                <p className="font-black text-[#138808] text-xs lg:text-sm leading-tight tracking-tight">GURU GORAKSHNATH</p>
                <p className="font-black text-[#138808] text-xs lg:text-sm leading-tight tracking-tight">GYANASTHALI</p>
                <p className="text-[9px] lg:text-[10px] text-gray-500 leading-tight mt-0.5">Inspiring Excellence, Creating Values</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" role="navigation">
              {navLinks.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {item.children ? (
                    <button
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        pathname.startsWith(item.href) && item.href !== "#"
                          ? "text-[#138808] bg-[#f0fdf4]"
                          : "text-gray-700 hover:text-[#138808] hover:bg-[#f0fdf4]"
                      )}
                    >
                      {item.label}
                      <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", openDropdown === item.label && "rotate-180")} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        pathname === item.href
                          ? "text-[#138808] bg-[#f0fdf4]"
                          : "text-gray-700 hover:text-[#138808] hover:bg-[#f0fdf4]"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {item.children && openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                      <div className="p-2">
                        {item.children.map((child) => {
                          const Icon = child.icon
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#f0fdf4] group transition-colors"
                            >
                              <div className="mt-0.5 w-7 h-7 rounded-md bg-[#138808]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#138808]/20 transition-colors">
                                <Icon className="w-3.5 h-3.5 text-[#138808]" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-800 group-hover:text-[#138808] transition-colors">{child.label}</p>
                                {child.desc && <p className="text-xs text-gray-500 mt-0.5">{child.desc}</p>}
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/admin/login">
                <Button variant="outline" size="sm">Executive Login</Button>
              </Link>
              <Link href="/contact">
                <Button variant="gold" size="sm">Contact Us</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white max-h-[80vh] overflow-y-auto">
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navLinks.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold text-gray-700 hover:bg-[#f0fdf4] hover:text-[#138808] transition-colors"
                      >
                        {item.label}
                        <ChevronDown className={cn("w-4 h-4 transition-transform", mobileExpanded === item.label && "rotate-180")} />
                      </button>
                      {mobileExpanded === item.label && (
                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-[#138808]/20 pl-3">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-[#138808] hover:bg-[#f0fdf4] rounded-lg transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link href={item.href} className="block px-4 py-3 rounded-lg text-sm font-semibold text-gray-700 hover:bg-[#f0fdf4] hover:text-[#138808] transition-colors">
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-gray-100 mt-4 space-y-2">
                <Link href="/admin/login" className="block">
                  <Button variant="outline" className="w-full">Executive Login</Button>
                </Link>
                <Link href="/contact" className="block">
                  <Button variant="gold" className="w-full">Contact Us</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
