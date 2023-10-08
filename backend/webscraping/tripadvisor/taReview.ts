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
 
  console.log(review)
  await browser.close(); // close browser

  return review;
}
const url = "https://www.tripadvisor.com/Restaurant_Review-g188590-d13511379-Reviews-Restaurant_Bougainville-Amsterdam_North_Holland_Province.html"
let res = yelpReview(url)
console.log(res)

