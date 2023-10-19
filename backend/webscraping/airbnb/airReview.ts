import { Page } from "puppeteer";

export async function airReview(page: Page) {
  const review = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll('span[class="ll4r2nl dir dir-ltr"]'),
      (element) => ({
        text: element.textContent?.replace(/\n/g, "").trim() || "",
      })
    )
  );
  return review;
}
