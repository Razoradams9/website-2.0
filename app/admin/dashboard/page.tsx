import {
  GraduationCap, Users, UserCheck, ClipboardList, AlertTriangle, Mail,
  TrendingUp, Calendar, Bell, ArrowUpRight, ArrowDownRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata = { title: "Dashboard" }

const stats = [
  { label: "Total Students", value: "124", icon: GraduationCap, change: "+12", trend: "up", color: "bg-blue-50 text-blue-600" },
  { label: "Total Teachers", value: "14", icon: UserCheck, change: "+2", trend: "up", color: "bg-emerald-50 text-emerald-600" },
  { label: "Active Parents", value: "108", icon: Users, change: "+10", trend: "up", color: "bg-purple-50 text-purple-600" },
  { label: "New Enquiries", value: "5", icon: ClipboardList, change: "+3", trend: "up", color: "bg-amber-50 text-amber-600" },
  { label: "Open Grievances", value: "0", icon: AlertTriangle, change: "0", trend: "down", color: "bg-rose-50 text-rose-600" },
  { label: "Unread Messages", value: "3", icon: Mail, change: "+2", trend: "up", color: "bg-cyan-50 text-cyan-600" },
]

const recentActivity = [
  { text: "New admission enquiry from Rahul Kumar for Class 6", time: "2 min ago", type: "admission" },
  { text: "Fee payment received ₹2,800 from Adm. No. ADM250034", time: "15 min ago", type: "fee" },
  { text: "Grievance #GRV25012 resolved by admin", time: "1 hour ago", type: "grievance" },
  { text: "Notice published: Half Yearly Exam Schedule", time: "2 hours ago", type: "notice" },
  { text: "Attendance marked for Class 9A — 38/40 present", time: "3 hours ago", type: "attendance" },
  { text: "New career application received for PGT Physics", time: "4 hours ago", type: "career" },
]

const upcomingEvents = [
  { title: "Parent-Teacher Meeting", date: "Aug 30, 2025", badge: "PTM" },
  { title: "Independence Day Celebration", date: "Aug 15, 2025", badge: "Event" },
  { title: "Half Yearly Exams Begin", date: "Sep 15, 2025", badge: "Exam" },
  { title: "Annual Sports Day", date: "Nov 15, 2025", badge: "Sports" },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#1a3c6e]">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Welcome back. Here's Guru Gorakshnath Gyanasthali at a glance.</p>
        </div>
        <Badge variant="gold" className="text-xs px-3 py-1">Academic Year: 2024-25</Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-semibold ${stat.trend === "up" ? "text-emerald-600" : "text-rose-600"}`}>
                  {stat.change}
                  {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                </span>
              </div>
              <p className="text-2xl font-black text-[#1a3c6e] leading-none">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="w-5 h-5 text-[#c8a951]" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-[#c8a951] mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700">{item.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="w-5 h-5 text-[#c8a951]" />
              Upcoming
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.title} className="flex items-start gap-3 p-3 bg-[#f0f4ff] rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-[#1a3c6e] flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-[#c8a951]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1a3c6e] truncate">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px] flex-shrink-0">{event.badge}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
