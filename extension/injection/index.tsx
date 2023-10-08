import ReactDOM from "react-dom/client";
import App from "./App";

const url = document.URL;

const elem = document.createElement("div");
elem.className = "w-full px-5 flex justify-center items-center";

let section;
switch (true) {
  case /amazon\.com/i.test(url.toString()):
    section = document.getElementById("ask-btf_feature_div");
    break;
  case /tripadvisor\.com/i.test(url.toString()):
    section = document.getElementsByClassName("icAII R2 H _Z");
    break;
  case /yelp\.com/i.test(url.toString()):
    section = document.getElementsByClassName(" css-laf5de");
    break;
  case /airbnb\.com/i.test(url.toString()):
    section = document.getElementsByClassName("_16e70jgn");
    break;
  default:
    break;
}

if (section instanceof HTMLElement) {
  section.appendChild(elem);
} else if (section instanceof HTMLCollection) {
  section[0]?.appendChild(elem);
}
//section?.appendChild(elem);
const rootDiv = ReactDOM.createRoot(elem);
rootDiv.render(<App />);
