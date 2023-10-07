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

const elem = document.createElement("div");
elem.className = "container";
const section = document.getElementById("ask-btf_feature_div");
section?.appendChild(elem);
const rootDiv = ReactDOM.createRoot(elem);

rootDiv.render(<App />);
