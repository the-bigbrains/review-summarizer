async function positive(page: any) {

  const link = 'a:contains("Positive reviews")';
  await page.waitForSelector(link);
  await page.click(link);
}
