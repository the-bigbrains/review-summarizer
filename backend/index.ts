import express from "express";
import scrapeReviews from "./webscraping/scrapeReviews";
import cors from "cors";
import gptN from "./gpt/gptNegative";
import gptP from "./gpt/gptPositive";
import gpt from "./gpt/gpt";

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

  const response = await scrapeReviews(productUrl as any);

  // ! send it to GPT pos
  const posGPT = await gptP(response.positive.map((review) => review.text));

  // ! send to GPT negative
  const negGPT = await gptN(response.negative.map((review) => review.text));

  const positive = posGPT.map((pos) => pos.message.content) as string[];
  const negative = negGPT.map((neg) => neg.message.content) as string[];

  // ! return the final

  res.status(200).send({ positive, negative });
});

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
