import React from "react"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  label?: string
  title: string
  titleAccent?: string
  description?: string
  center?: boolean
  light?: boolean
  className?: string
}

export function SectionHeading({ label, title, titleAccent, description, center = false, light = false, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", center && "text-center", className)}>
      {label && (
        <div className={cn(
          "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3",
          center && "justify-center",
          light ? "text-[#c8a951]" : "text-[#c8a951]"
        )}>
          <span className="w-8 h-0.5 bg-[#c8a951] rounded" />
          {label}
          <span className="w-8 h-0.5 bg-[#c8a951] rounded" />
        </div>
      )}
      <h2 className={cn(
        "text-3xl sm:text-4xl font-black leading-tight",
        light ? "text-white" : "text-[#1a3c6e]"
      )}>
        {title}{" "}
        {titleAccent && <span className={cn(light ? "text-[#c8a951]" : "text-[#c8a951]")}>{titleAccent}</span>}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed max-w-2xl", center && "mx-auto", light ? "text-gray-300" : "text-gray-600")}>
          {description}
        </p>
      )}
    </div>
  )
}
