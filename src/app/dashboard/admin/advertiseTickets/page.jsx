"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FaAd,
  FaSearch,
  FaExclamationCircle,
  FaCheckCircle,
  FaSpinner,
  FaTag,
  FaBullhorn,
  FaInfoCircle
} from "react-icons/fa";

// টেস্ট/ডেমো ডেটা (শুধুমাত্র Admin-Approved টিকিটসমূহ)
const INITIAL_APPROVED_TICKETS = [
  {
    _id: "TKT-101",
    title: "Tech Innovators Summit 2026",
    vendorName: "Tech Corp BD",
    category: "Technology",
    price: "$120.00",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&auto=format&fit=crop&q=80",
    isAdvertised: true,
  },
  {
    _id: "TKT-102",
    title: "Grand Summer Music Fest 2026",
    vendorName: "Live Events Ltd",
    category: "Concert",
    price: "$85.00",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80",
    isAdvertised: true,
  },
  {
    _id: "TKT-103",
    title: "AI & Robotics Workshop",
    vendorName: "Robotics Academy",
    category: "Education",
    price: "$45.00",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&auto=format&fit=crop&q=80",
    isAdvertised: true,
  },
  {
    _id: "TKT-104",
    title: "International Startup Expo",
    vendorName: "Innovate BD",
    category: "Business",
    price: "$60.00",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=300&auto=format&fit=crop&q=80",
    isAdvertised: false,
  },
  {
    _id: "TKT-105",
    title: "E-Sports Gaming Championship",
    vendorName: "Cyber Gamers",
    category: "Gaming",
    price: "$30.00",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&auto=format&fit=crop&q=80",
    isAdvertised: false,
  },
  {
    _id: "TKT-106",
    title: "National Photography Exhibition",
    vendorName: "Shutterbugs",
    category: "Art & Culture",
    price: "$25.00",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&auto=format&fit=crop&q=80",
    isAdvertised: false,
  },
];

export default function AdminAdvertiseTicketsPage() {
  const [tickets, setTickets] = useState(INITIAL_APPROVED_TICKETS);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingId, setLoadingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // ১. বর্তমান বিজ্ঞাপিত টিকিট সংখ্যা গণনা
  const currentAdvertisedCount = tickets.filter((t) => t.isAdvertised).length;

  // 🔄 ২. Advertise / Unadvertise Toggle Handler
  const handleToggleAdvertise = (ticketId) => {
    setErrorMessage("");
    const targetTicket = tickets.find((t) => t._id === ticketId);

    // 🛑 লিমিট চেক Validation Rule (সর্বোচ্চ ৬টি)
    if (!targetTicket.isAdvertised && currentAdvertisedCount >= 6) {
      setErrorMessage(
        "Maximum limit reached! You cannot advertise more than 6 tickets on the homepage at a time."
      );
      return;
    }

    setLoadingId(ticketId);

    // API Call Simulation
    setTimeout(() => {
      setTickets((prev) =>
        prev.map((item) =>
          item._id === ticketId
            ? { ...item, isAdvertised: !item.isAdvertised }
            : item
        )
      );
      setLoadingId(null);
    }, 400);
  };

  // 🔍 সার্চ ফিল্টারিং লজিক
  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* 🔴 ১. পেজ হেডার এবং লিমিট স্ট্যাটাস কারাউসেল */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-pink-500/10 text-pink-500 flex items-center justify-center text-lg">
              <FaAd />
            </span>
            Advertise Tickets
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Choose up to 6 admin-approved tickets to feature in the homepage Advertisement Section.
          </p>
        </div>

        {/* ৬টি লিমিট ট্র্যাকিং ব্যাজ */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 shadow-sm shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-indigo-600 text-white flex items-center justify-center text-lg font-bold">
            <FaBullhorn />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Advertised Slots
            </span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-slate-900 dark:text-white">
                {currentAdvertisedCount} / 6
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  currentAdvertisedCount >= 6
                    ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                    : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                }`}
              >
                {currentAdvertisedCount >= 6 ? "Slots Full" : "Slots Available"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ⚠️ এরর মেসেজ অলার্ট (যদি ৬টার বেশি সিলেক্ট করতে চায়) */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold flex items-center justify-between animate-shake">
          <div className="flex items-center gap-2">
            <FaExclamationCircle className="text-base shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => setErrorMessage("")}
            className="text-rose-500 hover:text-rose-700 dark:hover:text-white font-bold ml-4 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* 🔍 ২. সার্চ ইনপুট ফিল্ড */}
      <div className="p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 shadow-sm">
        <div className="relative flex items-center">
          <FaSearch className="absolute left-3.5 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search approved tickets by title, vendor, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-pink-500 transition"
          />
        </div>
      </div>

      {/* 📊 ৩. টিকিট অ্যাডভার্টাইজমেন্ট ডাটা টেবিল */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 shadow-sm">
        <table className="w-full text-left border-collapse text-xs font-medium">
          <thead>
            <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-slate-900/80 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-5">Ticket Info</th>
              <th className="py-4 px-5">Vendor Name</th>
              <th className="py-4 px-5">Price</th>
              <th className="py-4 px-5">Homepage Visibility</th>
              <th className="py-4 px-5 text-right">Advertise Toggle</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <tr
                  key={ticket._id}
                  className={`hover:bg-slate-50/60 dark:hover:bg-white/[0.02] transition ${
                    ticket.isAdvertised ? "bg-pink-500/[0.02]" : ""
                  }`}
                >
                  {/* থাম্বনেইল ও টিকিট টাইটেল */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shrink-0">
                        <Image
                          src={ticket.image}
                          alt={ticket.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white line-clamp-1">
                          {ticket.title}
                        </p>
                        <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1 mt-0.5">
                          <FaTag className="text-pink-500" /> {ticket.category}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* ভেন্ডর নাম */}
                  <td className="py-4 px-5 font-bold text-slate-700 dark:text-slate-300">
                    {ticket.vendorName}
                  </td>

                  {/* প্রাইস */}
                  <td className="py-4 px-5 font-black text-slate-900 dark:text-white">
                    {ticket.price}
                  </td>

                  {/* ভিজিবিলিটি ব্যাজ */}
                  <td className="py-4 px-5">
                    {ticket.isAdvertised ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-pink-500/10 text-pink-500 border border-pink-500/20">
                        <FaCheckCircle /> Featured on Home
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10">
                        Standard Listing
                      </span>
                    )}
                  </td>

                  {/* 🔴 ৪. টগল বাটন অ্যাকশন */}
                  <td className="py-4 px-5 text-right">
                    {loadingId === ticket._id ? (
                      <div className="flex justify-end pr-4">
                        <FaSpinner className="animate-spin text-pink-500 text-base" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-3">
                        {/* কাস্টম টগল বাটন (Switch UI) */}
                        <button
                          onClick={() => handleToggleAdvertise(ticket._id)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            ticket.isAdvertised ? "bg-pink-500" : "bg-slate-300 dark:bg-slate-700"
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                              ticket.isAdvertised ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>

                        <span className="text-[11px] font-bold w-20 text-left text-slate-600 dark:text-slate-300">
                          {ticket.isAdvertised ? "Advertised" : "Off"}
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-400">
                  <p className="text-sm font-bold">No approved tickets found!</p>
                  <p className="text-xs mt-1">Try adjusting your search query.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ℹ️ ৫. অ্যাডমিনিস্ট্রেটিভ গাইডলাইন্স ফুটপ্রিন্ট */}
      <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 text-xs text-indigo-700 dark:text-indigo-300 flex items-start gap-3">
        <FaInfoCircle className="text-lg shrink-0 mt-0.5 text-indigo-500" />
        <div className="space-y-0.5">
          <p className="font-bold">Advertisement Rules:</p>
          <p className="text-[11px] opacity-90">
            1. Only tickets with <strong>Approved</strong> status appear in this section. <br />
            2. Enabling advertisement dynamically features the ticket in the hero section slider/cards on the homepage.
          </p>
        </div>
      </div>

    </div>
  );
}