import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/app/lib/stripe'
import { auth } from '@/app/lib/auth'




export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    const formData = await request.formData();

     const userSession = await auth.api.getSession({
      headers: await headers()
     });

    const price = formData.get("price");
    const title = formData.get("title");
    const ticketId = formData.get("ticketId");
    
if (!ticketId) {
  throw new Error("Ticket ID is required to process payment.");
}
const user = userSession?.user
const userId = user?.id

   
  const session = await stripe.checkout.sessions.create({
    customer_email: user?.email,
  line_items: [
    {
      price_data:{
currency: "usd",
product_data:{
  name: title
},
unit_amount: Number(price) * 100
      },
      quantity: 1,
    },
  ],
  mode: 'payment',
  metadata: {
        ticketId: String(ticketId),
        title: String(title),
        price: String(price),
        userId: String(userId) // ✅ All values must be strings
      },
  success_url: `${origin}/paymentSuccess?session_id={CHECKOUT_SESSION_ID}`,
  
 
});
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}