import { usePuppeteer } from "../customHooks/usePuppeteer";

export default async function yelpReview(url: string) {
  const { browser, page } = await usePuppeteer(url); // use puppeteer to open a browser and a page

  const html = await page.content();

  const review = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll('span[class="yCeTE"]'),
      (element) => ({
        text: element.textContent?.replace(/\n/g, "").trim() || "",
      })
    )
  );
 
  await browser.close(); // close browser

  return review;
}


