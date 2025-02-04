import Header from "../components/Header"
import Hero from "../components/Hero"
import Footer from "../components/Footer"
import dynamic from "next/dynamic"
import { Suspense } from "react"

const DynamicPropertyGrid = dynamic(() => import("../components/PropertyGrid"), {
  ssr: false,
  loading: () => <p>Loading properties...</p>,
})

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Welcome to RentEase</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Find your perfect rental property with ease. Browse our curated selection of high-quality properties and
                connect with landlords directly.
              </p>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-primary">
              Discover Featured Properties
            </h2>
            <Suspense fallback={<p>Loading properties...</p>}>
              <DynamicPropertyGrid />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

