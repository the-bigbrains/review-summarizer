import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function gpt(attributes: string[]) {
  const completion = await openai.chat.completions.create({
    messages: ["You are "],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
  });

  return completion.choices;
}
