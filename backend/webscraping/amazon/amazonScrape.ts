import { z } from "zod";
import { usePuppeteer } from "../customHooks/usePuppeteer";
import reviewCharMin from "../util";

export default async function scrapeReviews(url: string) {
  const { browser, page } = await usePuppeteer(url);
  console.log("browser launched");

  const allReviewsSelector = 'a[data-hook="see-all-reviews-link-foot"]';

  //wait for the see all reviews button to load
  const allReviews = await page.waitForSelector(allReviewsSelector);
  if (!allReviews) {
    console.log("selector for all reviews not found");
    return;
  }
  await allReviews.click();
  await page.waitForNavigation();
  console.log("clicked see all reviews");

  // This function will be called on each page, it selects all reviews and returns them in an array
  async function getReviews(type: "Positive" | "Critical") {
    let reviewArray: string[] = [];
    try {
      // Wait for the reviews to load
      while (true) {
        console.log("trying to select reviews");

        const currentFilterEl = await page.waitForSelector(
          'span[data-hook="cr-filter-info-text"]'
        );
        if (!currentFilterEl) continue;
        const currentFilter = await currentFilterEl.evaluate(
          (el) => el.textContent
        );
        console.log("currentFilter:", currentFilter);
        if (currentFilter?.includes(type)) break;
        console.log("waiting for reviews to load");
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      await page.waitForSelector(
        'div[class="a-section a-spacing-none review-views celwidget"]'
      );

      const currentReviews = await page.$$eval(
        'span[data-hook="review-body"]',
        (commentElements) => {
          return commentElements.map((element) =>
            element.textContent?.trim().replace(/\n/g, "")
          );
        }
      );
      // console.log("Current Reviews:", currentReviews);

      //validate array to only be string[]
      reviewArray = z.array(z.string()).parse(currentReviews);

      reviewArray = reviewArray.filter(
        (review) => review.length > reviewCharMin
      );

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
    return reviewArray;
  }

  const reviewSelectorArray = ["lf", "rg"];
  const reviewArrayResolved: string[][] = [];

  for (const selector of reviewSelectorArray) {
    //loop through the positive and negative reviews
    const reviewSelector = `a[data-reftag="cm_cr_arp_d_viewpnt_${selector}t"]`;
    console.log("selector:", selector);

    const reviewHandle = await page.waitForSelector(reviewSelector); //wait for the positive or negative reviews button to load
    if (!reviewHandle) {
      console.log("anchorElHandle not found");
      return;
    }

    try {
      await reviewHandle.click(); //click on the positive or negative reviews
      await page.waitForNavigation();
      console.log("clicked reviews");

      const comments = await getReviews(
        selector === "lf" ? "Positive" : "Critical"
      );
      reviewArrayResolved.push(comments); // Fix: Push the comments array into reviewArrayResolved
    } catch (error) {
      console.log("error:", error);
    }
  }

  browser.close();

  // console.log("All reviews:", reviewArrayResolved);

  return {
    positive: reviewArrayResolved[0],
    negative: reviewArrayResolved[1],
  };
}
