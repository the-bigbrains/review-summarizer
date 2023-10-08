import { useState } from "react";
import Draggable, { DraggableCore } from "react-draggable";
import Modal from "./Modal";
import { Icon } from "@iconify/react";

export default function Error() {

  return (
    <Draggable>
      <Modal
        id="err"
        className="p-3 pt-1 absolute z-20"
        style={{
          left: `calc(60vw * ${Math.random()})`,
          top: `calc(60vh * ${Math.random()})`,
        }}
      >
        <div className="flex gap-x-2 justify-end w-full h-fit p-1 bg-gradient-to-r from-[#000181] to-[#1084D0] ">
          <Modal className="text-black">
            <Icon icon="ic:sharp-minimize" height={16} />
          </Modal>
          <Modal onClick={() => remove()}>
            <Icon icon="ph:x-bold" height={16} className="text-black" />
          </Modal>
        </div>
        <div className="p-4 py-8">
          <h1 className="text-2xl text-black font-black">
            Nar Bar is not working
          </h1>
        </div>
      </Modal>
    </Draggable>
  );
}
