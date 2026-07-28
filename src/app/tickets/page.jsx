"use client";

import { useEffect, useState, useCallback } from "react";
import { Button, Form, Input, Spinner } from "@heroui/react";
import { TicketsApi } from "../data";
import TicketCard from "../Components/TicketCard";

const TicketBrowserPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [filteredTickets, setFilteredTickets] = useState([]);

const TicketsApiFetch = async () => {
  try {
    setLoading(true);

    console.time("Tickets API");

    const ticketsFetcher = await TicketsApi();

    console.timeEnd("Tickets API");

    console.log("Tickets:", ticketsFetcher);

    setTickets(ticketsFetcher);
    setFilteredTickets(ticketsFetcher);
    setError("");

  } catch (err) {
    console.error(err);
    setError("Failed to load tickets.");
  } finally {
    setLoading(false);
  }
};
 


 useEffect(() => {
  TicketsApiFetch();
}, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Spinner size="lg" />
        <p className="text-sm text-default-500 animate-pulse">
          Loading available tickets...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 rounded-2xl bg-danger-50 border border-danger-200 text-center">
        <p className="text-danger font-semibold">{error}</p>
        <Button
          variant="flat"
          color="danger"
          size="sm"
          className="mt-4"
          onPress={TicketsApiFetch}
        >
          Retry
        </Button>
      </div>
    );
  }
  
  const handleSearch = (e) => {
  e.preventDefault();

  const query = searchQuery.trim().toLowerCase();

  setActiveQuery(searchQuery.trim());

  if (!query) {
    setFilteredTickets(tickets);
    return;
  }

 const matched = tickets.filter((ticket) => {
  const searchable = [
    ticket.title,
    ticket.destination,
    ticket.origin,
    ticket.type,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return searchable.includes(query);
});

  setFilteredTickets(matched);
};

  
  const handleClear = () => {
    setSearchQuery("");
    setActiveQuery("");
    setFilteredTickets(tickets);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Browse Tickets</h1>
        <p className="text-default-500 mt-2">
          Find the best buses, trains, and flights.
        </p>
      </div>
     

      <Form onSubmit={handleSearch} className="mb-8 flex flex-col sm:flex-row gap-3">
        <Input
          type="text"
          placeholder="Search by destination, route, or transport type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          isClearable
          onClear={handleClear}
          className="w-full p-2 rounded-2xl border border-default-300 sm:max-w-md"
        />
        <div className="flex gap-2">
          <Button type="submit" className="flex items-center justify-center h-11 w-30 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-600 text-sm font-semibold text-white shadow-lg shadow-pink-500/10">
            Search
          </Button>
          {activeQuery && (
            <Button variant="flat" className="bg-primary border p-2 rounded text-white" onClick={handleClear}>
              Clear
            </Button>
          )}
        </div>
      </Form>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
  {filteredTickets.map((ticket) => (
    <TicketCard key={ticket._id} ticket={ticket} />
  ))}
</div>
    </section>
  );
}
   
 

export default TicketBrowserPage;