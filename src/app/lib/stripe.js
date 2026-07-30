import 'server-only'
import Stripe from 'stripe'

// ১. সঠিক বানান: STRIPE_SECRET_KEY
// ২. || 'dummy_key' দেওয়া হয়েছে যাতে Vercel-এ Build টাইমে খালি পেয়ে ক্র্যাশ না করে
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'dummy_key_for_build')