import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

// TODO: Replace this with actual database queries in production
const mockProperties = [
  {
    id: 1,
    title: "Cozy Apartment in City Center",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 1,
    area: 800,
    rent: 1200,
    location: "123 Main St, Cityville",
    pinCode: "12345",
    nearbyPlaces: ["Park", "Supermarket", "Bus Stop"],
    interestedTenants: 5,
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    availableFrom: "2023-07-01",
    liftAvailable: true,
    furnishingStatus: "semi-furnished",
    ownerWhatsApp: "+1234567890",
  },
  // Add more mock properties as needed
]

export async function GET(request: Request) {
  // TODO: Replace with actual database query in production
  return NextResponse.json(mockProperties)
}

export async function POST(request: Request) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1]
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = verifyToken(token)
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const body = await request.json()
    // TODO: Replace with actual database insertion in production
    const newProperty = { id: mockProperties.length + 1, ...body }
    mockProperties.push(newProperty)
    return NextResponse.json(newProperty, { status: 201 })
  } catch (error) {
    console.error("Error creating property:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

