"use client";

import React, { useState } from "react";
import { 
  FaCalendarCheck, 
  FaClock, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaSearch, 
  FaFilter,
  FaUserCheck,
  FaEnvelope,
  FaPhoneAlt,
  FaTicketAlt
} from "react-icons/fa";

// ডাইনামিক টেস্ট ডেটা (আপনার API রেসপন্সের সাথে এটি বদলাবেন)
const INITIAL_BOOKINGS = [
  {
    id: "BK-1001",
    customerName: "Rahim Ahmed",
    customerEmail: "rahim@example.com",
    customerPhone: "+880 1712-345678",
    eventTitle: "Tech Conference 2026 Ticket",
    ticketsCount: 2,
    totalPrice: "$120",
    date: "2026-08-15",
    status: "Pending",
  },
  {
    id: "BK-1002",
    customerName: "Nusrat Jahan",
    customerEmail: "nusrat@example.com",
    customerPhone: "+880 1819-987654",
    eventTitle: "Music Fest VIP Pass",
    ticketsCount: 1,
    totalPrice: "$85",
    date: "2026-08-20",
    status: "Approved",
  },
  {
    id: "BK-1003",
    customerName: "Tanvir Hossain",
    customerEmail: "tanvir@example.com",
    customerPhone: "+880 1911-223344",
    eventTitle: "Startup Workshop 2026",
    ticketsCount: 3,
    totalPrice: "$150",
    date: "2026-08-10",
    status: "Rejected",
  },
];

export default function VendorRequestedBookingsPage() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // বুকিং স্ট্যাটাস পরিবর্তন করার ফাংশন
  const handleStatusChange = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
  };

  // ফিল্টারিং লজিক
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // স্ট্যাটাস অনুসারে কাউন্ট হিসাব
  const pendingCount = bookings.filter((b) => b.status === "Pending").length;
  const approvedCount = bookings.filter((b) => b.status === "Approved").length;
  const rejectedCount = bookings.filter((b) => b.status === "Rejected").length;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* 🟢 পেজ হেডার & সমারি কার্ডস */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <FaCalendarCheck className="text-pink-500" /> Requested Bookings
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage and respond to ticket purchase requests from customer.
          </p>
        </div>
      </div>

      {/* 📊 স্ট্যাটাস কার্ডস (Summary Widgets) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center text-xl">
            <FaClock />
          </div>
          <div>
            <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Pending Requests</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{pendingCount}</h3>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-xl">
            <FaCheckCircle />
          </div>
          <div>
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Approved</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{approvedCount}</h3>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center text-xl">
            <FaTimesCircle />
          </div>
          <div>
            <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">Rejected</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{rejectedCount}</h3>
          </div>
        </div>
      </div>

      {/* 🔍 ফিল্টার এবং সার্চ বার */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-100 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-white/10">
        
        {/* সার্চ বক্স */}
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search customer, event or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-medium focus:outline-none focus:border-pink-500 transition"
          />
        </div>

        {/* ফিল্টার অপশন */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <FaFilter className="text-slate-400 text-xs shrink-0 mr-1" />
          {["All", "Pending", "Approved", "Rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 ${
                statusFilter === status
                  ? "bg-pink-500 text-white shadow-md shadow-pink-500/20"
                  : "bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* 📋 বুকিং লিস্ট (Table/Card View) */}
      {filteredBookings.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-300 dark:border-white/10">
          <FaTicketAlt className="mx-auto text-4xl text-slate-400 mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-white">No Bookings Found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Try adjusting your search or filter.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm bg-white dark:bg-slate-950">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/60 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-4 px-5">Booking Info</th>
                <th className="py-4 px-5">Customer Details</th>
                <th className="py-4 px-5">Event & Ticket</th>
                <th className="py-4 px-5">Total Amount</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-xs font-medium">
              {filteredBookings.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition">
                  
                  {/* ID & Date */}
                  <td className="py-4 px-5">
                    <span className="font-mono font-bold text-pink-500 dark:text-pink-400">{item.id}</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.date}</p>
                  </td>

                  {/* Customer Info */}
                  <td className="py-4 px-5">
                    <p className="font-bold text-slate-900 dark:text-white">{item.customerName}</p>
                    <div className="flex flex-col gap-0.5 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1.5"><FaEnvelope className="text-[10px]" /> {item.customerEmail}</span>
                      <span className="flex items-center gap-1.5"><FaPhoneAlt className="text-[10px]" /> {item.customerPhone}</span>
                    </div>
                  </td>

                  {/* Event & Quantity */}
                  <td className="py-4 px-5">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{item.eventTitle}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                      {item.ticketsCount} Ticket(s)
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="py-4 px-5 font-bold text-slate-900 dark:text-white text-sm">
                    {item.totalPrice}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide ${
                        item.status === "Approved"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : item.status === "Rejected"
                          ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.status === "Approved"
                            ? "bg-emerald-500"
                            : item.status === "Rejected"
                            ? "bg-rose-500"
                            : "bg-amber-500 animate-ping"
                        }`}
                      />
                      {item.status}
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-4 px-5 text-right">
                    {item.status === "Pending" ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleStatusChange(item.id, "Approved")}
                          className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl text-xs transition shadow-md shadow-emerald-500/10 cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(item.id, "Rejected")}
                          className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-semibold rounded-xl text-xs transition border border-rose-500/20 cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] font-semibold text-slate-400 italic">No action needed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}