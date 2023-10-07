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
      console.log(reviews);
      console.log("9");

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
    <div>
      <pre>{JSON.stringify(reviewArray, null, 2)}</pre>
    </div>
  );
}

export default App;
