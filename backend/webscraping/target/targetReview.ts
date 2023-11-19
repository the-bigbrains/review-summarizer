import { z } from "zod";
import { usePuppeteer } from "../customHooks/usePuppeteer";
import reviewCharMin from "../util";

export default async function targetReview(url: string) {
  const { browser, page } = await usePuppeteer(url); // use puppeteer to open a browser and a page

  await page.evaluate(() => {
    window.scrollBy(0, 7000); // Adjust the scroll distance as needed
  });

  const buttonSelector =
    "#pageBodyContainer > div > div:nth-child(3) > div.h-text-center.h-padding-h-default.h-margin-t-default.h-margin-b-wide > div.h-text-center.h-padding-v-tight > button";

  try {
    const buttonElement = await page.waitForSelector(buttonSelector);
    if (!buttonElement) throw new Error("Button not found");

    await buttonElement.click();

    await page.waitForSelector('div[data-test="review-card--text"]'), // Wait for a review element to appear after button click
      console.log("Clicked the button and reviews loaded");
  } catch (error) {
    console.error("Error clicking the button or waiting for reviews:", error);
  }

  const reviewText = await page.$$eval(
    'div[data-test="review-card--text"]',
    (elements) => elements.map((element) => element.textContent?.trim())
  );

  await browser.close(); // close browser
  console.log(reviewText);

  try {
    let reviewArray = z.array(z.string()).parse(reviewText);

    reviewArray = reviewArray.filter((review) => review.length > reviewCharMin);

    return {
      positive: reviewArray,
      negative: reviewArray,
    };
  } catch (e) {
    console.log(e);
  }
}
