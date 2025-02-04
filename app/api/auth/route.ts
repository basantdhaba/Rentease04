import { NextResponse } from "next/server"
import { login, register } from "@/lib/auth"

export async function POST(request: Request) {
  const body = await request.json()
  const { action, email, password, name } = body

  if (action === "login") {
    const token = await login(email, password)
    if (token) {
      return NextResponse.json({ success: true, token, message: "Login successful" })
    } else {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }
  } else if (action === "register") {
    const { success, token } = await register(name, email, password)
    if (success) {
      return NextResponse.json({ success: true, token, message: "Registration successful" })
    } else {
      return NextResponse.json({ success: false, message: "Registration failed" }, { status: 400 })
    }
  } else {
    return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 })
  }
}

