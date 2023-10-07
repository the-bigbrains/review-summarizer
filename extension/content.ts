import fetchURL from "./fetchURL";
/*

 ! url -> call scraper -> feed scraper data into gpt -> output gets displayed here in content.ts

*/
const init = function () {
  const elem = document.createElement("div");
  elem.className = "ReviewRuneTitle";
  elem.innerHTML = "Review Rune:";
  const section = document.getElementById("ask-btf_feature_div");
  section?.appendChild(elem);
};
init();
