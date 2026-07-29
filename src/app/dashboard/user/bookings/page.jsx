import { Card,  Button, Chip, Link } from "@heroui/react";
import Image from "next/image";

import { headers } from "next/headers";
import { redirect } from "next/navigation";


// Gravity UI Icons
import {
  Clock,
  CreditCard,
  MapPin,
  ShoppingBag,
  Ticket,
  Calendar,
} from "@gravity-ui/icons";

// React Icons (BoxIcons / Circum)
import {
  BiCheckCircle,
  BiXCircle,
  BiTimeFive,
  BiCreditCard,
} from "react-icons/bi";
import { auth } from "@/app/lib/auth";
import { getBookingsByUser } from "@/actions/getBookingsByUser";


// স্ট্যাটাস অনুসারে কালার, লেবেল এবং সঠিক আইকন কনফিগারেশন
const statusConfig = {
  pending: { color: "warning", label: "Pending", icon: BiTimeFive },
  accepted: { color: "secondary", label: "Accepted", icon: BiCreditCard },
  rejected: { color: "danger", label: "Rejected", icon: BiXCircle },
  paid: { color: "success", label: "Paid", icon: BiCheckCircle },
};

const UserBookingPage = async () => {
  // ১. ইউজার সেশন চেক করা
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user) {
    redirect("/signIn?callbackUrl=/dashboard/bookings");
  }

  // ২. ডাইনামিকভাবে ডাটাবেজ থেকে লগইন ইউজারের বুকিং ফেচ করা
  let bookings = [];
  try {
   bookings = await getBookingsByUser(session.user.email);
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
            <Ticket className="text-primary" size={32} />
            My Booked Tickets
          </h1>
          <p className="text-default-500 mt-1 text-sm md:text-base">
            View and manage all your ticket bookings and payment statuses.
          </p>
        </div>

        <Button
          as={Link}
          href="/tickets"
          color="primary"
          variant="flat"
          startContent={<ShoppingBag size={18} />}
          className="font-semibold"
        >
          Book New Ticket
        </Button>
      </div>

      {/* ৩. বুকিং ডাটা না থাকলে (Empty State UI) */}
      {!bookings || bookings.length === 0 ? (
        <Card className="shadow-lg border border-default-100 bg-background/60 p-12 text-center">
            <div className="p-4 rounded-full bg-default-100 text-default-400">
              <Ticket size={48} />
            </div>
            <h3 className="text-xl font-bold">No Bookings Found</h3>
            <p className="text-default-500 max-w-md text-sm">
              You haven't booked any tickets yet. Explore available tickets and start your journey today!
            </p>
          <Link href="/tickets">
  <Button color="primary" className="w-full">
    Browse Tickets
  </Button>
</Link>
         
        </Card>
      ) : (
        /* ৪. বুকিং গ্রিড ভিউ (Dynamic Bookings) */
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {bookings.map((booking) => {
            const currentStatus =
              statusConfig[booking.status] || statusConfig.pending;
            const StatusIcon = currentStatus.icon;
            const totalPrice = booking.quantity * booking.unitPrice;

            return (
              <Card
                key={booking._id || booking.id}
                shadow="sm"
                className="group hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 border border-default-200/60"
              >
             
                  {/* Ticket Image */}
                  <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-default-100">
                    <Image
                      src={booking.image || "/bus.png"}
                      alt={booking.title || "Ticket Image"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <Chip
                        color={currentStatus.color}
                        variant="solid"
                        size="sm"
                        startContent={<StatusIcon size={16} className="ml-1" />}
                        className="capitalize font-semibold shadow-md backdrop-blur-md"
                      >
                        {currentStatus.label}
                      </Chip>
                    </div>
                  </div>

                  {/* Route & Title */}
                  <div>
                    <h2 className="text-xl font-bold text-foreground line-clamp-1">
                      {booking.title}
                    </h2>
                    <p className="text-sm text-default-500 flex items-center gap-1.5 mt-1 font-medium">
                      <MapPin size={16} className="text-primary shrink-0" />
                      <span>{booking.from}</span>
                      <span>→</span>
                      <span>{booking.to}</span>
                    </p>
                  </div>

               

                  {/* Details List */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-default-500">Booking Qty</span>
                      <span className="font-semibold text-foreground">
                        {booking.quantity} Ticket(s)
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-default-500">Unit Price</span>
                      <span className="font-semibold text-foreground">
                        ${booking.unitPrice}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-1 border-t border-dashed">
                      <span className="font-medium text-default-700">
                        Total Amount
                      </span>
                      <span className="text-lg font-bold text-primary">
                        ${totalPrice}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-default-500 flex items-center gap-1">
                        <Calendar size={14} /> Departure
                      </span>
                      <span className="font-medium text-foreground text-xs md:text-sm">
                        {booking.departure}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-default-500 flex items-center gap-1">
                        <Clock size={14} /> Countdown
                      </span>
                      <span
                        className={`font-semibold text-xs ${
                          booking.countdown === "Expired"
                            ? "text-danger"
                            : "text-warning-600"
                        }`}
                      >
                        {booking.countdown || "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Dynamic Action Buttons */}
                  <div className="pt-2">
                    {booking.status === "accepted" && (
                    <form action="/api/checkout_sessions" method="POST">
  <input
    type="hidden"
    name="bookingId"
    value={booking._id}
  />

  <input
    type="hidden"
    name="price"
    value={booking.unitPrice * booking.quantity}
  />

  <Button color="primary" type="submit">
    Pay Now
  </Button>
</form>
                    )}

                    {booking.status === "paid" && (
                      <Button
                        color="success"
                        variant="flat"
                        isDisabled
                        className="w-full font-semibold opacity-90"
                        startContent={<BiCheckCircle size={18} />}
                      >
                        Payment Completed
                      </Button>
                    )}

                    {booking.status === "pending" && (
                      <Button
                        color="warning"
                        variant="flat"
                        isDisabled
                        className="w-full font-semibold"
                        startContent={<Clock size={18} />}
                      >
                        Awaiting Approval
                      </Button>
                    )}

                    {booking.status === "rejected" && (
                      <Button
                        color="danger"
                        variant="flat"
                        isDisabled
                        className="w-full font-semibold"
                        startContent={<BiXCircle size={18} />}
                      >
                        Booking Rejected
                      </Button>
                    )}
                  </div>
                
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default UserBookingPage;