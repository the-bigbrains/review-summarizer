from posReviewList import scrapeData
from typing import List
from flask import Flask, request
from flask_cors import CORS
from generateSummaries import generateSummaries

app = Flask(__name__)

CORS(app)


# NOT IN USE
@app.route("/scrape", methods=['GET'])
def scrape():
    print("scrape endpoint hit")

    productUrl = request.args.get('productUrl')
    if (not productUrl):
        return {"data": "Product URL is required!"}

    site = productUrl.split('/')[2].split('.')[1] if productUrl else None
    print("site:", site)

    # if site == "amazon":
    #     scrapeAmazon(productUrl)
    # elif site == "walmart":
    #     scrapeWalmart(productUrl)
    # elif site == "target":
    #     scrapeTarget(productUrl)

    return {"data": "Scraping completed successfully!"}


@app.route("/list", methods=['POST', 'GET'])
async def list():

    data: List[str] = request.get_json()['data']['reviews']
    reviewType = request.get_json()['data']['type']

    print("list endpoint hit. type:", reviewType)

    if (not data):
        return {"data": []}

    res = await generateSummaries(data, reviewType)
    print("generateSummaries response:", res)

    return {"data": res}


@app.route("/test", methods=['GET'])
async def test():

    res = await generateSummaries(scrapeData, "positive")

    return {"data": res}
