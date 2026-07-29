"use server";

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL;

export const getBookingsByUser = async (email) => {
  try {
    const res = await fetch(`${SERVER_URL}/bookings/${email}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch bookings");
    }

    return await res.json();
  } catch (error) {
    console.error("Booking Fetch Error:", error);
    return [];
  }
};