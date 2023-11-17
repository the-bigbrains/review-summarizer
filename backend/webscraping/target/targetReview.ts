import { usePuppeteer } from "../customHooks/usePuppeteer";

export default async function targetReview(url: string) {
  const { browser, page } = await usePuppeteer(url); // use puppeteer to open a browser and a page

  await page.evaluate(() => {
    window.scrollBy(0, 7000); // Adjust the scroll distance as needed
  });

  const buttonSelector =
    "#pageBodyContainer > div > div:nth-child(3) > div.h-text-center.h-padding-h-default.h-margin-t-default.h-margin-b-wide > div.h-text-center.h-padding-v-tight > button";

  try { 
    const buttonElement = await page.waitForSelector(buttonSelector);
    if (buttonElement) {
      await Promise.all([
        buttonElement.click(),
        page.waitForSelector('div[data-test="review-card--text"]', {
          timeout: 30000,
        }), // Wait for a review element to appear after button click
      ]);
      console.log("Clicked the button and reviews loaded");
    } else {
      console.log("Button not found");
    }
  } catch (error) {
    console.error("Error clicking the button or waiting for reviews:", error);
  }

  const reviewText = await page.$$eval(
    'div[data-test="review-card--text"]',
    (elements) => {
      return elements.map((element) => {
        return { text: element.textContent || "" } as { text: string }; // Use type assertion to ensure non-null string
      });
    }
  );

  await browser.close(); // close browser
  console.log(reviewText);

  return {
    positive: reviewText.map((text) => text.text),
    negative: reviewText.map((text) => text.text),
  };
}
