const init = function () {
  const elem = document.createElement("div");
  elem.className = "text-red-500 bg-white w-24 h-24";
  elem.innerHTML = "this is a typescript!";
  const section = document.getElementById("titleSection");
  section?.appendChild(elem);
  document.body.appendChild(elem);
};
init();
