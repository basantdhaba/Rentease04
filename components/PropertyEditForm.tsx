"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PropertyEditFormProps {
  isOpen: boolean
  onClose: () => void
  property?: any
  onSave: (property: any) => void
}

export default function PropertyEditForm({ isOpen, onClose, property, onSave }: PropertyEditFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    rent: "",
    location: "",
    pinCode: "",
    nearbyPlaces: "",
    youtubeLink: "",
    availableFrom: "",
    ownerWhatsApp: "",
    facilities: {
      food: false,
      parking: false,
      wifi: false,
      laundry: false,
    },
    tenantPreferences: {
      students: false,
      maleStudents: false,
      femaleStudents: false,
      family: false,
      sharing: false,
      videoShootRequested: false,
    },
  })

  useEffect(() => {
    if (property) {
      // Convert the nearbyPlaces array to comma-separated string if it exists
      const nearbyPlacesStr = Array.isArray(property.nearbyPlaces)
        ? property.nearbyPlaces.join(", ")
        : property.nearbyPlaces || ""

      setFormData({
        title: property.title || "",
        propertyType: property.type || "",
        bedrooms: property.bedrooms?.toString() || "",
        bathrooms: property.bathrooms?.toString() || "",
        area: property.area?.toString() || "",
        rent: property.rent?.toString() || "",
        location: property.location || "",
        pinCode: property.pinCode || "",
        nearbyPlaces: nearbyPlacesStr,
        youtubeLink: property.youtubeLink || "",
        availableFrom: property.availableFrom || "",
        ownerWhatsApp: property.ownerWhatsApp || "",
        facilities: {
          food: property.facilities?.includes("food") || false,
          parking: property.facilities?.includes("parking") || false,
          wifi: property.facilities?.includes("wifi") || false,
          laundry: property.facilities?.includes("laundry") || false,
        },
        tenantPreferences: {
          students: property.tenantPreferences?.includes("students") || false,
          maleStudents: property.tenantPreferences?.includes("maleStudents") || false,
          femaleStudents: property.tenantPreferences?.includes("femaleStudents") || false,
          family: property.tenantPreferences?.includes("family") || false,
          sharing: property.tenantPreferences?.includes("sharing") || false,
          videoShootRequested: property.tenantPreferences?.includes("videoShootRequested") || false,
        },
      })
    }
  }, [property])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFacilityChange = (facility: keyof typeof formData.facilities) => {
    setFormData((prev) => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [facility]: !prev.facilities[facility],
      },
    }))
  }

  const handlePreferenceChange = (preference: keyof typeof formData.tenantPreferences) => {
    setFormData((prev) => ({
      ...prev,
      tenantPreferences: {
        ...prev.tenantPreferences,
        [preference]: !prev.tenantPreferences[preference],
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Convert facilities and preferences to arrays
    const facilities = Object.entries(formData.facilities)
      .filter(([_, value]) => value)
      .map(([key]) => key)

    const tenantPreferences = Object.entries(formData.tenantPreferences)
      .filter(([_, value]) => value)
      .map(([key]) => key)

    // Convert nearbyPlaces string to array
    const nearbyPlaces = formData.nearbyPlaces
      .split(",")
      .map((place) => place.trim())
      .filter(Boolean)

    const updatedProperty = {
      ...property,
      title: formData.title,
      type: formData.propertyType,
      bedrooms: Number.parseInt(formData.bedrooms) || 0,
      bathrooms: Number.parseInt(formData.bathrooms) || 0,
      area: Number.parseInt(formData.area) || 0,
      rent: Number.parseInt(formData.rent) || 0,
      location: formData.location,
      pinCode: formData.pinCode,
      nearbyPlaces,
      youtubeLink: formData.youtubeLink,
      availableFrom: formData.availableFrom,
      ownerWhatsApp: formData.ownerWhatsApp,
      facilities,
      tenantPreferences,
    }

    onSave(updatedProperty)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Property</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="propertyType">Property Type</Label>
            <Select value={formData.propertyType} onValueChange={(value) => handleInputChange("propertyType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="room">Room</SelectItem>
                <SelectItem value="hostel">Hostel</SelectItem>
                <SelectItem value="pg">PG</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                id="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">Area (sq ft)</Label>
              <Input
                id="area"
                type="number"
                value={formData.area}
                onChange={(e) => handleInputChange("area", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rent">Rent (₹)</Label>
            <Input
              id="rent"
              type="number"
              value={formData.rent}
              onChange={(e) => handleInputChange("rent", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pinCode">PIN Code</Label>
            <Input
              id="pinCode"
              value={formData.pinCode}
              onChange={(e) => handleInputChange("pinCode", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nearbyPlaces">Nearby Places (comma-separated)</Label>
            <Input
              id="nearbyPlaces"
              value={formData.nearbyPlaces}
              onChange={(e) => handleInputChange("nearbyPlaces", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="youtubeLink">YouTube Video Link</Label>
            <Input
              id="youtubeLink"
              value={formData.youtubeLink}
              onChange={(e) => handleInputChange("youtubeLink", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="availableFrom">Available From</Label>
            <Input
              id="availableFrom"
              type="date"
              value={formData.availableFrom}
              onChange={(e) => handleInputChange("availableFrom", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ownerWhatsApp">Owner's WhatsApp</Label>
            <Input
              id="ownerWhatsApp"
              value={formData.ownerWhatsApp}
              onChange={(e) => handleInputChange("ownerWhatsApp", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Additional Facilities</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="food"
                  checked={formData.facilities.food}
                  onCheckedChange={() => handleFacilityChange("food")}
                />
                <Label htmlFor="food">Food</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="parking"
                  checked={formData.facilities.parking}
                  onCheckedChange={() => handleFacilityChange("parking")}
                />
                <Label htmlFor="parking">Parking</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="wifi"
                  checked={formData.facilities.wifi}
                  onCheckedChange={() => handleFacilityChange("wifi")}
                />
                <Label htmlFor="wifi">Wifi</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="laundry"
                  checked={formData.facilities.laundry}
                  onCheckedChange={() => handleFacilityChange("laundry")}
                />
                <Label htmlFor="laundry">Laundry</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tenant Preferences</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="students"
                  checked={formData.tenantPreferences.students}
                  onCheckedChange={() => handlePreferenceChange("students")}
                />
                <Label htmlFor="students">Students</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="maleStudents"
                  checked={formData.tenantPreferences.maleStudents}
                  onCheckedChange={() => handlePreferenceChange("maleStudents")}
                />
                <Label htmlFor="maleStudents">Male Students</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="femaleStudents"
                  checked={formData.tenantPreferences.femaleStudents}
                  onCheckedChange={() => handlePreferenceChange("femaleStudents")}
                />
                <Label htmlFor="femaleStudents">Female Students</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="family"
                  checked={formData.tenantPreferences.family}
                  onCheckedChange={() => handlePreferenceChange("family")}
                />
                <Label htmlFor="family">Family</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sharing"
                  checked={formData.tenantPreferences.sharing}
                  onCheckedChange={() => handlePreferenceChange("sharing")}
                />
                <Label htmlFor="sharing">Sharing</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="videoShootRequested"
                  checked={formData.tenantPreferences.videoShootRequested}
                  onCheckedChange={() => handlePreferenceChange("videoShootRequested")}
                />
                <Label htmlFor="videoShootRequested">Video Shoot Requested</Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

