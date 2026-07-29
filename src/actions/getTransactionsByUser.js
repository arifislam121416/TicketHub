"use server";

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTransactionsByUser = async (email) => {
  const res = await fetch(`${SERVER_URL}/transactions/${email}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch transactions");
  }

  return res.json();
};