import ReactDOM from "react-dom/client";
import App from "./App";

const url = document.URL;

let targetId = "";

switch (true) {
  case /amazon\.com/i.test(url.toString()):
    targetId = "ask-btf_feature_div";
    break;
  case /tripadvisor\.com/i.test(url.toString()):
    break;
  case /yelp\.com/i.test(url.toString()):
    break;
  case /airbnb\.com/i.test(url.toString()):
    break;
  default:
    break;
}

const elem = document.createElement("div");
elem.className = "w-full px-5 flex justify-center items-center";
const section = document.getElementById(targetId);
section?.appendChild(elem);
const rootDiv = ReactDOM.createRoot(elem);
rootDiv.render(<App />);
