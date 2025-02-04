"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useSettings } from "@/contexts/SettingsContext"
import PropertyEditForm from "@/components/PropertyEditForm"
import { properties as demoProperties } from "@/lib/demo-data"
import type { Property } from "@/lib/demo-data"
import { CSVLink } from "react-csv"

export default function AdminDashboard() {
  const [properties, setProperties] = useState<Property[]>([])
  const [pendingProperties, setPendingProperties] = useState<Property[]>([])
  const [searchWhatsApp, setSearchWhatsApp] = useState("")
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [newVideoLink, setNewVideoLink] = useState("")
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [viewingProperty, setViewingProperty] = useState<Property | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const { settings, updateSettings } = useSettings()

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = document.cookie.includes("adminToken=") && localStorage.getItem("adminToken")
        if (!token) {
          router.push("/admin/login")
        } else {
          setIsLoading(false)
          fetchProperties()
          fetchPendingProperties()
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
        toast({
          title: "Authentication Error",
          description: "Please try logging in again.",
          variant: "destructive",
        })
      }
    }
    checkAuth()
  }, [router, toast])

  const fetchProperties = async () => {
    // For demo, using demo data
    setProperties(demoProperties)
  }

  const fetchPendingProperties = async () => {
    // In a real application, you would fetch this from an API
    // For now, we'll simulate it with local storage
    const pendingPropertiesJson = localStorage.getItem("pendingProperties")
    const pendingProps = pendingPropertiesJson ? JSON.parse(pendingPropertiesJson) : []
    setPendingProperties(pendingProps)
  }

  const handleLogout = () => {
    document.cookie = "adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
    localStorage.removeItem("adminToken")
    window.location.href = "/admin/login"
  }

  const handleSaveSettings = () => {
    try {
      updateSettings(settings)
      toast({
        title: "Success",
        description: "Settings saved successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      })
    }
  }

  const handleUpdateVideoLink = (property: Property) => {
    setSelectedProperty(property)
    setNewVideoLink(property.youtubeLink || "")
    setIsUpdateDialogOpen(true)
  }

  const handleSaveVideoLink = async () => {
    if (!selectedProperty) return

    try {
      const updatedProperties = properties.map((p) =>
        p.id === selectedProperty.id ? { ...p, youtubeLink: newVideoLink } : p,
      )
      setProperties(updatedProperties)
      setIsUpdateDialogOpen(false)
      toast({
        title: "Success",
        description: "Video link updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update video link",
        variant: "destructive",
      })
    }
  }

  const generateExcelData = () => {
    const data = [
      [
        "Property ID",
        "Title",
        "Type",
        "Bedrooms",
        "Bathrooms",
        "Area",
        "Rent",
        "Location",
        "Pin Code",
        "Interested Tenants",
        "YouTube Link",
        "Available From",
        "Lift Available",
        "Furnishing Status",
        "Owner WhatsApp",
        "Shoot Requested",
      ],
      ...properties.map((p) => [
        p.id,
        p.title,
        p.type,
        p.bedrooms,
        p.bathrooms,
        p.area,
        p.rent,
        p.location,
        p.pinCode,
        p.interestedTenants,
        p.youtubeLink,
        p.availableFrom,
        p.liftAvailable ? "Yes" : "No",
        p.furnishingStatus,
        p.ownerWhatsApp,
        p.shootRequested ? "Yes" : "No",
      ]),
      ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["Interested Media Requests"],
      ["Property ID", "User WhatsApp", "Request Date"],
      [1, "+919876543210", "2023-06-15"],
      [2, "+919876543211", "2023-06-16"],
    ]
    return data
  }

  const handleEditProperty = (property: Property) => {
    setSelectedProperty(property)
    setIsEditDialogOpen(true)
  }

  const handleApproveProperty = (property: Property) => {
    // Remove from pending properties
    const updatedPendingProperties = pendingProperties.filter((p) => p.id !== property.id)
    setPendingProperties(updatedPendingProperties)
    localStorage.setItem("pendingProperties", JSON.stringify(updatedPendingProperties))

    // Add to approved properties
    const updatedProperties = [...properties, { ...property, status: "approved" }]
    setProperties(updatedProperties)

    // Update approved properties in localStorage
    localStorage.setItem("approvedProperties", JSON.stringify(updatedProperties))

    toast({
      title: "Success",
      description: "Property approved successfully",
    })
  }

  const startEditing = () => {
    if (viewingProperty) {
      setSelectedProperty(viewingProperty)
      setIsEditDialogOpen(true)
      setViewingProperty(null)
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <Card className="max-w-6xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Admin Dashboard</CardTitle>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Settings Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Settings</h2>

            {/* UPI Settings */}
            <div className="space-y-2">
              <label className="text-sm font-medium">UPI ID</label>
              <Input
                value={settings.upiId}
                onChange={(e) => updateSettings({ ...settings, upiId: e.target.value })}
                placeholder="Enter UPI ID"
              />
            </div>

            {/* Fee Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Fee Settings</h3>
              <div className="space-y-2">
                <h4 className="text-md font-medium">Interested Fee</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rent Range (₹)</TableHead>
                      <TableHead>Fee (₹)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {settings.interestedFees.map((tier, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {index === 0 ? "0" : `${settings.interestedFees[index - 1].maxRent + 1}`} -
                          {tier.maxRent === Number.POSITIVE_INFINITY ? "Above" : tier.maxRent}
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={tier.fee}
                            onChange={(e) => {
                              const newFees = [...settings.interestedFees]
                              newFees[index].fee = Number.parseInt(e.target.value)
                              updateSettings({ ...settings, interestedFees: newFees })
                            }}
                            className="w-24"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="space-y-2">
                <h4 className="text-md font-medium">Media Request Fee</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rent Range (₹)</TableHead>
                      <TableHead>Fee (₹)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {settings.mediaRequestFees.map((tier, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {index === 0 ? "0" : `${settings.mediaRequestFees[index - 1].maxRent + 1}`} -
                          {tier.maxRent === Number.POSITIVE_INFINITY ? "Above" : tier.maxRent}
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={tier.fee}
                            onChange={(e) => {
                              const newFees = [...settings.mediaRequestFees]
                              newFees[index].fee = Number.parseInt(e.target.value)
                              updateSettings({ ...settings, mediaRequestFees: newFees })
                            }}
                            className="w-24"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Social Media Links</h3>
              <Input
                value={settings.socialLinks.facebook}
                onChange={(e) =>
                  updateSettings({ ...settings, socialLinks: { ...settings.socialLinks, facebook: e.target.value } })
                }
                placeholder="Facebook URL"
              />
              <Input
                value={settings.socialLinks.twitter}
                onChange={(e) =>
                  updateSettings({ ...settings, socialLinks: { ...settings.socialLinks, twitter: e.target.value } })
                }
                placeholder="Twitter URL"
              />
              <Input
                value={settings.socialLinks.instagram}
                onChange={(e) =>
                  updateSettings({ ...settings, socialLinks: { ...settings.socialLinks, instagram: e.target.value } })
                }
                placeholder="Instagram URL"
              />
            </div>

            <Button onClick={handleSaveSettings}>Save All Changes</Button>
          </section>

          {/* Property Management */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Property Management</h2>
            <Input
              placeholder="Search by WhatsApp number"
              value={searchWhatsApp}
              onChange={(e) => setSearchWhatsApp(e.target.value)}
              className="mb-4"
            />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>WhatsApp</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Video Shoot</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties
                  .filter((p) => p.ownerWhatsApp.includes(searchWhatsApp))
                  .map((property) => (
                    <TableRow key={property.id}>
                      <TableCell>{property.title}</TableCell>
                      <TableCell>{property.location}</TableCell>
                      <TableCell>{property.ownerWhatsApp}</TableCell>
                      <TableCell>{property.status || "Pending"}</TableCell>
                      <TableCell>{property.shootRequested ? "Requested" : "Not Requested"}</TableCell>
                      <TableCell>
                        <div className="space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditProperty(property)}>
                            Edit
                          </Button>
                          {property.status !== "approved" && (
                            <Button size="sm" variant="secondary" onClick={() => handleApproveProperty(property)}>
                              Approve
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </section>

          {/* Pending Properties */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Pending Properties</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>WhatsApp</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingProperties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell>{property.title}</TableCell>
                    <TableCell>{property.location}</TableCell>
                    <TableCell>{property.ownerWhatsApp}</TableCell>
                    <TableCell>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditProperty(property)}>
                          View
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => handleApproveProperty(property)}>
                          Approve
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>

          {/* Excel Download */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Download Reports</h2>
            <CSVLink
              data={generateExcelData()}
              filename={"property_and_requests_report.csv"}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Download Excel Report
            </CSVLink>
          </section>
        </CardContent>
      </Card>

      {/* Video Link Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Video Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              value={newVideoLink}
              onChange={(e) => setNewVideoLink(e.target.value)}
              placeholder="Enter YouTube video link"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveVideoLink}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Property Edit Dialog */}
      {selectedProperty && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Edit Property</DialogTitle>
            </DialogHeader>
            <PropertyEditForm
              property={selectedProperty}
              onSave={(updatedProperty) => {
                if (pendingProperties.some((p) => p.id === updatedProperty.id)) {
                  setPendingProperties(
                    pendingProperties.map((p) => (p.id === updatedProperty.id ? updatedProperty : p)),
                  )
                } else {
                  setProperties(properties.map((p) => (p.id === updatedProperty.id ? updatedProperty : p)))
                }
                setIsEditDialogOpen(false)
                toast({
                  title: "Success",
                  description: "Property updated successfully",
                })
              }}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Property View Dialog */}
      {viewingProperty && (
        <Dialog open={!!viewingProperty} onOpenChange={() => setViewingProperty(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Property Details</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <h3 className="text-lg font-semibold">{viewingProperty.title}</h3>
              <p>
                <strong>Location:</strong> {viewingProperty.location}
              </p>
              <p>
                <strong>Type:</strong> {viewingProperty.type}
              </p>
              <p>
                <strong>Bedrooms:</strong> {viewingProperty.bedrooms}
              </p>
              <p>
                <strong>Bathrooms:</strong> {viewingProperty.bathrooms}
              </p>
              <p>
                <strong>Area:</strong> {viewingProperty.area} sq.ft
              </p>
              <p>
                <strong>Rent:</strong>{" "}
                {viewingProperty.rent ? `₹${viewingProperty.rent.toLocaleString("en-IN")}/month` : "N/A"}
              </p>
              <p>
                <strong>Available From:</strong> {new Date(viewingProperty.availableFrom).toLocaleDateString()}
              </p>
              <p>
                <strong>Lift Available:</strong> {viewingProperty.liftAvailable ? "Yes" : "No"}
              </p>
              <p>
                <strong>Furnishing Status:</strong> {viewingProperty.furnishingStatus}
              </p>
              <p>
                <strong>Owner WhatsApp:</strong> {viewingProperty.ownerWhatsApp}
              </p>
              {/* Add more details as needed */}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewingProperty(null)}>
                Cancel
              </Button>
              <Button onClick={startEditing}>Edit Property</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

