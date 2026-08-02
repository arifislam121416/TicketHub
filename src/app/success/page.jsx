import { redirect } from "next/navigation";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "../lib/auth";
import { stripe } from "../lib/stripe";
import { subscription } from "@/actions/payment";

export default async function Success({ searchParams }) {
  // ১. searchParams থেকে session_id নেওয়া
  const params = await searchParams;
  const session_id = params?.session_id;

  // সেশন আইডি না থাকলে হোম পেজে রিডাইরেক্ট
  if (!session_id) {
    redirect("/");
  }

  // ২. স্ট্রাইপ থেকে সেশন ডেটা ফেচ করা
  let stripeSession;
  try {
    stripeSession = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    });
  } catch (error) {
    console.error("Stripe Session Fetch Error:", error);
    redirect("/tickets");
  }

  // ৩. স্ট্রাইপ সেশনের স্ট্যাটাস ভ্যালিডেশন
  if (stripeSession.status === "open") {
    redirect("/");
  }

  // ৪. ইউজার অথেনটিকেশন চেক (সেশন না পেলেও রিডাইরেক্ট করবে না)
  const headersList = await headers();
  const authSession = await auth.api.getSession({
    headers: headersList,
  });

  // 🔴 এখানে ইউজার অবজেক্ট তৈরি করা হচ্ছে
  const user = authSession?.user || {
    email: stripeSession.customer_details?.email,
    id: stripeSession.customer || null,
    role: "user", // Fallback role
  };

  // 🔴 ইউজার তৈরি হওয়ার পর রোল অনুযায়ী ডাইনামিক লিংক তৈরি
  let bookingPath = "/dashboard/user/bookings"; // Default route

  if (user?.role === "admin") {
    bookingPath = "/dashboard/admin/bookings";
  } else if (user?.role === "vendor") {
    bookingPath = "/dashboard/vendor/bookings";
  } else {
    bookingPath = "/dashboard/user/bookings";
  }

  // ৫. পেমেন্ট সফল হলে (status === 'complete') ডাটাবেজ আপডেট হবে
  if (stripeSession.status === "complete") {
    try {
      await subscription({
        session_id,
        user,
      });
    } catch (error) {
      console.error("Subscription Action Error:", error);
    }
  } else {
    redirect("/");
  }

  // ৬. ডাইনামিক ডেটা ফরম্যাটিং
  const customerEmail =
    stripeSession.customer_details?.email || user.email || "N/A";

  const totalPaid = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: stripeSession.currency?.toUpperCase() || "USD",
  }).format((stripeSession.amount_total || 0) / 100);

  const paymentDate = new Date(
    stripeSession.created * 1000
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-2xl transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-700 p-8 text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl text-emerald-600 shadow-md">
              ✓
            </div>

            <h1 className="mt-5 text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Payment Successful!
            </h1>

            <p className="mt-2 text-emerald-100 text-sm md:text-base">
              Thank you for booking with TicketHub. Your order has been processed.
            </p>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="p-6 md:p-8 space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b pb-2">
            Order Summary
          </h2>

          <div className="divide-y divide-gray-100">
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-500 text-sm">Customer Email</span>
              <span className="font-medium text-gray-900">{customerEmail}</span>
            </div>

            <div className="flex justify-between items-center py-3">
              <span className="text-gray-500 text-sm">Transaction ID</span>
              <span className="font-mono text-xs md:text-sm bg-gray-50 px-2 py-1 rounded border border-gray-200 text-gray-700 break-all max-w-[200px] md:max-w-xs text-right">
                {session_id}
              </span>
            </div>

            <div className="flex justify-between items-center py-3">
              <span className="text-gray-500 text-sm">Payment Status</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 capitalize">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {stripeSession.payment_status}
              </span>
            </div>

            <div className="flex justify-between items-center py-3">
              <span className="text-gray-500 text-sm">Booking Status</span>
              <span className="font-semibold text-emerald-600">Confirmed</span>
            </div>

            <div className="flex justify-between items-center py-3">
              <span className="text-gray-500 text-sm">Total Paid</span>
              <span className="text-2xl font-black text-gray-900">
                {totalPaid}
              </span>
            </div>

            <div className="flex justify-between items-center py-3">
              <span className="text-gray-500 text-sm">Payment Date</span>
              <span className="font-medium text-gray-700">{paymentDate}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Action Buttons */}
        <div className="grid gap-3 p-6 md:p-8 bg-gray-50 border-t border-gray-100 sm:grid-cols-3">
          <Link
            href={bookingPath}
            className="w-full flex justify-center items-center rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
          >
            {user?.role === "admin"
              ? "All Bookings"
              : user?.role === "vendor"
              ? "Vendor Bookings"
              : "My Bookings"}
          </Link>

          <Link
            href="/tickets"
            className="w-full flex justify-center items-center rounded-xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
          >
            Book Another
          </Link>

          <Link
            href="/"
            className="w-full flex justify-center items-center rounded-xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}