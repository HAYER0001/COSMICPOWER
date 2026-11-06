import { Container, SectionHeading, Button } from '@/components/shared/primitives'
import { CheckCircle } from 'lucide-react'

export default function CheckoutSuccessPage() {
  return (
    <Container className="py-24 text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle className="w-16 h-16 text-green-600" />
      </div>
      <SectionHeading
        align="center"
        title="Payment Successful!"
        lede="Thank you for your order. We are preparing your Golden Deer makhana and will ship it out shortly."
      />
      <div className="mt-8">
        <Button href="/products" variant="gold-solid">
          Continue Shopping
        </Button>
      </div>
    </Container>
  )
}
