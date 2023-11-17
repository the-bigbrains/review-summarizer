import openai from "./client";

export default async function gptN(review: string[]) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `You are an experienced online review judge tasked with summarizing reviews comments from online business. 
        Provide concise and insightful summaries of user comments, highlight the pro and cons of this review comments. 
        Keep your summaries short (less than or equal to 50 words), clear, and accessible to users of all familiarity levels with the product. 
        return a summary in the following JSON format and ONLY the JSON format in your response:

        {
          positive: string[],
          negative: string[],
          summary: string
        }

        Review: ${review}`,
      },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
  });

  return completion.choices;
}
