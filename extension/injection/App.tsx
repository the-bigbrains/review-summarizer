import { useEffect, useRef, useState } from "react";
import "../src/App.css";
import Modal from "./comp/Modal";
import amazonScrape from "../../backend/webscraping/amazon/amazonScrape";
import { Summary } from "./util";
import List from "./comp/List";

function App() {
  const [pros, setPros] = useState<Summary>();
  const [cons, setCons] = useState<Summary>();
  const [rawData, setRawData] = useState<{
    positive: string[];
    negative: string[];
  }>();

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
          data?: Summary;
          error?: string;
        };
        console.log("result:", data);

        if (type === "positive") {
          setPros(data.data);
        } else {
          setCons(data.data);
        }
      };

      const reviews = await getScrapeData(window.location.href);
      if (!reviews) {
        console.log("reviews are empty");
        console.error("reviews are empty: ", reviews, "url: ", window.location);
        return;
      }
      setRawData(reviews);

      await Promise.all([
        getList(reviews.positive, "positive"),
        getList(reviews.negative, "negative"),
      ]);
    };

    init();
  }, []);

  return (
    <Modal className="w-full relative">
      <div className="w-full h-fit p-1 bg-gradient-to-r from-[#000181] to-[#1084D0] ">
        <img
          width={240}
          height={100}
          src="https://i.imgur.com/vRl4O17.png"
          alt=""
        />
      </div>

      <div className="grid items-start w-full grid-cols-2 p-3 gap-x-3">
        <List summary={pros} raw={rawData?.positive} pos={true} />
        {/* <List
          summary={{ reviews: ["pos1", "pos2"], included: [0, 1] }}
          raw={["pos1 raw", "pos2 raw"]}
          pos={true}
        /> */}
        <List summary={cons} raw={rawData?.negative} pos={false} />
      </div>
    </Modal>
  );
}

export default App;
