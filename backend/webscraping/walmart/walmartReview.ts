import { usePuppeteer } from "../customHooks/usePuppeteer";

export default async function walmartReview(url: string) {
  const { browser, page } = await usePuppeteer(url); // use puppeteer to open a browser and a page

  await page.evaluate(() => {
    window.scrollBy(0, 1000); // Adjust the scroll distance as needed
  });

  console.log("opened browser and page");
  try {
    await page.waitForSelector('div[class="w_HmLO"]');
  } catch (e) {
    console.log(e);
  }
  console.log("waited for selector");

  const reviewText = await page.$$eval("div.w_HmLO", (elements) => {
    return elements.map((element) => {
      return { text: element.textContent?.trim() || "" };
    });
  });

  console.log("Span Text Array:", reviewText);

  await browser.close(); // close browser

  return {
    positive: reviewText.map((review) => review.text),
    negative: reviewText.map((review) => review.text),
  };
}

/*

https://www.walmart.com/ip/Shark-AI-Ultra-Self-Empty-Robot-Vacuum-Bagless-60-Day-Capacity-Base-Precision-Home-Mapping-Perfect-for-Pet-Hair-Wi-Fi-AV2511AE/1883965277?athbdg=L1700


 */
