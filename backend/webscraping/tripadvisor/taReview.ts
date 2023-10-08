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
 
  console.log(review);

  await browser.close(); // close browser

  return review;
}

const url = "https://www.tripadvisor.com/AttractionProductReview-g34515-d17716239-2_Hour_Glass_Bottom_Guided_Kayak_Eco_Tour_in_Rainbow_Springs_Small_Group-Orlando_Fl.html"
yelpReview(url);

