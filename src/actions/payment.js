"use server";

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL

export const subscription = async (data) => {
    console.log("SERVER_URL:", SERVER_URL);
  console.log("Sending data:", data);
  const res = await fetch(`${SERVER_URL}/subscription`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const bookingPayment = async (data) => {
  console.log("SERVER_URL:", SERVER_URL);
  console.log("Sending data:", data);

  try {
    const res = await fetch(`${SERVER_URL}/bookingPayment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Check if the server responded with an error HTTP status (4xx or 5xx)
    if (!res.ok) {
      const errorText = await res.text(); // Reads raw HTML or text without throwing JSON parse errors
      console.error(`Server Error (${res.status}):`, errorText);
      throw new Error(`Server returned status ${res.status}`);
    }

    // Safely parse JSON only when response is 200 OK
    return await res.json();
  } catch (error) {
    console.error("Payment confirmation request failed:", error.message);
    throw error;
  }
};