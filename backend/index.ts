import express from "express";
import scrapeAmazonReviews from "./webscraping/amazon/amazonScrape";
import cors from "cors";
import generatePoints from "./gpt/gptPositive";
import gpt from "./gpt/gpt";
import yelpReview from "./webscraping/yelp/yelpReview";
import airScrape from "./webscraping/airbnb/airScrape";
import generalGPT from "./gpt/generalGPT";
import targetReview from "./webscraping/target/targetReview";
import bodyParser from "body-parser";
import z from "zod";

const app = express();
const port = 3000;

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

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
      //REDOING
      break;
    case /yelp\.com/i.test(productUrl.toString()):
      console.log("yelp");
      response = await yelpReview(productUrl.toString());
      break;
    case /airbnb\.com/i.test(productUrl.toString()):
      console.log("airbnb");
      response = await airScrape(productUrl.toString());
      break;
    case /target\.com/i.test(productUrl.toString()):
      console.log("target");
      response = await targetReview(productUrl.toString());
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

app.post("/amazon-points", async (req, res) => {
  const {
    data,
  }: { data: { reviews: string[]; type: "positive" | "negative" } } = req.body;

  if (!data || !data.reviews.length) {
    res
      .status(300)
      .send({ data: "request body empty" + JSON.stringify(data, null, 2) });
    return;
  }

  const bulletPoints = await generatePoints(data.reviews, data.type);
  if (!bulletPoints) {
    res.status(500).send({ error: "server returned undefined" });
    return;
  }

  const bulletPointsParsed = JSON.parse(bulletPoints);
  try {
    const test = GPTResponse.parse(bulletPointsParsed);
    res.status(200).send({ data: test.data });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

const GPTResponse = z.object({
  data: z.array(z.string().optional()).optional(),
  error: z.string().optional(),
});

app.post("/amazon-summary", async (req, res) => {
  const { positive, negative }: { positive: string[]; negative: string[] } =
    JSON.parse(req.body);

  const summary = await gpt(positive, negative);

  res.status(200).send(summary);
});

app.get("/amazon", async (req, res) => {
  const { productUrl } = req.query;

  if (!productUrl) {
    res.send("empty productURL");
    return;
  }

  const scrapeData = await scrapeAmazonReviews(productUrl.toString());

  if (!scrapeData) {
    res.status(500).send({ error: "tempResponse returned nothing" });
    return;
  }

  res.status(200).send({ data: scrapeData });
});

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
