from typing import List
from flask import Flask, request
from generateList import generateList
from flask import jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)


@app.route('/', methods=['GET'])
def index():
    args = request.args
    return args


@app.route("/scrape", methods=['GET'])
def scrape():
    print("scrape endpoint hit")

    productUrl = request.args.get('productUrl')

    site = productUrl.split('/')[2].split('.')[1] if productUrl else None
    print("site:", site)

    # if site == "amazon":
    #     scrapeAmazon(productUrl)
    # elif site == "walmart":
    #     scrapeWalmart(productUrl)
    # elif site == "target":
    #     scrapeTarget(productUrl)

    return jsonify({"message": "Scraping completed successfully!"})


@app.route("/list", methods=['POST', 'GET'])
async def list():
    print("list endpoint hit")

    data: List[str] = request.get_json()['data']['reviews']
    reviewType = request.get_json()['data']['type']

    if (not data):
        return {"data": []}

    res = await generateList(data, reviewType)

    return {"data": res}
