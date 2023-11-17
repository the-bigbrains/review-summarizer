import openai from "./client";

export default async function generatePoints(
  review: string[],
  type: "positive" | "negative"
) {
  let listType = type === "positive" ? "pros" : "cons";

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: JSON.stringify(review),
      },
    ],

    functions: [
      {
        name: "summarizePos",
        description: `Given an array of reviews for a product, generate a list of bullet points summarizing ONLY the ${type} aspects of the product based on the reviews. Consider factors like product features, quality, and user experiences. The output should be less than 25 words while being concise, clear and informative.`,
        parameters: {
          type: "object",
          properties: {
            data: {
              type: "array",
              description: `Array of summarized ${listType} of the product based on the reviews`,
              items: {
                type: "string",
              },
            },
          },
        },
      },
    ],
    function_call: "auto",
    model: "gpt-3.5-turbo-16k",
    temperature: 0.7,
  });

  return completion.choices[0].message.function_call?.arguments;
}
