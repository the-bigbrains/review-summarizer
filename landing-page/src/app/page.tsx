'use client';

import us from "../../public/us.jpg";
import Navbar from "./components/navbar";
import Image from "next/image";
import wordart from "../../public/wordart.png";
import Singlebards from "./components/singlebards";

import Draggable, { DraggableCore } from "react-draggable";

export default function Home() {
  return (
    <main className="text-black flex flex-col items-center justify-center h-screen text-center bg-[#008080] custom-box-shadow gap-y-4 overflow-scroll">
      <Navbar />
      <Singlebards />

      <div className="w-screen h- outline-dashed">
        <Draggable>
          <section className="w-full flex flex-col items-center justify-center">
            <div className="h-full border border-black bg-[#BDBDBD] flex flex-col items-center pb-4">
              <div className="h-8 bg-gradient-to-r from-[#08216b] to-[#a5cef7] w-full flex flex-row-reverse pr-2 items-center ">
                <div className="h-6 w-6 border border-black bg-red-500">X</div>
                <div className="h-6 w-6 border bg-[#bdbdbd] border-black">-</div>
              </div>
              <Image alt={"icon"} src={wordart} height={512} width={512} />
              {/**omnious one sentence description */}
              <div className="max-w-sm text-lg">
                Tired of reading reviews that are too long? We are too. That's why
                we created Review Runes. We take the reviews, and we summarize them
                into short, concise summaries. We hope you enjoy!
              </div>
            </div>
          </section>
        </Draggable>
      </div>
      

      <div className="h-screen w-full flex items-center justify-center flex-col">
        {/** this can be be both **/}
        <h1 className="text-5xl ">How to use Review Runes:</h1>
        <p className="typewriter w-fit">1. download it</p>
        <p className="type-slow w-fit">2. done</p>
      </div>

      <div className="h-screen w-full flex items-center justify-center flex-col">
        <h1 className="text-5xl">About Us</h1>
        <div className="flex flex-row ">
          <Image alt={"us"} src={us} height={128} width={128} />
          <p>We are a team of four software engineers from the University of Central Florida.</p>
        </div>
        
      </div>
    </main>
  );
}
