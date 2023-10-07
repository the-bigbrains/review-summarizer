import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
/*
! url -> call scraper -> feed scraper data into gpt -> output gets displayed here in content.ts
*/
// const scrape = async function () {
//   const url = getURL();

//   const response = await fetch(`http://localhost:3000/?productUrl=${url}`);

//   const data = await response.json();
//   console.log(data);
//   return data;
// };

const init = async () => {
  let url =
    "https://www.amazon.com/AmazonBasics-Pound-Neoprene-Dumbbells-Weights/dp/B01LR5S6HK/?_encoding=UTF8&pd_rd_w=VmDoS&content-id=amzn1.sym.64be5821-f651-4b0b-8dd3-4f9b884f10e5&pf_rd_p=64be5821-f651-4b0b-8dd3-4f9b884f10e5&pf_rd_r=QNMAB4MPATAA66QTZK7F&pd_rd_wg=1Ac1s&pd_rd_r=d22f6dfb-23d5-405e-acf3-c5dffa629d45&ref_=pd_gw_crs_zg_bs_3375251&th=1";

  const sendRequest = async (url: string) => {
    console.log("sending url", url);

    const yeet = await fetch(`http://localhost:3000/?productUrl=${url}`);
    const res = await yeet.json();
    return res;
  };

  console.log("init");

  // const reviews = await sendRequest(url);
  const elem = document.createElement("div");
  // elem.className = "ReviewRuneTitle";
  elem.className = "container";
  const section = document.getElementById("ask-btf_feature_div");
  section?.appendChild(elem);
  const rootDiv = ReactDOM.createRoot(elem);

  rootDiv.render(<App />);
};
init();
