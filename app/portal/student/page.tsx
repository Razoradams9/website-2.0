import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen, Calendar, ClipboardCheck, FileText, Award, Bell,
  Clock, TrendingUp, GraduationCap
} from "lucide-react"

export const metadata = { title: "Student Portal" }

export default function StudentPortalPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-[#1a3c6e] to-[#0d1f3c] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c8a951]/10 rounded-full blur-3xl" />
        <div className="relative">
          <Badge variant="gold" className="mb-3">Class 9A — Roll No: 01</Badge>
          <h1 className="text-2xl md:text-3xl font-black">Welcome back, Rahul!</h1>
          <p className="text-gray-300 text-sm mt-1">Academic Year 2025-26 • DAV Public School</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: BookOpen, label: "Pending Homework", value: "3", color: "bg-blue-50 text-blue-600" },
          { icon: ClipboardCheck, label: "Attendance", value: "94%", color: "bg-emerald-50 text-emerald-600" },
          { icon: Award, label: "Last Exam Rank", value: "#5", color: "bg-amber-50 text-amber-600" },
          { icon: Bell, label: "New Notices", value: "2", color: "bg-rose-50 text-rose-600" },
        ].map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-black text-[#1a3c6e]">{item.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Homework */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="w-5 h-5 text-[#c8a951]" /> Pending Homework
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { subject: "Mathematics", title: "Chapter 5 — Exercise 5.3 (Q1–Q10)", due: "Aug 25, 2025", status: "urgent" },
                { subject: "Science", title: "Write experiment observations for Light chapter", due: "Aug 27, 2025", status: "normal" },
                { subject: "English", title: "Essay: My Role Model (500 words)", due: "Aug 30, 2025", status: "normal" },
              ].map((hw) => (
                <div key={hw.title} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant={hw.status === "urgent" ? "danger" : "info"} className="text-[10px]">{hw.subject}</Badge>
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> Due: {hw.due}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-800 mt-2">{hw.title}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Timetable */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="w-5 h-5 text-[#c8a951]" /> Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { period: "1", time: "8:30–9:15", subject: "Mathematics", teacher: "Ms. Priya Verma" },
                { period: "2", time: "9:15–10:00", subject: "English", teacher: "Ms. Kavita Singh" },
                { period: "3", time: "10:00–10:45", subject: "Science", teacher: "Mr. Rohit Sharma" },
                { period: "", time: "10:45–11:00", subject: "BREAK", teacher: "" },
                { period: "4", time: "11:00–11:45", subject: "Social Science", teacher: "Mr. Anil Gupta" },
                { period: "5", time: "11:45–12:30", subject: "Hindi", teacher: "Mrs. Seema Joshi" },
                { period: "6", time: "12:30–1:15", subject: "Computer", teacher: "Mr. Deepak Kumar" },
                { period: "", time: "1:15–2:00", subject: "Physical Education", teacher: "Mr. Suresh" },
              ].map((slot, i) => (
                <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${slot.subject === "BREAK" ? "bg-amber-50 text-amber-700" : "hover:bg-gray-50"}`}>
                  <span className="w-6 text-center text-xs font-bold text-gray-400">{slot.period}</span>
                  <span className="w-24 text-xs text-gray-500 flex-shrink-0">{slot.time}</span>
                  <span className="font-medium text-[#1a3c6e] flex-1">{slot.subject}</span>
                  <span className="text-xs text-gray-400 hidden sm:block">{slot.teacher}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="w-5 h-5 text-[#c8a951]" /> Recent Exam Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { subject: "Mathematics", marks: "85/100", grade: "A", percent: 85 },
                { subject: "Science", marks: "78/100", grade: "B+", percent: 78 },
                { subject: "English", marks: "91/100", grade: "A+", percent: 91 },
                { subject: "Hindi", marks: "72/100", grade: "B", percent: 72 },
                { subject: "Social Science", marks: "88/100", grade: "A", percent: 88 },
              ].map((r) => (
                <div key={r.subject} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50">
                  <span className="text-sm font-medium text-gray-700 w-32">{r.subject}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1a3c6e] rounded-full" style={{ width: `${r.percent}%` }} />
                  </div>
                  <span className="text-sm font-bold text-[#1a3c6e] w-16 text-right">{r.marks}</span>
                  <Badge variant={r.percent >= 90 ? "success" : r.percent >= 75 ? "info" : "warning"} className="text-[10px] w-8 justify-center">{r.grade}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Circulars */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="w-5 h-5 text-[#c8a951]" /> Recent Circulars
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: "Half Yearly Exam Schedule Released", date: "Aug 20, 2025", category: "Exam" },
                { title: "Summer Vacation Homework Submission Deadline", date: "Aug 18, 2025", category: "Homework" },
                { title: "Independence Day — School Holiday", date: "Aug 14, 2025", category: "Holiday" },
                { title: "PTM for Classes 9–11 on Aug 30", date: "Aug 12, 2025", category: "PTM" },
              ].map((c) => (
                <div key={c.title} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-9 h-9 rounded-lg bg-[#1a3c6e] flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-[#c8a951]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{c.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-400">{c.date}</span>
                      <Badge variant="outline" className="text-[10px]">{c.category}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
