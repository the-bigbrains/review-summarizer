async function negative(page: any) {
  const link = 'a:contains("Critical reviews")';
  await page.waitForSelector(link);
  await page.click(link);
}
