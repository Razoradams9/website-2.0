"use client"
import React from "react"
import { Bell } from "lucide-react"

interface TickerProps {
  items: { id: string; title: string; category: string }[]
}

export function NewsTicker({ items }: TickerProps) {
  if (!items.length) return null
  const doubled = [...items, ...items]

  return (
    <div className="bg-[#138808] text-white overflow-hidden">
      <div className="flex items-stretch">
        <div className="flex-shrink-0 flex items-center gap-2 bg-[#FF9933] text-[#138808] px-5 py-2.5 font-bold text-sm z-10">
          <Bell className="w-4 h-4 animate-pulse" />
          <span className="uppercase tracking-wider text-xs">Latest</span>
        </div>
        <div className="relative flex-1 overflow-hidden py-2.5">
          <div className="flex gap-16 animate-ticker whitespace-nowrap hover:[animation-play-state:paused]">
            {doubled.map((item, i) => (
              <span key={`${item.id}-${i}`} className="flex items-center gap-3 text-sm">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF9933] flex-shrink-0" />
                <span className="text-[#FF9933] text-xs font-semibold uppercase">{item.category}</span>
                <span className="text-gray-200">{item.title}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
