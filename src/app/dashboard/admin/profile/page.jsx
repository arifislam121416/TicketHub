// app/dashboard/admin/profile/page.jsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaUserShield, FaEnvelope, FaKey, FaChartLine, FaCheckCircle } from "react-icons/fa";

export default function AdminProfilePage() {
  const [admin] = useState({
    name: "Alex Vance",
    email: "admin@tickethub.com",
    role: "Super Admin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    totalActions: 412,
    joinedDate: "January 2025",
  });

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
        <FaUserShield className="text-pink-500" /> Admin Profile
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Profile Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 shadow-sm text-center flex flex-col items-center">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-pink-500/20 mb-4">
            <Image src={admin.avatar} alt={admin.name} fill className="object-cover" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">{admin.name}</h2>
          <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-pink-500/10 text-pink-500 text-xs font-bold border border-pink-500/20">
            {admin.role}
          </span>
          <p className="text-xs text-slate-400 mt-3 flex items-center gap-1">
            <FaEnvelope /> {admin.email}
          </p>
        </div>

        {/* Right Info Details */}
        <div className="md:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 shadow-sm space-y-5">
          <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/10 pb-3">
            Account Details & Activity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/5">
              <span className="text-[11px] font-bold text-slate-400 uppercase">System Status</span>
              <p className="text-sm font-bold text-emerald-500 mt-1 flex items-center gap-1.5">
                <FaCheckCircle /> Active & Verified
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/5">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Admin Joined</span>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                {admin.joinedDate}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-pink-500/5 border border-pink-500/20 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center text-lg">
              <FaChartLine />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Moderation History</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Total approved/rejected tickets: <strong>{admin.totalActions}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}