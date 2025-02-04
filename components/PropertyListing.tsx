import Image from 'next/image'
import { Bed, Bath, Square } from 'lucide-react'

const properties = [
  {
    id: 1,
    title: 'Modern Apartment in Downtown',
    image: '/placeholder.svg',
    price: 1500,
    beds: 2,
    baths: 2,
    sqft: 1000,
  },
  {
    id: 2,
    title: 'Cozy Studio near the Park',
    image: '/placeholder.svg',
    price: 1000,
    beds: 1,
    baths: 1,
    sqft: 500,
  },
  {
    id: 3,
    title: 'Spacious Family Home',
    image: '/placeholder.svg',
    price: 2500,
    beds: 4,
    baths: 3,
    sqft: 2000,
  },
]

export default function PropertyListing() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                <p className="text-2xl font-bold text-blue-600 mb-4">${property.price}/month</p>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center">
                    <Bed size={18} className="mr-1" /> {property.beds} beds
                  </span>
                  <span className="flex items-center">
                    <Bath size={18} className="mr-1" /> {property.baths} baths
                  </span>
                  <span className="flex items-center">
                    <Square size={18} className="mr-1" /> {property.sqft} sqft
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

