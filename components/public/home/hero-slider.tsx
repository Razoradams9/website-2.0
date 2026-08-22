"use client"
import React, { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const slides = [
  {
    id: 1,
    title: "Welcome to",
    titleAccent: "Guru Gorakshnath Gyanasthali",
    subtitle: "CBSE Affiliated | Siddharthnagar",
    description: "A new-age school rooted in Indian values and powered by modern education. Where every child's journey towards knowledge begins with care and purpose.",
    cta: { label: "Explore School", href: "/about" },
    ctaSecondary: { label: "Contact Us", href: "/contact" },
    gradient: "from-[#0a4d0a] via-[#138808] to-[#138808]",
  },
  {
    id: 2,
    title: "Where Learning Meets",
    titleAccent: "Values & Tradition",
    subtitle: "Holistic Education",
    description: "We blend the best of CBSE curriculum with value-based education, ensuring students grow academically, morally, and socially.",
    cta: { label: "Our Academics", href: "/academics" },
    ctaSecondary: { label: "Our Vision", href: "/about/history" },
    gradient: "from-[#138808] via-[#0a4d0a] to-[#063d06]",
  },
  {
    id: 3,
    title: "Building Tomorrow's",
    titleAccent: "Leaders Today",
    subtitle: "Established 2024",
    description: "A fresh beginning with a clear mission — to provide quality education that empowers every child to discover their potential and achieve greatness.",
    cta: { label: "About Our School", href: "/about" },
    ctaSecondary: { label: "View Gallery", href: "/gallery" },
    gradient: "from-[#063d06] via-[#138808] to-[#0b5e0b]",
  },
]

const stats = [
  { value: "CBSE", label: "Affiliated Board" },
  { value: "120+", label: "Students" },
  { value: "12+", label: "Dedicated Faculty" },
  { value: "2024", label: "Established" },
]

export function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goTo = useCallback((index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent(index)
    setTimeout(() => setIsAnimating(false), 600)
  }, [isAnimating])

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo])
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]

  return (
    <section className="relative min-h-[90vh] flex flex-col overflow-hidden">
      {/* Background */}
      <div className={cn("absolute inset-0 bg-gradient-to-br transition-all duration-700", slide.gradient)}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
        />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#FF9933]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            {/* Logo showcase on first slide */}
            {current === 0 && (
              <div className="mb-8 animate-fade-in">
                <img src="https://i.ibb.co/ZRJG6kqY/logo.png" alt="Guru Gorakshnath Gyanasthali" className="w-28 h-28 sm:w-36 sm:h-36 object-contain drop-shadow-2xl" />
              </div>
            )}

            <div
              key={`badge-${current}`}
              className="inline-flex items-center gap-2 bg-[#FF9933]/20 border border-[#FF9933]/30 text-[#FF9933] rounded-full px-4 py-1.5 text-sm font-semibold mb-6 animate-fade-in"
            >
              <span className="w-1.5 h-1.5 bg-[#FF9933] rounded-full animate-pulse" />
              {slide.subtitle}
            </div>

            <h1
              key={`title-${current}`}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight mb-6 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              {slide.title}{" "}
              <span className="text-[#FF9933] block sm:inline">{slide.titleAccent}</span>
            </h1>

            <p
              key={`desc-${current}`}
              className="text-lg text-gray-300 mb-10 max-w-xl leading-relaxed animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              {slide.description}
            </p>

            <div
              key={`cta-${current}`}
              className="flex flex-col sm:flex-row gap-4 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <Link href={slide.cta.href}>
                <Button variant="gold" size="lg" className="text-base px-8 shadow-lg shadow-[#FF9933]/20">
                  {slide.cta.label}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href={slide.ctaSecondary.href}>
                <Button variant="white" size="lg" className="text-base px-8 bg-white/10 hover:bg-white/20 text-white border border-white/30">
                  {slide.ctaSecondary.label}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative bg-black/30 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center py-5 px-4">
                <p className="text-2xl lg:text-3xl font-black text-[#FF9933]">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors border border-white/20 text-white">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors border border-white/20 text-white">
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className={cn("transition-all duration-300 rounded-full", i === current ? "w-8 h-2 bg-[#FF9933]" : "w-2 h-2 bg-white/40 hover:bg-white/70")} />
        ))}
      </div>
    </section>
  )
}
