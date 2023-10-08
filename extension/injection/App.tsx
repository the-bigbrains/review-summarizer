import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "../src/App.css";
import Modal from "./Modal";

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
  summary: string | null;
}

interface SanitizedReview {
  positive: { pros: string[] };
  negative: { cons: string[] };
  summary: string | null;
}

function App() {
  const [reviewArray, setReviewArray] = useState<SanitizedReview | null>();

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
        summary: reviews.summary,
      };

      console.log("sanitized:", newReviewArray);

      setReviewArray(newReviewArray as any);
    };

    // test();
  }, []);

  return (
    <Modal>
      <div className="w-full h-fit p-1 bg-gradient-to-r from-[#000181] to-[#1084D0] ">
        <img
          width={240}
          height={100}
          src="https://i.imgur.com/vRl4O17.png"
          alt=""
        />
      </div>

      <div className="grid items-start w-full grid-cols-3 justify-center p-3 gap-x-3">
        <List yeet={reviewArray?.positive.pros} pos={true} />
        <List yeet={reviewArray?.negative.cons} pos={false} />

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl text-black">Summary</h1>
          <p className="text-md text-zinc-100">{reviewArray?.summary}</p>
        </div>
      </div>
    </Modal>
  );
}

interface ListProps {
  yeet: string[] | undefined;
  pos: boolean;
}

const List = (props: ListProps) => {
  return (
    <div className="flex flex-col justify-center gap-y-2">
      <h1 className="text-3xl text-black">{props.pos ? "Pros" : "Cons"}</h1>
      <ul className="text-blak flex flex-col gap-y-2">
        {props.yeet
          ? props.yeet.map((review, i) => (
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
          : Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  className="w-full h-6 animate-pulse bg-zinc-400"
                  key={i}
                ></div>
              ))}
      </ul>
    </div>
  );
};

export default App;
