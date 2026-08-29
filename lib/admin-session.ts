"use client"

// Shared admin session handling.
//
// We persist the session in BOTH a cookie and localStorage. Mobile browsers
// and in-app webviews (Instagram/Facebook, iOS private mode) frequently block
// or isolate localStorage, and a full-page navigation right after a
// localStorage write can race so the value is not readable on the next page.
// A cookie is read synchronously on the very next request/render and survives
// those environments, so it is the source of truth; localStorage is a mirror.

export const ADMIN_EMAIL = "gggprincipal@gmail.com"

const COOKIE_NAME = "ggg_admin"
const STORAGE_KEY = "ggg_admin"
const MAX_AGE_SECONDS = 60 * 60 * 8 // 8 hours

export type AdminSession = {
  email: string
  loggedIn: boolean
  loginTime: string
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
  return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : null
}

export function setAdminSession(): AdminSession {
  const session: AdminSession = {
    email: ADMIN_EMAIL,
    loggedIn: true,
    loginTime: new Date().toISOString(),
  }
  const value = encodeURIComponent(JSON.stringify(session))

  // Cookie: primary, mobile-safe. SameSite=Lax so it survives the redirect.
  const secure = typeof window !== "undefined" && window.location.protocol === "https:"
  document.cookie = [
    `${COOKIE_NAME}=${value}`,
    "path=/",
    `max-age=${MAX_AGE_SECONDS}`,
    "samesite=lax",
    secure ? "secure" : "",
  ]
    .filter(Boolean)
    .join("; ")

  // localStorage: mirror, best-effort (may throw in private/webview modes).
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } catch {
    // Ignore — cookie is the source of truth.
  }

  return session
}

export function getAdminSession(): AdminSession | null {
  // Prefer the cookie; fall back to localStorage.
  const raw = readCookie(COOKIE_NAME) ?? safeLocalStorageGet(STORAGE_KEY)
  if (!raw) return null
  try {
    const data = JSON.parse(raw) as AdminSession
    return data.loggedIn && data.email === ADMIN_EMAIL ? data : null
  } catch {
    return null
  }
}

export function isAdminLoggedIn(): boolean {
  return getAdminSession() !== null
}

export function clearAdminSession() {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; samesite=lax`
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore.
  }
}

function safeLocalStorageGet(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}
