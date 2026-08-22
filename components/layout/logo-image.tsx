"use client"
import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function LogoImage({ className }: { className?: string }) {
  const [src, setSrc] = useState("/images/logo.png")

  useEffect(() => {
    const stored = localStorage.getItem("ggg_logo_url")
    if (stored) setSrc(stored)
  }, [])

  return (
    <img
      src={src}
      alt="Guru Gorakshnath Gyanasthali"
      className={cn("object-contain", className)}
      onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
    />
  )
}
