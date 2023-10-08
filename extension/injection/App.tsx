import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
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
  const [reviewArray, setReviewArray] = useState<SanitizedReview | null>({
    positive: {
      pros: [
        "Exercise enhancement",
        "Deep muscle recovery",
        "Targeted massage & therapy",
        "Versatility",
        "Long-lasting durability",
        "Compact and portable",
      ],
    },
    negative: {
      cons: [
        "Flimsy / not as sturdy as expected",
        "Too hard and caused pain",
        "Not as firm as desired",
        "Rock hard and lightweight",
        "Larger diameter than expected",
        "Not what was expected",
        "Arrived with a dent and doesn't stand straight",
      ],
    },
  });

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
    };

    // test();
  }, []);

  return (
    <div className="bg-gradient-to-tr flex-col from-gray-700 via-gray-900 to-black w-full h-fit items-center text-blue-200 rounded-xl p-3 gap-y-3 flex">
      <h1 className="text-4xl w-3/4 font-extrabold border-b-2 border-zinc-400 text-center">
        Review Rune
      </h1>

      <div className="grid items-start w-full grid-cols-3 justify-center p-3 gap-x-3">
        <List yeet={reviewArray?.positive.pros} pos={true} />
        <List yeet={reviewArray?.negative.cons} pos={false} />

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-300">Summary:</h1>
          <p className="text-md text-zinc-100">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit,
            nihil. Beatae, eaque expedita! Nisi, earum reprehenderit? Aliquam
            eos, non sint, eveniet nam ipsum aliquid tempora, tempore vel animi
            odit maiores!
          </p>
        </div>
      </div>
    </div>
  );
}

interface ListProps {
  yeet: string[] | undefined;
  pos: boolean;
}

const List = (props: ListProps) => {
  return (
    <div className="flex flex-col justify-center gap-y-2">
      <h1 className="text-3xl font-bold text-zinc-300">
        {props.pos ? "Pros" : "Cons"}
      </h1>
      <ul className="text-zinc-200 flex flex-col gap-y-2">
        {props.yeet ? (
          props.yeet.map((review, i) => (
            <li
              className="text-start text-zinc-100 flex gap-x-2 items-start"
              key={review}
            >
              {props.pos ? (
                <Icon icon="fluent-emoji-flat:thumbs-up" height={20} />
              ) : (
                <Icon icon="fluent-emoji-flat:thumbs-down" height={20} />
              )}
              {review}
            </li>
          ))
        ) : (
          <div></div>
        )}
      </ul>
    </div>
  );
};

export default App;
