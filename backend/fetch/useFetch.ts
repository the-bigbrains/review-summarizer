import { useState, useEffect } from "react";

export async function useFetch(endpoint: string) {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define an async function to fetch data from the Flask API
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(
            "Fetch failed - ${response.status} ${response.statusText}"
          );
        }
        const result = await response.json();
        setData(result);
        setPending(false);
        setError(null); // Clear any previous error
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error);
        setPending(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, pending, error };
}
