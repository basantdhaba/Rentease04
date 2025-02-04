import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Property } from "./PropertyGrid"
import { ScrollArea } from "@/components/ui/scroll-area"

interface PropertyComparisonProps {
  properties: Property[]
  onClose: () => void
}

export default function PropertyComparison({ properties, onClose }: PropertyComparisonProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-full sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[60vw]">
        <DialogHeader>
          <DialogTitle>Property Comparison</DialogTitle>
          <DialogDescription>Compare selected properties side by side</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {properties.map((property) => (
              <div key={property.id} className="space-y-2">
                <h3 className="font-bold">{property.title}</h3>
                <p>Type: {property.type}</p>
                <p>Bedrooms: {property.bedrooms}</p>
                <p>Bathrooms: {property.bathrooms}</p>
                <p>Area: {property.area} sq.ft</p>
                <p>Rent: ₹{property.rent.toLocaleString("en-IN")}/month</p>
                <p>Location: {property.location}</p>
                <p>Pin Code: {property.pinCode}</p>
                <p>Nearby Places: {property.nearbyPlaces.join(", ")}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

