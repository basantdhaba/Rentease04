import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">About RentEase</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              Welcome to RentEase, your trusted partner in finding the perfect rental property. 
              Founded in 2023, we've made it our mission to simplify the rental process for both 
              tenants and property owners.
            </p>
            <h2 className="text-2xl font-semibold mt-6">Our Mission</h2>
            <p>
              At RentEase, we believe that finding a home should be an exciting and stress-free 
              experience. Our platform is designed to connect quality tenants with outstanding 
              properties, creating harmonious rental relationships.
            </p>
            <h2 className="text-2xl font-semibold mt-6">What Sets Us Apart</h2>
            <ul className="list-disc pl-6">
              <li>Comprehensive property listings with detailed information</li>
              <li>Innovative video tour feature for virtual property viewing</li>
              <li>User-friendly interface for easy navigation and property comparison</li>
              <li>Dedicated customer support to assist you throughout your rental journey</li>
            </ul>
            <p className="mt-6">
              Whether you're a tenant looking for your dream home or a property owner seeking 
              reliable tenants, RentEase is here to make your rental experience seamless and 
              enjoyable.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

