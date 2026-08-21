import { redirect } from "next/navigation"

// Login page is disabled for the public school website.
// Redirect to homepage.
export default function LoginPage() {
  redirect("/")
}
