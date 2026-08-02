"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FaUserShield, 
  FaTicketAlt, 
  FaUsers, 
  FaAd, 
  FaMoneyBillWave, 
  FaArrowUp, 
  FaArrowDown, 
  FaChevronRight, 
  FaChartLine, 
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock
} from "react-icons/fa";

// ডাইনামিক টেস্ট ডেটা (আপনার API রেসপন্সের সাথে কানেক্ট করবেন)
const ADMIN_STATS = [
  {
    title: "Total Revenue Generated",
    value: "$48,920.00",
    change: "+18.4%",
    isPositive: true,
    icon: FaMoneyBillWave,
    color: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/10",
  },
  {
    title: "Total Registered Users",
    value: "3,420",
    change: "+12.5%",
    isPositive: true,
    icon: FaUsers,
    color: "from-indigo-500 to-purple-600",
    shadow: "shadow-indigo-500/10",
  },
  {
    title: "Pending Ticket Approvals",
    value: "14",
    change: "+3 new",
    isPositive: false,
    icon: FaTicketAlt,
    color: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-500/10",
  },
  {
    title: "Active Advertised Tickets",
    value: "5 / 6",
    change: "Max 6",
    isPositive: true,
    icon: FaAd,
    color: "from-pink-500 to-rose-600",
    shadow: "shadow-pink-500/10",
  },
];

const RECENT_PLATFORM_ACTIVITIES = [
  {
    id: "ACT-8801",
    action: "New Ticket Approval Request",
    target: "Cyber Security Conference 2026",
    actor: "Tech Corp (Vendor)",
    time: "12 mins ago",
    type: "ticket",
  },
  {
    id: "ACT-8802",
    action: "Vendor Marked as Fraud",
    target: "Fake Event Planners Ltd",
    actor: "Admin (Alex)",
    time: "1 hour ago",
    type: "fraud",
  },
  {
    id: "ACT-8803",
    action: "Ticket Advertised on Homepage",
    target: "Summer Music Fest 2026",
    actor: "Admin (Alex)",
    time: "3 hours ago",
    type: "advertise",
  },
  {
    id: "ACT-8804",
    action: "User Promoted to Vendor",
    target: "Farhana Yasmin",
    actor: "Admin (Alex)",
    time: "5 hours ago",
    type: "user",
  },
];

export default function AdminDashboardPage() {
  const [adminName] = useState("Alex Vance"); // Auth Context থেকে নাম ফেচ করবেন

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* 🟢 ১. হেডার ব্যানার ও কুইক অ্যাকশন */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6 md:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        
        {/* ব্যাকগ্রাউন্ড রিচ গ্র্যাডিয়েন্ট ডেকোরেশন */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-40 -top-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1.5 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/10 backdrop-blur-md text-pink-300 border border-white/10">
            <FaUserShield /> Control Center
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            System Overview, <span className="bg-gradient-to-r from-pink-400 to-indigo-300 bg-clip-text text-transparent">{adminName}</span> 👋
          </h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-lg">
            Monitor users, moderate vendor ticket listings, manage fraud actions, and control homepage advertisements.
          </p>
        </div>

        {/* শর্টকাট নেভিগেশন বাটন */}
        <div className="flex items-center gap-3 z-10 shrink-0">
          <Link
            href="/dashboard/admin/manage-tickets"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-semibold text-xs shadow-lg shadow-pink-500/20 hover:scale-[1.02] active:scale-[0.98] transition duration-200"
          >
            <FaTicketAlt /> Review Pending Tickets
          </Link>
        </div>
      </div>

      {/* 📊 ২. কাস্টম সমারি উইজেটস (KPI Analytics Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {ADMIN_STATS.map((stat, idx) => {
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
                      : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
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

      {/* 📈 ৩. প্ল্যাটফর্ম গ্রোথ অ্যানালিটিক্স ও প্ল্যাটফর্ম শর্টকাটস */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* প্ল্যাটফর্ম ওভারভিউ চার্ট কার্ড */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <FaChartLine className="text-pink-500" /> Platform Ticket Sales Activity
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Monthly ticket sales growth across all vendors
              </p>
            </div>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300">
              2026 Analytics
            </span>
          </div>

          {/* ভিজ্যুয়াল বার চার্ট প্রেজেন্টেশন (CSS/Tailwind) */}
          <div className="h-48 flex items-end justify-between gap-2 pt-8 pb-2 px-2 border-b border-slate-100 dark:border-white/5">
            {[
              { month: "Jan", height: "45%" },
              { month: "Feb", height: "60%" },
              { month: "Mar", height: "35%" },
              { month: "Apr", height: "80%" },
              { month: "May", height: "65%" },
              { month: "Jun", height: "90%" },
              { month: "Jul", height: "75%" },
              { month: "Aug", height: "95%" },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer">
                <div 
                  style={{ height: bar.height }} 
                  className="w-full max-w-[28px] bg-indigo-500/20 group-hover:bg-gradient-to-t group-hover:from-pink-500 group-hover:to-indigo-600 rounded-t-lg transition-all duration-300 relative"
                >
                  <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-0.5 px-1.5 rounded transition duration-200 pointer-events-none">
                    {bar.height}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">{bar.month}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-4">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block" /> Overall Ticket Demand Peak
            </span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">Total Active Listings: 124</span>
          </div>
        </div>

        {/* কুইক অ্যাডমিন কন্ট্রোল নেভিগেশন */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
              Admin Shortcuts
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Quick access to management pages
            </p>

            <div className="space-y-2.5">
              <Link
                href="/dashboard/admin/manage-tickets"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-pink-500/10 hover:text-pink-500 border border-slate-200/60 dark:border-white/5 text-xs font-semibold text-slate-700 dark:text-slate-300 transition group"
              >
                <span className="flex items-center gap-2.5">
                  <FaTicketAlt className="text-slate-400 group-hover:text-pink-500" />
                  Manage Tickets & Approvals
                </span>
                <FaChevronRight className="text-[10px] text-slate-400 group-hover:translate-x-0.5 transition" />
              </Link>

              <Link
                href="/dashboard/admin/manage-users"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-pink-500/10 hover:text-pink-500 border border-slate-200/60 dark:border-white/5 text-xs font-semibold text-slate-700 dark:text-slate-300 transition group"
              >
                <span className="flex items-center gap-2.5">
                  <FaUsers className="text-slate-400 group-hover:text-pink-500" />
                  User Roles & Fraud Control
                </span>
                <FaChevronRight className="text-[10px] text-slate-400 group-hover:translate-x-0.5 transition" />
              </Link>

              <Link
                href="/dashboard/admin/advertise-tickets"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-pink-500/10 hover:text-pink-500 border border-slate-200/60 dark:border-white/5 text-xs font-semibold text-slate-700 dark:text-slate-300 transition group"
              >
                <span className="flex items-center gap-2.5">
                  <FaAd className="text-slate-400 group-hover:text-pink-500" />
                  Advertise Tickets (Max 6)
                </span>
                <FaChevronRight className="text-[10px] text-slate-400 group-hover:translate-x-0.5 transition" />
              </Link>

              <Link
                href="/dashboard/admin/profile"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-pink-500/10 hover:text-pink-500 border border-slate-200/60 dark:border-white/5 text-xs font-semibold text-slate-700 dark:text-slate-300 transition group"
              >
                <span className="flex items-center gap-2.5">
                  <FaUserShield className="text-slate-400 group-hover:text-pink-500" />
                  Admin Profile Details
                </span>
                <FaChevronRight className="text-[10px] text-slate-400 group-hover:translate-x-0.5 transition" />
              </Link>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400">
            <p className="font-bold flex items-center gap-1.5">
              <FaExclamationTriangle /> Security Note
            </p>
            <p className="text-[11px] mt-0.5 opacity-90">
              Marking a vendor as fraud will permanently hide all of their created tickets from the platform.
            </p>
          </div>
        </div>
      </div>

      {/* 📋 ৪. প্ল্যাটফর্ম সাম্প্রতিক অ্যাক্টিভিটি লক টেবিল */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Recent System Activity
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Audit log of recent admin actions and moderation requests
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm bg-white dark:bg-slate-950">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/60 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3.5 px-5">Activity ID</th>
                <th className="py-3.5 px-5">Action Type</th>
                <th className="py-3.5 px-5">Target Item / User</th>
                <th className="py-3.5 px-5">Performed By</th>
                <th className="py-3.5 px-5 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-xs font-medium">
              {RECENT_PLATFORM_ACTIVITIES.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02] transition">
                  <td className="py-3.5 px-5 font-mono font-bold text-pink-500 dark:text-pink-400">
                    {item.id}
                  </td>
                  <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-white">
                    <span className="flex items-center gap-2">
                      {item.type === "fraud" && <FaExclamationTriangle className="text-rose-500" />}
                      {item.type === "ticket" && <FaClock className="text-amber-500" />}
                      {item.type === "advertise" && <FaCheckCircle className="text-emerald-500" />}
                      {item.type === "user" && <FaUsers className="text-indigo-500" />}
                      {item.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-slate-700 dark:text-slate-300 font-semibold">
                    {item.target}
                  </td>
                  <td className="py-3.5 px-5 text-slate-500 dark:text-slate-400">
                    {item.actor}
                  </td>
                  <td className="py-3.5 px-5 text-right text-slate-400 text-[11px]">
                    {item.time}
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