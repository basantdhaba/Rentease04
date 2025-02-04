import { Toaster } from "@/components/ui/toaster"
import ErrorBoundary from "@/components/ErrorBoundary"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "RentEase",
  description: "Find your perfect rental property",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ErrorBoundary>{children}</ErrorBoundary>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}

