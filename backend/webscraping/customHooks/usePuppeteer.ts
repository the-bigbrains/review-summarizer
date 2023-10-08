import puppeteer from "puppeteer";

export async function usePuppeteer(url: string) {
  const browser = await puppeteer.launch({ headless: "new" });

  const page = await browser.newPage();
  await page.goto(url);

  return { browser, page };
}