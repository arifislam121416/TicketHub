import { Button, Card, Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";


const TicketCard = ({ ticket }) => {
   
    return (
        <div>
            <Card
              key={ticket.id}
              className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative rounded-2xl h-52 w-full overflow-hidden bg-default-100">
                <Image
                width={40}
                height={40}
                  src={ticket.image || "/placeholder.jpg"}
                  alt={ticket.title}    
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Chip
                  variant="flat"
                  color="secondary"
                  size="sm"
                  className="absolute top-3 left-3 capitalize shadow-sm backdrop-blur-md bg-background/80"
                >
                  {ticket.transportType}
                </Chip>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h2
                      className="text-lg font-bold line-clamp-1"
                      title={ticket.title}
                    >
                      {ticket.title}
                    </h2>
                    <span className="text-xl font-black text-primary whitespace-nowrap">
                      $ {ticket.price}
                    </span>
                  </div>

                  <div className="flex items-center text-sm font-medium my-3 p-2.5 rounded-lg bg-default-100/70 text-default-700">
                    <span className="truncate">{ticket.from}</span>
                    <span className="mx-2 text-primary font-bold">→</span>
                    <span className="truncate">{ticket.to}</span>
                  </div>

                  <div className="space-y-1 text-xs text-default-500">
                    <p className="flex items-center gap-1.5">
                      <span>🎟️</span>
                      <span>
                        Available:{" "}
                        <strong className="text-foreground">
                          {ticket.ticketQuantity}
                        </strong>
                      </span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <span>🕒</span>
                      <span>
                        {new Date(ticket.departureDateTime).toLocaleString(
                          undefined,
                          {
                            dateStyle: "medium",
                            timeStyle: "short",
                          }
                        )}
                      </span>
                    </p>
                  </div>

                  {ticket.perks && ticket.perks.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {ticket.perks.map((perk, idx) => (
                        <Chip key={idx} variant="flat" size="sm">
                          {perk}
                        </Chip>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-5">
                  <Link href={`/tickets/${ticket._id}`}>
  <Button className="flex items-center justify-center h-11 w-full rounded-xl bg-gradient-to-r from-pink-500 to-indigo-600 text-sm font-semibold text-white shadow-lg shadow-pink-500/10"  color="primary">
    View Details
  </Button>
</Link>
                </div>
              </div>
            </Card>
        </div>
    );
};

export default TicketCard;