import puppeteer from "puppeteer";

export default async function scrapeReviews(url: string) {
  const browser = await puppeteer.launch({ headless: "new" });

  const page = await browser.newPage();
  await page.goto(url);
  await page.content();

  //attempt to emulate human user
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
  );

  const linkSelector = 'a[data-hook="see-all-reviews-link-foot"]';

  console.log("Looking for element with selector ", linkSelector);
  const anchorElHandle = await page.waitForSelector(linkSelector);

  if (!anchorElHandle) {
    console.log("element not found");
    return;
  }

  console.log("url before ", page.url());
  await anchorElHandle?.click();
  await page.waitForNavigation();
  console.log("url after ", page.url());

  const reviewSelectorArray = ["lf", "rg"];
  const reviewArrayResolved: string[][] = [];
  for (const selector of reviewSelectorArray) {
    const linkSelector = `a[data-reftag="cm_cr_arp_d_viewpnt_${selector}t"]`;

    console.log("Looking for element with selector", linkSelector);

    const anchorElHandle = await page.waitForSelector(linkSelector);

    if (!anchorElHandle) {
      console.log("element not found");
      return;
    }

    console.log("url before ", page.url());
    anchorElHandle.click();
    await page.waitForNavigation();
    console.log("url after ", page.url());

    const review = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          'div[class="a-row a-spacing-small review-data"]'
        ),
        (element) => element.textContent?.replace(/\n/g, "").trim() || ""
      )
    );

    reviewArrayResolved.push(review);
  }

  await browser.close(); // close browser
  console.log("browser closed");

  return {
    positive: reviewArrayResolved[0],
    negative: reviewArrayResolved[1],
  };
}
