"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Bed,
  Bath,
  Square,
  IndianRupee,
  Users,
  Calendar,
  MapPin,
  Landmark,
  CableCarIcon as Elevator,
  Utensils,
  Wifi,
  Car,
  Shirt,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { properties as demoProperties } from "../lib/demo-data"
import PaymentPrompt from "./PaymentPrompt"
import type { Property } from "@/lib/demo-data"
import { toast } from "@/components/ui/use-toast"

interface PropertyDetailsProps {
  propertyId: string | number
}

//Dummy isLoggedIn function.  Replace with your actual implementation.
const isLoggedIn = () => false

export default function PropertyDetails({ propertyId }: PropertyDetailsProps) {
  const [property, setProperty] = useState<Property | null>(null)
  const [isPaymentPromptOpen, setIsPaymentPromptOpen] = useState(false)

  useEffect(() => {
    const fetchProperty = () => {
      // First, check demo properties
      let foundProperty = demoProperties.find((p) => p.id === Number(propertyId))

      if (!foundProperty) {
        // If not found in demo properties, check approved properties in localStorage
        const approvedPropertiesJson = localStorage.getItem("approvedProperties")
        const approvedProperties = approvedPropertiesJson ? JSON.parse(approvedPropertiesJson) : []
        foundProperty = approvedProperties.find((p) => p.id === Number(propertyId))
      }

      if (foundProperty) {
        setProperty(foundProperty)
      } else {
        // If property is not found, set an error state
        setProperty(null)
        toast({
          title: "Error",
          description: "Property not found",
          variant: "destructive",
        })
      }
    }

    fetchProperty()
  }, [propertyId, toast])

  if (!property) {
    return <div className="text-center py-8">Property not found</div>
  }

  const handleRequestVideo = () => {
    setIsPaymentPromptOpen(true)
  }

  const handlePaymentConfirm = (whatsappNumber: string) => {
    // In a real app, you would send the video link to the provided WhatsApp number
    console.log(`Sending video link to WhatsApp number: ${whatsappNumber}`)
    setIsPaymentPromptOpen(false)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{property.title}</CardTitle>
        <Badge variant="secondary" className="w-fit">
          {property.type}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center">
            <Bed className="w-5 h-5 mr-2" />
            <span>{property.bedrooms} Bedrooms</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-5 h-5 mr-2" />
            <span>{property.bathrooms} Bathrooms</span>
          </div>
          <div className="flex items-center">
            <Square className="w-5 h-5 mr-2" />
            <span>{property.area} sq.ft</span>
          </div>
          <div className="flex items-center">
            <IndianRupee className="w-5 h-5 mr-2" />
            <span>{property.rent.toLocaleString("en-IN")}/month</span>
          </div>
        </div>

        <Separator />

        {/* Location Details */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Location Details</h3>
          <div className="grid gap-2">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{property.location}</span>
            </div>
            <div className="flex items-center">
              <Landmark className="w-5 h-5 mr-2" />
              <span>PIN Code: {property.pinCode}</span>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Nearby Places:</h4>
            <ul className="list-disc list-inside space-y-1">
              {property.nearbyPlaces.map((place, index) => (
                <li key={index}>{place}</li>
              ))}
            </ul>
          </div>
        </div>

        <Separator />

        {/* Amenities & Features */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Amenities & Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <Elevator className="w-5 h-5 mr-2" />
              <span>Lift: {property.liftAvailable ? "Available" : "Not Available"}</span>
            </div>
            <div className="flex items-center">
              <Utensils className="w-5 h-5 mr-2" />
              <span>Food: {property.additionalFacilities?.food ? "Available" : "Not Available"}</span>
            </div>
            <div className="flex items-center">
              <Wifi className="w-5 h-5 mr-2" />
              <span>WiFi: {property.additionalFacilities?.wifi ? "Available" : "Not Available"}</span>
            </div>
            <div className="flex items-center">
              <Car className="w-5 h-5 mr-2" />
              <span>Parking: {property.additionalFacilities?.parking ? "Available" : "Not Available"}</span>
            </div>
            <div className="flex items-center">
              <Shirt className="w-5 h-5 mr-2" />
              <span>Laundry: {property.additionalFacilities?.laundry ? "Available" : "Not Available"}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Furnishing Details */}
        {property.furnishingStatus !== "unfurnished" && (
          <>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Furnishing Details</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(property.furnishings || {}).map(([item, count]) => (
                    <TableRow key={item}>
                      <TableCell className="capitalize">{item}</TableCell>
                      <TableCell>{count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Separator />
          </>
        )}

        {/* Tenant Preferences */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Tenant Preferences</h3>
          <div className="grid gap-2">
            <div>
              <h4 className="font-medium">Acceptable Tenants:</h4>
              <ul className="list-disc list-inside">
                {property.tenantPreferences?.students && <li>Students</li>}
                {property.tenantPreferences?.maleStudents && <li>Male Students</li>}
                {property.tenantPreferences?.femaleStudents && <li>Female Students</li>}
                {property.tenantPreferences?.family && (
                  <li>
                    Family
                    {property.tenantPreferences.familySize && ` (Max size: ${property.tenantPreferences.familySize})`}
                  </li>
                )}
                {property.tenantPreferences?.sharing && <li>Sharing Allowed</li>}
              </ul>
            </div>
            {property.acceptableReligions?.length > 0 && (
              <div>
                <h4 className="font-medium">Preferred Religions:</h4>
                <p>{property.acceptableReligions.join(", ")}</p>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Availability */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Availability</h3>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            <span>Available from: {new Date(property.availableFrom).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            <span>{property.interestedTenants} interested tenants</span>
          </div>
        </div>

        {/* Owner Contact Details */}
        {isLoggedIn() && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Owner Contact</h3>
            <p>Contact details are available to logged-in users only.</p>
          </div>
        )}

        <Separator />

        {/* Request Video Button */}
        <div className="pt-4">
          <Button className="w-full" size="lg" onClick={handleRequestVideo}>
            Request Property Video
          </Button>
        </div>
      </CardContent>

      {/* Payment Prompt */}
      <PaymentPrompt
        isOpen={isPaymentPromptOpen}
        onClose={() => setIsPaymentPromptOpen(false)}
        onConfirm={handlePaymentConfirm}
        property={property}
        isInterested={false}
        onVideoRequest={handlePaymentConfirm}
      />
    </Card>
  )
}

