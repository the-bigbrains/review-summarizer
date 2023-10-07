import React, { useEffect, useState } from "react";
import "../src/App.css";

interface Reviews {
  negative: string[];
  positive: string[];
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

      const reviews: Reviews = await sendRequest(window.location.href);

      const positiveArray =
        typeof reviews.positive[0] === "string"
          ? JSON.parse(reviews.positive[0].split(/\n/g).join(""))
          : reviews.positive;
      const negativeArray =
        typeof reviews.negative[0] === "string"
          ? JSON.parse(reviews.negative[0].split(/\n/g).join(""))
          : reviews.negative;

      const newReviewArray = {
        positive: positiveArray,
        negative: negativeArray,
      };

      console.log("sanitized:", newReviewArray);

      setReviewArray(newReviewArray as any);
    };

    test();
  }, []);

  return (
    <div className="bg-parchment p-3">
      <h1 className="text-black text-4xl font-bold m-2 border-b-2 border-black">
        Review Rune
      </h1>
      <div className="flex flex-row items-center justify-start px-5">
        <div className="w-1/2 flex-col">
          <h1>Pros:</h1>
          <ul>
            <li>Pro one</li>
            <li>Pro Two</li>
          </ul>
        </div>
        <div className="w-1/2">
          <h1>Cons:</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
