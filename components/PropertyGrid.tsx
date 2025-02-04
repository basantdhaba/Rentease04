"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";


// ... other imports ...

const PropertyGrid = ({ properties }: { properties: Property[] }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isEditFormOpen, setIsEditFormOpen] = useState(false)

  // ... other code ...

  const handlePropertyClick = async (propertyId: number) => {
    try {
      // Fetch the full property details before opening the edit form
      const response = await fetch(`/api/properties/${propertyId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch property details")
      }
      const propertyData = await response.json()
      setSelectedProperty(propertyData)
      setIsEditFormOpen(true)
    } catch (error) {
      console.error("Error fetching property details:", error)
      toast({
        title: "Error",
        description: "Failed to load property details.",
        variant: "destructive",
      })
    }
  }

  // ... rest of code ...
}

// ... other code ...

interface Property {
  // Define your property interface here
  id: number
  // ... other properties ...
}

