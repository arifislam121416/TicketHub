import { notFound } from "next/navigation";
import Image from "next/image";
import { Button, Chip, Card } from "@heroui/react";
import { TicketsApiDetails } from "@/app/data";


const TicketDetailsPage = async ({ params }) => {
   const { id } = await params;

   console.log(id,"id params ashse");

  let ticket;

  try {
    ticket = await TicketsApiDetails(id);
  } catch (error) {
    console.error("Ticket fetch failed:", error);
    notFound();
  }
console.log(ticket,"ticket ashse");
  if (!ticket) {
    notFound();
  }

  const formattedDate = ticket.departureDateTime
    ? new Date(ticket.departureDateTime).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "N/A";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Image Container */}
        <div className="lg:col-span-5 sticky top-6">
          <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-square w-full overflow-hidden rounded-3xl border border-default-100 dark:border-default-50/10 shadow-xl bg-default-100">
            <Image
              src={ticket.image || "/placeholder-ticket.jpg"}
              alt={ticket.title || "Ticket Image"}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
              priority
            />
          </div>
        </div>

        <div className="lg:col-span-7 space-y-8">
          
          {/* Header Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Chip
                color="success"
                variant="flat"
                size="sm"
                className="w-20 text-center p-2 font-bold text-white rounded-2xl bg-green-400 capitalize"
              >
                {ticket.transportType || "Standard"}
              </Chip>
              {ticket.ticketQuantity <= 5 && ticket.ticketQuantity > 0 && (
                <Chip color="warning" variant="flat" size="sm" className="font-medium">
                  Only {ticket.ticketQuantity} left!
                </Chip>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {ticket.title}
            </h1>

            <p className="text-default-500 text-sm sm:text-base leading-relaxed">
              {ticket.description || "Premium ticket with verified booking, instant confirmation, and secure payment."}
            </p>
          </div>

        

          {/* Key Route & Departure Details */}
          <Card shadow="none" className="border p-2 rounded-2xl border-default-200 dark:border-default-100 bg-default-50/50">
           
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
                
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-default-400">
                    From
                  </span>
                  <p className="text-lg font-bold text-foreground truncate">
                    {ticket.from || "—"}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-default-400">
                    To
                  </span>
                  <p className="text-lg font-bold text-foreground truncate">
                    {ticket.to || "—"}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-default-400">
                    Departure
                  </span>
                  <p className="text-sm font-semibold text-foreground">
                    {formattedDate || "N/A"}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-default-400">
                    Available Seats
                  </span>
                  <p className="text-sm font-semibold text-foreground">
                    {ticket.ticketQuantity ?? "N/A"}
                  </p>
                </div>

              </div>
            
          </Card>

          {/* Perks Section */}
          {ticket.perks && ticket.perks.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Included Perks
              </h2>

              <ul className="grid sm:grid-cols-2 w-30 p-2 font-bold text-white rounded-2xl bg-green-400 gap-2.5">
                {ticket.perks.map((perk, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2.5 text-sm text-default-700 bg-default-100/60 dark:bg-default-50/5 px-3 py-2 rounded-xl"
                  >
                    <svg
                      className="w-4 h-4 text-success flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

         

          {/* Pricing & CTA Section */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-default-400">
                Total Price
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-foreground tracking-tight">
                  ${ticket.price}
                </span>
                <span className="text-xs text-default-400 font-medium">/ seat</span>
              </div>
            </div>

           <form action={`/api/bookingPayment`} method="POST">
            <input type="hidden" value={ticket.price} name="price"/>
            <input type="hidden" value={ticket.title} name="title"/>
            <input type="hidden" value={ticket.ticketId} name="ticketId"/>
             <Button
            type="submit"
              size="lg"
              color="primary"
              isDisabled={ticket.ticketQuantity === 0}
              className="h-12 w-70 px-8 p-2 rounded-2xl font-semibold text-white shadow-lg shadow-primary/25 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:opacity-95 transition-all"
            >
              {ticket.ticketQuantity === 0 ? "Sold Out" : "Book Now"}
            </Button>
           </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TicketDetailsPage;