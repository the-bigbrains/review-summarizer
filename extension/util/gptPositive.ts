import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function gpt(review: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `You are an experienced online review judge tasked with summarizing product reviews. 
        Provide concise and insightful summaries of user comments, consider you are given a top critical review highlights the cons. 
        Keep your summaries short, clear, and accessible to users of all familiarity levels with the product. 
        return a summary in the following JSON format and ONLY the JSON format in your response:

        {
          cons_reference: string[] //1 to 1 matching phrases the summarized cons are inferred from 
          noteworthy: string[]
        }:
        ${review}`,
      },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
  });

  return completion.choices;
}
