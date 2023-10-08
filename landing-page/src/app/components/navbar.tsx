import Image from "next/image";
import icon from "../../../public/icon-straight.png";

export default function navbar() {
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

        <div className="flex flex-row space-x-4">
          <h1>Installation</h1>
          <h1>How to Use</h1>
          <h1>About Us</h1>
        </div>
      </div>
    </div>
  );
}
