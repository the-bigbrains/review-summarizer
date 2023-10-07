import React, { useEffect, useState } from "react";
import getURL from "../util/getURL";
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

      // const reviews: Reviews = await sendRequest(getURL());

      // console.log("stuff" + " " + reviews);

      // setReviewArray(reviews);
    };

    test();
  }, []);

  return (
    <div className= "bg-parchment p-3">
      <h1 className="text-black text-4xl font-bold m-2 border-b-2 border-black">Review Rune</h1>
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
