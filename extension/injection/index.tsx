import ReactDOM from "react-dom/client";
import App from "./App";

const url = document.URL;

const app = document.createElement("div");
app.className = "w-full px-5 flex justify-center items-center";

const onLoad = () => {
  console.log("site loaded!");

  const site = url.toString().split("/")[2].split(".")[1];

  let section: Element | HTMLCollection | null = null;
  switch (site) {
    case "amazon":
      section = document.getElementById("ask-btf_feature_div");

      if (section instanceof HTMLElement) {
        section.appendChild(app);
      } else if (section instanceof HTMLCollection) {
        section[0].appendChild(app);
      }
      break;

    case "yelp":
      section = document.getElementsByClassName("css-13merx8");
      for (let i = 0; i < section.length; i++) {
        if (section[i].textContent === "Recommended Reviews") {
          section = section[i];
          break;
        }
      }

      if (section instanceof HTMLElement) {
        section.appendChild(app);
      } else if (section instanceof HTMLCollection) {
        section[0].appendChild(app);
      }

      break;

    case "walmart":
      section = document.getElementById("item-review-section");
      if (!section) return;

      const ratingsSection = section.childNodes[1];

      section.insertBefore(app, ratingsSection);

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

      if (section instanceof HTMLElement) {
        section.appendChild(app);
      } else if (section instanceof HTMLCollection) {
        section[0].appendChild(app);
      }
      break;
  }

  const rootDiv = ReactDOM.createRoot(app);
  rootDiv.render(<App />);
  window.removeEventListener("load", onLoad);
};

window.addEventListener("load", onLoad);
