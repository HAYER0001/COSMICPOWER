import { Container, SectionHeading } from '@/components/shared/primitives'
import CheckoutClient from '@/components/checkout/CheckoutClient'
import Script from 'next/script'

export default function CheckoutPage() {
  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <Container className="py-12 sm:py-24">
        <SectionHeading
          eyebrow="Secure Checkout"
          title="Complete Your Order"
          className="mb-12"
        />
        <CheckoutClient />
      </Container>
    </>
  )
}
