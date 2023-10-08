import { usePuppeteer } from "../hooks/usePuppeteer";

export default async function yelpReview(url: string) {
  const { browser, page } = await usePuppeteer(url); // use puppeteer to open a browser and a page

  const html = await page.content();

  const review = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll('p[class="comment__09f24__D0cxf css-qgunke"]'),
      (element) => ({
        text: element.textContent?.replace(/\n/g, "").trim() || "",
      })
    )
  );

  console.log(review);

  await browser.close(); // close browser

  return review;
}

const url = "https://www.yelp.com/biz/daniels-cheesesteak-house-winter-garden"
yelpReview(url);

