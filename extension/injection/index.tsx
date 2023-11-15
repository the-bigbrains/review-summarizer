import ReactDOM from "react-dom/client";
import App from "./App";

const url = document.URL;

const site = url.toString().split("/")[2].split(".")[1];

const elem = document.createElement("div");
elem.className = "w-full px-5 flex justify-center items-center";

console.log("site:", site);

let section: Element | HTMLCollection | null = null;
switch (site) {
  case "amazon":
    section = document.getElementById("ask-btf_feature_div");
    break;
  case "yelp":
    section = document.querySelector("css-13merx8");
    break;
  case "walmart":
    section = document.querySelector(".item-review-section");
    break;
  case "target":
    section = document.getElementsByClassName(
      "styles__StyledHeading-sc-1xmf98v-0 jhKFiw h-text-center h-padding-a-default h-margin-b-none"
    );
    for (let i = 0; i < section.length; i++) {
      if (section[i].textContent === "Guest Ratings & Reviews") {
        section = section[i];
        break;
      }
    }
    break;
}

console.log("section:", section);

if (section instanceof HTMLElement) {
  section.appendChild(elem);
} else if (section instanceof HTMLCollection) {
  section[0].appendChild(elem);
}
console.log("after", section);
//section?.appendChild(elem);
const rootDiv = ReactDOM.createRoot(elem);
rootDiv.render(<App />);
