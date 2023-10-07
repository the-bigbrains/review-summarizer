import getURL from "./util/getURL";
/*
! url -> call scraper -> feed scraper data into gpt -> output gets displayed here in content.ts
*/
const scrape = async function () {

  const url = getURL();

  const response = await fetch(`http://localhost:3000/?productUrl=${url}`);

  const data = await response.json();
  console.log(data);
  return data;

}

const init = async function () {
  const elem = document.createElement("div"); 
  elem.className = "ReviewRuneTitle";
  const stuff = await scrape();
  console.log(stuff);
  elem.innerHTML = "Review Rune: ";
  const section = document.getElementById("ask-btf_feature_div");
  section?.appendChild(elem);
};
init();
