import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { useSettings } from "@/contexts/SettingsContext"

interface PaymentPromptProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (whatsappNumber: string) => void
  onVideoRequest: (whatsappNumber: string) => void
  property: {
    id: number
    title: string
    rent: number
    youtubeLink?: string
  }
  isInterested: boolean
}

const paymentMethods = [
  { id: "paytm", name: "Paytm" },
  { id: "googlepay", name: "Google Pay" },
  { id: "phonepay", name: "PhonePe" },
  { id: "other", name: "Other UPI" },
]

export default function PaymentPrompt({
  isOpen,
  onClose,
  onConfirm,
  onVideoRequest,
  property,
  isInterested,
}: PaymentPromptProps) {
  const [stage, setStage] = useState<"initial" | "whatsapp" | "payment" | "noVideo">("initial")
  const [whatsappNumber, setWhatsappNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const { settings } = useSettings()

  const calculateFee = (rent: number, isInterested: boolean) => {
    const feeStructure = isInterested ? settings.interestedFees : settings.videoRequestFees
    const applicableTier = feeStructure.find((tier) => rent <= tier.maxRent) || feeStructure[feeStructure.length - 1]
    return applicableTier.fee
  }

  const fee = calculateFee(property.rent, isInterested)

  const handleConfirm = () => {
    if (property.youtubeLink) {
      setStage("whatsapp")
    } else {
      setStage("noVideo")
    }
  }

  const handleWhatsappSubmit = () => {
    if (whatsappNumber.length === 10 && /^\d+$/.test(whatsappNumber)) {
      setStage("payment")
    }
  }

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method)
  }

  const handlePaymentConfirm = () => {
    if (!selectedPaymentMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method to continue.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Generate the UPI link
    const upiLink = generateUPILink(selectedPaymentMethod, settings.upiId, fee, property.id)

    // Open the UPI link in a new window
    window.open(upiLink, "_blank")

    // In a real-world scenario, you'd wait for a callback or webhook to confirm payment
    // For this demo, we'll simulate a successful payment after a short delay
    setTimeout(() => {
      setIsProcessing(false)
      if (isInterested) {
        onConfirm(whatsappNumber)
      } else {
        onVideoRequest(whatsappNumber)
      }
      setStage("initial")
      setWhatsappNumber("")
      setSelectedPaymentMethod("")
      onClose()
    }, 2000)
  }

  const handleNoVideoConfirm = () => {
    if (whatsappNumber.length === 10 && /^\d+$/.test(whatsappNumber)) {
      // Here you would typically add the user to a notification list in your backend
      toast({
        title: "Notification Set",
        description: `You will be notified at ${whatsappNumber} when a video becomes available for ${property.title}.`,
        duration: 5000,
      })
      onClose()
    } else {
      toast({
        title: "Invalid WhatsApp Number",
        description: "Please enter a valid 10-digit WhatsApp number.",
        variant: "destructive",
      })
    }
  }

  const generateUPILink = (method: string, upiId: string, amount: number, propertyId: number) => {
    const baseUrl = "upi://pay"
    const params = new URLSearchParams({
      pa: upiId,
      pn: "RentEase",
      tn: `Property ${isInterested ? "Interest" : "Video"} ${propertyId}`,
      am: amount.toString(),
      cu: "INR",
    })

    switch (method) {
      case "paytm":
        return `paytmmp://pay?${params.toString()}`
      case "googlepay":
        return `tez://upi/pay?${params.toString()}`
      case "phonepay":
        return `phonepe://pay?${params.toString()}`
      default:
        return `${baseUrl}?${params.toString()}`
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {stage === "initial" && (isInterested ? "Express Interest in Property" : "Request Property Video")}
            {stage === "whatsapp" && "Enter WhatsApp Number"}
            {stage === "payment" && "Select Payment Method"}
            {stage === "noVideo" && "Video Not Available"}
          </DialogTitle>
          <DialogDescription>
            {stage === "initial" && (
              <>
                {isInterested
                  ? `Express your interest in this property and get access to the video. A fee of ₹${fee} applies.`
                  : `Would you like to view a video of this property? A fee of ₹${fee} applies.`}
              </>
            )}
            {stage === "whatsapp" && <>Please enter your WhatsApp number to receive the video link after payment.</>}
            {stage === "payment" && (
              <>
                You are about to pay ₹{fee} to {isInterested ? "express interest and " : ""}view the property video.
                Please select your preferred payment method.
              </>
            )}
            {stage === "noVideo" && (
              <>
                We're sorry, but a video for this property is not available yet. Would you like to be notified when it
                becomes available?
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        {stage === "whatsapp" && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="whatsapp" className="text-right">
                WhatsApp
              </Label>
              <Input
                id="whatsapp"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="col-span-3"
                placeholder="10-digit number"
              />
            </div>
          </div>
        )}
        {stage === "payment" && (
          <div className="grid gap-4 py-4">
            <RadioGroup onValueChange={handlePaymentMethodSelect} value={selectedPaymentMethod}>
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Label htmlFor={method.id}>{method.name}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
        {stage === "noVideo" && (
          <>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="whatsapp" className="text-right">
                  WhatsApp
                </Label>
                <Input
                  id="whatsapp"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="col-span-3"
                  placeholder="10-digit number"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleNoVideoConfirm}>Notify me</Button>
            </DialogFooter>
          </>
        )}
        <DialogFooter>
          {stage === "initial" && (
            <>
              <Button variant="outline" onClick={onClose}>
                No, thanks
              </Button>
              <Button onClick={handleConfirm}>Yes, proceed</Button>
            </>
          )}
          {stage === "whatsapp" && (
            <>
              <Button variant="outline" onClick={() => setStage("initial")}>
                Back
              </Button>
              <Button
                onClick={handleWhatsappSubmit}
                disabled={whatsappNumber.length !== 10 || !/^\d+$/.test(whatsappNumber)}
              >
                Continue to Payment
              </Button>
            </>
          )}
          {stage === "payment" && (
            <>
              <Button variant="outline" onClick={() => setStage("whatsapp")} disabled={isProcessing}>
                Back
              </Button>
              <Button onClick={handlePaymentConfirm} disabled={isProcessing || !selectedPaymentMethod}>
                {isProcessing ? "Processing..." : "Confirm Payment"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

