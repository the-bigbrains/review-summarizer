import puppeteer from "puppeteer";

export default async function scrapeReviews(url: string) {
  const browser = await puppeteer.launch({ headless: "new" });

  const page = await browser.newPage();
  await page.goto(url); // go to url
  await page.content();

  // Use page.evaluate() to find the <a> tag with the specific data-hook attribute
  const linkSelector = 'a[data-hook="see-all-reviews-link-foot"]';

  const link = await page.evaluate((selector) => {
    const element: HTMLAnchorElement | null = document.querySelector(selector);
    return element ? element.href : null;
  }, linkSelector);

  if (!link) {
    console.log("link not found on the page");
    return;
  }

  // If the link is found, navigate to it
  await page.goto(link);

  const reviewSelectorArray = ["lf", "rg"];
  const reviewArrayResolved: string[][] = [];

  for (const selector of reviewSelectorArray) {
    const linkSelector = `a[data-reftag="cm_cr_arp_d_viewpnt_${selector}t"]`;

    const link = await page.evaluate((selector) => {
      const element: HTMLAnchorElement | null =
        document.querySelector(selector);
      return element ? element.href : null;
    }, linkSelector);

    // If the link is found, navigate to it
    if (!link) {
      console.log("Link not found on the page.");
      return;
    }

    await page.goto(link);

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
