import { useState, useEffect } from "react";

function Test() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Define an async function to fetch data from the Flask API
    const fetchData = async () => {
      try {
        const response = await fetch("/general");

        if (!response.ok) {
          throw new Error(
            `Fetch failed - ${response.status} ${response.statusText}`
          );
        }
        const result = await response.json();
        setData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("Done");
  try {
    console.log("test");
    console.log(data);
  } catch (error: any) {
    console.error("Error fetching data:", error);
  }
  return data;
}

export default Test;

const data = Test();
console.log("End");
