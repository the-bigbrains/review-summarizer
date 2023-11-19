import { z } from "zod";
import { usePuppeteer } from "../customHooks/usePuppeteer";
import reviewCharMin from "../util";

export default async function walmartReview(url: string) {
  const { browser, page } = await usePuppeteer(url); // use puppeteer to open a browser and a page

  await page.evaluate(() => {
    window.scrollBy(0, 1000); // Adjust the scroll distance as needed
  });

  console.log("opened browser and page");
  try {
    await page.waitForSelector("span.tl-m.mb3.db-m");
  } catch (e) {
    console.log(e);
  }
  console.log("waited for selector");

  const reviewText = await page.$$eval("span.tl-m.mb3.db-m", (elements) =>
    elements.map((element) => element.textContent?.trim())
  );

  await browser.close(); // close browser

  console.log("Span Text Array:", reviewText);

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

/*

https://www.walmart.com/ip/Shark-AI-Ultra-Self-Empty-Robot-Vacuum-Bagless-60-Day-Capacity-Base-Precision-Home-Mapping-Perfect-for-Pet-Hair-Wi-Fi-AV2511AE/1883965277?athbdg=L1700


 */
