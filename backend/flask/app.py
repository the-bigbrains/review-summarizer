from flask import Flask, request
import semantic_kernel as sk
from semantic_kernel.connectors.ai.open_ai import OpenAIChatCompletion

kernel = sk.Kernel()

# Prepare OpenAI service using credentials stored in the `.env` file
api_key = "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"
kernel.add_chat_service("chat-gpt", OpenAIChatCompletion("gpt-3.5-turbo", api_key))

app = Flask(__name__)


@app.route("/general", methods=["POST"])
def general():
    text = """[
  {
    text: "Love the Holiday Blend when it comes out each year. Of course I've been enjoying it in the K-cup format, and was surprised when I saw that Starbucks introduced this blend in the Nespresso Vertuo pods! Bought some. Drank it. Loved it! Not sure about the other reviews saying not to buy it. To each their own, I guess... still trying to figure out how something could be bland and too strong at the same time... LOL"
  },
  {
    text: "The coffee is bitter and tastes old. Like it's been sitting on a shelf for years. DO NOT WASTE YOUR MONEY."
  },
  {
    text: 'This was probably the most vile cup of coffee I`ve ever had LMFAO. Stick to what you know please. Anything but this.'
  },
  {
    text: 'I love this flavor of coffee. It pairs great with a vanilla creamer.'
  },
  {
    text: 'I wanted to like this coffee but it was bitter, bland, and too strong. I purchased this because one it`s Starbucks and because of the beautiful packaging honestly. The reviews weren`t too shabby either but I would never buy this again, I placed my nespresso order today.'
  },
  {
    text: 'This is my new favorite pod. It`s nice and bold but not bitter. Starbucks pods taste so much more like good bold coffee as opposed to the Nespresso pods.'
  },
  { text: 'Love this one bought 7 boxes' },
  {
    text: 'I`m so excited Starbucks made their holiday flavor available in the Vertuo capsule. The flavor so smooth and a little earthy. The aroma is perfection. I`m going to need to stock up before it`s gone.'
  }
]"""

    sk_prompt = """You are an experienced online review judge tasked with 
        summarizing reviews comments from online business. 
        Provide concise and insightful summaries of user comments, 
        highlight the pro and cons of this review comments. 
        Keep your summaries short (less than or equal to 50 words), clear, 
        and accessible to users of all familiarity levels with the product. 
        return a summary in the following JSON format and ONLY the JSON format in your response:

        {
          positive: string[],
          negative: string[],
          summary: string
        }

        Review: {{$review}}"""

    app.logger.info("sk_prompt")
    # Create a semantic function that uses the `chat-gpt` service
    tldr_function = kernel.create_semantic_function(
        sk_prompt, max_tokens=200, temperature=0, top_p=0.5
    )

    # Call the semantic function with a review
    summary = tldr_function(text)

    app.logger.info(f"summary: {summary}")
    return "Hello"  # jsonify(summary)


@app.route("/summarize", methods=["POST"])
def summarize():
    review = request.get_json()

    sk_prompt = """You are an experienced online review judge tasked with summarizing product reviews. 
        You are given a JSON format of a top positive review with a summary along with top negative review with a summary.
        Provide concise and insightful summaries of both reviews, highlighting both the pros and cons of the product. 
        Keep your summaries short (less than or equal to 50 words), clear, and accessible to users of all familiarity levels with the product. 
        Inject a touch of wit to maintain a light-hearted tone throughout. The summary should be about the basic overall product of items and whether you recommend this item or not.
        Return the summary of only ONE summary, (Do not response with emoji):
    
        ${pos}
        ${neg}"""

    # Create a semantic function that uses the `chat-gpt` service
    tldr_function = kernel.create_semantic_function(
        sk_prompt, max_tokens=200, temperature=0, top_p=0.5
    )

    # Call the semantic function with a review
    summary = tldr_function(review)

    app.logger.info(summary)
    return summary  # jsonify(summary)
