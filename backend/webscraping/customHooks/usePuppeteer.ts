import puppeteer from "puppeteer";

export async function usePuppeteer(url: string) {
  const browser = await puppeteer.launch({ headless: "new" });

  const page = await browser.newPage();

  //attempt to emulate human user
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
  );
  await page.goto(url);

  return { browser, page };
}
