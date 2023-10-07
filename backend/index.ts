import express from "express";
import run from "./webscraping/web";
import cors from "cors";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", async (req, res) => {
  console.log("request received");

  const { productUrl } = req.query;

  if (!productUrl) {
    res.send("empty productURL");
    return;
  }

  const response = await run(productUrl as any);

  console.log(response);

  res.status(200).send(response);
});

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
