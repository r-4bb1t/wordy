import OpenAI from "openai";

import { PROMPT } from "./prompt";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  const { article } = await request.json();

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: PROMPT,
      },
      {
        role: "user",
        content: `"""\n` + article + `\n"""`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const answer = completion.choices.map((choice) => choice.message.content);
  const json = JSON.parse(answer[0] || "{}");

  console.log(json);
  return Response.json(json);
}
