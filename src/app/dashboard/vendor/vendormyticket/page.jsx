"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
  AlertCircle,
  X,
  ArrowUpDown
} from "lucide-react";
import { TicketsApi } from "@/app/data";

const VendorMyTicket = () => {
  const [mounted, setMounted] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [activeModalTicket, setActiveModalTicket] = useState(null);

  // Safely hydrate data on the client side
  useEffect(() => {
  const loadTickets = async () => {
    try {
      const data = await TicketsApi();

      setTickets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setTickets([]);
    } finally {
      setMounted(true);
    }
  };

  loadTickets();
}, []);

  // Handler for dynamic deletion
  const handleDeleteTicket = (id, title) => {
    if (window.confirm(`Are you sure you want to delete listing: "${title}"?`)) {
      setTickets((prev) => prev.filter((t) => t.id !== id));
    }
  };

  // Filtered & Sorted Logic memoized for smooth performance
  const filteredTickets = useMemo(() => {
    return tickets
      .filter((ticket) => {
        const query = searchTerm.toLowerCase().trim();
        const matchesSearch =
          !query ||
          ticket.title?.toLowerCase().includes(query) ||
          ticket.from?.toLowerCase().includes(query) ||
          ticket.to?.toLowerCase().includes(query);

        const matchesStatus =
          statusFilter === "All" || ticket.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "price-high") return (b.price || 0) - (a.price || 0);
        if (sortBy === "price-low") return (a.price || 0) - (b.price || 0);
        if (sortBy === "seats-left") {
          const seatsA = (a.quantity || 0) - (a.booked || 0);
          const seatsB = (b.quantity || 0) - (b.booked || 0);
          return seatsA - seatsB;
        }
        return 0;
      });
  }, [tickets, searchTerm, statusFilter, sortBy]);

  // Dynamic analytics summary calculations
  const totalTickets = useMemo(() => tickets.reduce((acc, curr) => acc + (curr.quantity || 0), 0), [tickets]);
  const totalBooked = useMemo(() => tickets.reduce((acc, curr) => acc + (curr.booked || 0), 0), [tickets]);
  const totalRevenue = useMemo(() => tickets.reduce((acc, curr) => acc + ((curr.booked || 0) * (curr.price || 0)), 0), [tickets]);
  const pendingCount = useMemo(() => tickets.filter((t) => t.status === "Pending").length, [tickets]);

  if (!mounted) return null; // Avoid Server-Client Hydration mismatches

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
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5">${totalRevenue.toLocaleString()}</h3>
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

      {/* Filter, Search & Sort Bar */}
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
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Status Dropdown */}
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <span className="text-xs font-medium text-slate-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <option value="All">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown size={16} className="text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <option value="newest">Sort: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="seats-left">Lowest Seats Left</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ticket Grid */}
      {filteredTickets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTickets.map((ticket) => {
            const availableSeats = (ticket.quantity || 0) - (ticket.booked || 0);
            const progressPercent = ticket.quantity 
              ? Math.round((ticket.booked / ticket.quantity) * 100) 
              : 0;

            return (
              <div
                key={ticket.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Image & Status Badge Header */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    {ticket.image ? (
                      <Image
                        src={ticket.image}
                        alt={ticket.title || "Ticket Cover"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        No Image Available
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-700 shadow-sm">
                      {ticket.transportType || "Bus"}
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
                        {ticket.departureDateTime
                          ? new Date(ticket.departureDateTime).toLocaleString("en-US", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })
                          : "Departure N/A"}
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
                              ? "bg-rose-500" 
                              : progressPercent > 70 
                              ? "bg-amber-500" 
                              : "bg-indigo-600"
                          }`}
                          style={{ width: `${Math.min(progressPercent, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer / Price & Interactive Actions */}
                <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Price/Seat</span>
                    <span className="text-lg font-extrabold text-slate-900">${ticket.price}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      title="View Details"
                      onClick={() => setActiveModalTicket(ticket)}
                      className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <Eye size={18} />
                    </button>
                    <Link
                      href={`/dashboard/vendor/vendorAddTicket?edit=${ticket.id}`}
                      title="Edit Ticket"
                      className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                    >
                      <Edit3 size={18} />
                    </Link>
                    <button
                      title="Delete Ticket"
                      onClick={() => handleDeleteTicket(ticket.id, ticket.title)}
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
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center max-w-md mx-auto my-8 shadow-sm">
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
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-4 py-2 rounded-lg transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Quick View Details Modal */}
      {activeModalTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setActiveModalTicket(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{activeModalTicket.title}</h3>
            <p className="text-sm text-slate-500 mb-4">
              Listing ID: <span className="font-mono text-xs">{activeModalTicket.id}</span>
            </p>
            <div className="space-y-2 text-sm border-t pt-4 border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-500">Route:</span>
                <span className="font-medium text-slate-800">{activeModalTicket.from} to {activeModalTicket.to}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Price per Seat:</span>
                <span className="font-bold text-slate-900">${activeModalTicket.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Available Inventory:</span>
                <span className="font-medium text-slate-800">{activeModalTicket.quantity - activeModalTicket.booked} seats</span>
              </div>
            </div>
            <button
              onClick={() => setActiveModalTicket(null)}
              className="w-full mt-6 py-2.5 bg-slate-900 text-white font-medium rounded-xl text-sm hover:bg-slate-800 transition-colors"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorMyTicket;