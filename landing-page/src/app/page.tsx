"use client";

import us from "../../public/us.jpg";
import Navbar from "./components/navbar";
import Image from "next/image";
import wordart from "../../public/wordart.png";
import Singlebards from "./components/singlebards";
import Clippy from "../../public/clippy-microsoft.gif";
import straightIcon from "../../public/icon-straight.png";
import ai from "../../public/ai.png";

import Draggable, { DraggableCore } from "react-draggable";
import Modal from "./components/Modal";
import { Icon } from "@iconify/react";

export default function Home() {
  return (
    <main className="text-black flex flex-col items-center justify-start h-screen text-center bg-[#008080] custom-box-shadow w-screen overflow-scroll">
      <Navbar />
      <Singlebards />
      <Image className="absolute bottom-0 left-0" src={Clippy} alt="" />

      <div className="w-full h-full flex flex-col gap-y-4">
        <section className="flex justify-center items-center w-full min-h-[70vh] outline-dashed">
          <Draggable>
            <div className="w-full flex flex-col items-center justify-center">
              <Modal className="p-3 pt-1">
                <div className="flex gap-x-2 justify-end w-full h-fit p-1 bg-gradient-to-r from-[#000181] to-[#1084D0] ">
                  <Modal className="text-black">
                    <Icon icon="ic:sharp-minimize" height={16} />
                  </Modal>
                  <Modal>
                    <Icon icon="ph:x-bold" height={16} className="text-black" />
                  </Modal>
                </div>
                <div className="py-2"></div>
                <Image alt={"icon"} src={wordart} height={600} width={800} />
                {/**omnious one sentence description */}
                <p className="max-w-xl text-2xl">
                  Tired of reading reviews that are too long? We are too. That's
                  why we created{" "}
                  <Image
                    src={straightIcon}
                    alt=""
                    height={30}
                    className="inline"
                  />
                  . We take the reviews, and summarize them into short, concise
                  summaries. We hope you enjoy!
                </p>
              </Modal>
            </div>
          </Draggable>
        </section>

        <section className="w-full min-h-[70vh] flex items-center flex-col justify-evenly">
          {/** this can be be both **/}
          <h1 className="text-7xl h-1/2 flex items-center">
            How to use Review Runes:
          </h1>
          <div className="flex flex-col gap-y-4 h-1/2 min-w-max justify-evenly">
            <p className="text-4xl w-fit">1. download it</p>
            <p className="type-slow text-4xl w-fit">2. done</p>
            <p className="text-4xl w-fit typewriter ">It's that simple</p>
          </div>
        </section>

        <section className="w-full min-h-[70vh] flex items-center flex-col justify-evenly">
          <h1 className="text-7xl h-1/3 flex items-center">
            How does it work?
          </h1>
          <Image alt="ai" src={ai} height={420} />
          <p className="text-4xl w-fit ">It's that simple</p>
        </section>

        <section className="min-h-[70vh] w-full flex items-center justify-center flex-col">
          <h1 className="text-7xl">About Us</h1>
          <div className="flex flex-row ">
            <Image alt={"us"} src={us} height={128} width={128} />
            <p className="text-3xl">
              We are a team of four software engineers from the University of
              Central Florida.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
