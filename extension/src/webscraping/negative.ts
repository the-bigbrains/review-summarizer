export async function negative(page: any) {
  const linkSelector = 'a[data-reftag="cm_cr_arp_d_viewpnt_rgt"]';
  const link = await page.evaluate((selector: any) => {
    const element = document.querySelector(selector);
    return element ? element.href : null;
  }, linkSelector);

  // If the link is found, navigate to it
  if (link) {
    await page.goto(link);
  } else {
    console.log("Link not found on the page.");
  }

  const review = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll('div[class="a-row a-spacing-small review-data"]'),
      (element) => ({
        text: element.textContent?.replace(/\n/g, "").trim() || "",
      })
    )
  );
  return review
}
