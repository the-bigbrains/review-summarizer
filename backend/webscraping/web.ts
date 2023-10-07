import { positive } from "./positive";
import { negative } from "./negative";

const puppeteer = require("puppeteer");
async function run(url: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url); // go to url
  const html = await page.content();

  // Use page.evaluate() to find the <a> tag with the specific data-hook attribute
  const linkSelector = 'a[data-hook="see-all-reviews-link-foot"]';
  const link = await page.evaluate((selector: any) => {
    const element = document.querySelector(selector);
    return element ? element.href : null;
  }, linkSelector);

  // If the link is found, navigate to it
  if (link) {
    await page.goto(link);
  } else {
    console.log("Link not found on the page.");
  }

  const review_positive = await positive(page); //Head over to top positive review page
  const review_negative = await negative(page); //Head over to top negative review page
  console.log("Negative Reviews: ", review_negative);
  console.log("Positive Reviews: ", review_positive);

  await browser.close(); // close browser
}

run(
  "https://www.amazon.com/AmazonBasics-Pound-Neoprene-Dumbbells-Weights/dp/B01LR5S6HK/?_encoding=UTF8&pd_rd_w=VmDoS&content-id=amzn1.sym.64be5821-f651-4b0b-8dd3-4f9b884f10e5&pf_rd_p=64be5821-f651-4b0b-8dd3-4f9b884f10e5&pf_rd_r=QNMAB4MPATAA66QTZK7F&pd_rd_wg=1Ac1s&pd_rd_r=d22f6dfb-23d5-405e-acf3-c5dffa629d45&ref_=pd_gw_crs_zg_bs_3375251&th=1"
);
