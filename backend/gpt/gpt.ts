import openai from "./client";

export default async function gpt(pos: string[], neg: string[]) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `You are an experienced online review judge tasked with summarizing product reviews. 
        You are given a JSON format of a top positive review reference with noteworthy along with top negative review reference with noteworthy.
        Provide concise and insightful summaries of both reviews, highlighting both the pros and cons of the product. 
        Keep your summaries short, clear, and accessible to users of all familiarity levels with the product. 
        Inject a touch of wit to maintain a light-hearted tone throughout. The summary should be  about the basic overall product of items and whether you recommend this item or not.
        Return a summary in the following JSON format and ONLY the JSON format in your response, (Do not response with emoji):
        {
            pros: string[]
            cons: string[]
            item_summary:
        }:
        ${pos}
        ${neg}`,
      },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
  });

  return completion.choices;
}
