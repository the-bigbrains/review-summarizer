import React, { useEffect, useState } from "react";
import getURL from "../util/getURL";
import "../src/App.css";

interface Reviews {
  negative: { text: string }[];
  positive: { text: string }[];
}

function App() {
  const [reviewArray, setReviewArray] = useState<Reviews | null>();

  useEffect(() => {
    const test = async () => {
      const sendRequest = async (url: string) => {
        const yeet = await fetch(`http://localhost:3000/?productUrl=${url}`);
        const res = await yeet.json();
        return res;
      };

      const reviews: Reviews = await sendRequest(getURL());

      setReviewArray(reviews);
    };

    test();
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(reviewArray, null, 2)}</pre>;
      <div className="w-5 h-5 bg-blue-600"> that's right</div>
    </div>
  );
}

export default App;
