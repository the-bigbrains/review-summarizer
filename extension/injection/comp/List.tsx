import { Icon } from "@iconify/react";
import { useState, useRef } from "react";
import HoverModal from "./HoverModal";
import { Summary } from "../util";

interface Props {
  summary?: Summary;
  raw?: string[];
  isPositive: boolean;
}

//punctuations and spaces
const regex = /[.,\/#!$%\^&\*;:{}=\-_~()\s]/g;

const List = (props: Props) => {
  const [hovered, setHovered] = useState(false);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [hoverIndex, setHoverIndex] = useState(-1);
  const listRef = useRef<HTMLDivElement>(null);

  const findReviewIndex = (
    summaries: { summary: string; index: number }[],
    target: string
  ) => {
    for (let i = 0; i < summaries.length; i++) {
      const original = summaries[i].summary.replaceAll(regex, "").toLowerCase();
      const targetSantiized = target.replaceAll(regex, "").toLowerCase();
      if (
        original.includes(targetSantiized) ||
        targetSantiized.includes(original)
      ) {
        return summaries[i].index;
      }
    }
    return -1;
  };

  const onHover = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    i: number,
    type: "positive" | "negative"
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

    const mouseOffsets = e.currentTarget.getBoundingClientRect();

    const hoverPos = {
      x: type === "positive" ? listOffsets.right : listOffsets.left - 500,
      y: mouseOffsets.height + 140,
    };

    setHoverPos(hoverPos);
  };

  return (
    <div className="flex flex-col justify-center gap-y-2" ref={listRef}>
      {/**the name is hover modal, but right now it's click to open */}
      <HoverModal
        visible={hovered}
        pos={hoverPos}
        raw={props.raw && props.raw[hoverIndex]}
        close={() => {
          setHoverIndex(-1);
          setHovered(false);
        }}
      />

      <h1 className="text-3xl text-black">
        {props.isPositive ? "Pros" : "Cons"}
      </h1>

      <ul className="flex flex-col gap-y-2  font-normal text-base">
        {props.summary
          ? props.summary.filtered.map((review, i) => (
              <li
                className="text-start flex gap-x-2 items-start cursor-pointer border-[#C0C0C0] border-4 hover:border-l-zinc-300 hover:border-t-zinc-300 hover:border-black"
                key={i}
                onClick={(e) => {
                  const index = findReviewIndex(props.summary!.all, review);
                  console.log("index:", index);
                  onHover(e, index, props.isPositive ? "positive" : "negative");
                }}
              >
                <Icon
                  icon={
                    props.isPositive
                      ? "openmoji:thumbs-up"
                      : "openmoji:thumbs-down"
                  }
                  height={20}
                />
                {review}
              </li>
            ))
          : //loading placeholder
            Array(5)
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

export default List;
