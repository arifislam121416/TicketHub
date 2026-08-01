"use client";

import { authClient } from "@/app/lib/auth-client";
import { 
  BiCalendarCheck, 
  BiCreditCard, 
  BiTrophy, 
  BiTimeFive, 
  BiRightArrowAlt
} from "react-icons/bi";
import { HiOutlineTicket } from "react-icons/hi2";
import { FiPlusCircle } from "react-icons/fi";
import { Avatar, Button, Card, Chip, Link, ProgressBar } from "@heroui/react";


export default function UserDashboardPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // ডামি ডাটা
  const stats = [
    { title: "Total Bookings", value: "12", icon: HiOutlineTicket, color: "text-violet-500", bg: "bg-violet-500/10" },
    { title: "Active Tickets", value: "3", icon: BiCalendarCheck, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Total Spent", value: "$420.00", icon: BiCreditCard, color: "text-cyan-500", bg: "bg-cyan-500/10" },
    { title: "Reward Points", value: "850 PTS", icon: BiTrophy, color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  const recentBookings = [
    {
      id: "TICK-8842",
      event: "Tech Innovators Summit 2026",
      date: "Aug 15, 2026",
      location: "Dhaka Convention Center",
      type: "VIP Pass",
      status: "Confirmed",
      color: "success",
    },
    {
      id: "TICK-7319",
      event: "Rock Symphony Live Concert",
      date: "Sep 02, 2026",
      location: "Army Stadium, Dhaka",
      type: "Regular",
      status: "Pending",
      color: "warning",
    },
  ];

  const transactions = [
    { id: "TXN-9021", date: "Jul 28, 2026", item: "Tech Innovators Summit Ticket", amount: "$150.00", status: "Completed" },
    { id: "TXN-8841", date: "Jul 15, 2026", item: "Rock Symphony Ticket (2x)", amount: "$120.00", status: "Completed" },
    { id: "TXN-7102", date: "Jun 30, 2026", item: "Cinema Premiere Night", amount: "$50.00", status: "Completed" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      
      {/* 1. Header & Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-500">{user?.name || "User"}</span> 👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm md:text-base">
            Manage your ticket bookings, view active events and track payments.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            as={Link}
            href="/events"
            color="primary"
            variant="solid"
            className="font-semibold shadow-lg shadow-primary/20 rounded-2xl"
            startContent={<FiPlusCircle size={18} />}
          >
            Book New Ticket
          </Button>
        </div>
      </div>

      {/* 2. Stats Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Card
              key={index}
              className="border border-slate-200/60 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl rounded-2xl hover:border-violet-500/30 transition-all duration-300 p-5 flex flex-row items-center gap-4"
            >
              <div className={`p-4 rounded-2xl ${item.bg} ${item.color}`}>
                <IconComponent size={26} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {item.title}
                </p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                  {item.value}
                </h3>
              </div>
            </Card>
          );
        })}
      </div>

      {/* 3. Bookings Section & Quick Promo Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Active & Recent Bookings (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BiCalendarCheck className="text-violet-500" /> Upcoming Events & Tickets
            </h2>
            <Link href="/dashboard/bookings" className="text-sm font-semibold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1">
              View All <BiRightArrowAlt />
            </Link>
          </div>

          <div className="grid gap-4">
            {recentBookings.map((booking) => (
              <Card
                key={booking.id}
                className="border border-slate-200/60 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-md hover:shadow-xl rounded-2xl p-4 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Chip color={booking.color} variant="flat" size="sm" className="font-semibold">
                      {booking.status}
                    </Chip>
                    <span className="text-xs text-slate-400 font-mono">{booking.id}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {booking.event}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-3">
                    <span className="flex items-center gap-1"><BiTimeFive /> {booking.date}</span>
                    <span>•</span>
                    <span>{booking.location}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <Chip variant="bordered" size="sm" className="border-slate-300 dark:border-slate-700">
                    {booking.type}
                  </Chip>
                  <Button
                    size="sm"
                    color="primary"
                    variant="flat"
                    className="font-semibold rounded-xl"
                  >
                    View Ticket
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Membership / Profile Quick Card (1 Col) */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BiTrophy className="text-amber-500" /> Reward Tier
          </h2>
          <Card className="border border-slate-200/60 dark:border-slate-800 bg-gradient-to-br from-violet-600 to-indigo-700 text-white shadow-xl rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-violet-200 uppercase tracking-wider">Current Membership</p>
                <h3 className="text-xl font-extrabold mt-0.5">{user?.plan || "Gold Tier"} Member</h3>
              </div>
              <Avatar src={user?.image || undefined} name={user?.name || "U"} className="ring-2 ring-white/50" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-violet-100 font-semibold">
                <span>Points to Platinum</span>
                <span>850 / 1000 PTS</span>
              </div>
              <ProgressBar value={85} color="warning" size="sm" className="bg-white/20" />
            </div>

            <p className="text-xs text-violet-200">
              Book 2 more event tickets this month to unlock 15% discount on all VIP Passes!
            </p>

            <Button
              as={Link}
              href="/dashboard/user/profile"
              className="w-full bg-white text-violet-700 font-bold hover:bg-slate-100 rounded-xl"
            >
              View Profile Details
            </Button>
          </Card>
        </div>

      </div>

      {/* 4. Recent Transactions Table Section */}
      <div className="space-y-4 pt-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BiCreditCard className="text-cyan-500" /> Recent Transactions
        </h2>

        <Card className="border border-slate-200/60 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden p-0">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/60 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200/60 dark:border-slate-800">
                  <th className="px-6 py-3.5">TRANSACTION ID</th>
                  <th className="px-6 py-3.5">DATE</th>
                  <th className="px-6 py-3.5">ITEM / EVENT</th>
                  <th className="px-6 py-3.5">AMOUNT</th>
                  <th className="px-6 py-3.5">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {transactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-violet-600 dark:text-violet-400">
                      {txn.id}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">
                      {txn.date}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-200">
                      {txn.item}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                      {txn.amount}
                    </td>
                    <td className="px-6 py-4">
                      <Chip color="success" variant="flat" size="sm" className="font-semibold">
                        {txn.status}
                      </Chip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

    </div>
  );
}