from flask import Flask, request
from generateList import generateList
from flask import jsonify

app = Flask(__name__)


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


scrapeData = {
    "positive": [
        'I saw this on IG, and decided to order since I was looking for something to keep me warm for a dressy banquet coming up, but didn’t really want to wear a traditional heavy jacket for.  I was apprehensive because I am tall at 5’8”, and have long arms, so arm length in coats and jackets is always a problem for me by being an inch or two too short.  I ordered a medium in this and it fits me great, even in the arms! I am 145 lbs for reference.  It is kinda a cardigan, kinda a lightweight coat.  I say that because it isn’t necessarily a cardigan in that it is a traditional sweater, which is how I usually think of a cardigan - the fabric is different.  But it isn’t really a coat either, because it is lightweight.  Regardless, it will work well over my dress and silky wrap that I plan, and will get me to and from my event without freezing me!  It could easily be tossed over a t-shirt and jeans too, and work perfectly as a casual warmth layer.  I do feel it is priced a bit high, so I am hoping due to that it lasts for years without showing wear.  Time will tell.',
        "Received this sweater today.  I love the weight and material of the fabric, this sweater gives off a look that shows more quality than what it's really worth. I believe the sizing on this sweater seem to have a better fit than the oher sweater I'm returning. Sometimes depending on the color of a garment may vary in cut or quality. Also I favored this color because of the body of the sweater felt it was larger, the seams seem to be in the right place on the side of my body of my body and gave more coverage.",
        'I’d been very skeptical of this item because it seemed too good to be true, but this is a classic fall piece with a heavy knit that a preppy clothing company whose name rhymes with “Hey Shrew” is selling for *at least* four times as much. I own an open-collar long piece like this from Hey Shrew in black and this one is virtually IDENTICAL. So, very pleasantly surprised, run do not walk to buy this, put it in your fall/winter closet, and wear the heck out of it!',
        'This cardigan is nice. Definitely warm enough for a fall day or under a heavy coat for winter. It’s nice and long. Tight fitting, like the picture, don’t expect to wrap it around your entire midsection.I’m 5’8, 170 lbs, pear shaped. A large fits well but I wish it was bigger to wrap tightly around you.',
        "Very pleased with this long cardigan. Heavy weight, the taupe is a beautiful neutral color. I've worn it with jeans and boots and with dress slacks. My only tiny complaint is that I ordered X Large so it would have a mire relaxed and loose fit but it wasn't that. I like these type sweaters to actually be able to come together but this sweater doesn't.  Love it anyway.",
        'This sweater really looks expensive on.  It is well made, warm and lays very nicely over a dress or pants and a top. It would look great either over a dress for work or over jeans and a blouse for more casual look.',
        'I am usually not a huge fan of clothing purchases through Amazon, but I really like this piece. It fits true to size. The fabric is thick and warm.I wore it with a long sleeved tee underneath and it didn’t feel too tight in the arms or restrictive in any way. It can be dressed up or down. I bought the caramel color initially, but might buy it in a couple others as well. Good purchase!',
        "Coatigan is the right word for this piece, it isn't a sweater.  Definitely on the heavier side, perfect layer to stay warm in a cold office! Color is beautiful, size is true. I will definitely be wearing this on repeat during the cold weather months.",
        'This was a splurge for me at $45, but I absolutely love it! It’s a lovely knit with a great weight. I live in the south, so I didn’t need a heavy sweater/coat. This is great to dress up, wear over leggings, or jeans. I want the gray now!',
        'This is perfect! Looks great with a great shape very flattering and a nice substitute for an actual coat as it’s doesn’t look like a sweater until you touch it  (I got the black one) I love it I’m going order another one in apricot.'
    ],
    "negative": [
        'I saw this on IG, and decided to order since I was looking for something to keep me warm for a dressy banquet coming up, but didn’t really want to wear a traditional heavy jacket for.  I was apprehensive because I am tall at 5’8”, and have long arms, so arm length in coats and jackets is always a problem for me by being an inch or two too short.  I ordered a medium in this and it fits me great, even in the arms! I am 145 lbs for reference.  It is kinda a cardigan, kinda a lightweight coat.  I say that because it isn’t necessarily a cardigan in that it is a traditional sweater, which is how I usually think of a cardigan - the fabric is different.  But it isn’t really a coat either, because it is lightweight.  Regardless, it will work well over my dress and silky wrap that I plan, and will get me to and from my event without freezing me!  It could easily be tossed over a t-shirt and jeans too, and work perfectly as a casual warmth layer.  I do feel it is priced a bit high, so I am hoping due to that it lasts for years without showing wear.  Time will tell.',
        "Received this sweater today.  I love the weight and material of the fabric, this sweater gives off a look that shows more quality than what it's really worth. I believe the sizing on this sweater seem to have a better fit than the oher sweater I'm returning. Sometimes depending on the color of a garment may vary in cut or quality. Also I favored this color because of the body of the sweater felt it was larger, the seams seem to be in the right place on the side of my body of my body and gave more coverage.",
        'I’d been very skeptical of this item because it seemed too good to be true, but this is a classic fall piece with a heavy knit that a preppy clothing company whose name rhymes with “Hey Shrew” is selling for *at least* four times as much. I own an open-collar long piece like this from Hey Shrew in black and this one is virtually IDENTICAL. So, very pleasantly surprised, run do not walk to buy this, put it in your fall/winter closet, and wear the heck out of it!',
        'This cardigan is nice. Definitely warm enough for a fall day or under a heavy coat for winter. It’s nice and long. Tight fitting, like the picture, don’t expect to wrap it around your entire midsection.I’m 5’8, 170 lbs, pear shaped. A large fits well but I wish it was bigger to wrap tightly around you.',
        "Very pleased with this long cardigan. Heavy weight, the taupe is a beautiful neutral color. I've worn it with jeans and boots and with dress slacks. My only tiny complaint is that I ordered X Large so it would have a mire relaxed and loose fit but it wasn't that. I like these type sweaters to actually be able to come together but this sweater doesn't.  Love it anyway.",
        'This sweater really looks expensive on.  It is well made, warm and lays very nicely over a dress or pants and a top. It would look great either over a dress for work or over jeans and a blouse for more casual look.',
        'I am usually not a huge fan of clothing purchases through Amazon, but I really like this piece. It fits true to size. The fabric is thick and warm.I wore it with a long sleeved tee underneath and it didn’t feel too tight in the arms or restrictive in any way. It can be dressed up or down. I bought the caramel color initially, but might buy it in a couple others as well. Good purchase!',
        "Coatigan is the right word for this piece, it isn't a sweater.  Definitely on the heavier side, perfect layer to stay warm in a cold office! Color is beautiful, size is true. I will definitely be wearing this on repeat during the cold weather months.",
        'This was a splurge for me at $45, but I absolutely love it! It’s a lovely knit with a great weight. I live in the south, so I didn’t need a heavy sweater/coat. This is great to dress up, wear over leggings, or jeans. I want the gray now!',
        'This is perfect! Looks great with a great shape very flattering and a nice substitute for an actual coat as it’s doesn’t look like a sweater until you touch it  (I got the black one) I love it I’m going order another one in apricot.'
    ]
}


@app.route("/list", methods=['GET'])
async def list():
    print("list endpoint hit")

    dataStringified = request.args.get('data')

    # if (not dataStringified): return "No data provided"
    # if (dataStringified):
    #     data: Dict[str, List[str]] = json.loads(dataStringified)
    # else:
    #     data = scrapeData

    listStringified = await generateList()
    return listStringified.json()
