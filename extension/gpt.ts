import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function gpt(attributes: string[]) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `You are an experienced online review judge tasked with summarizing product reviews. 
        Provide concise and insightful summaries of user comments, highlighting both the pros and cons of the product. 
        Keep your summaries short, clear, and accessible to users of all familiarity levels with the product. 
        Inject a touch of humor and wit to maintain a light-hearted tone throughout:
        ${attributes}`,
      },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
  });

  return completion.choices;
}
