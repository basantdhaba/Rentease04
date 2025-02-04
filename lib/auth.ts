import User from "../models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function login(email: string, password: string): Promise<string | null> {
  try {
    const user = await User.findOne({ where: { email } })
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1d",
      })
      return token
    }
  } catch (error) {
    console.error("Login error:", error)
  }
  return null
}

export async function register(name: string, email: string, password: string): Promise<{ success: boolean, token?: string }> {
  try {
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return { success: false }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({ name, email, password: hashedPassword })

    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, {
      expiresIn: "1d",
    })

    return { success: true, token }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false }
  }
}

export function verifyToken(token: string): { userId: number; email: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number; email: string }
  } catch (error) {
    return null
  }
}

export function isLoggedIn(): boolean {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("userToken")
  }
  return false
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("userToken")
    localStorage.removeItem("userName")
  }
}

export function getUserName(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userName")
  }
  return null
}

