"use client"
import React from "react"
import { cn } from "@/lib/utils"

const LOGO_URL = "https://i.ibb.co/ZRJG6kqY/logo.png"

export function LogoImage({ className }: { className?: string }) {
  return (
    <img
      src={LOGO_URL}
      alt="Guru Gorakshnath Gyanasthali"
      className={cn("object-contain", className)}
    />
  )
}
