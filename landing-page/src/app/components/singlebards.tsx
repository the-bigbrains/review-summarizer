import { useState } from "react";
import Draggable, { DraggableCore } from "react-draggable";
useState

export default function Singlebards() {
  let [count, setCount] = useState<number>(0);
  const remove = () => {
    var element = document.getElementById("bards");
    element!.className += ' opacity-0'
    setCount(count += 1)
    setTimeout(() => {
      element!.className = 'w-full flex flex-col items-center justify-center absolute top-96 right-96 z-20'
    }, 250)

    if(count >= 10) {
      alert("Sorry, you can't do that.");
    }
  }

  const actuallyRemove = () => {
    var element = document.getElementById("bards");
    element!.className += ' opacity-0'
  }

  return (
    <Draggable>
        <section  id='bards' className="w-full flex flex-col items-center justify-center absolute top-96 right-96 z-20">
        <div className="h-full border border-black bg-[#BDBDBD] flex flex-col items-center pb-4">
          <div className="h-8 bg-gradient-to-r from-[#08216b] to-[#a5cef7] w-full flex flex-row-reverse pr-2 items-center ">
            <div className="h-6 w-6 border border-black bg-red-500" onClick={() => remove()}  >X</div>
            <div className="h-6 w-6 border bg-[#bdbdbd] border-black" onClick={() => actuallyRemove()}>-</div>
          </div>
          <div className="p-2">
              <h1 className="text-2xl text-black">SINGLE BARDS IN YOUR AREA</h1>
          </div>
          </div>
      </section>  
      </Draggable>
  );
}
