import Image from "next/image";
import Draggable, { DraggableCore } from "react-draggable";
import Modal from "./Modal";
import { Icon } from "@iconify/react";
import icon from "../../../public/icon-straight.png";
import Error from "./error";

export default function navbar() {

  const appear = () => {
    var element = document.getElementById('err');
    element!.className = 'p-3 pt-1 absolute z-20 opacity-100';
  }

    const remove = () => {
    var element = document.getElementById("err");
    element!.className = "p-3 pt-1 absolute z-20 opacity-0";
  }

  return (
    <div className="w-full bg-[#bdbdbd] text-black items-center justify-center flex font-bold text-2xl custom-box-shadow">
      <div className="flex flex-row w-full items-center justify-evenly p-4">
        <Image
          alt={"icon"}
          src={icon}
          height={512}
          width={512}
          className="flex justify-self-start "
        />

        <div className="flex flex-row space-x-4" onClick={() => appear()}>
          <h1>Installation</h1>
          <h1>How to Use</h1>
          <h1>About Us</h1>
        </div>
      </div>
      <div id='error'>
                  <Draggable>
            <Modal
              id="err"
              className="p-3 pt-1 absolute z-20 top-20 right-60"
            >
              <div className="flex gap-x-2 justify-end w-full h-fit p-1 bg-gradient-to-r from-[#000181] to-[#1084D0] ">
                <Modal className="text-black">
                  <Icon icon="ic:sharp-minimize" height={16} />
                </Modal>
                <Modal onClick={() => remove()}>
                  <Icon icon="ph:x-bold" height={16} className="text-black" />
                </Modal>
              </div>
              <div className="p-4 py-8 flex flex-col">
                <h1 className="text-xl text-black font-black">
                  Back in my day, we didn't have this fancy newfangled "internet" you speak of.
                </h1>
                <h1>
                  Or "Navbars" whatever those are
                </h1>
              </div>
            </Modal>
          </Draggable>
      </div>
    </div>
  );
}
