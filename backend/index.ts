import express from "express";
import scrapeReviews from "./webscraping/amazon/amazonScrape";
import cors from "cors";
import gptN from "./gpt/gptNegative";
import gptP from "./gpt/gptPositive";
import taReview from "./webscraping/tripadvisor/taReview";
import yelpReview from "./webscraping/yelp/yelpReview";

const app = express();
const port = 3000;

app.use(cors({ origin: "*" }));

app.get("/", async (req, res) => {
  console.log("request received");

  const { productUrl } = req.query;

  if (!productUrl) {
    res.send("empty productURL");
    return;
  }

  let response: any = null;

  console.log("getting reviews");
switch (true) { 
  case /amazon\.com/i.test(productUrl.toString()):
    console.log("amazon");
    response = await scrapeReviews(productUrl as any);
    break;
  case /tripadvisor\.com/i.test(productUrl.toString()):
    console.log("tripadvisor");
    response = await taReview(productUrl as any);
    break;
  case /yelp\.com/i.test(productUrl.toString()):
    console.log("yelp");
    response = await yelpReview(productUrl as any);
    break;
  default:
    break;
}

  // ! send it to GPT pos

  console.log("Getting negative");
  const posGPT = await gptP(
    response.positive.map((review: any) => review.text)
  );

  console.log("getting positive");
  // ! send to GPT negative
  const negGPT = await gptN(
    response.negative.map((review: any) => review.text)
  );

  const positive = posGPT.map((pos) => pos.message.content) as string[];
  const negative = negGPT.map((neg) => neg.message.content) as string[];

  // ! return the final

  res.status(200).send({ positive, negative });
});

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
