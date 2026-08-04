"use client";

import { useEffect, useState } from "react";
import {
  FaTicketAlt,
  FaCheck,
  FaTimes,
  FaSpinner,
  FaBus,
  FaPlane,
  FaTrain,
  FaShip,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { TicketsApi } from "@/app/data";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ManageTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState("");

  useEffect(() => {
    TicketsApi();
  }, []);

  const getTickets = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API}/tickets`);
      const data = await res.json();

      setTickets(data?.tickets || data);
    } catch (err) {
      toast.error("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setLoadingId(id);

      const res = await fetch(`${API}/tickets/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          verificationStatus: status,
        }),
      });

      if (!res.ok) throw new Error();

      toast.success(`Ticket ${status}`);

      setTickets((prev) =>
        prev.map((ticket) =>
          ticket._id === id
            ? {
                ...ticket,
                verificationStatus: status,
              }
            : ticket
        )
      );
    } catch {
      toast.error("Update failed");
    } finally {
      setLoadingId("");
    }
  };

  const transportIcon = (type) => {
    switch (type) {
      case "Bus":
        return <FaBus />;
      case "Flight":
        return <FaPlane />;
      case "Train":
        return <FaTrain />;
      case "Launch":
        return <FaShip />;
      default:
        return <FaTicketAlt />;
    }
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-pink-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-3xl font-bold flex gap-3 items-center">
            <FaTicketAlt className="text-pink-500" />
            Manage Tickets
          </h2>

          <p className="text-gray-500">
            Total Tickets : {tickets.length}
          </p>

        </div>

      </div>

      <div className="overflow-auto rounded-2xl border bg-white dark:bg-slate-900">

        <table className="table">

          <thead>

            <tr>

              <th>Ticket</th>
              <th>Vendor</th>
              <th>Route</th>
              <th>Transport</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>

            </tr>

          </thead>

          <tbody>

            {tickets.map((ticket) => (
              <tr key={ticket._id}>

                <td>

                  <div className="flex gap-4 items-center">

                    <img
                      src={ticket.image}
                      className="w-20 h-16 rounded-xl object-cover"
                    />

                    <div>

                      <h3 className="font-bold">
                        {ticket.title}
                      </h3>

                      <p className="text-xs text-gray-500">
                        {new Date(
                          ticket.departureDateTime
                        ).toLocaleString()}
                      </p>

                    </div>

                  </div>

                </td>

                <td>

                  <h3>{ticket.vendorName}</h3>

                  <p className="text-xs text-gray-400">
                    {ticket.vendorEmail}
                  </p>

                </td>

                <td>

                  {ticket.from}

                  <br />

                  ↓

                  <br />

                  {ticket.to}

                </td>

                <td>

                  <div className="flex items-center gap-2">

                    {transportIcon(ticket.transportType)}

                    {ticket.transportType}

                  </div>

                </td>

                <td>

                  <span className="font-bold">
                    ${ticket.price}
                  </span>

                </td>

                <td>

                  <span
                    className={`badge ${
                      ticket.verificationStatus === "Approved"
                        ? "badge-success"
                        : ticket.verificationStatus === "Rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {ticket.verificationStatus}
                  </span>

                </td>

                <td>

                  {loadingId === ticket._id ? (
                    <FaSpinner className="animate-spin text-pink-500" />
                  ) : (
                    <div className="flex gap-2">

                      {ticket.verificationStatus !==
                        "Approved" && (
                        <button
                          onClick={() =>
                            updateStatus(ticket._id, "Approved")
                          }
                          className="btn btn-success btn-sm"
                        >
                          <FaCheck />
                        </button>
                      )}

                      {ticket.verificationStatus !==
                        "Rejected" && (
                        <button
                          onClick={() =>
                            updateStatus(ticket._id, "Rejected")
                          }
                          className="btn btn-error btn-sm"
                        >
                          <FaTimes />
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