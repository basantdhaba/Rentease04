import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface NotificationPreferencesProps {
  isOpen: boolean
  onClose: () => void
  onSave: (preferences: NotificationPreferences) => void
}

export interface NotificationPreferences {
  enabled: boolean
  maxRent: number
  minBedrooms: number
  location: string
}

export default function NotificationPreferences({ isOpen, onClose, onSave }: NotificationPreferencesProps) {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    enabled: false,
    maxRent: 0,
    minBedrooms: 1,
    location: '',
  })

  const handleSave = () => {
    onSave(preferences)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notification Preferences</DialogTitle>
          <DialogDescription>Set up notifications for similar properties</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications-enabled">Enable Notifications</Label>
            <Switch
              id="notifications-enabled"
              checked={preferences.enabled}
              onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, enabled: checked }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-rent">Maximum Rent</Label>
            <Input
              id="max-rent"
              type="number"
              value={preferences.maxRent}
              onChange={(e) => setPreferences(prev => ({ ...prev, maxRent: parseInt(e.target.value) }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="min-bedrooms">Minimum Bedrooms</Label>
            <Input
              id="min-bedrooms"
              type="number"
              value={preferences.minBedrooms}
              onChange={(e) => setPreferences(prev => ({ ...prev, minBedrooms: parseInt(e.target.value) }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Preferred Location</Label>
            <Input
              id="location"
              value={preferences.location}
              onChange={(e) => setPreferences(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Preferences</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

