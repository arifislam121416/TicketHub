import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/app/lib/stripe'




export async function POST() {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    const PRICE_ID = "price_1TyQH2R09D6rP3vuIvoF3AW7"

    // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
  line_items: [
    {
      price: PRICE_ID, // আপনার সঠিক Price ID (যেমন: 'price_1234')
      quantity: 1,
    },
  ],
  mode: 'subscription',
  success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
  


});
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}