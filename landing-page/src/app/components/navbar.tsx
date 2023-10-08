import Image from "next/image";
import wordart from "../../../public/wordart.png";

export default function navbar() {
  return (
    <div className="w-full h-48 bg-[#bdbdbd] text-black mb-3 items-center justify-center flex font-bold text-2xl custom-box-shadow">
      <div className="flex flex-row w-full items-center justify-center">
        <div className="w-3/4 pl-36 ">
          <Image
            alt={"icon"}
            src={wordart}
            height={256}
            width={256}
            className="flex justify-self-start "
          />
        </div>

        <div className="w-2/4 flex flex-row space-x-4 ">
          <h1 className="">Installation</h1>
          <h1>How to Use</h1>
          <h1>About Us</h1>
        </div>
      </div>
    </div>
  );
}
