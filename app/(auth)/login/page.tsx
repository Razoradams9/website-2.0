"use client"
import React, { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simple hardcoded executive login for now
    const validUsers = [
      { email: "chairman@ggg.edu.in", password: "Chairman@2024", name: "Shri Raghavendra Pratap Singh", role: "Chairman" },
      { email: "director1@ggg.edu.in", password: "Director1@2024", name: "Shri Pradeep Kumar Singh", role: "Director" },
      { email: "director2@ggg.edu.in", password: "Director2@2024", name: "Shri Praveen Pandey", role: "Director" },
      { email: "admin@ggg.edu.in", password: "Admin@2024", name: "Administrator", role: "Admin" },
    ]

    const user = validUsers.find((u) => u.email === email.toLowerCase() && u.password === password)

    setTimeout(() => {
      if (user) {
        // Store login in localStorage
        localStorage.setItem("ggg_user", JSON.stringify({ name: user.name, role: user.role, email: user.email }))
        window.location.href = "/admin/dashboard"
      } else {
        setError("Invalid email or password. Please try again.")
      }
      setIsLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left — Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1a3c6e] via-[#0d1f3c] to-[#0a1628] relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }}
        />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#c8a951]/10 rounded-full blur-3xl" />

        <div className="relative max-w-md text-center">
          <img src="/images/logo.png" alt="GGG" className="w-28 h-28 mx-auto mb-8 drop-shadow-2xl" />
          <h1 className="text-2xl font-black text-white mb-2">Guru Gorakshnath Gyanasthali</h1>
          <p className="text-[#c8a951] font-semibold text-sm mb-6">Executive Portal</p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Secure access for school leadership to manage content, view reports, and oversee school operations.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3 text-gray-400 text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>Protected access for authorized personnel only</span>
          </div>
        </div>
      </div>

      {/* Right — Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-[#f8f9ff]">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <img src="/images/logo.png" alt="GGG" className="w-16 h-16 mx-auto mb-3" />
            <h2 className="text-lg font-black text-[#1a3c6e]">Guru Gorakshnath Gyanasthali</h2>
            <p className="text-xs text-gray-500">Executive Portal</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-[#1a3c6e]">Executive Login</h2>
              <p className="text-sm text-gray-500 mt-1">Sign in to access the admin panel</p>
            </div>

            {error && (
              <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@ggg.edu.in"
                    className="pl-10"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </Button>
            </form>

            {/* Login Credentials Info */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center mb-3">Executive Accounts:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { role: "Chairman", email: "chairman@ggg.edu.in" },
                  { role: "Director", email: "director1@ggg.edu.in" },
                  { role: "Director", email: "director2@ggg.edu.in" },
                  { role: "Admin", email: "admin@ggg.edu.in" },
                ].map((d) => (
                  <div key={d.email} className="bg-[#f0f4ff] rounded-lg p-2 text-center">
                    <p className="font-bold text-[#1a3c6e]">{d.role}</p>
                    <p className="text-gray-500 text-[10px] truncate">{d.email}</p>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 text-center mt-3">Default password format: Role@2024</p>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            <Link href="/" className="hover:text-[#1a3c6e] transition-colors">← Back to School Website</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
