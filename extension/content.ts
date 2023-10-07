const init = function () {
  const elem = document.createElement("div");
  elem.className = "text-red-500 bg-red-500 w-24 h-24";
  elem.innerHTML = "this is a typescript";
  document.body.appendChild(elem);
};
init();
