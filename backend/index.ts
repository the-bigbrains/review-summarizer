import express from "express";
import scrapeReviews from "./webscraping/amazon/amazonScrape";
import cors from "cors";
import gptN from "./gpt/gptNegative";
import gptP from "./gpt/gptPositive";
import gpt from "./gpt/gpt";
import yelpReview from "./webscraping/yelp/yelpReview";
import airScrape from "./webscraping/airbnb/airScrape";
import generalGPT from "./gpt/generalGPT";

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

  let response: { text: string }[] = [];

  let positive: string[] = [];
  let negative: string[] = [];
  let summary: string | null = null;

  console.log("getting reviews");
  switch (true) {
    case /amazon\.com/i.test(productUrl.toString()):
      console.log("amazon");
      const tempResponse = await scrapeReviews(productUrl.toString());
      console.log("Getting negative");
      const posGPT = await gptP(
        tempResponse.positive.map((review) => review.text)
      );

      // ! send to GPT negative
      const negGPT = await gptN(
        tempResponse.negative.map((review) => review.text)
      );

      positive = posGPT.map((pos) => pos.message.content) as string[];
      negative = negGPT.map((neg) => neg.message.content) as string[];
      summary = await gpt(positive, negative);

      break;
    case /yelp\.com/i.test(productUrl.toString()):
      console.log("yelp");
      response = await yelpReview(productUrl.toString());
      break;
    case /airbnb\.com/i.test(productUrl.toString()):
      console.log("airbnb");
      response = await airScrape(productUrl.toString());
      break;
    default:
      console.log("default");
      break;
  }

  const yeet = await generalGPT(response.map((txt) => txt.text));
  console.log("yeet", yeet);

  // ! send it to GPT pos

  // ! return the final

  res.status(200).send({ positive, negative, summary });
});

app.get("/amazon", async (req, res) => {
  console.log("speedier");

  const { productUrl } = req.query;

  if (!productUrl) {
    res.send("empty productURL");
    return;
  }

  const tempResponse = await scrapeReviews(productUrl.toString());
  console.log("Getting negative");
  const posGPTProm = gptP(tempResponse.positive.map((review) => review.text));

  console.log("getting positive");
  // ! send to GPT negative
  const negGPTProm = gptN(tempResponse.negative.map((review) => review.text));

  const [posGPT, negGPT] = await Promise.all([posGPTProm, negGPTProm]);

  const positive = posGPT.map((pos) => pos.message.content) as string[];
  const negative = negGPT.map((neg) => neg.message.content) as string[];

  const summary = await gpt(positive, negative);

  res.status(200).send({ positive, negative, summary });
});

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
