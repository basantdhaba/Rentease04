import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // Only protect admin routes
  if (path.startsWith("/admin") && path !== "/admin/login") {
    // Check for admin token in cookie
    const token = request.cookies.get("adminToken")?.value

    // If no token found, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

