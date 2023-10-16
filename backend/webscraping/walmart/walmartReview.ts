import { usePuppeteer } from "../customHooks/usePuppeteer";

export default async function walmartReview(url: string) {
  const { browser, page } = await usePuppeteer(url); // use puppeteer to open a browser and a page

  const review = await page.evaluate(() => {
    const elements = Array.from(
      document.querySelectorAll('div[class="w_0Uhy w_QddF"]')
    );

    // Slice the array to get the first two elements
    const slicedElements = elements.slice(0, 2);

    return slicedElements.map((element) => ({
      text: element.textContent?.replace(/\n/g, "").trim() || "",
    }));
  });

  console.log("Here review is " + review);

  await browser.close(); // close browser

  return review;
}
const url = "https://www.walmart.com/en/reviews/product/1736740710";

const res = walmartReview(url);
