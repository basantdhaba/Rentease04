"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import PropertyDetails from "@/components/PropertyDetails"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useToast } from "@/components/ui/use-toast"
import { isLoggedIn } from "@/lib/auth"

export default function PropertyPage() {
  const params = useParams()
  const { id } = params
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const checkAuth = () => {
      try {
        if (!isLoggedIn()) {
          router.push(`/login?redirect=/property/${id}`)
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
        toast({
          title: "Error",
          description: "An error occurred while checking your login status. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [id, router, toast])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!isLoggedIn()) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <PropertyDetails propertyId={id} />
      </main>
      <Footer />
    </div>
  )
}

