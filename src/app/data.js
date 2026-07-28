export const TicketsApi = async (token) => {
  console.log(
    "Fetching:",
    `${process.env.NEXT_PUBLIC_API_URL}/tickets`
  );

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tickets`,
    {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
      cache: "no-store",
    }
  );

  console.log("Status:", res.status);

  const data = await res.json();

  console.log("API Data:", data);

  return data.tickets ?? data;
};                                                                                                                                                                                                                              