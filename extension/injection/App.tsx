import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "../src/App.css";
import Modal from "./Modal";
import amazonScrape from "../../backend/webscraping/amazon/amazonScrape";

function App() {
  const [pros, setPros] = useState<string[]>([]);
  const [cons, setCons] = useState<string[]>([]);
  const [summary, setSummary] = useState();

  useEffect(() => {
    const init = async () => {
      const getScrapeData = async (url: string) => {
        console.log("scraping");

        const response = await fetch(
          `http://localhost:3000/scrape?productUrl=${url}`
        );
        const result = (await response.json()) as {
          data: Awaited<ReturnType<typeof amazonScrape>>;
        };

        return result?.data;
      };

      //fetches either positive or negative reviews and stores them in respective states. For websites that don't differentiate review types, we have GPT generate different types from the same raw data.
      const getList = async (
        reviews: string[],
        type: "positive" | "negative"
      ) => {
        console.log(`requesting ${type} reviews summary`);
        if (!reviews.length) {
          console.log("rawData is an empty array");
          return;
        }

        const response = await fetch(`http://localhost:4000/list`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: { reviews, type } }),
        });
        const data = (await response.json()) as {
          data?: string[];
          error?: string;
        };
        console.log("result:", data);

        if (type === "positive") {
          setPros(data.data || []);
        } else {
          setCons(data.data || []);
        }
      };

      const getSummary = async (
        positiveReview: string[],
        negativeReview: string[]
      ) => {
        const response = await fetch(`http://localhost:3000/amazon-summary`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            positive: positiveReview,
            negative: negativeReview,
          }),
        });

        const data = await response.json();
      };

      const reviews = await getScrapeData(window.location.href);
      if (!reviews) {
        console.log("reviews are empty");
        console.error("reviews are empty: ", reviews, "url: ", window.location);
        return;
      }

      await Promise.all([
        getList(reviews.positive, "positive"),
        getList(reviews.negative, "negative"),
      ]);
    };

    init();
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
        <List yeet={pros} pos={true} />
        <List yeet={cons} pos={false} />

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl text-black">Summary</h1>
          {summary ? (
            <p className="text-md ">{summary}</p>
          ) : (
            <>
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <p
                    className="w-full h-6 animate-pulse bg-zinc-400"
                    key={i}
                  ></p>
                ))}
              <p className="w-2/3 h-6 animate-pulse bg-zinc-400"></p>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}

interface ListProps {
  yeet: string[];
  pos: boolean;
}

const List = (props: ListProps) => {
  return (
    <div className="flex flex-col justify-center gap-y-2">
      <h1 className="text-3xl text-black">{props.pos ? "Pros" : "Cons"}</h1>
      <ul className="text-blak flex flex-col gap-y-2">
        {props.yeet.length
          ? props.yeet.map((review, i) => (
              <li className="text-start flex gap-x-2 items-start" key={i}>
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
