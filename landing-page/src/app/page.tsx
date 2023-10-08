"use client";

import us from "../../public/us.jpg";
import Navbar from "./components/navbar";
import Image from "next/image";
import wordart from "../../public/wordart.png";
import Singlebards from "./components/singlebards";
import Clippy from "../../public/clippy-microsoft.gif";
import straightIcon from "../../public/icon-straight.png";
import ai from "../../public/ai.png";

import Draggable from "react-draggable";
import Modal from "./components/Modal";
import { Icon } from "@iconify/react";
import { useState } from "react";

export default function Home() {

  const [aboutZIndex, setAboutZIndex] = useState(1); // Initial z-index value
  const [howToZIndex, setHowToZIndex] = useState(1);
  const [simpleZIndex, setSimpleZIndex] = useState(1);
  const [aboutUsZIndex, setAboutUsZIndex] = useState(1);

  const hide = (e: string) => {
    var element = document.getElementById(e);
    element!.className += " opacity-0";
  }

  const remove = (e: string) => {
    var element = document.getElementById(e);
    element!.remove();
  }

  var max = 0;

  const incZ = (e: string) => {
    const element  = document.getElementById(e);
    element!.style.zIndex = `${max++}`;
  }


  return (
    <main className="text-black flex flex-col items-center justify-start text-center bg-[#008080] custom-box-shadow w-screen overflow-scroll">
      <Navbar />
      <Image className="absolute bottom-0 left-0" src={Clippy} alt="" />
      <div className="w-full h-full flex flex-col gap-y-4">
        <section className="flex justify-center items-center w-full min-h-screen
        " id='about'>
          <Draggable>
            <div className="w-full flex flex-col items-center justify-center" onClick={() => incZ("about")}>
              <Modal className="p-3 pt-1">
                <div className="flex gap-x-2 justify-end w-full h-fit p-1 bg-gradient-to-r from-[#000181] to-[#1084D0] ">
                  <Modal className="text-black">
                    <Icon icon="ic:sharp-minimize" height={16} />
                  </Modal>
                  <Modal onClick={() => hide('about')}>
                    <Icon icon="ph:x-bold" height={16} className="text-black" />
                  </Modal>
                </div>
                <div className="py-2"></div>
                <Image alt={"icon"} src={wordart} height={600} width={800} />
                {/**omnious one sentence description */}
                <p className="max-w-xl text-2xl">
                  Tired of reading dozens of reviews shopping?
                  <br /> We are too.
                  <br />
                  That's why we created{" "}
                  <Image
                    src={straightIcon}
                    alt=""
                    height={30}
                    className="inline"
                  />
                  ;<br /> a tool that takes reviews and processes them into
                  short, concise summaries!
                </p>
              </Modal>
            </div>
          </Draggable>
          <Singlebards />
        </section>

        <section className="w-[50vw] h-fit flex items-center flex-col justify-evenly absolute" style={{
                left: `calc(60vw * ${Math.random()})`,
                top: `calc(60vh * ${Math.random()})`,
              }} id='howto' onClick={() => incZ('howto')}>
          <Draggable>
          <Modal >
              <div className="flex gap-x-2 justify-end w-full h-fit p-1 bg-gradient-to-r from-[#000181] to-[#1084D0] ">
                  <Modal className="text-black">
                    <Icon icon="ic:sharp-minimize" height={16} />
                  </Modal>
                  <Modal onClick={() => remove('howto')}>
                    <Icon icon="ph:x-bold" height={16} className="text-black" />
                  </Modal>
                </div>
          {/** this can be be both **/}
          <h1 className="text-7xl h-1/2 flex items-center">
            How to use Review Runes:
          </h1>
          <div className="flex flex-col gap-y-4 h-1/2 min-w-max justify-evenly">
            <p className="text-4xl w-fit">1. download it</p>
            <p className="text-4xl w-fit">2. done</p>
            <p className="text-4xl w-fit typewriter ">It's that simple</p>
          </div>
          </Modal>
        </Draggable>
        </section>

        <section className="w-fit h-fit flex items-center flex-col justify-evenly absolute " style={{
                left: `calc(60vw * ${Math.random()})`,
                top: `calc(60vh * ${Math.random()})`,
              }} id='simple' onClick={() => incZ("simple")}>
          <Draggable>
            <Modal>
          <div className="flex gap-x-2 justify-end w-full h-fit p-1 bg-gradient-to-r from-[#000181] to-[#1084D0] ">
                  <Modal className="text-black">
                    <Icon icon="ic:sharp-minimize" height={16} />
                  </Modal>
                  <Modal onClick={() => remove('simple')}>
                    <Icon icon="ph:x-bold" height={16} className="text-black" />
                  </Modal>
                </div>
          <h1 className="text-7xl h-1/3 flex items-center">
            How does it work?
          </h1>
          <Image alt="ai" src={ai} height={420} />
          <p className="text-4xl w-fit ">It's that simple</p>
            </Modal>
          </Draggable>
        </section>


        <section className="h-fit w-[75vw] flex items-center justify-center flex-col absolute" style={{
                left: `calc(60vw * ${Math.random()})`,
                top: `calc(60vh * ${Math.random()})`,
              }} id='aboutUs' onClick={() => incZ('aboutUs')}>
          <Draggable>
          <Modal>
            <div className="flex gap-x-2 justify-end w-full h-fit p-1 bg-gradient-to-r from-[#000181] to-[#1084D0] ">
                  <Modal className="text-black">
                    <Icon icon="ic:sharp-minimize" height={16} />
                  </Modal>
                  <Modal onClick={() => remove('aboutUs')}>
                    <Icon icon="ph:x-bold" height={16} className="text-black" />
                  </Modal>
                </div>
          <h1 className="text-7xl">About Us</h1>
          <div className="flex flex-row items-center justify-center">
            <Image alt={"us"} src={us} height={128} width={128} className="p-3"/>
              <div className="flex flex-col">
              <p className="text-3xl p-3">
                We are a team of four software engineers from the University of
                Central Florida.
              </p>
              <p>We love making projects with different technologies we haven't used before</p>
              <p>You can check out the source code for this project here -&gt; <a href="https://github.com/sandydollarioify/review-summarizer" className=" decoration-transparent hover:text-blue-600 hover:underline">Github</a></p>
              </div>
          </div>
          </Modal>
        </Draggable>
        </section>
      </div>
    </main>
  );
}
