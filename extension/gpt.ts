import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function gpt(review: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `You are an expert at analyzing product reviews and recognizing computer-generated reviews. Given the following Amazon review, return a summary in the following JSON format and ONLY the JSON format in your response:

{
  ai_likeliness: number,  //0 to 1 scale
  ai_like_phrases : string[],  //No phrases indicative of AI-generated content were found in the review.)
  pros: string[],
  pros_reference: string[] //1 to 1 matching phrases of the summarized pros are inferred from 
  cons: string[],
  cons_reference: string[] //1 to 1 matching phrases the summarized cons are inferred from 
  noteworthy: string[]
}

${review}
`,
      },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
  });

  return completion.choices;
}
