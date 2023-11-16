import puppeteer from "puppeteer";

interface Review {
  positive: string[];
  negative: string[];
}

export default async function scrapeReviews(url: string) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  console.log("browser launched");

  //attempt to emulate human user
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
  );

  await page.goto(url);
  const linkSelector = 'a[data-hook="see-all-reviews-link-foot"]';
  const anchorElHandle = await page.waitForSelector(linkSelector);

  if (!anchorElHandle) {
    console.log("anchorElHandle not found");
    return;
  }

  await anchorElHandle.click();
  await page.waitForNavigation();

  const reviewSelectorArray = ["lf", "rg"];
  const reviewArrayResolved: string[][] = [];

  // This function will be called on each page, it selects all reviews and returns them in an array
  async function getReviews(): Promise<string[]> {
    const reviewElements = await page.$$(
      'div[class="a-row a-spacing-small review-data"]'
    );

    const reviews = await Promise.all(
      reviewElements.map(async (element) => {
        const reviewText = await page.evaluate(
          (el) => el.textContent?.trim() ?? "",
          element
        );
        return reviewText.replace(/\n/g, "");
      })
    );

    return reviews;
  }

  for (const selector of reviewSelectorArray) {
    console.log("selector:", selector);
    //loop through the positive and negative reviews
    const linkSelector = `a[data-reftag="cm_cr_arp_d_viewpnt_${selector}t"]`;
    const anchorElHandle = await page.waitForSelector(linkSelector);

    if (!anchorElHandle) {
      //if the element is not found, exit the loop
      console.log("anchorElHandle not found");
      return;
    }

    anchorElHandle.click(); //click on the positive or negative reviews
    await page.waitForNavigation();

    const reviews: string[] = [];

    try {
      // Loop through 3 pages
      console.log("Looping through pages");
      for (let i = 0; i < 3; i++) {
        console.log("i:", i)
        const currentReviews = await getReviews(); // Get reviews from the current page
        console.log("After getReviews")
        console.log("currentReviews:", currentReviews);
        if (!currentReviews.length) {
          console.log("No reviews found on page", i + 1);
          break; // No more reviews, exit the loop
        }
        reviews.push(...currentReviews);

        const nextPageButton = '.a-pagination > .a-last > a'; // Selector for the next page button
        const nextPageButtonElement = await page.$(nextPageButton);
        console.log("nextPageButtonElement:", nextPageButtonElement);
        if (!nextPageButtonElement) {
          console.log("Next page button not found");
          break; // No next page button found, exit the loop
        }

        console.log("Before nextPageButtonElement.click()")
        await nextPageButtonElement.click(); // Click on the next page button
        console.log("After waitForNavigation")
      }
    } catch (error) {
      console.error("Error:", error);
    }

    reviewArrayResolved.push(reviews);
  }

  console.log("All reviews:", reviewArrayResolved);

  return {
    positive: reviewArrayResolved[0],
    negative: reviewArrayResolved[1],
  };
}
