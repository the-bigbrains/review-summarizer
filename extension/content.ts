const init = function () {
  const elem = document.createElement("div");
  elem.className = "ReviewRuneTitle";
  elem.innerHTML = "Review Rune:";
  const section = document.getElementById("ask-btf_feature_div");
  section?.appendChild(elem);
};
init();
