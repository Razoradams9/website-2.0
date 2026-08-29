"use client"
import React, { useState } from "react"
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setAdminSession, ADMIN_EMAIL } from "@/lib/admin-session"

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Single admin account
    const ADMIN_PASSWORD = "Giri1968"

    setTimeout(() => {
      if (email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Write cookie + localStorage synchronously, then navigate.
        setAdminSession()
        window.location.href = "/admin/dashboard"
      } else {
        setError("Invalid email or password.")
        setIsLoading(false)
      }
    }, 600)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Campus background image — fills the viewport, centered, no distortion */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/campus-hero.jpg')" }}
      />
      {/* Dark green overlay so the login card and white text stay readable */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a4d0a]/85 via-[#063d06]/80 to-black/80" />
      {/* Subtle dot pattern on top of the overlay */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      />

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/images/logo.jpeg" alt="GGG" className="w-20 h-20 mx-auto mb-4 drop-shadow-2xl" />
          <h1 className="text-xl font-black text-white">Guru Gorakshnath Gyanasthali</h1>
          <p className="text-white/60 text-sm mt-1">School Administration</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-xl font-black text-[#138808]">Admin Login</h2>
            <p className="text-sm text-gray-500 mt-1">Sign in to manage school content</p>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter admin email"
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

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authorized access only</span>
          </div>
        </div>

        {/* Back link */}
        <p className="text-center text-xs text-white/50 mt-6">
          <a href="/" className="hover:text-white transition-colors">← Back to School Website</a>
        </p>
      </div>
    </div>
  )
}
