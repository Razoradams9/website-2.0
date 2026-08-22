import { redirect } from "next/navigation"

// Public login page removed. Admin login is at /admin/login
export default function LoginPage() {
  redirect("/")
}
