import { doc } from "prettier";
import "./App.css";

function App() {
  let url =
    "https://www.amazon.com/AmazonBasics-Pound-Neoprene-Dumbbells-Weights/dp/B01LR5S6HK/?_encoding=UTF8&pd_rd_w=VmDoS&content-id=amzn1.sym.64be5821-f651-4b0b-8dd3-4f9b884f10e5&pf_rd_p=64be5821-f651-4b0b-8dd3-4f9b884f10e5&pf_rd_r=QNMAB4MPATAA66QTZK7F&pd_rd_wg=1Ac1s&pd_rd_r=d22f6dfb-23d5-405e-acf3-c5dffa629d45&ref_=pd_gw_crs_zg_bs_3375251&th=1";

  const setCookie = () => {
    const key = (document.getElementById("api-key") as HTMLInputElement).value;
    if (key) {
      document.cookie = `key=${key}`;
    }
    console.log(document.cookie);
  };

  return (
    <div className="bg-gradient-to-tr from-gray-700 via-gray-900 to-black w-96 h-96 flex flex-col items-center justify-center text-blue-200">
      <div className="text-4xl mb-10 font-bold">Review Rune</div>
      <div>
        <h1 className="text-sm mb-2">Please Enter your OpenAI API Key:</h1>
        <div className="flex-row">
          <form>
            <input
              className="text-lg text-black text-center rounded-md mr-1"
              type="text"
              placeholder="Enter API Key here..."
              id="api-key"
            />
            <button
              className="bg-white text-black rounded-md px-2 mx-1 text-lg hover:bg-green-500 hover:text-white duration-200"
              onClick={() => {
                setCookie();
              }}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
