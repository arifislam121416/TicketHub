"use client";
import React, { useEffect, useState } from 'react';
import TicketCard from './TicketCard';
import { Button, Spinner } from '@heroui/react';
import { TicketsApi } from '../data';

const BrowserTickets = () => {
     const [tickets, setTickets] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState("");
    
  const TicketsApiFetch = async () => {
  try {
    setLoading(true);

    const ticketsFetcher = await TicketsApi();
    setTickets(ticketsFetcher);
    setError("");
  } catch (err) {
    console.error(err);
    setError("Failed to load tickets.");
  } finally {
    setLoading(false);
  }
};
    
    
      useEffect(() => {
       TicketsApiFetch()
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

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold mb-8">Available Tickets</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>
        </div>
    );
};

export default BrowserTickets;