import { redirect } from "next/navigation";
import Link from "next/link";


import {
  CheckCircle,
  Mail,
  CreditCard,
  Ticket,
  ArrowRight,
  LayoutDashboard,
} from "lucide-react";
import { stripe } from "../lib/stripe";
import { bookingPayment } from "@/actions/payment";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const {
    status,
    metadata,
    customer_details,
    amount_total,
    currency,
  } = session;

  if (status === "open") {
    redirect("/");
  }

  if (status === "complete") {
    await bookingPayment({
      ...metadata,
      session_id,
    });

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-100 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-10 text-center">

            <div className="flex justify-center mb-5">
              <div className="bg-white/20 p-5 rounded-full animate-bounce">
                <CheckCircle size={70} />
              </div>
            </div>

            <h1 className="text-4xl font-bold">
              Payment Successful 🎉
            </h1>

            <p className="mt-3 text-green-100">
              Your ticket booking has been confirmed successfully.
            </p>
          </div>

          {/* Body */}
          <div className="p-8 space-y-6">

            <div className="grid md:grid-cols-2 gap-5">

              <div className="border rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="text-green-600" />
                  <h3 className="font-semibold">
                    Customer Email
                  </h3>
                </div>

                <p className="text-gray-600">
                  {customer_details?.email}
                </p>
              </div>

              <div className="border rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <CreditCard className="text-blue-600" />
                  <h3 className="font-semibold">
                    Transaction ID
                  </h3>
                </div>

                <p className="text-gray-600 break-all">
                  {session_id}
                </p>
              </div>

              <div className="border rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Ticket className="text-purple-600" />
                  <h3 className="font-semibold">
                    Booking Status
                  </h3>
                </div>

                <span className="inline-flex px-4 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                  Confirmed
                </span>
              </div>

              <div className="border rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <CreditCard className="text-orange-500" />
                  <h3 className="font-semibold">
                    Total Paid
                  </h3>
                </div>

                <p className="text-2xl font-bold text-green-600">
                  {(amount_total / 100).toFixed(2)}{" "}
                  {currency?.toUpperCase()}
                </p>
              </div>

            </div>

            {/* Metadata */}
            {metadata && Object.keys(metadata).length > 0 && (
              <div className="border rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">
                  Booking Information
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(metadata).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-gray-50 rounded-xl p-4"
                    >
                      <p className="text-sm text-gray-500 capitalize">
                        {key.replaceAll("_", " ")}
                      </p>

                      <p className="font-semibold text-gray-800">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Confirmation */}
            <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
              <p className="text-gray-700 leading-7">
                Thank you for choosing our service.
                A booking confirmation has been sent to
                <span className="font-semibold text-green-700">
                  {" "}
                  {customer_details?.email}
                </span>
                .
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">

              <Link
                href="/tickets"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 flex items-center justify-center gap-2 font-semibold transition"
              >
                Browse More Tickets
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/dashboard/user"
                className="flex-1 border border-gray-300 hover:bg-gray-100 rounded-xl py-4 flex items-center justify-center gap-2 font-semibold transition"
              >
                <LayoutDashboard size={18} />
                Go Dashboard
              </Link>

            </div>

          </div>
        </div>
      </div>
    );
  }
}