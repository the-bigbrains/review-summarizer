const puppeteer = require("puppeteer");

async function run(url: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url); // go to url

  const html = await page.content();
  const review = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll('div[data-hook="review-collapsed"]'),
      (element) => ({
        text: element.textContent?.replace(/\n/g, "").trim() || "",
      })
    )
  );

  await browser.close(); // close browser
  return review;
}

export default run;
