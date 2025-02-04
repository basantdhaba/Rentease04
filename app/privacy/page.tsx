import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              At RentEase, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy outlines how we collect, use, and safeguard your data.
            </p>
            <h2 className="text-2xl font-semibold mt-6">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, 
              list a property, or contact us for support. This may include your name, email address, 
              phone number, and property details.
            </p>
            <h2 className="text-2xl font-semibold mt-6">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, 
              to communicate with you, and to personalize your experience on RentEase.
            </p>
            <h2 className="text-2xl font-semibold mt-6">3. Information Sharing and Disclosure</h2>
            <p>
              We do not sell or rent your personal information to third parties. We may share your 
              information with service providers who assist us in operating our website and conducting our business.
            </p>
            <h2 className="text-2xl font-semibold mt-6">4. Data Security</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. 
              However, no method of transmission over the Internet is 100% secure.
            </p>
            <h2 className="text-2xl font-semibold mt-6">5. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. 
              You may also object to or restrict certain processing of your data.
            </p>
            <h2 className="text-2xl font-semibold mt-6">6. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page.
            </p>
            <p className="mt-6">
              If you have any questions about this Privacy Policy, please contact us at privacy@rentease.com.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

