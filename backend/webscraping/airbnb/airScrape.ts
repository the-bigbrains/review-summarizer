import { usePuppeteer } from "../customHooks/usePuppeteer";
import { airReview } from "./airReview";

export default async function airScrape(url: string) {
  const { browser, page } = await usePuppeteer(url); // use puppeteer to open a browser and a page

  const buttonSelector = 'button[data-testid="pdp-show-all-reviews-button"]';
  await page.waitForSelector(buttonSelector);
  await page.click(buttonSelector);

  await page.waitForSelector('span[class="ll4r2nl dir dir-ltr"]');

  await page.evaluate(() => {
    window.scrollBy(0, 1500); // Adjust the scroll distance as needed
  });

  await page.waitForTimeout(1000);

  const review: { text: string }[] = await airReview(page);

  console.log(review);
  await browser.close(); // close browser
  console.log("browser closed");

  return review;
}
