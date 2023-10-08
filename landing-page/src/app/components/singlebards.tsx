import { useState } from "react";
import Draggable, { DraggableCore } from "react-draggable";
import Modal from "./Modal";
import { Icon } from "@iconify/react";

export default function Singlebards() {
  let [count, setCount] = useState<number>(0);
  const remove = () => {
    var element = document.getElementById("bards");
    element!.className += " opacity-0";
    setCount((count += 1));
    setTimeout(() => {
      element!.className =
        "w-full flex flex-col items-center justify-center absolute top-96 right-96 z-20";
    }, 250);

    if (count >= 10) {
      alert("Sorry, you can't do that.");
    }
  };

  const actuallyRemove = () => {
    var element = document.getElementById("bards");
    element!.className += " opacity-0";
  };

  return (
    <Draggable>
      <Modal
        id="bards"
        className="p-3 pt-1 absolute z-20"
        style={{
          left: `calc(100vw * ${Math.random()})`,
          top: `calc(100vh * ${Math.random()})`,
        }}
      >
        <div className="flex gap-x-2 justify-end w-full h-fit p-1 bg-gradient-to-r from-[#000181] to-[#1084D0] ">
          <Modal className="text-black" onClick={() => actuallyRemove()}>
            <Icon icon="ic:sharp-minimize" height={16} />
          </Modal>
          <Modal onClick={() => remove()}>
            <Icon icon="ph:x-bold" height={16} className="text-black" />
          </Modal>
        </div>
        <div className="p-4 py-8 color-box">
          <h1 className="text-2xl text-black font-black">
            SINGLE BARDS IN YOUR AREA
          </h1>
        </div>
      </Modal>
    </Draggable>
  );
}
