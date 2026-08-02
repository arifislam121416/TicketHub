import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

const db = client.db(process.env.DB_NAME);

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,

  trustedOrigins: [
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    "http://localhost:3000", // লোকাল ডেভেলপমেন্টের জন্য
  ],

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },

  // 🔴 Stripe Redirect Issue সমাধানের জন্য এই Advanced অপশন যোগ করা হয়েছে:
  advanced: {
    // Cross-site (Stripe -> App) রিডাইরেক্টে কুকি নিরাপদ রাখতে Lax নির্ধারণ করা
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    defaultCookieAttributes: {
      sameSite: "lax", // 👈 মূল সমাধান: এটি কুকিকে রিডাইরেক্টের সময় লস্ট হতে দেয় না
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      path: "/",
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
      },
      isBlocked: {
        type: "boolean",
        defaultValue: false,
      },
      plan: {
        type: "string",
        defaultValue: "free",
      },
    },
  },
});