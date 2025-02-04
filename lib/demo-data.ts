export interface User {
  id: number
  name: string
  email: string
  password: string
  role: "user" | "admin"
}

export const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "user",
  },
  {
    id: 2,
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
]

export interface Property {
  id: number
  title: string
  type: string
  bedrooms: number
  bathrooms: number
  area: number
  rent: number
  location: string
  pinCode: string
  nearbyPlaces: string[]
  interestedTenants: number
  youtubeLink: string
  availableFrom: string
  liftAvailable: boolean
  furnishingStatus: "unfurnished" | "semi-furnished" | "fully-furnished"
  furnishings?: {
    ac: number
    geyser: number
    tv: number
    table: number
    chair: number
  }
  tenantPreferences: {
    students: boolean
    maleStudents: boolean
    femaleStudents: boolean
    family: boolean
    familySize?: string
    sharing: boolean
  }
  acceptableReligions: string[]
  additionalFacilities: {
    food: boolean
    wifi: boolean
    parking: boolean
    laundry: boolean
  }
  ownerWhatsApp: string
  status?: "pending" | "approved" | "rejected"
  shootRequested?: boolean
}

export const properties: Property[] = [
  {
    id: 1,
    title: "Modern Apartment in City Center",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 1000,
    rent: 20000,
    location: "MG Road, Bangalore, Karnataka",
    pinCode: "560001",
    nearbyPlaces: ["Cubbon Park", "UB City", "Chinnaswamy Stadium"],
    interestedTenants: 5,
    youtubeLink: "https://www.youtube.com/watch?v=example1",
    availableFrom: "2023-07-01",
    liftAvailable: true,
    furnishingStatus: "fully-furnished",
    furnishings: {
      ac: 2,
      geyser: 2,
      tv: 1,
      table: 2,
      chair: 4,
    },
    tenantPreferences: {
      students: false,
      maleStudents: false,
      femaleStudents: false,
      family: true,
      familySize: "4",
      sharing: false,
    },
    acceptableReligions: ["Hindu", "Christian", "Muslim", "Sikh"],
    additionalFacilities: {
      food: false,
      wifi: true,
      parking: true,
      laundry: true,
    },
    ownerWhatsApp: "9876543210",
  },
  {
    id: 2,
    title: "Spacious Family Home",
    type: "Independent House",
    bedrooms: 4,
    bathrooms: 3,
    area: 2000,
    rent: 35000,
    location: "Koramangala, Bangalore, Karnataka",
    pinCode: "560034",
    nearbyPlaces: ["Forum Mall", "Koramangala Social"],
    interestedTenants: 8,
    youtubeLink: "",
    availableFrom: "2023-08-15",
    liftAvailable: false,
    furnishingStatus: "semi-furnished",
    furnishings: {
      ac: 1,
      geyser: 3,
      tv: 1,
      table: 1,
      chair: 6,
    },
    tenantPreferences: {
      students: false,
      maleStudents: false,
      femaleStudents: false,
      family: true,
      familySize: "6",
      sharing: false,
    },
    acceptableReligions: ["Hindu", "Jain", "Sikh"],
    additionalFacilities: {
      food: false,
      wifi: true,
      parking: true,
      laundry: false,
    },
    ownerWhatsApp: "9876543211",
  },
  {
    id: 3,
    title: "Cozy Studio Near Tech Park",
    type: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    area: 500,
    rent: 15000,
    location: "Whitefield, Bangalore, Karnataka",
    pinCode: "560066",
    nearbyPlaces: ["Manyata Tech Park", "ITPL"],
    interestedTenants: 7,
    youtubeLink: "https://www.youtube.com/watch?v=example3",
    availableFrom: "2023-06-01",
    liftAvailable: true,
    furnishingStatus: "unfurnished",
    furnishings: {
      ac: 0,
      geyser: 1,
      tv: 0,
      table: 1,
      chair: 1,
    },
    tenantPreferences: {
      students: true,
      maleStudents: true,
      femaleStudents: true,
      family: false,
      sharing: true,
    },
    acceptableReligions: ["Hindu", "Muslim", "Sikh", "Christian", "Jain", "Buddhist"],
    additionalFacilities: {
      food: false,
      wifi: false,
      parking: false,
      laundry: false,
    },
    ownerWhatsApp: "9876543212",
  },
]

export interface VideoRequest {
  id: number
  propertyId: number
  seekerWhatsApp: string
  requestDate: string
  paymentStatus: "paid" | "pending"
}

export const videoRequests: VideoRequest[] = [
  {
    id: 1,
    propertyId: 1,
    seekerWhatsApp: "9876543211",
    requestDate: "2023-06-15",
    paymentStatus: "paid",
  },
  {
    id: 2,
    propertyId: 2,
    seekerWhatsApp: "9876543212",
    requestDate: "2023-06-16",
    paymentStatus: "pending",
  },
]

export const settings = {
  upiId: "example@upi",
  interestedFees: [
    { maxRent: 10000, fee: 25 },
    { maxRent: 15000, fee: 49 },
    { maxRent: 20000, fee: 75 },
    { maxRent: Number.POSITIVE_INFINITY, fee: 99 },
  ],
  videoRequestFees: [
    { maxRent: 10000, fee: 30 },
    { maxRent: 15000, fee: 55 },
    { maxRent: 20000, fee: 80 },
    { maxRent: Number.POSITIVE_INFINITY, fee: 110 },
  ],
  socialLinks: {
    facebook: "https://facebook.com/rentease",
    twitter: "https://twitter.com/rentease",
    instagram: "https://instagram.com/rentease",
  },
}

