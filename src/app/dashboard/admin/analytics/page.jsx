"use client";

import React, { useState } from "react";
import {
  FaChartLine,
  FaDollarSign,
  FaTicketAlt,
  FaUsers,
  FaStore,
  FaArrowUp,
  FaArrowDown,
  FaCalendarAlt,
  FaDownload,
  FaFilter,
} from "react-icons/fa";

// ডেমো অ্যানালিটিক্স ডাটা (আপনার Backend API/Recharts/Chart.js এর সাথে ইন্টিগ্রেট করতে পারবেন)
const KPI_DATA = [
  {
    id: 1,
    title: "Total Revenue",
    value: "$48,250.00",
    change: "+14.5%",
    isPositive: true,
    icon: FaDollarSign,
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 2,
    title: "Tickets Sold",
    value: "3,420",
    change: "+8.2%",
    isPositive: true,
    icon: FaTicketAlt,
    color: "from-pink-500 to-rose-600",
  },
  {
    id: 3,
    title: "Active Users",
    value: "1,280",
    change: "-2.1%",
    isPositive: false,
    icon: FaUsers,
    color: "from-indigo-500 to-blue-600",
  },
  {
    id: 4,
    title: "Active Vendors",
    value: "142",
    change: "+5.4%",
    isPositive: true,
    icon: FaStore,
    color: "from-purple-500 to-violet-600",
  },
];

const CATEGORY_STATS = [
  { name: "Concerts & Music", percentage: 45, sales: "$21,712", color: "bg-pink-500" },
  { name: "Tech Conferences", percentage: 28, sales: "$13,510", color: "bg-indigo-500" },
  { name: "Sports & Gaming", percentage: 17, sales: "$8,202", color: "bg-purple-500" },
  { name: "Art & Exhibitions", percentage: 10, sales: "$4,825", color: "bg-emerald-500" },
];

const RECENT_TRANSACTIONS = [
  {
    id: "TXN-8801",
    user: "Tanvir Ahmed",
    ticket: "Tech Summit 2026",
    amount: "$120.00",
    date: "2026-08-01",
    status: "Completed",
  },
  {
    id: "TXN-8802",
    user: "Sarah Jenkins",
    ticket: "Summer Music Fest",
    amount: "$85.00",
    date: "2026-08-01",
    status: "Completed",
  },
  {
    id: "TXN-8803",
    user: "Rahul Chowdhury",
    ticket: "AI & Robotics Expo",
    amount: "$45.00",
    date: "2026-07-31",
    status: "Pending",
  },
  {
    id: "TXN-8804",
    user: "Emily Watson",
    ticket: "Gaming Tournament",
    amount: "$30.00",
    date: "2026-07-30",
    status: "Completed",
  },
];

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("This Month");

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* 🔴 ১. পেজ হেডার এবং ফিল্টারিং অপশন */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-pink-500/10 text-pink-500 flex items-center justify-center text-lg">
              <FaChartLine />
            </span>
            Platform Analytics
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track revenue growth, ticket distribution, user engagement, and vendor performance.
          </p>
        </div>

        {/* টাইম রেঞ্জ সিলেক্টর ও এক্সপোর্ট বাটন */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            <FaCalendarAlt className="absolute left-3.5 text-slate-400 text-xs" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white dark:bg-slate-950 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-pink-500 transition cursor-pointer appearance-none shadow-sm"
            >
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="This Month">This Month</option>
              <option value="This Quarter">This Quarter</option>
              <option value="This Year">This Year</option>
            </select>
          </div>

          <button className="px-3.5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl hover:opacity-90 transition flex items-center gap-2 shadow-sm cursor-pointer">
            <FaDownload />
            <span className="hidden sm:inline">Export Report</span>
          </button>
        </div>
      </div>

      {/* 📊 ২. KPI মেট্রিক্স কার্ডস Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_DATA.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden group hover:border-slate-300 dark:hover:border-white/20 transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {kpi.title}
                </span>
                <div
                  className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${kpi.color} text-white flex items-center justify-center text-sm shadow-md`}
                >
                  <Icon />
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {kpi.value}
                </h3>
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-extrabold px-2 py-0.5 rounded-md ${
                    kpi.isPositive
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-rose-500/10 text-rose-500"
                  }`}
                >
                  {kpi.isPositive ? <FaArrowUp /> : <FaArrowDown />}
                  {kpi.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 📈 ৩. প্রধান সেলস ট্রেন্ড এবং ক্যাটাগরি ব্রেকডাউন */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* কাস্টম ভিজ্যুয়াল চার্ট সিমুলেটর (২ কলাম) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Revenue & Sales Overview
              </h3>
              <p className="text-xs text-slate-400">Monthly revenue distribution overview</p>
            </div>
            <span className="text-xs font-bold text-pink-500 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
              Live Overview
            </span>
          </div>

          {/* ভিজ্যুয়াল চার্ট সিমুলেশন বারস */}
          <div className="h-56 flex items-end justify-between gap-2 sm:gap-4 pt-8 pb-2 border-b border-slate-100 dark:border-white/5">
            {[
              { month: "Jan", val: 40 },
              { month: "Feb", val: 65 },
              { month: "Mar", val: 50 },
              { month: "Apr", val: 85 },
              { month: "May", val: 70 },
              { month: "Jun", val: 95 },
              { month: "Jul", val: 80 },
              { month: "Aug", val: 100 },
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div
                  style={{ height: `${bar.val}%` }}
                  className="w-full max-w-[36px] bg-gradient-to-t from-pink-500 to-indigo-600 rounded-t-xl opacity-80 group-hover:opacity-100 transition-all relative"
                >
                  {/* হোভার টুলটিপ */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                    ${bar.val * 500}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-400">{bar.month}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-pink-500"></span> Ticket Sales
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-600"></span> Direct Revenue
            </span>
          </div>
        </div>

        {/* ক্যাটাগরি পারফর্মেন্স (১ কলাম) */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Sales by Category
            </h3>
            <p className="text-xs text-slate-400">Revenue split across event types</p>
          </div>

          <div className="space-y-4">
            {CATEGORY_STATS.map((cat, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-slate-300">{cat.name}</span>
                  <span className="text-slate-900 dark:text-white">{cat.sales} ({cat.percentage}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${cat.color}`}
                    style={{ width: `${cat.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 📋 ৪. সাম্প্রতিক ট্রানজেকশন টেবিল */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Recent Ticket Transactions
            </h3>
            <p className="text-xs text-slate-400">Real-time ticket sales activity</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-medium">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Event Ticket</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {RECENT_TRANSACTIONS.map((txn) => (
                <tr key={txn.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-500">{txn.id}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{txn.user}</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">{txn.ticket}</td>
                  <td className="py-3.5 px-4 font-black text-slate-900 dark:text-white">{txn.amount}</td>
                  <td className="py-3.5 px-4 text-slate-400">{txn.date}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-extrabold ${
                        txn.status === "Completed"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-amber-500/10 text-amber-500"
                      }`}
                    >
                      {txn.status}
                    </span>
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