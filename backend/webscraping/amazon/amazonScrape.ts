import puppeteer from "puppeteer";

export default async function scrapeReviews(url: string) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  console.log("browser launched");

  //attempt to emulate human user
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
  );

  await page.goto(url);

  const allReviewsSelector = 'a[data-hook="see-all-reviews-link-foot"]';
  const allReviews = await page.waitForSelector(allReviewsSelector); //wait for the see all reviews button to load
  if (!allReviews) {
    console.log("anchorElHandle not found");
    return;
  }
  await allReviews.click();
  await page.waitForNavigation();
  console.log("clicked see all reviews");

  // This function will be called on each page, it selects all reviews and returns them in an array
  async function getReviewComments() {
    await page.waitForSelector(
      'div[class="a-section a-spacing-none review-views celwidget"]'
    ); // Wait for the reviews to load
    const reviewComments = await page.$$eval(
      'span[data-hook="review-body"]',
      (commentElements) => {
        return commentElements.map((element) =>
          element.textContent?.trim().replace(/\n/g, "")
        );
      }
    );
    return reviewComments;
  }

  async function reviewComments() {
    const allReviews: string[] = [];

    try {
      const currentReviews = await getReviewComments();
      console.log("Current Reviews:", currentReviews);

      if (currentReviews.length === 0) {
        console.log("No reviews found on page");
        return allReviews;
      }

      allReviews.push(...(currentReviews as string[]));

      /*const nextPageButton = ".a-last > a"; // Selector for the next page button
      await page.waitForSelector(nextPageButton);
      const nextPageButtonExist = await page.$(nextPageButton); // Check if next page button exists
      if (!nextPageButtonExist) {
        console.log("No more pages");
        return allReviews;
      }

      page.click(nextPageButton);
      await page.waitForNavigation();
      console.log("clicked next page");*/
    } catch (error) {
      console.error("Error:", error);
    }

    return allReviews;
  }

  const reviewSelectorArray = ["rg", "lf"];
  const reviewArrayResolved: string[][] = [];

  for (const selector of reviewSelectorArray) {
    //loop through the positive and negative reviews
    const reviewSelector = `a[data-reftag="cm_cr_arp_d_viewpnt_${selector}t"]`;
    const reviewHandle = await page.waitForSelector(reviewSelector); //wait for the positive or negative reviews button to load
    if (!reviewHandle) {
      console.log("anchorElHandle not found");
      return;
    }

    try {
      await reviewHandle.click(); //click on the positive or negative reviews
      await page.waitForNavigation();
      console.log("clicked reviews");

      const comments = await reviewComments();
      reviewArrayResolved.push(comments); // Fix: Push the comments array into reviewArrayResolved
    } catch (error) {
      console.log("error:", error);
    }
  }

  console.log("All reviews:", reviewArrayResolved);

  return {
    positive: reviewArrayResolved[0],
    negative: reviewArrayResolved[1],
  };
}
