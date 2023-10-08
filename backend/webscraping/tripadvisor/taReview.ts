import { usePuppeteer } from "../customHooks/usePuppeteer";

export default async function yelpReview(url: string) {
  const { browser, page } = await usePuppeteer(url); // use puppeteer to open a browser and a page

  await page.waitForSelector('p[class="partial_entry"]');
  const review = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll('p[class="partial_entry"]'),
      (element) => ({
        text: element.textContent?.replace(/\n/g, "").trim() || "",
      })
    )
  );

  await browser.close(); // close browser

  
  return review;
}
