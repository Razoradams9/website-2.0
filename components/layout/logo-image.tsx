"use client"
import React from "react"
import { cn } from "@/lib/utils"

const LOGO_URL = "https://drive.google.com/uc?export=view&id=1sIthpiMwvMfJRQ-bAibcvKZrOMZqB0Pi"

export function LogoImage({ className }: { className?: string }) {
  return (
    <img
      src={LOGO_URL}
      alt="Guru Gorakshnath Gyanasthali"
      className={cn("object-contain", className)}
    />
  )
}
