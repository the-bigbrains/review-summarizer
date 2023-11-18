import React from "react";

const Modal = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { children, className, ...rest } = props;

  return (
    <div
      className={
        "font-serif flex-col bg-[#C0C0C0] h-fit items-center p-3 pt-1 text-black gap-y-3 flex border-b-4 border-r-4 border-b-black border-r-black border-l-4 border-l-zinc-300 border-t-4 border-t-zinc-300 " +
        className
      }
      {...rest}
    >
      {children}
    </div>
  );
};

export default Modal;
