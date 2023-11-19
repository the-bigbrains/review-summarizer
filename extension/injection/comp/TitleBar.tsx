import React from "react";

const TitleBar = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, children, ...rest } = props;

  return (
    <div
      className={
        "w-full h-fit p-1 bg-gradient-to-r from-[#000181] to-[#1084D0] " +
        className
      }
      {...rest}
    >
      {children}
    </div>
  );
};

export default TitleBar;
