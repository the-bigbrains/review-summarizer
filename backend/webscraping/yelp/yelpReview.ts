import { usePuppeteer } from "../customHooks/usePuppeteer";

export default async function yelpReview(url: string) {
  const { browser, page } = await usePuppeteer(url); // use puppeteer to open a browser and a page

  const review = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll('p[class="comment__09f24__D0cxf css-qgunke"]'),
      (element) => ({
        text: element.textContent?.replace(/\n/g, "").trim() || "",
      })
    )
  );
 
  await browser.close(); // close browser

  return review;
}
