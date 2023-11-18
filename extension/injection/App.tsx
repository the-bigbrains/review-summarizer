import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import "../src/App.css";
import Modal from "./Modal";
import amazonScrape from "../../backend/webscraping/amazon/amazonScrape";
import HoverModal from "./HoverModal";

interface Summary {
  reviews: string[];
  included: number[];
}

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
    <Modal className="w-full">
      <div className="w-full h-fit p-1 bg-gradient-to-r from-[#000181] to-[#1084D0] ">
        <img
          width={240}
          height={100}
          src="https://i.imgur.com/vRl4O17.png"
          alt=""
        />
      </div>

      <div className="grid items-start w-full grid-cols-2 justify-center p-3 gap-x-3">
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

interface ListProps {
  summary?: Summary;
  raw?: string[];
  pos: boolean;
}

const List = (props: ListProps) => {
  const [hovered, setHovered] = useState(false);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [hoverIndex, setHoverIndex] = useState(-1);
  const listRef = useRef<HTMLDivElement>(null);

  const onHover = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    i: number
  ) => {
    setHoverIndex(i);
    setHovered(true);

    //pointOffsets is sometimes undefined if it's outside
    const listOffsets = listRef.current?.getBoundingClientRect();
    if (!listOffsets) {
      console.error;
      `pointOffsets is undefined. pointRef is: ${listRef.current}`;
      return;
    }
    console.log("pointOffsets:", listOffsets);

    const mouseOffsets = e.currentTarget.getBoundingClientRect();
    console.log("mouseOffsets:", mouseOffsets);

    const final = {
      x: mouseOffsets.left,
      y: mouseOffsets.height + 100,
    };
    console.log("final", final);

    setHoverPos(final);
  };

  return (
    <div
      className="relative flex flex-col justify-center gap-y-2"
      ref={listRef}
    >
      <HoverModal
        visible={hovered}
        pos={hoverPos}
        raw={props.raw && props.raw[hoverIndex]}
        close={() => {
          setHoverIndex(-1);
          setHovered(false);
        }}
      />
      <h1 className="text-3xl text-black">{props.pos ? "Pros" : "Cons"}</h1>
      <ul className="flex flex-col gap-y-2  font-normal text-base">
        {props.summary
          ? props.summary.reviews.map((review, i) => (
              <li
                className="text-start flex gap-x-2 items-start"
                key={i}
                onClick={(e) => {
                  onHover(e, i);
                }}
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
