"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, Square, IndianRupee } from "lucide-react"
import { Button } from "@/components/ui/button"
import type React from "react" // Added import for React

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
}

export const Property = ({
  property,
  onActionClick,
  isSelected,
  onSelect,
}: {
  property: Property
  onActionClick: (e: React.MouseEvent) => void
  isSelected: boolean
  onSelect: () => void
}) => {
  return (
    <Card key={property.id} className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-lg md:text-xl">{property.title}</CardTitle>
        <Badge className="w-fit">{property.type}</Badge>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              {property.bedrooms} {property.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
            </span>
            <span className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              {property.bathrooms} {property.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <Square className="w-4 h-4 mr-1" />
            {property.area} sq.ft
          </div>
          <p className="text-sm text-muted-foreground">{property.location}</p>
          <div className="flex items-center text-sm text-muted-foreground">
            <IndianRupee className="w-4 h-4 mr-1" />
            <span className="font-bold">{property.rent.toLocaleString("en-IN")}</span>
            <span className="text-sm text-muted-foreground ml-1">/month</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={(e) => {
                e.stopPropagation()
                onSelect()
              }}
            >
              {isSelected ? "Unselect" : "Select"}
            </Button>
            <Button variant="secondary" size="sm" className="text-xs" onClick={onActionClick}>
              Interested
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

