import React, { useEffect, useState } from "react";
import "../src/App.css";

interface RawReview {
  negative:
    | string[]
    | {
        pros: string[];
      }[];
  positive:
    | string[]
    | {
        pros: string[];
      }[];
}

interface SanitizedReview {
  positive: { pros: string[] };
  negative: { cons: string[] };
}

function App() {
  const [reviewArray, setReviewArray] = useState<SanitizedReview | null>();
  const [loading, setLoading] = useState<Boolean | null>(true);

  useEffect(() => {
    const test = async () => {
      const sendRequest = async (url: string) => {
        const yeet = await fetch(`http://localhost:3000/?productUrl=${url}`);
        const res = await yeet.json();
        return res;
      };

      const reviews: RawReview = await sendRequest(window.location.href);
      console.log("Reviews", reviews);

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
      setLoading(false);
    };

    test();
  }, []);

  return (
    <div className="bg-gradient-to-tr from-gray-700 via-gray-900 to-black w-full h-1/2 flex flex-col items-center justify-center text-blue-200 rounded-xl">
      <h1 className="text-6xl font-bold m-2 border-b-2 border-white w-3/4 text-center">
        Review Rune
      </h1>
      <div className="flex flex-row items-center justify-center p-5 text-white w-3/4 ">
        {!loading && (
          <div className="flex flex-row items-center justify-center p-5 text-white w-3/4 ">
        <div className="w-1/5 flex-col text-white">
          <h1 className="text-4xl  text-gray-300">Pros:</h1>
          <ul className="text-2xl text-white">
            {reviewArray?.positive.pros.map((review) => (
              <li className="text-white">{review}</li>
            ))}
          </ul>
        </div>
        <div className="w-1/5 flex-col">
          <h1 className="text-4xl text-gray-300">Cons:</h1>
          <ul className="text-2xl text-white">
            {reviewArray?.negative.cons.map((review) => (
              <li className="text-white">{review}</li>
            ))}
          </ul>
        </div>
        <div className="w-3/5 flex-col">
          <h1 className="text-4xl text-gray-300">Summary:</h1>
          <p className="text-lg text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit,
            nihil. Beatae, eaque expedita! Nisi, earum reprehenderit? Aliquam
            eos, non sint, eveniet nam ipsum aliquid tempora, tempore vel animi
            odit maiores!
          </p>
        </div>
      </div>
        )}
      {loading && <h1 className="text-4xl text-gray-300">Loading<span className="animate-ellipsis">...</span></h1>}
      </div>
      </div>
  );
}

export default App;
