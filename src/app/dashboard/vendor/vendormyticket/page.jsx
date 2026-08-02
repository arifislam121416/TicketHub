"use client";

import React, { useState } from 'react';
import { 
  Ticket, 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import Link from 'next/link';

// Sample dynamic mock data (Replace with API data)
const INITIAL_TICKETS = [
  {
    id: "1",
    title: "Dhaka to Cox's Bazar Express",
    from: "Dhaka",
    to: "Cox's Bazar",
    transportType: "Bus",
    price: 1200,
    quantity: 40,
    booked: 28,
    status: "Approved",
    departureDateTime: "2026-08-10T08:00",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80"
  },
  {
    id: "2",
    title: "Sylhet Sleeper Deluxe",
    from: "Dhaka",
    to: "Sylhet",
    transportType: "Train",
    price: 850,
    quantity: 50,
    booked: 15,
    status: "Pending",
    departureDateTime: "2026-08-12T22:30",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&q=80"
  },
  {
    id: "3",
    title: "Chittagong VIP Cruise",
    from: "Dhaka",
    to: "Chittagong",
    transportType: "Ship",
    price: 2500,
    quantity: 30,
    booked: 30,
    status: "Approved",
    departureDateTime: "2026-08-05T18:00",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80"
  }
];

const VendorMyTicket = () => {
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filter Logic
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.to.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || ticket.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate stats dynamically
  const totalTickets = tickets.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalBooked = tickets.reduce((acc, curr) => acc + curr.booked, 0);
  const totalRevenue = tickets.reduce((acc, curr) => acc + (curr.booked * curr.price), 0);
  const pendingCount = tickets.filter(t => t.status === "Pending").length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen text-slate-800">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            My Posted Tickets
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage, update, and track your active transport inventory.
          </p>
        </div>

        <Link
          href="/dashboard/vendor/vendorAddTicket"
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
        >
          <Plus size={18} />
          Add New Ticket
        </Link>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Ticket size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Listings</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{tickets.length}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Seats Sold</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{totalBooked} / {totalTickets}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Est. Revenue</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5">৳{totalRevenue.toLocaleString()}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Pending Approval</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{pendingCount}</h3>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-6 flex flex-col sm:flex-row gap-3 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search destination or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter size={16} className="text-slate-400" />
          <span className="text-xs font-medium text-slate-500">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-full sm:w-auto"
          >
            <option value="All">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Ticket Grid */}
      {filteredTickets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTickets.map((ticket) => {
            const availableSeats = ticket.quantity - ticket.booked;
            const progressPercent = Math.round((ticket.booked / ticket.quantity) * 100);

            return (
              <div
                key={ticket.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Image & Status Badge Header */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={ticket.image}
                      alt={ticket.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-700 shadow-sm">
                      {ticket.transportType}
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      {ticket.status === "Approved" ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-500/90 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg font-medium shadow-sm">
                          <CheckCircle2 size={12} /> Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-amber-500/90 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg font-medium shadow-sm">
                          <AlertCircle size={12} /> Pending
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 text-lg leading-snug line-clamp-1 mb-2">
                      {ticket.title}
                    </h3>

                    {/* Route Details */}
                    <div className="flex items-center text-slate-600 text-sm gap-2 mb-3">
                      <MapPin size={16} className="text-indigo-500 shrink-0" />
                      <span className="font-medium text-slate-800">{ticket.from}</span>
                      <span className="text-slate-400">→</span>
                      <span className="font-medium text-slate-800">{ticket.to}</span>
                    </div>

                    {/* Departure Time */}
                    <div className="flex items-center text-slate-500 text-xs gap-2 mb-4">
                      <Calendar size={14} className="shrink-0" />
                      <span>
                        {new Date(ticket.departureDateTime).toLocaleString('en-US', {
                          dateStyle: 'medium',
                          timeStyle: 'short'
                        })}
                      </span>
                    </div>

                    {/* Seat Progress Bar */}
                    <div className="space-y-1.5 mb-4">
                      <div className="flex justify-between text-xs text-slate-500 font-medium">
                        <span>Booked: {ticket.booked}/{ticket.quantity}</span>
                        <span className="text-indigo-600">{availableSeats} left</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            progressPercent === 100 
                              ? 'bg-rose-500' 
                              : progressPercent > 70 
                              ? 'bg-amber-500' 
                              : 'bg-indigo-600'
                          }`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer / Price & Actions */}
                <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Price/Seat</span>
                    <span className="text-lg font-extrabold text-slate-900">৳{ticket.price}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      title="View Details"
                      className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      title="Edit Ticket"
                      className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      title="Delete Ticket"
                      className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center max-w-md mx-auto my-8">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Ticket size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">No Tickets Found</h3>
          <p className="text-slate-500 text-sm mb-6">
            We couldn't find any tickets matching your search or filter options.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("All");
            }}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-4 py-2 rounded-lg"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default VendorMyTicket;