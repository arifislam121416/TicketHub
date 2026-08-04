"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaUsers,
  FaUserShield,
  FaStore,
  FaUserCheck,
  FaExclamationTriangle,
  FaSearch,
  FaFilter,
  FaBan,
  FaCheckCircle,
  FaSpinner,
  FaTimes,
} from "react-icons/fa";

const API = process.env.NEXT_PUBLIC_API_URL;
if (!API) {
   console.error("API URL Missing");
}

export default function AdminManageUsersPage() {
 const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [loadingId, setLoadingId] = useState(null);

  // কনফার্মেশন মোডালের স্টেট
  const [selectedUserForFraud, setSelectedUserForFraud] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const fetchUsers = async () => {
  try {
    setLoading(true);

  const res = await fetch(`${API}/users`);

if (!res.ok) {
  throw new Error("Failed to fetch users");
}

const data = await res.json();

setUsers(data);

  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchUsers ();
}, []);
  // 🔄 ১. ইউজারের রোল পরিবর্তন হ্যান্ডলার (Make Admin / Make Vendor)
 const handleRoleChange = async (userId, role) => {

  try {

    setLoadingId(userId);

    const res = await fetch(
      `${API}/users/${userId}/role`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
        }),
      }
    );

    if (!res.ok) throw new Error();

    setUsers((prev) =>
      prev.map((user) =>
        user._id === userId
          ? { ...user, role }
          : user
      )
    );

    showAlert("Role Updated", "success");

  } finally {

    setLoadingId(null);

  }
};

  // ⚠️ ২. ভেন্ডরকে Fraud হিসেবে মার্ক করার প্রসেস
 const confirmMarkAsFraud = async () => {

  if (!selectedUserForFraud) return;

  try {

    setLoadingId(selectedUserForFraud._id);

    const res = await fetch(
  `${API}/users/${selectedUserForFraud._id}/fraud`,
  {
    method: "PATCH",
  }
);

if (!res.ok) {
  throw new Error("Failed");
}

    setUsers((prev) =>
      prev.map((user) =>
        user._id === selectedUserForFraud._id
          ? {
              ...user,
              isFraud: true,
            }
          : user
      )
    );

    showAlert(
      "Vendor marked as Fraud",
      "error"
    );

  } finally {

    setLoadingId(null);

    setSelectedUserForFraud(null);

  }

};

  // টোস্ট নোটিফিকেশন প্রদর্শন
  const showAlert = (msg, type) => {
    setAlertMessage({ msg, type });
    setTimeout(() => setAlertMessage(null), 4000);
  };

  // 🔍 সার্চ ও ফিল্টার লজিক
  const filteredUsers = users.filter((user) => {
   const matchesSearch =
  (user.name || "")
    .toLowerCase()
    .includes(searchTerm.toLowerCase()) ||
  (user.email || "")
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

    const matchesRole =
      roleFilter === "All"
        ? true
        : roleFilter === "Fraud"
        ? user.isFraud
        : user.role === roleFilter;

    return matchesSearch && matchesRole;
  });
if (loading) {
  return (
    <div className="h-[70vh] flex justify-center items-center">
      <FaSpinner className="animate-spin text-4xl text-pink-500"/>
    </div>
  );
}
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* 🔔 নোটিফিকেশন ব্যানার */}
      {alertMessage && (
        <div
          className={`fixed top-5 right-5 z-50 p-4 rounded-2xl shadow-xl border flex items-center gap-3 text-xs font-bold transition-all animate-bounce ${
            alertMessage.type === "error"
              ? "bg-rose-500 text-white border-rose-600"
              : "bg-emerald-500 text-white border-emerald-600"
          }`}
        >
          {alertMessage.type === "error" ? <FaExclamationTriangle className="text-base" /> : <FaCheckCircle className="text-base" />}
          <span>{alertMessage.msg}</span>
        </div>
      )}

      {/* 🔴১. পেজ হেডার */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-pink-500/10 text-pink-500 flex items-center justify-center text-lg">
              <FaUsers />
            </span>
            Manage Users
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Control user permissions, promote admins or vendors, and restrict fraudulent accounts.
          </p>
        </div>

        {/* সমারি কাউন্ট ব্যাজ */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-bold">
            Total Users: {users.length}
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold">
            Fraud Vendors: {users.filter((u) => u.isFraud).length}
          </span>
        </div>
      </div>

      {/* 🔍 ২. সার্চ এবং ফিল্টারিং বার */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 shadow-sm">
        
        {/* সার্চ বক্স */}
        <div className="sm:col-span-2 relative flex items-center">
          <FaSearch className="absolute left-3.5 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search by name or email address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-pink-500 transition"
          />
        </div>

        {/* রোল ফিল্টার ড্রপডাউন */}
        <div className="relative flex items-center">
          <FaFilter className="absolute left-3.5 text-slate-400 text-xs" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-pink-500 transition cursor-pointer appearance-none"
          >
            <option value="All">All Roles & Status</option>
            <option value="Admin">Admin</option>
            <option value="Vendor">Vendor</option>
            <option value="User">User</option>
            <option value="Fraud">Fraud Vendors Only</option>
          </select>
        </div>
      </div>

      {/* 📊 ৩. ইউজার ডাটা টেবিল */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 shadow-sm">
        <table className="w-full text-left border-collapse text-xs font-medium">
          <thead>
            <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-slate-900/80 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-5">User Details</th>
              <th className="py-4 px-5">Current Role</th>
              <th className="py-4 px-5">Account Status</th>
              <th className="py-4 px-5 text-right">Admin Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className={`hover:bg-slate-50/60 dark:hover:bg-white/[0.02] transition ${
                    user.isFraud ? "bg-rose-500/[0.02]" : ""
                  }`}
                >
                  {/* ইউজার ইনফো (ছবি, নাম, ইমেইল) */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-white/10 shrink-0">
                        <Image
                         src={user.image || "/avatar.png"}
                          alt={user.name || "User"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          {user.name}
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* রোল ব্যাজ */}
                  <td className="py-4 px-5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase border ${
                        user.role === "Admin"
                          ? "bg-indigo-500/10 text-indigo-500 border-indigo-500/20"
                          : user.role === "Vendor"
                          ? "bg-purple-500/10 text-purple-500 border-purple-500/20"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10"
                      }`}
                    >
                      {user.role === "Admin" && <FaUserShield />}
                      {user.role === "Vendor" && <FaStore />}
                      {user.role === "User" && <FaUsers />}
                      {user.role}
                    </span>
                  </td>

                  {/* স্ট্যাটাস ব্যাজ */}
                  <td className="py-4 px-5">
                    {user.isFraud ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-rose-500/10 text-rose-500 border border-rose-500/20 animate-pulse">
                        <FaExclamationTriangle /> FRAUD VENDOR
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        <FaCheckCircle /> Active
                      </span>
                    )}
                  </td>

                  {/* বাটন অ্যাকশনসমূহ */}
                  <td className="py-4 px-5 text-right">
                    {loadingId === user._id ? (
                      <div className="flex justify-end items-center pr-4">
                        <FaSpinner className="animate-spin text-pink-500 text-base" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-2">
                        
                        {/* 1. Make Admin Button */}
                        <button
                          onClick={() => handleRoleChange(user._id, "Admin")}
                          disabled={user.role === "Admin" || user.isFraud}
                          className="px-3 py-1.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-xl border border-slate-200 dark:border-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer flex items-center gap-1"
                          title="Promote to Admin"
                        >
                          <FaUserShield className="text-indigo-500" />
                          <span>Make Admin</span>
                        </button>

                        {/* 2. Make Vendor Button */}
                        <button
                          onClick={() => handleRoleChange(user._id, "Vendor")}
                          disabled={user.role === "Vendor" || user.isFraud}
                          className="px-3 py-1.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-xl border border-slate-200 dark:border-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer flex items-center gap-1"
                          title="Change to Vendor"
                        >
                          <FaStore className="text-purple-500" />
                          <span>Make Vendor</span>
                        </button>

                        {/* 3. Mark as Fraud Button (Only for Vendors) */}
                        {user.role === "Vendor" && (
                          <button
                            onClick={() => setSelectedUserForFraud(user)}
                            disabled={user.isFraud}
                            className={`px-3 py-1.5 font-bold rounded-xl transition cursor-pointer flex items-center gap-1 ${
                              user.isFraud
                                ? "bg-rose-500/10 text-rose-400 border border-rose-500/20 opacity-50 cursor-not-allowed"
                                : "bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20"
                            }`}
                          >
                            <FaBan />
                            <span>{user.isFraud ? "Marked Fraud" : "Mark as Fraud"}</span>
                          </button>
                        )}

                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-12 text-center text-slate-400">
                  <p className="text-sm font-bold">No users found matching your search!</p>
                  <p className="text-xs mt-1">Try resetting search parameters or filters.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ⚠️ ৪. Fraud Confirmation Warning Modal */}
      {selectedUserForFraud && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 relative">
            
            <button
              onClick={() => setSelectedUserForFraud(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <FaTimes />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-2xl mx-auto">
              <FaExclamationTriangle />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Mark Vendor as Fraud?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Are you sure you want to mark <strong className="text-rose-500">{selectedUserForFraud.name}</strong> as a fraud?
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/20 text-[11px] text-rose-600 dark:text-rose-400 space-y-1">
              <p className="font-bold">This action has severe impact:</p>
              <ul className="list-disc list-inside space-y-0.5 opacity-90">
                <li>All tickets created by this vendor will be hidden immediately.</li>
                <li>The vendor will lose the ability to create future tickets.</li>
              </ul>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setSelectedUserForFraud(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmMarkAsFraud}
                className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-lg shadow-rose-500/20 transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <FaBan /> Yes, Confirm Fraud
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}