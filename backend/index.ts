import express from "express";
import run from "./webscraping/web";

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  const { productUrl } = req.query;

  if (!productUrl) {
    res.send("empty productURL");
    return;
  }

  const response = await run(productUrl as any);

  console.log(response);

  res.send(response);
});

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
