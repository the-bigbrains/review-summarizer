import "./App.css";

function App() {
  let url =
    "https://www.amazon.com/AmazonBasics-Pound-Neoprene-Dumbbells-Weights/dp/B01LR5S6HK/?_encoding=UTF8&pd_rd_w=VmDoS&content-id=amzn1.sym.64be5821-f651-4b0b-8dd3-4f9b884f10e5&pf_rd_p=64be5821-f651-4b0b-8dd3-4f9b884f10e5&pf_rd_r=QNMAB4MPATAA66QTZK7F&pd_rd_wg=1Ac1s&pd_rd_r=d22f6dfb-23d5-405e-acf3-c5dffa629d45&ref_=pd_gw_crs_zg_bs_3375251&th=1";

  const sendRequest = async (url: string) => {
    console.log("sending url", url);

    const yeet = await fetch(`http://localhost:3000/?productUrl=${url}`);
  };

  return (
    <div className="">
      <div className="bg-slate-800 w-60 h-60 text-white">{url}</div>
      <button onClick={() => sendRequest(url)}>Yeet</button>
    </div>
  );
}

export default App;
