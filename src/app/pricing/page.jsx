
"use client";

import { Button, Card, Chip } from "@heroui/react";
import { BiCheckCircle } from "react-icons/bi";


const PricingPage = () => {

  const tickets = [
    {
      _id: "6a6591514d5dfc0e3532230d",
      title: "MV Adventure",
      image:
        "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80",
      from: "Dhaka",
      to: "Patuakhali",
      transportType: "Launch",
      price: 950,
      ticketQuantity: 160,
      departureDateTime: "2026-08-15T20:15:00",
      perks: ["Cabin", "Food"],
      popular: true,
    },

    {
      _id: "2",
      title: "Luxury Bus",
      image:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
      from: "Dhaka",
      to: "Cox's Bazar",
      transportType: "Bus",
      price: 1200,
      ticketQuantity: 50,
      departureDateTime: "2026-08-20T10:00:00",
      perks: ["AC", "WiFi"],
    },

    {
      _id: "3",
      title: "Express Train",
      image:
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80",
      from: "Dhaka",
      to: "Chittagong",
      transportType: "Train",
      price: 700,
      ticketQuantity: 200,
      departureDateTime: "2026-08-25T08:30:00",
      perks: ["Seat", "Meal"],
    },
  ];


  return (
    <section className="min-h-screen bg-slate-950 text-white px-5 py-16">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">

          <h1 className="text-4xl font-bold">
            Available Tickets
          </h1>

          <p className="text-slate-400 mt-3">
            Choose your preferred transport and book your journey.
          </p>

        </div>


        <div className="grid md:grid-cols-3 gap-8">


          {tickets.map((ticket)=>(

            <Card
  key={ticket._id}
  className={`relative rounded overflow-visible bg-slate-900 transition-all duration-300
  ${
    ticket.popular
      ? "border-2 border-primary shadow-[0_0_40px_rgba(59,130,246,0.35)] scale-105 z-10"
      : "border border-slate-800 hover:border-slate-600"
  }`}
>
  
  {ticket.popular && (
    <>
      {/* Popular Badge */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2">
        <div className="bg-gradient-to-r  from-blue-500 to-purple-600 
        text-white px-5 py-1.5 rounded-full text-sm font-bold shadow-lg">
          ⭐ MOST POPULAR
        </div>
      </div>


      {/* Recommended Tag */}
      <div className="absolute top-4 right-4">
        <Chip
          color="warning"
          variant="flat"
          className="font-semibold"
        >
          Recommended
        </Chip>
      </div>
    </>
  )}


  <img
    src={ticket.image}
    alt={ticket.title}
    className={`h-44 w-full object-cover rounded-t-xl ${
      ticket.popular ? "brightness-110" : ""
    }`}
  />


  <div className="p-6">

    <div className="flex justify-between items-center">

      <h2 className="text-2xl font-bold">
        {ticket.title}
      </h2>


      <Chip
        color={ticket.popular ? "primary" : "success"}
        variant="flat"
      >
        {ticket.transportType}
      </Chip>

    </div>


    <p className="text-slate-400 mt-2">
      {ticket.from} → {ticket.to}
    </p>


    <div className="my-6">
      <span className="text-5xl font-extrabold">
        ${ticket.price}
      </span>

      <span className="text-slate-400 ml-1">
        /ticket
      </span>
    </div>


    <div className="space-y-3 text-sm">
      <p>
        🎫 Available Seat:
        <span className="font-semibold ml-2">
          {ticket.ticketQuantity}
        </span>
      </p>


      <p>
        🕒 Departure:
        <span className="ml-2">
          {new Date(ticket.departureDateTime)
            .toLocaleDateString()}
        </span>
      </p>
    </div>


    <div className="mt-5 space-y-2">
      {ticket.perks.map((perk)=>(
        <div
          key={perk}
          className="flex items-center gap-2"
        >
          <BiCheckCircle
            className="text-green-400"
            size={20}
          />

          <span>{perk}</span>

        </div>
      ))}
    </div>


    <form method="POST" action={'/api/checkout_sessions'}>
      <Button type="submit"
      color={ticket.popular ? "primary" : "default"}
      className={`w-full mt-7 rounded-2xl h-12 font-semibold
      ${
        ticket.popular
          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
          : ""
      }`}
    >
      Book Now
    </Button>
    </form>


  </div>

</Card>

          ))}


        </div>

      </div>

    </section>
  );
};


export default PricingPage;