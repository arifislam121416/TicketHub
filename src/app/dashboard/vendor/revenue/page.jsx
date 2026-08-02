"use client";

import React, { useState } from "react";
import { 
  FaWallet, 
  FaMoneyBillWave, 
  FaArrowDown, 
  FaArrowUp, 
  FaExchangeAlt, 
  FaHistory, 
  FaDownload, 
  FaCheckCircle, 
  FaClock, 
  FaUniversity,
  FaCreditCard,
  FaSearch,
  FaFilter
} from "react-icons/fa";

// ডাইনামিক ট্রানজেকশন ডেটা
const INITIAL_TRANSACTIONS = [
  {
    id: "TXN-8801",
    eventTitle: "Tech Innovators Summit 2026",
    type: "Ticket Sale",
    amount: "+$450.00",
    fee: "-$13.50",
    netAmount: "$436.50",
    date: "2026-08-01",
    status: "Completed",
    method: "bKash / Card"
  },
  {
    id: "TXN-8802",
    eventTitle: "Withdrawal to Bank Account",
    type: "Withdrawal",
    amount: "-$1,200.00",
    fee: "$0.00",
    netAmount: "-$1,200.00",
    date: "2026-07-28",
    status: "Completed",
    method: "Brac Bank (*4092)"
  },
  {
    id: "TXN-8803",
    eventTitle: "Summer Music Fest 2026",
    type: "Ticket Sale",
    amount: "+$850.00",
    fee: "-$25.50",
    netAmount: "$824.50",
    date: "2026-07-25",
    status: "Completed",
    method: "Nagad / Card"
  },
  {
    id: "TXN-8804",
    eventTitle: "Withdrawal Request",
    type: "Withdrawal",
    amount: "-$500.00",
    fee: "$0.00",
    netAmount: "-$500.00",
    date: "2026-08-02",
    status: "Pending",
    method: "Bank Transfer"
  }
];

export default function VendorRevenuePage() {
  const [transactions] = useState(INITIAL_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  // ফিল্টারিং লজিক
  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      typeFilter === "All" ||
      (typeFilter === "Sales" && txn.type === "Ticket Sale") ||
      (typeFilter === "Withdrawals" && txn.type === "Withdrawal");

    return matchesSearch && matchesType;
  });

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    alert(`Withdrawal request for $${withdrawAmount} submitted successfully!`);
    setIsWithdrawModalOpen(false);
    setWithdrawAmount("");
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* 🟢 ১. পেজ হেডার */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <FaWallet className="text-pink-500" /> Revenue & Payouts
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track your ticket earnings, platform fees, and request payouts to your bank account.
          </p>
        </div>

        {/* উইথড্রয়াল বাটন */}
        <button
          onClick={() => setIsWithdrawModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-xs shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer flex items-center justify-center gap-2 shrink-0"
        >
          <FaArrowUp /> Withdraw Earnings
        </button>
      </div>

      {/* 📊 ২. রেভিনিউ সমারি কার্ডস (KPI Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Available Balance */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute right-0 top-0 w-28 h-28 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300">Available Balance</span>
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm text-pink-400">
              <FaWallet />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-black tracking-tight text-white">$2,480.50</h2>
            <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
              <FaCheckCircle className="text-[10px]" /> Ready for payout
            </p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Lifetime Earnings</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-sm">
              <FaMoneyBillWave />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">$14,250.00</h3>
            <span className="text-[11px] font-medium text-slate-400 mt-1 block">Gross ticket sales volume</span>
          </div>
        </div>

        {/* Pending Payouts */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Pending Withdrawals</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center text-sm">
              <FaClock />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">$500.00</h3>
            <span className="text-[11px] font-medium text-amber-500 mt-1 block">Processing in 24-48 hours</span>
          </div>
        </div>

        {/* Platform Fees Paid */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Platform Fees (3%)</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-sm">
              <FaExchangeAlt />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">$427.50</h3>
            <span className="text-[11px] font-medium text-slate-400 mt-1 block">Deducted automatically</span>
          </div>
        </div>

      </div>

      {/* 🏦 ৩. পে-আউট মেথড কার্ড */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-500 flex items-center justify-center text-xl shrink-0">
            <FaUniversity />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Default Payout Method</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              BRAC BANK LTD • Account ending in <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">****4092</span>
            </p>
          </div>
        </div>
        <button className="px-4 py-2 bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 transition cursor-pointer">
          Update Bank Details
        </button>
      </div>

      {/* 🔍 ৪. ফিল্টার এবং সার্চ সেকশন */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FaHistory className="text-pink-500" /> Transaction History
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">All earnings from tickets and payout requests</p>
          </div>

          <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition cursor-pointer">
            <FaDownload className="text-slate-400" /> Export CSV
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-100 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-white/10">
          
          {/* সার্চ ইনপুট */}
          <div className="relative w-full sm:w-80">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search by event or TXN ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-medium focus:outline-none focus:border-pink-500 transition"
            />
          </div>

          {/* ফিল্টার বাটন */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <FaFilter className="text-slate-400 text-xs shrink-0 mr-1" />
            {["All", "Sales", "Withdrawals"].map((filter) => (
              <button
                key={filter}
                onClick={() => setTypeFilter(filter)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  typeFilter === filter
                    ? "bg-pink-500 text-white shadow-md shadow-pink-500/20"
                    : "bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* 📋 ৫. ট্রানজেকশন টেবিল */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm bg-white dark:bg-slate-950">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/60 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3.5 px-5">Transaction ID</th>
                <th className="py-3.5 px-5">Description</th>
                <th className="py-3.5 px-5">Method</th>
                <th className="py-3.5 px-5">Gross Amount</th>
                <th className="py-3.5 px-5">Platform Fee</th>
                <th className="py-3.5 px-5">Net Amount</th>
                <th className="py-3.5 px-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-xs font-medium">
              {filteredTransactions.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02] transition">
                  <td className="py-4 px-5 font-mono font-bold text-pink-500 dark:text-pink-400">
                    {item.id}
                  </td>
                  <td className="py-4 px-5">
                    <p className="font-semibold text-slate-900 dark:text-white">{item.eventTitle}</p>
                    <span className="text-[11px] text-slate-400">{item.date} • {item.type}</span>
                  </td>
                  <td className="py-4 px-5 text-slate-600 dark:text-slate-300">
                    {item.method}
                  </td>
                  <td className={`py-4 px-5 font-bold ${item.type === "Withdrawal" ? "text-slate-900 dark:text-white" : "text-emerald-600 dark:text-emerald-400"}`}>
                    {item.amount}
                  </td>
                  <td className="py-4 px-5 text-slate-400">
                    {item.fee}
                  </td>
                  <td className="py-4 px-5 font-black text-slate-900 dark:text-white">
                    {item.netAmount}
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === "Completed"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔴 ৬. উইথড্রয়াল পপআপ মোডাল (Modal) */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FaArrowUp className="text-emerald-500" /> Request Payout
              </h3>
              <button 
                onClick={() => setIsWithdrawModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Enter Amount (Max: $2,480.50)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">$</span>
                  <input
                    type="number"
                    min="10"
                    max="2480.50"
                    required
                    placeholder="0.00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 text-xs text-slate-500 space-y-1">
                <p className="flex justify-between"><span>Payout Method:</span> <strong className="text-slate-800 dark:text-slate-200">Brac Bank (****4092)</strong></p>
                <p className="flex justify-between"><span>Processing Time:</span> <strong className="text-slate-800 dark:text-slate-200">24 - 48 Hours</strong></p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWithdrawModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  Confirm Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}