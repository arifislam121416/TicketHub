"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FaTicketAlt, 
  FaMoneyBillWave, 
  FaCalendarCheck, 
  FaUsers, 
  FaPlus, 
  FaArrowUp, 
  FaArrowDown,
  FaClock,
  FaChevronRight,
  FaChartLine,
  FaRegSmile
} from "react-icons/fa";

// ডাইনামিক টেস্ট ডেটা (আপনার API-এর সাথে কানেক্ট করবেন)
const SUMMARY_STATS = [
  {
    title: "Total Revenue",
    value: "$12,450.00",
    change: "+14.2%",
    isPositive: true,
    icon: FaMoneyBillWave,
    color: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/10",
  },
  {
    title: "Total Tickets Sold",
    value: "1,248",
    change: "+8.5%",
    isPositive: true,
    icon: FaTicketAlt,
    color: "from-pink-500 to-rose-600",
    shadow: "shadow-pink-500/10",
  },
  {
    title: "Pending Requests",
    value: "18",
    change: "-2.1%",
    isPositive: false,
    icon: FaClock,
    color: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-500/10",
  },
  {
    title: "Active Events",
    value: "6",
    change: "+1 new",
    isPositive: true,
    icon: FaCalendarCheck,
    color: "from-indigo-500 to-purple-600",
    shadow: "shadow-indigo-500/10",
  },
];

const RECENT_BOOKINGS = [
  {
    id: "BK-9901",
    customer: "Siddikur Rahman",
    event: "Summer Music Fest 2026",
    tickets: 2,
    amount: "$120.00",
    status: "Approved",
    date: "10 mins ago",
  },
  {
    id: "BK-9902",
    customer: "Ayesha Siddiqua",
    event: "Tech Innovators Summit",
    tickets: 1,
    amount: "$85.00",
    status: "Pending",
    date: "45 mins ago",
  },
  {
    id: "BK-9903",
    customer: "Mahmudul Hasan",
    event: "AI Workshop & Networking",
    tickets: 3,
    amount: "$150.00",
    status: "Pending",
    date: "2 hours ago",
  },
  {
    id: "BK-9904",
    customer: "Farhana Yasmin",
    event: "Summer Music Fest 2026",
    tickets: 1,
    amount: "$60.00",
    status: "Rejected",
    date: "5 hours ago",
  },
];

export default function VendorDashboardPage() {
  const [userName] = useState("John Doe"); // Auth context থেকে নাম বসাবেন

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* 🟢 ১. হেডার ও কুইক অ্যাকশন বাটন */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6 md:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        
        {/* ব্যাকগ্রাউন্ড ডেকোরেশন */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-40 -top-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1.5 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/10 backdrop-blur-md text-pink-300 border border-white/10">
            <FaRegSmile /> Vendor Overview
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Welcome back, <span className="bg-gradient-to-r from-pink-400 to-indigo-300 bg-clip-text text-transparent">{userName}</span> 👋
          </h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-lg">
            Here is what’s happening with your ticket sales and event booking requests today.
          </p>
        </div>

        {/* অ্যাকশন বাটন */}
        <div className="flex items-center gap-3 z-10 shrink-0">
          <Link
            href="/dashboard/vendor/events/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-semibold text-xs shadow-lg shadow-pink-500/20 hover:scale-[1.02] active:scale-[0.98] transition duration-200"
          >
            <FaPlus /> Create New Event
          </Link>
        </div>
      </div>

      {/* 📊 ২. কাস্টম সমারি উইজেটস (KPI Analytics Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {SUMMARY_STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {stat.title}
                </span>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${stat.color} text-white flex items-center justify-center text-lg shadow-md ${stat.shadow}`}>
                  <Icon />
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {stat.value}
                </h3>
                <span
                  className={`inline-flex items-center text-[11px] font-bold gap-0.5 px-2 py-0.5 rounded-md ${
                    stat.isPositive
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {stat.isPositive ? <FaArrowUp className="text-[9px]" /> : <FaArrowDown className="text-[9px]" />}
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 📈 ৩. ডাইনামিক গ্রাফ / চ্যাট প্লেসহোল্ডার ও সাম্প্রতিক অ্যাক্টিভিটি */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* সেলস অ্যানালিটিক্স গ্রাফ কার্ড */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <FaChartLine className="text-pink-500" /> Revenue Overview
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Monthly ticket sales performance
              </p>
            </div>
            <select className="px-3 py-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none">
              <option>Last 7 Days</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>

          {/* ভিজ্যুয়াল বার চার্ট প্রেজেন্টেশন (CSS/Tailwind দিয়ে তৈরি) */}
          <div className="h-48 flex items-end justify-between gap-2 pt-8 pb-2 px-2 border-b border-slate-100 dark:border-white/5">
            {[
              { day: "Mon", height: "40%" },
              { day: "Tue", height: "65%" },
              { day: "Wed", height: "30%" },
              { day: "Thu", height: "85%" },
              { day: "Fri", height: "55%" },
              { day: "Sat", height: "95%" },
              { day: "Sun", height: "70%" },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer">
                <div 
                  style={{ height: bar.height }} 
                  className="w-full max-w-[32px] bg-indigo-500/20 group-hover:bg-gradient-to-t group-hover:from-pink-500 group-hover:to-indigo-600 rounded-t-lg transition-all duration-300 relative"
                >
                  <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-0.5 px-1.5 rounded transition duration-200 pointer-events-none">
                    {bar.height}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">{bar.day}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-4">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block" /> High Sales Days
            </span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">Average: $1,778 / day</span>
          </div>
        </div>

        {/* কুইক নেভিগেশন ও টিপস */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
              Quick Shortcuts
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Frequently accessed management tools
            </p>

            <div className="space-y-2.5">
              <Link
                href="/dashboard/vendor/requested-bookings"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-pink-500/10 hover:text-pink-500 border border-slate-200/60 dark:border-white/5 text-xs font-semibold text-slate-700 dark:text-slate-300 transition group"
              >
                <span className="flex items-center gap-2.5">
                  <FaCalendarCheck className="text-slate-400 group-hover:text-pink-500" />
                  Manage Booking Requests
                </span>
                <FaChevronRight className="text-[10px] text-slate-400 group-hover:translate-x-0.5 transition" />
              </Link>

              <Link
                href="/dashboard/vendor/events"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-pink-500/10 hover:text-pink-500 border border-slate-200/60 dark:border-white/5 text-xs font-semibold text-slate-700 dark:text-slate-300 transition group"
              >
                <span className="flex items-center gap-2.5">
                  <FaTicketAlt className="text-slate-400 group-hover:text-pink-500" />
                  View All Active Events
                </span>
                <FaChevronRight className="text-[10px] text-slate-400 group-hover:translate-x-0.5 transition" />
              </Link>

              <Link
                href="/dashboard/vendor/earnings"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-pink-500/10 hover:text-pink-500 border border-slate-200/60 dark:border-white/5 text-xs font-semibold text-slate-700 dark:text-slate-300 transition group"
              >
                <span className="flex items-center gap-2.5">
                  <FaMoneyBillWave className="text-slate-400 group-hover:text-pink-500" />
                  Withdraw & Earnings History
                </span>
                <FaChevronRight className="text-[10px] text-slate-400 group-hover:translate-x-0.5 transition" />
              </Link>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-gradient-to-r from-pink-500/10 to-indigo-500/10 border border-pink-500/20 text-xs">
            <p className="font-bold text-slate-900 dark:text-white">Pro Tip 💡</p>
            <p className="text-slate-600 dark:text-slate-300 mt-0.5 text-[11px]">
              Respond to pending requests within 2 hours to increase your seller trust score.
            </p>
          </div>
        </div>
      </div>

      {/* 📋 ৪. রিসেন্ট বুকিং রিকোয়েস্ট টেবিল */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Recent Booking Activity
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Latest ticket purchase requests from attendees
            </p>
          </div>
          <Link
            href="/dashboard/vendor/requested-bookings"
            className="text-xs font-semibold text-pink-500 hover:text-pink-600 dark:text-pink-400 flex items-center gap-1"
          >
            See All Requests <FaChevronRight className="text-[10px]" />
          </Link>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm bg-white dark:bg-slate-950">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/60 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3.5 px-5">Booking ID</th>
                <th className="py-3.5 px-5">Customer</th>
                <th className="py-3.5 px-5">Event</th>
                <th className="py-3.5 px-5">Qty & Amount</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-xs font-medium">
              {RECENT_BOOKINGS.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02] transition">
                  <td className="py-3.5 px-5 font-mono font-bold text-pink-500 dark:text-pink-400">
                    {booking.id}
                  </td>
                  <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-white">
                    {booking.customer}
                  </td>
                  <td className="py-3.5 px-5 text-slate-700 dark:text-slate-300">
                    {booking.event}
                  </td>
                  <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-white">
                    {booking.tickets} Ticket(s) <span className="text-slate-400 font-normal">({booking.amount})</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        booking.status === "Approved"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : booking.status === "Rejected"
                          ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right text-slate-400 text-[11px]">
                    {booking.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}