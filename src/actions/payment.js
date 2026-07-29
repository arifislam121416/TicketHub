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

