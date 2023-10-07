import { useEffect } from "react";
import "./App.css";

function App() {
  const test = async () => {
    const yeet = await fetch("http://localhost:3000");
  };

  return ( 
    <div className="bg-slate-800 w-96 h-96 flex flex-col items-center justify-center text-white">
      <div className="text-2xl">Review Rune</div>
      <div>
        <h1 className="text-xl">Please Enter your OpenAI API Key:</h1>
        <div className="flex-row">
          <input className="text-lg text-black text-center" type="text" placeholder="Enter API Key here..."></input>
          <button className="bg-white text-black rounded-md px-1 mx-1 text-lg hover:bg-green-500 hover:text-white">Submit</button>
        </div>
        <button onClick={() => test()}>Yeet</button>
      </div>
    </div>
  );
}

export default App;
