"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"
import { useEffect, useState } from "react"

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  })

  useEffect(() => {
    // In a real application, you would fetch these from your backend
    // This is just a simulation
    setSocialLinks({
      facebook: "https://facebook.com/rentease",
      twitter: "https://twitter.com/rentease",
      instagram: "https://instagram.com/rentease",
    })
  }, [])

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About RentEase</h3>
            <p className="text-primary-foreground/80">
              RentEase is your trusted platform for finding and listing rental properties. We make the process simple
              and efficient for both tenants and property owners.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-2">
              <li>Email: support@rentease.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Property Street, Real Estate City, 12345</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-secondary transition-colors"
              >
                <Facebook />
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-secondary transition-colors"
              >
                <Twitter />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-secondary transition-colors"
              >
                <Instagram />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-primary-foreground/60">
          <p>&copy; 2025 RentEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

