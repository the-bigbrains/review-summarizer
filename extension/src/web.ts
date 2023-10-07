const puppeteer = require("puppeteer");
async function run(url: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url); // go to url

  const html = await page.content();
  const review = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll('div[data-hook="review-collapsed"]'),
      (element) => ({
        text: element.textContent?.replace(/\n/g, "").trim() || "",
      })
    )
  );
  console.log(review);

  await browser.close(); // close browser
}

run( "https://www.amazon.com/AmazonBasics-Pound-Neoprene-Dumbbells-Weights/dp/B01LR5S6HK/?_encoding=UTF8&pd_rd_w=VmDoS&content-id=amzn1.sym.64be5821-f651-4b0b-8dd3-4f9b884f10e5&pf_rd_p=64be5821-f651-4b0b-8dd3-4f9b884f10e5&pf_rd_r=QNMAB4MPATAA66QTZK7F&pd_rd_wg=1Ac1s&pd_rd_r=d22f6dfb-23d5-405e-acf3-c5dffa629d45&ref_=pd_gw_crs_zg_bs_3375251&th=1");
