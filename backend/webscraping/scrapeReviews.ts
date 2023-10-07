import { positive } from "./positive";
import { negative } from "./negative";
import puppeteer from "puppeteer";

export default async function scrapeReviews(url: string) {
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

  const review_positive: { text: string }[] = await positive(page); //Head over to top positive review page
  const review_negative: { text: string }[] = await negative(page); //Head over to top negative review page

  await browser.close(); // close browser
  console.log("browser closed");

  return {
    positive: review_positive,
    negative: review_negative,
  };
}
