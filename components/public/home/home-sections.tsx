import React from "react"
import Link from "next/link"
import {
  BookOpen, Award, Users, Microscope, Music, Trophy, Shield,
  ArrowRight, CheckCircle2, Star, Quote, GraduationCap, Bus,
  Library, Wifi, Dumbbell, FlaskConical
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "./section-heading"
import { cn } from "@/lib/utils"

// ─── Principal Message ───────────────────────────────────────────────
export function PrincipalMessage() {
  return (
    <section className="py-20 bg-white/40">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading
              label="From The Principal"
              title="A Message of"
              titleAccent="Inspiration"
              description="At Guru Gorakshnath Gyanasthali, we believe every child carries a spark of greatness. Our role is to nurture it with care, discipline, and knowledge."
            />
            <div className="relative bg-[#eff6ff] rounded-2xl p-8">
              <Quote className="absolute top-4 left-4 w-10 h-10 text-[#1e40af]/10" />
              <blockquote className="text-gray-700 leading-relaxed text-base italic relative z-10">
                "Education is not just about books and exams — it is about building character, fostering curiosity, and preparing children for life. At our school, we are committed to creating a warm, safe, and stimulating environment where every student feels valued, supported, and inspired to do their best."
              </blockquote>
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-[#1e40af]/10">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] flex items-center justify-center text-white font-black text-xl">P</div>
                <div>
                  <p className="font-bold text-[#1e40af]">The Principal</p>
                  <p className="text-sm text-gray-500">Guru Gorakshnath Gyanasthali</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: BookOpen, label: "Strong Academics", value: "CBSE", sub: "Curriculum" },
              { icon: Trophy, label: "Growing Community", value: "120+", sub: "Students" },
              { icon: Users, label: "Caring Team", value: "12+", sub: "Teachers" },
              { icon: Award, label: "Modern Campus", value: "New", sub: "Infrastructure" },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-[#1e40af]/10 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-[#1e40af]" />
                  </div>
                  <p className="text-2xl font-black text-[#1e40af]">{item.value}</p>
                  <p className="text-xs text-[#FF9933] font-semibold">{item.sub}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Why Choose Us ───────────────────────────────────────────────────
export function WhyChooseUs() {
  const features = [
    {
      icon: BookOpen,
      title: "CBSE Curriculum",
      description: "Comprehensive NCERT-based curriculum with focus on conceptual understanding and application.",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Microscope,
      title: "State-of-art Labs",
      description: "Fully equipped Physics, Chemistry, Biology and Computer labs for hands-on learning.",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: Trophy,
      title: "Sports & Athletics",
      description: "Olympic-size ground, indoor sports complex, and professional coaches for 15+ sports.",
      color: "bg-amber-50 text-amber-600",
    },
    {
      icon: Music,
      title: "Arts & Culture",
      description: "Music, dance, drama, fine arts — we believe every child has a unique creative talent.",
      color: "bg-rose-50 text-rose-600",
    },
    {
      icon: Shield,
      title: "Safe Environment",
      description: "CCTV-monitored, anti-bullying policy, trained staff, and a strict code of conduct.",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: Wifi,
      title: "Smart Classrooms",
      description: "Digital boards, high-speed Wi-Fi, and EdTech integration for modern learning.",
      color: "bg-cyan-50 text-cyan-600",
    },
  ]

  return (
    <section className="py-20 bg-[#f5f9ff]/40">
      <div className="container mx-auto px-4">
        <SectionHeading
          label="Why Choose Us"
          title="Excellence in Every"
          titleAccent="Dimension"
          description="We provide a world-class education that prepares students for life beyond academics."
          center
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", f.color)}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#1e40af] text-lg mb-2 group-hover:text-[#FF9933] transition-colors">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Academic Programs ────────────────────────────────────────────────
export function AcademicPrograms() {
  const programs = [
    { name: "Pre-Primary", grades: "Nursery · LKG · UKG", desc: "Play-based learning for foundational skills", color: "from-pink-500 to-rose-600", icon: "🌸" },
    { name: "Primary School", grades: "Classes I – V", desc: "Building strong fundamentals in core subjects", color: "from-orange-500 to-amber-600", icon: "📚" },
    { name: "Middle School", grades: "Classes VI – VIII", desc: "Deepening knowledge with project-based learning", color: "from-blue-500 to-indigo-600", icon: "🔬" },
    { name: "Secondary", grades: "Classes IX – X", desc: "CBSE Board preparation with expert faculty", color: "from-violet-500 to-purple-600", icon: "🎯" },
    { name: "Senior Secondary", grades: "Classes XI – XII", desc: "Science · Commerce · Arts streams", color: "from-emerald-500 to-teal-600", icon: "🎓" },
  ]

  return (
    <section className="py-20 bg-white/40">
      <div className="container mx-auto px-4">
        <SectionHeading
          label="Academic Programs"
          title="From Nursery to"
          titleAccent="Class XII"
          description="A continuous learning journey designed to inspire curiosity and build excellence at every stage."
          center
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {programs.map((p) => (
            <div key={p.name} className="group relative overflow-hidden rounded-2xl cursor-pointer">
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-90 transition-opacity group-hover:opacity-100", p.color)} />
              <div className="relative p-6 text-white h-full min-h-[220px] flex flex-col">
                <span className="text-4xl mb-3">{p.icon}</span>
                <h3 className="font-black text-lg mb-1">{p.name}</h3>
                <p className="text-white/80 text-xs font-semibold mb-2">{p.grades}</p>
                <p className="text-white/70 text-xs flex-1">{p.desc}</p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href="/academics" className="inline-flex items-center gap-1 text-xs font-bold text-white/90 hover:text-white">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Facilities ──────────────────────────────────────────────────────
export function Facilities() {
  const items = [
    { icon: FlaskConical, label: "Science Labs", desc: "State-of-art labs" },
    { icon: Library, label: "Library", desc: "10,000+ books" },
    { icon: Dumbbell, label: "Sports Complex", desc: "Indoor & outdoor" },
    { icon: Music, label: "Music Room", desc: "Instruments & vocals" },
    { icon: Bus, label: "Transport", desc: "Safe bus service" },
    { icon: Shield, label: "CCTV Security", desc: "24×7 surveillance" },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }}
      />
      <div className="container mx-auto px-4 relative">
        <SectionHeading
          label="Our Facilities"
          title="World-Class"
          titleAccent="Infrastructure"
          description="Every facility designed to inspire learning, creativity, and growth."
          center
          light
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="text-center group">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-white/10 border border-white/20 group-hover:bg-[#FF9933] group-hover:border-[#FF9933] transition-all duration-300 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-bold text-white">{item.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── News & Events Preview ────────────────────────────────────────────
interface NewsItem {
  id: string
  title: string
  publishedAt: Date | null
  excerpt: string | null
  featuredImage: string | null
}

interface EventItem {
  id: string
  title: string
  startDate: Date
  venue: string | null
  shortDesc: string | null
}

export function NewsEventsPreview({ news, events }: { news: NewsItem[]; events: EventItem[] }) {
  return (
    <section className="py-20 bg-[#f5f9ff]/40">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-14">
          {/* News */}
          <div>
            <SectionHeading label="Latest News" title="School" titleAccent="Updates" />
            <div className="space-y-4">
              {news.length === 0 ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-20 h-20 rounded-xl bg-gray-100 flex-shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-gray-100 rounded w-3/4" />
                      <div className="h-3 bg-gray-100 rounded w-full" />
                      <div className="h-3 bg-gray-100 rounded w-2/3" />
                    </div>
                  </div>
                ))
              ) : (
                news.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group">
                    <div className="w-20 h-20 rounded-xl bg-[#eff6ff] flex-shrink-0 overflow-hidden">
                      {item.featuredImage ? (
                        <img src={item.featuredImage} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">📰</div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-[#1e40af] text-sm group-hover:text-[#FF9933] transition-colors line-clamp-2">{item.title}</p>
                      {item.excerpt && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.excerpt}</p>}
                      <p className="text-xs text-gray-400 mt-2">{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : ""}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Events */}
          <div>
            <SectionHeading label="Upcoming Events" title="School" titleAccent="Events" />
            <div className="space-y-4">
              {events.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No upcoming events</p>
                </div>
              ) : (
                events.slice(0, 4).map((event) => {
                  const d = new Date(event.startDate)
                  return (
                    <div key={event.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex-shrink-0 w-14 text-center bg-[#1e40af] rounded-xl px-2 py-3">
                        <p className="text-[#FF9933] font-black text-xl leading-none">{d.getDate()}</p>
                        <p className="text-white/70 text-xs mt-0.5">{d.toLocaleString("en", { month: "short" })}</p>
                        <p className="text-white/50 text-xs">{d.getFullYear()}</p>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-[#1e40af] text-sm">{event.title}</p>
                        {event.venue && <p className="text-xs text-gray-500 mt-0.5">📍 {event.venue}</p>}
                        {event.shortDesc && <p className="text-xs text-gray-400 mt-1 line-clamp-1">{event.shortDesc}</p>}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────
interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  avatarUrl: string | null
}

export function Testimonials({ items }: { items: Testimonial[] }) {
  const fallback = [
    { id: "1", name: "Mr. Rakesh Yadav", role: "Parent, Class 3 Student", content: "We are very happy with the school. The teachers give personal attention to each child and the campus is clean and safe. My son looks forward to going to school every morning.", rating: 5, avatarUrl: null },
    { id: "2", name: "Mrs. Sunita Pandey", role: "Parent, Class 1 Student", content: "I was looking for a good CBSE school nearby and Guru Gorakshnath Gyanasthali exceeded my expectations. The staff is caring, the environment is disciplined, and my daughter is learning so well.", rating: 5, avatarUrl: null },
    { id: "3", name: "Mr. Ashok Verma", role: "Parent, Class 5 Student", content: "The school may be new but the quality of education is excellent. Teachers are experienced and genuinely invested in the children's growth. Very satisfied with our decision to enroll here.", rating: 5, avatarUrl: null },
  ]
  const data = items.length ? items : fallback

  return (
    <section className="py-20 bg-white/40">
      <div className="container mx-auto px-4">
        <SectionHeading
          label="Testimonials"
          title="What Parents"
          titleAccent="Say About Us"
          description="Hear from the parents who have entrusted us with their children's education."
          center
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((t) => (
            <div key={t.id} className="bg-[#f5f9ff] rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow relative">
              <Quote className="absolute top-5 right-5 w-8 h-8 text-[#1e40af]/10" />
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("w-4 h-4", i < t.rating ? "text-[#FF9933] fill-[#FF9933]" : "text-gray-300")} />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">"{t.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-[#1e40af] text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA Banner (simplified — no admission stuff) ─────────────────────
export function CTABanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#FF9933] to-[#e8c97a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")" }}
      />
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-[#1e40af] mb-4">Want to Know More About Our School?</h2>
          <p className="text-[#1e40af]/80 text-base mb-8">We'd love to show you what makes Guru Gorakshnath Gyanasthali a special place for your child. Reach out anytime.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="default" size="lg" className="bg-[#1e40af] text-white hover:bg-[#1e3a8a] shadow-lg">
                Get in Touch <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="border-2 border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af] hover:text-white">
                Learn About Us
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-[#1e40af]/70 flex-wrap">
            {["Experienced Faculty", "CBSE Affiliated", "Safe & Nurturing Campus"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1e40af]" />
                {item}
              </span>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <a href="https://www.facebook.com/61555972687989/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-[#1e40af] hover:bg-[#1e3a8a] flex items-center justify-center text-white transition-colors shadow-md" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="https://www.instagram.com/gurugorakshnathgyansthali/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-90 flex items-center justify-center text-white transition-opacity shadow-md" aria-label="Instagram">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://wa.me/919794335475" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-[#25D366] hover:bg-[#1fb855] flex items-center justify-center text-white transition-colors shadow-md" aria-label="WhatsApp">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
