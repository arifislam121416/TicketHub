export const TicketsApi = async (token) => {
    
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets`
,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",});
  
  
  const data = await res.json();
  
  return data.tickets || [];
};
