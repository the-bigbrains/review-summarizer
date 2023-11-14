import { usePuppeteer } from "../customHooks/usePuppeteer";

export default async function targetReview(url: string) {
  const { browser, page } = await usePuppeteer(url); // use puppeteer to open a browser and a page

  await page.evaluate(() => {
    window.scrollBy(0, 4000); // Adjust the scroll distance as needed
  });

  await page.waitForSelector('div[data-test="review-card--text"]');

  const reviewText = await page.$$eval(
    'div[data-test="review-card--text"]',
    (elements) => {
      return elements.map((element) => {
        return { text: element.textContent || "" } as { text: string }; // Use type assertion to ensure non-null string
      });
    }
  );

  await browser.close(); // close browser

  return {
    positive: reviewText.map((text) => text.text),
    negative: reviewText.map((text) => text.text),
  };
}
