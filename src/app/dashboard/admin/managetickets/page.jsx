// app/dashboard/admin/manage-tickets/page.jsx
"use client";

import React, { useState } from "react";
import { FaTicketAlt, FaCheck, FaTimes, FaSpinner } from "react-icons/fa";

const DUMMY_TICKETS = [
  { id: "TK-101", title: "Cyber Security Conference 2026", vendor: "Tech Corp", price: "$120", status: "Pending" },
  { id: "TK-102", title: "Rock Symphony Night", vendor: "Live Events Ltd", price: "$85", status: "Approved" },
  { id: "TK-103", title: "Startup Expo & Pitching", vendor: "Innovate BD", price: "$50", status: "Rejected" },
];

export default function ManageTicketsPage() {
  const [tickets, setTickets] = useState(DUMMY_TICKETS);
  const [loadingId, setLoadingId] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    setLoadingId(id);
    setTimeout(() => {
      setTickets((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
      );
      setLoadingId(null);
    }, 500);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <FaTicketAlt className="text-pink-500" /> Manage Tickets
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Review and approve vendor ticket listings.</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 shadow-sm">
        <table className="w-full text-left border-collapse text-xs font-medium">
          <thead>
            <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/60 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-4 px-5">Ticket Info</th>
              <th className="py-4 px-5">Vendor Name</th>
              <th className="py-4 px-5">Price</th>
              <th className="py-4 px-5">Status</th>
              <th className="py-4 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                <td className="py-4 px-5">
                  <span className="font-mono font-bold text-pink-500">{ticket.id}</span>
                  <p className="font-bold text-slate-900 dark:text-white mt-0.5">{ticket.title}</p>
                </td>
                <td className="py-4 px-5 text-slate-600 dark:text-slate-300">{ticket.vendor}</td>
                <td className="py-4 px-5 font-bold text-slate-900 dark:text-white">{ticket.price}</td>
                <td className="py-4 px-5">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    ticket.status === "Approved" ? "bg-emerald-500/10 text-emerald-500" :
                    ticket.status === "Rejected" ? "bg-rose-500/10 text-rose-500" : "bg-amber-500/10 text-amber-500"
                  }`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="py-4 px-5 text-right">
                  {loadingId === ticket.id ? (
                    <FaSpinner className="animate-spin text-pink-500 inline-block" />
                  ) : (
                    <div className="flex justify-end gap-2">
                      {ticket.status !== "Approved" && (
                        <button
                          onClick={() => handleStatusChange(ticket.id, "Approved")}
                          className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition cursor-pointer flex items-center gap-1"
                        >
                          <FaCheck /> Approve
                        </button>
                      )}
                      {ticket.status !== "Rejected" && (
                        <button
                          onClick={() => handleStatusChange(ticket.id, "Rejected")}
                          className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 font-semibold rounded-xl transition cursor-pointer flex items-center gap-1"
                        >
                          <FaTimes /> Reject
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}