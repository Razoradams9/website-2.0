"use client"
import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, Users, FileText, Image, Newspaper, Calendar, Bell,
  Award, ClipboardList, BookOpen, GraduationCap, Layers, Clock, PenLine,
  FileCheck, UserCheck, CheckSquare, CreditCard, Bus, Library, AlertTriangle,
  Settings, Activity, ChevronDown, ChevronRight, PanelLeftClose, PanelLeftOpen
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Users & Roles", href: "/admin/users", icon: Users },
  {
    label: "Content",
    icon: FileText,
    children: [
      { label: "Slider", href: "/admin/content/slider", icon: Image },
      { label: "News", href: "/admin/content/news", icon: Newspaper },
      { label: "Events", href: "/admin/content/events", icon: Calendar },
      { label: "Notices", href: "/admin/content/notices", icon: Bell },
      { label: "Gallery", href: "/admin/content/gallery", icon: Image },
      { label: "Staff", href: "/admin/content/staff", icon: UserCheck },
    ],
  },
  { label: "CBSE Disclosure", href: "/admin/cbse", icon: Award },
  { label: "Admissions", href: "/admin/admissions", icon: ClipboardList },
  {
    label: "Academics",
    icon: BookOpen,
    children: [
      { label: "Grades", href: "/admin/academics/grades", icon: GraduationCap },
      { label: "Sections", href: "/admin/academics/sections", icon: Layers },
      { label: "Timetable", href: "/admin/academics/timetable", icon: Clock },
      { label: "Homework", href: "/admin/academics/homework", icon: PenLine },
      { label: "Exams", href: "/admin/academics/exams", icon: FileCheck },
    ],
  },
  { label: "Students", href: "/admin/students", icon: GraduationCap },
  { label: "Attendance", href: "/admin/attendance", icon: CheckSquare },
  { label: "Fees", href: "/admin/fees", icon: CreditCard },
  { label: "Transport", href: "/admin/transport", icon: Bus },
  { label: "Library", href: "/admin/library", icon: Library },
  { label: "Grievances", href: "/admin/grievances", icon: AlertTriangle },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Logs", href: "/admin/logs", icon: Activity },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [openGroups, setOpenGroups] = useState<string[]>(["Content", "Academics"])

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label])
  }

  return (
    <aside className={cn("h-screen flex flex-col bg-white border-r border-gray-200 transition-all duration-300", collapsed ? "w-[72px]" : "w-64")}>
      {/* Logo */}
      <div className="h-16 lg:h-20 flex items-center justify-between px-4 border-b border-gray-100 flex-shrink-0">
        {!collapsed && (
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <img src="/images/logo.jpeg" alt="GGG" className="w-9 h-9 rounded-lg object-contain" />
            <div>
              <p className="text-sm font-black text-[#138808] leading-tight">GGG Admin</p>
              <p className="text-[10px] text-gray-400">Control Panel</p>
            </div>
          </Link>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
          {collapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2.5 admin-scroll space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon
          if ("children" in item && item.children) {
            const isOpen = openGroups.includes(item.label)
            const isChildActive = item.children.some((c) => pathname.startsWith(c.href))
            return (
              <div key={item.label}>
                <button
                  onClick={() => !collapsed && toggleGroup(item.label)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                    isChildActive ? "text-[#138808] bg-[#f0fdf4]" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    </>
                  )}
                </button>
                {!collapsed && isOpen && (
                  <div className="ml-5 pl-3 border-l border-gray-200 mt-0.5 space-y-0.5">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon
                      const active = pathname === child.href
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all",
                            active ? "bg-[#138808] text-white" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                          )}
                        >
                          <ChildIcon className="w-3.5 h-3.5" />
                          {child.label}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          }

          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href!}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                active ? "bg-[#138808] text-white shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className="w-[18px] h-[18px] flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
