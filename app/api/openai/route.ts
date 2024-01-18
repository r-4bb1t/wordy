import OpenAI from "openai";
import { PROMPT, ResponseType } from "./prompt";
import { cookies } from "next/headers";
import { WordType } from "@/app/types/result";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST (request: Request) {
  const { article } = await request.json();

  /* const completion = await openai.chat.completions.create({
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
  const json: ResponseType = JSON.parse(answer[0] || "null") || {
    words: [],
    quizzes: [],
  }; */

  const json = {
    words: [
      {
        word: "unprecedented",
        meaning: "adj. 이전에 없던, 전례 없는, 새로운",
        exampleSentence: {
          sentence:
            "The government took the unprecedented step of releasing confidential correspondence.",
          meaning: "정부는 기밀 서신을 공개하는 전례 없는 조치를 취했다.",
        },
      },
    ],
  };

  const promises = json.words.map(async (word) => {
    const res = await fetch(`${process.env.APP_URL}/api/word`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify(word),
      cache: "no-store",
    });
    const json = await res.json();
    return json;
  });

  const words = await Promise.all(promises);

  return Response.json({ ...json, words });
};
