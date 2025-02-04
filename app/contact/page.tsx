import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              We're here to help! If you have any questions, concerns, or feedback, 
              please don't hesitate to reach out to us using the form below or through 
              our contact information.
            </p>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message here..." />
              </div>
              <Button type="submit">Send Message</Button>
            </form>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p>Email: support@rentease.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Property Street, Real Estate City, 12345</p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

