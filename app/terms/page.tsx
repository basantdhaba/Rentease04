import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              Welcome to RentEase. By using our services, you agree to comply with and be bound by the following terms and conditions. 
              Please review them carefully.
            </p>
            <h2 className="text-2xl font-semibold mt-6">1. Acceptance of Terms</h2>
            <p>
              By accessing or using RentEase, you agree to these Terms of Service and our Privacy Policy. 
              If you do not agree to these terms, please do not use our services.
            </p>
            <h2 className="text-2xl font-semibold mt-6">2. Use of Services</h2>
            <p>
              You agree to use RentEase only for lawful purposes and in accordance with these Terms of Service. 
              You are prohibited from violating or attempting to violate the security of the Website.
            </p>
            <h2 className="text-2xl font-semibold mt-6">3. User Accounts</h2>
            <p>
              To access certain features of RentEase, you may be required to create an account. 
              You are responsible for maintaining the confidentiality of your account information.
            </p>
            <h2 className="text-2xl font-semibold mt-6">4. Content</h2>
            <p>
              Users are solely responsible for the content they post on RentEase. 
              We reserve the right to remove any content that violates these terms or is otherwise objectionable.
            </p>
            <h2 className="text-2xl font-semibold mt-6">5. Limitation of Liability</h2>
            <p>
              RentEase shall not be liable for any indirect, incidental, special, consequential or punitive damages 
              resulting from your use or inability to use the service.
            </p>
            <h2 className="text-2xl font-semibold mt-6">6. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. 
              Your continued use of RentEase after any such changes constitutes your acceptance of the new Terms of Service.
            </p>
            <p className="mt-6">
              If you have any questions about these Terms of Service, please contact us at legal@rentease.com.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

