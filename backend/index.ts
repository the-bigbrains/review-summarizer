import express from "express";
import scrapeAmazonReviews from "./webscraping/amazon/amazonScrape";
import scrapeWalmartReviews from "./webscraping/walmart/walmartReview";
import cors from "cors";
import genList from "./gpt/genList";
import genSummary from "./gpt/genSummary";
import targetReview from "./webscraping/target/targetReview";
import bodyParser from "body-parser";
import z from "zod";
import yelpReview from "./webscraping/yelp/yelpReview";

const List = z.object({
  data: z.array(z.string().optional()).optional(),
  error: z.string().optional(),
});

const app = express();
const port = 3000;

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.get("/scrape", async (req, res) => {
  console.log("scrape endpoint hit");

  const { productUrl } = req.query;

  if (!productUrl) {
    res.send("empty productURL");
    return;
  }

  //get just "amazon", "walmart", etc. from productURL
  const site = productUrl.toString().split("/")[2].split(".")[1];
  console.log("site:", site);

  let scrapeData:
    | { text: string }[]
    | { positive: string[]; negative: string[] }
    | undefined;
  try {
    switch (site) {
      case "walmart":
        scrapeData = await scrapeWalmartReviews(productUrl.toString());
        break;
      case "target":
        scrapeData = await targetReview(productUrl.toString());
        break;
      case "amazon":
        console.log("amazon case hit");
        scrapeData = await scrapeAmazonReviews(productUrl.toString());
        break;
      case "yelp":
        scrapeData = await yelpReview(productUrl.toString());
        break;
    }
  } catch (e) {
    res.status(500).send({ error: e });
    return;
  }

  if (!scrapeData) {
    res.status(500).send({ error: "tempResponse returned nothing" });
    return;
  }

  res.status(200).send({ data: scrapeData });
});

type Data = {
  reviews: string[];
  type: "positive" | "negative";
};

app.post("/list", async (req, res) => {
  console.log("list endpoint hit");

  const { data }: { data: Data } = req.body;

  if (!data || !data.reviews.length) {
    res
      .status(400)
      .send({ data: "request body empty" + JSON.stringify(data, null, 2) });
    return;
  }

  //this *should* be the shape of List define with Zod
  const listStringified = await genList(data.reviews, data.type);
  if (!listStringified) {
    res.status(500).send({ error: "server returned undefined" });
    return;
  }

  const listParsed = JSON.parse(listStringified);
  try {
    //checking if listParsed is in valid shape
    const list = List.parse(listParsed);
    res.status(200).send({ data: list.data });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

app.post("/summary", async (req, res) => {
  console.log("summary endpoint hit");
  const { positive, negative }: { positive: string[]; negative: string[] } =
    JSON.parse(req.body);

  const summary = await genSummary(positive, negative);

  res.status(200).send(summary);
});

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
