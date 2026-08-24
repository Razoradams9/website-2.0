"use client"
import React from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle, ArrowRight } from "lucide-react"
import { siteConfig } from "@/config/site"
import { LogoImage } from "./logo-image"

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Administration", href: "/administration" },
  { label: "CBSE Disclosure", href: "/cbse-disclosure" },
  { label: "Contact Us", href: "/contact" },
]

const academicLinks = [
  { label: "Curriculum", href: "/academics/curriculum" },
  { label: "Classes & Subjects", href: "/academics/classes" },
  { label: "School Timings", href: "/academics/timings" },
  { label: "Infrastructure", href: "/about/infrastructure" },
  { label: "Campus Tour", href: "/about/campus" },
]

export function PublicFooter() {
  return (
    <footer className="bg-[#0a4d0a] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* School Info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <LogoImage className="w-12 h-12 rounded-full border-2 border-white/20 p-0.5 bg-white/10" />
              <div>
                <p className="font-black text-white text-sm leading-tight">GURU GORAKSHNATH</p>
                <p className="font-black text-white text-sm leading-tight">GYANASTHALI</p>
                <p className="text-[10px] text-gray-400 leading-tight mt-0.5">Inspiring Excellence, Creating Values</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              A new-age CBSE school in Siddharthnagar dedicated to nurturing young minds with quality education, modern facilities, and strong values rooted in Indian tradition.
            </p>
            <div className="space-y-3 text-sm">
              <a href="tel:9794335475" className="flex items-start gap-3 text-gray-400 hover:text-[#FF9933] transition-colors group">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>9794335475</span>
              </a>
              <a href="mailto:gggprincipal@gmail.com" className="flex items-start gap-3 text-gray-400 hover:text-[#FF9933] transition-colors group">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>gggprincipal@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Deoria (Vrindavan), Domariaganj, Siddharthnagar, U.P.</span>
              </div>
            </div>
            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/61555972687989/" },
                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/gurugorakshnathgyansthali/" },
                { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/919794335475" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#FF9933] flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-5 text-base relative pl-3 before:absolute before:left-0 before:top-0.5 before:h-4 before:w-0.5 before:bg-[#FF9933] before:rounded">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#FF9933] transition-colors group">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academics */}
          <div>
            <h4 className="font-bold text-white mb-5 text-base relative pl-3 before:absolute before:left-0 before:top-0.5 before:h-4 before:w-0.5 before:bg-[#FF9933] before:rounded">Academics</h4>
            <ul className="space-y-2.5">
              {academicLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#FF9933] transition-colors group">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Find Us */}
          <div>
            <h4 className="font-bold text-white mb-5 text-base relative pl-3 before:absolute before:left-0 before:top-0.5 before:h-4 before:w-0.5 before:bg-[#FF9933] before:rounded">Find Us</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
              <p className="text-white font-semibold text-sm mb-1">📍 Our Address</p>
              <p className="text-gray-400 text-xs leading-relaxed">Deoria (Vrindavan), Domariaganj, Siddharthnagar, Uttar Pradesh</p>
              <a
                href="https://share.google/CeejVfHG7kE03kE5n"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#FF9933] text-xs font-semibold mt-2 hover:underline"
              >
                Open in Google Maps →
              </a>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
              <p className="text-white font-semibold text-sm mb-1">📞 Contact</p>
              <p className="text-gray-400 text-xs">Phone: 9794335475</p>
              <p className="text-gray-400 text-xs">Email: gggprincipal@gmail.com</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-white font-semibold text-sm mb-1">🕐 School Hours</p>
              <p className="text-gray-400 text-xs">Monday – Saturday: 7:30 AM – 2:30 PM</p>
              <p className="text-gray-400 text-xs">Sunday & Holidays: Closed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Guru Gorakshnath Gyanasthali. All rights reserved.</p>
          <p className="text-gray-600">CBSE Affiliation No: {siteConfig.cbse.affiliationNo} | School Code: {siteConfig.cbse.schoolCode}</p>
        </div>
      </div>
    </footer>
  )
}
