import { useEffect } from "react";
import "./App.css";

function App() {
  const test = async () => {
    const yeet = await fetch("http://localhost:3000");
  };

  return (
    <div className="">
      <div className="bg-slate-800 w-60 h-60 text-white">yo yo</div>
      <button onClick={() => test()}>Yeet</button>
    </div>
  );
}

export default App;
