import openai from "./client";

export default async function gpt(pos: string[], neg: string[]) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `You are an experienced online review judge tasked with summarizing product reviews. 
        You are given a JSON format of a top positive review with a summary along with top negative review with a summary.
        Provide concise and insightful summaries of both reviews, highlighting both the pros and cons of the product. 
        Keep your summaries short (less than or equal to 50 words), clear, and accessible to users of all familiarity levels with the product. 
        Inject a touch of wit to maintain a light-hearted tone throughout. The summary should be about the basic overall product of items and whether you recommend this item or not.
        Return the summary and only the summary, (Do not response with emoji):
    
        ${pos}
        ${neg}`,
      },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
  });

  return completion.choices[0].message.content;
}
