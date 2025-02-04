"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Home, User, LogIn, LogOut, Menu, X } from "lucide-react"
import { isLoggedIn, logout, getUserName } from "@/lib/auth"

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setLoggedIn(isLoggedIn())
    setUserName(getUserName())
  }, [])

  const handleLogout = () => {
    logout()
    setLoggedIn(false)
    setUserName(null)
    router.push("/")
  }

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl md:text-2xl font-bold flex items-center">
            <Home className="mr-2 h-5 w-5 md:h-6 md:w-6" />
            RentEase
          </Link>

          {/* Mobile menu button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2" aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-4 items-center">
              <li>
                <Link href="/list-property" className="hover:text-secondary transition-colors">
                  List Property
                </Link>
              </li>
              {loggedIn ? (
                <>
                  <li>
                    <span className="text-secondary">{userName}</span>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="hover:text-secondary transition-colors flex items-center">
                      <LogOut className="mr-1" size={18} />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login" className="hover:text-secondary transition-colors flex items-center">
                      <LogIn className="mr-1" size={18} />
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90 transition-colors flex items-center"
                    >
                      <User className="mr-1" size={18} />
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/list-property"
                  className="block hover:text-secondary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  List Property
                </Link>
              </li>
              {loggedIn ? (
                <>
                  <li>
                    <span className="block text-secondary py-2">{userName}</span>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="w-full text-left hover:text-secondary transition-colors flex items-center py-2"
                    >
                      <LogOut className="mr-1" size={18} />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/login"
                      className="block hover:text-secondary transition-colors flex items-center py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LogIn className="mr-1" size={18} />
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="block bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90 transition-colors flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="mr-1" size={18} />
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

