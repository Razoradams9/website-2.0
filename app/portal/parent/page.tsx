import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users, CreditCard, Bell, Calendar, ClipboardCheck,
  TrendingUp, FileText, ArrowRight, Download
} from "lucide-react"

export const metadata = { title: "Parent Portal" }

export default function ParentPortalPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF9933]/10 rounded-full blur-3xl" />
        <div className="relative">
          <h1 className="text-2xl md:text-3xl font-black">Welcome, Mr. Suresh Singh</h1>
          <p className="text-gray-300 text-sm mt-1">Parent Portal • Guru Gorakshnath Gyanasthali • Session 2025-26</p>
        </div>
      </div>

      {/* Children Cards */}
      <div>
        <h2 className="text-lg font-bold text-[#1e40af] mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-[#FF9933]" /> Your Children
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#1e40af] flex items-center justify-center text-white font-black text-xl">R</div>
              <div>
                <p className="font-bold text-[#1e40af]">Rahul Singh</p>
                <p className="text-xs text-gray-500">Admission No: ADM250001</p>
                <p className="text-xs text-gray-500">Class 9A • Roll No: 01</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100">
              <div className="text-center">
                <p className="text-lg font-black text-[#1e40af]">94%</p>
                <p className="text-[10px] text-gray-500">Attendance</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-black text-emerald-600">82%</p>
                <p className="text-[10px] text-gray-500">Last Exam</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-black text-amber-600">#5</p>
                <p className="text-[10px] text-gray-500">Class Rank</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Fee Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CreditCard className="w-5 h-5 text-[#FF9933]" /> Fee Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { month: "August 2025", amount: "₹2,800", status: "Paid", statusColor: "success" },
                { month: "July 2025", amount: "₹2,800", status: "Paid", statusColor: "success" },
                { month: "September 2025", amount: "₹2,800", status: "Upcoming", statusColor: "warning" },
                { month: "Computer Fee (Q2)", amount: "₹900", status: "Due", statusColor: "danger" },
              ].map((fee) => (
                <div key={fee.month} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{fee.month}</p>
                    <p className="text-xs text-gray-500">{fee.amount}</p>
                  </div>
                  <Badge variant={fee.statusColor as any} className="text-xs">{fee.status}</Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <Button size="sm" variant="gold" className="flex-1">Pay Online</Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Download className="w-3.5 h-3.5" /> Receipt
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ClipboardCheck className="w-5 h-5 text-[#FF9933]" /> Attendance (August 2025)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[
                { label: "Present", value: "18", color: "text-emerald-600 bg-emerald-50" },
                { label: "Absent", value: "1", color: "text-rose-600 bg-rose-50" },
                { label: "Late", value: "1", color: "text-amber-600 bg-amber-50" },
                { label: "Total Days", value: "20", color: "text-blue-600 bg-blue-50" },
              ].map((a) => (
                <div key={a.label} className={`text-center p-3 rounded-xl ${a.color}`}>
                  <p className="text-xl font-black">{a.value}</p>
                  <p className="text-[10px] font-medium">{a.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Attendance Rate</p>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "94%" }} />
              </div>
              <p className="text-right text-xs font-bold text-emerald-600 mt-1">94%</p>
            </div>
          </CardContent>
        </Card>

        {/* Notices */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="w-5 h-5 text-[#FF9933]" /> Notices for Parents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: "PTM for Classes 9 & 11 — August 30", date: "Aug 18", urgent: true },
                { title: "Fee submission deadline extended to Sep 5", date: "Aug 15", urgent: false },
                { title: "Annual Day preparation — Parent volunteers needed", date: "Aug 10", urgent: false },
                { title: "School closed for Independence Day — Aug 15", date: "Aug 8", urgent: false },
              ].map((n) => (
                <div key={n.title} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${n.urgent ? "bg-red-500" : "bg-[#FF9933]"}`} />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{n.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{n.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* PTM & Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="w-5 h-5 text-[#FF9933]" /> Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: "Parent-Teacher Meeting", date: "Aug 30, 2025 • 9:00 AM", badge: "PTM" },
                { title: "Half Yearly Exams", date: "Sep 15–25, 2025", badge: "Exam" },
                { title: "Annual Sports Day", date: "Nov 15, 2025", badge: "Sports" },
                { title: "Annual Day Function", date: "Dec 20, 2025", badge: "Cultural" },
              ].map((e) => (
                <div key={e.title} className="flex items-center gap-3 p-3 bg-[#eff6ff] rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-[#1e40af] flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-[#FF9933]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1e40af] truncate">{e.title}</p>
                    <p className="text-xs text-gray-500">{e.date}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">{e.badge}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
