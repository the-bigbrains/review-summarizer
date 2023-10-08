import openai from "./client";

export default async function gptP(review: string[]) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `You are an experienced online review judge tasked with summarizing product reviews. 
        Provide concise and insightful summaries of user comments, consider you are given a top positive review highlights the pro. 
        Keep your summaries short, clear, and accessible to users of all familiarity levels with the product. 
        return a summary in the following JSON format and ONLY the JSON format in your response:

        {
          pros: string[],
        }  

        Review: ${review}`,
      },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
  });

  return completion.choices;
}
