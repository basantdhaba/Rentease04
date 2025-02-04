"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function ListPropertyPage() {
  const [propertyDetails, setPropertyDetails] = useState({
    address: "",
    pinCode: "",
    nearestClub: "",
    carpetArea: "",
    liftAvailable: "",
    bedrooms: "",
    bathrooms: "",
    balconies: "",
    kitchenDesign: "",
    monthlyRent: "",
    deposit: "",
    monthlyMaintenance: "",
    propertyType: "",
    furnishingStatus: "unfurnished",
    furnishings: {
      ac: 0,
      geyser: 0,
      tv: 0,
      table: 0,
      chair: 0,
    },
    acceptableReligions: [],
    tenantPreferences: {
      students: false,
      maleStudents: false,
      femaleStudents: false,
      family: false,
      familySize: "",
      sharing: false,
    },
    additionalFacilities: {
      food: false,
      wifi: false,
      parking: false,
      laundry: false,
    },
    availableFrom: "",
    ownerWhatsApp: "",
    youtubeLink: "",
    needVideoShoot: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPropertyDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setPropertyDetails((prev) => ({
      ...prev,
      tenantPreferences: {
        ...prev.tenantPreferences,
        [name]: checked,
      },
    }))
  }

  const handleFurnishingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPropertyDetails((prev) => ({
      ...prev,
      furnishings: {
        ...prev.furnishings,
        [name]: value === "" ? "" : Number.parseInt(value),
      },
    }))
  }

  const sendWhatsAppMessage = async (phoneNumber: string, message: string) => {
    // In a real application, you would integrate with a WhatsApp API service
    // This is a placeholder to simulate sending a WhatsApp message
    console.log(`Sending WhatsApp message to ${phoneNumber}: ${message}`)
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return true
  }

  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the form submission to your backend
    console.log("Property Details:", propertyDetails)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate saving to local storage (in a real app, this would be sent to a server)
    const pendingProperties = JSON.parse(localStorage.getItem("pendingProperties") || "[]")
    pendingProperties.push(propertyDetails)
    localStorage.setItem("pendingProperties", JSON.stringify(pendingProperties))

    // Show success message
    toast({
      title: "Property Listed Successfully",
      description:
        "Your property has been submitted for review. We'll notify you once it's approved and live on the website.",
      duration: 5000,
    })

    // Redirect to home page
    router.push("/")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">List Your Property</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Property Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium text-gray-900">Basic Property Details</h2>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Full Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={propertyDetails.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      id="pinCode"
                      name="pinCode"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={propertyDetails.pinCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="nearestClub" className="block text-sm font-medium text-gray-700">
                      Nearest Club Name
                    </label>
                    <input
                      type="text"
                      id="nearestClub"
                      name="nearestClub"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={propertyDetails.nearestClub}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="carpetArea" className="block text-sm font-medium text-gray-700">
                      Carpet Area (sq ft)
                    </label>
                    <input
                      type="number"
                      id="carpetArea"
                      name="carpetArea"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={propertyDetails.carpetArea}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="liftAvailable" className="block text-sm font-medium text-gray-700">
                      Lift Available
                    </label>
                    <select
                      id="liftAvailable"
                      name="liftAvailable"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      value={propertyDetails.liftAvailable}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      id="bedrooms"
                      name="bedrooms"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={propertyDetails.bedrooms}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      id="bathrooms"
                      name="bathrooms"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={propertyDetails.bathrooms}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="balconies" className="block text-sm font-medium text-gray-700">
                      Balconies
                    </label>
                    <input
                      type="number"
                      id="balconies"
                      name="balconies"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={propertyDetails.balconies}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="kitchenDesign" className="block text-sm font-medium text-gray-700">
                    Kitchen Design
                  </label>
                  <input
                    type="text"
                    id="kitchenDesign"
                    name="kitchenDesign"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={propertyDetails.kitchenDesign}
                    onChange={handleInputChange}
                    placeholder="e.g., Open, L-shaped, etc."
                  />
                </div>
              </div>

              {/* Rent and Deposit Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium text-gray-900">Rent and Deposit Details</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label htmlFor="monthlyRent" className="block text-sm font-medium text-gray-700">
                      Monthly Rent (₹)
                    </label>
                    <input
                      type="number"
                      id="monthlyRent"
                      name="monthlyRent"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={propertyDetails.monthlyRent}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="deposit" className="block text-sm font-medium text-gray-700">
                      Security Deposit (₹)
                    </label>
                    <input
                      type="number"
                      id="deposit"
                      name="deposit"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={propertyDetails.deposit}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="monthlyMaintenance" className="block text-sm font-medium text-gray-700">
                      Monthly Maintenance (₹)
                    </label>
                    <input
                      type="number"
                      id="monthlyMaintenance"
                      name="monthlyMaintenance"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={propertyDetails.monthlyMaintenance}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Property Type */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium text-gray-900">Property Type</h2>
                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">
                    Select Property Type
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={propertyDetails.propertyType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a type</option>
                    <option value="apartment">Apartment</option>
                    <option value="flat">Flat</option>
                    <option value="independentHouse">Independent House</option>
                  </select>
                </div>
              </div>

              {/* Furnishing Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium text-gray-900">Furnishing Details</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Furnishing Status</label>
                  <div className="mt-2 space-x-4">
                    {["unfurnished", "semi-furnished", "fully-furnished"].map((status) => (
                      <label key={status} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="furnishingStatus"
                          value={status}
                          checked={propertyDetails.furnishingStatus === status}
                          onChange={handleInputChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">{status.replace("-", " ")}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {propertyDetails.furnishingStatus !== "unfurnished" && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Object.entries(propertyDetails.furnishings).map(([item, count]) => (
                      <div key={item}>
                        <label htmlFor={item} className="block text-sm font-medium text-gray-700 capitalize">
                          {item}
                        </label>
                        <input
                          type="number"
                          id={item}
                          name={item}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={count}
                          onChange={handleFurnishingChange}
                          min="0"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tenant Preferences */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium text-gray-900">Tenant Preferences</h2>
                <div className="space-y-2">
                  {Object.entries(propertyDetails.tenantPreferences).map(([key, value]) => {
                    if (key === "familySize") return null // We'll handle this separately
                    return (
                      <div key={key} className="flex items-center">
                        <input
                          id={key}
                          name={key}
                          type="checkbox"
                          checked={value as boolean}
                          onChange={handleCheckboxChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <label htmlFor={key} className="ml-2 block text-sm text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </label>
                      </div>
                    )
                  })}
                </div>
                <div>
                  <label htmlFor="familySize" className="block text-sm font-medium text-gray-700">
                    Maximum Family Size
                  </label>
                  <input
                    type="number"
                    id="familySize"
                    name="familySize"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={propertyDetails.tenantPreferences.familySize}
                    onChange={(e) =>
                      setPropertyDetails((prev) => ({
                        ...prev,
                        tenantPreferences: {
                          ...prev.tenantPreferences,
                          familySize: e.target.value,
                        },
                      }))
                    }
                    min="1"
                  />
                </div>
              </div>

              {/* Acceptable Religions */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium text-gray-900">Acceptable Religions</h2>
                <div className="space-y-2">
                  {["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Other"].map((religion) => (
                    <div key={religion} className="flex items-center">
                      <input
                        id={`religion-${religion}`}
                        name="acceptableReligions"
                        type="checkbox"
                        value={religion}
                        checked={propertyDetails.acceptableReligions.includes(religion)}
                        onChange={(e) => {
                          const updatedReligions = e.target.checked
                            ? [...propertyDetails.acceptableReligions, religion]
                            : propertyDetails.acceptableReligions.filter((r) => r !== religion)
                          setPropertyDetails((prev) => ({ ...prev, acceptableReligions: updatedReligions }))
                        }}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label htmlFor={`religion-${religion}`} className="ml-2 block text-sm text-gray-700">
                        {religion}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Facilities */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium text-gray-900">Additional Facilities</h2>
                <div className="space-y-2">
                  {Object.entries(propertyDetails.additionalFacilities).map(([facility, value]) => (
                    <div key={facility} className="flex items-center">
                      <input
                        id={facility}
                        name={facility}
                        type="checkbox"
                        checked={value}
                        onChange={(e) => {
                          setPropertyDetails((prev) => ({
                            ...prev,
                            additionalFacilities: {
                              ...prev.additionalFacilities,
                              [facility]: e.target.checked,
                            },
                          }))
                        }}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label htmlFor={facility} className="ml-2 block text-sm text-gray-700 capitalize">
                        {facility}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability Date */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium text-gray-900">Availability</h2>
                <div>
                  <label htmlFor="availableFrom" className="block text-sm font-medium text-gray-700">
                    Available From
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="availableFrom"
                      name="availableFrom"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      value={propertyDetails.availableFrom}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Owner Contact and Video Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium text-gray-900">Owner Contact and Video Details</h2>
                <div>
                  <label htmlFor="ownerWhatsApp" className="block text-sm font-medium text-gray-700">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    id="ownerWhatsApp"
                    name="ownerWhatsApp"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={propertyDetails.ownerWhatsApp}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit phone number"
                  />
                </div>
                <div>
                  <label htmlFor="youtubeLink" className="block text-sm font-medium text-gray-700">
                    YouTube Video Link (optional)
                  </label>
                  <input
                    type="url"
                    id="youtubeLink"
                    name="youtubeLink"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={propertyDetails.youtubeLink}
                    onChange={handleInputChange}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    You can add or update this link later from the admin dashboard.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="needVideoShoot"
                      name="needVideoShoot"
                      type="checkbox"
                      checked={propertyDetails.needVideoShoot}
                      onChange={(e) => setPropertyDetails((prev) => ({ ...prev, needVideoShoot: e.target.checked }))}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="needVideoShoot" className="font-medium text-gray-700">
                      I need help with video shooting
                    </label>
                    <p className="text-gray-500">
                      Check this box if you want us to arrange a video shoot of your property and upload it to our
                      YouTube channel.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    List Property
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

