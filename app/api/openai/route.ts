import OpenAI from "openai";
import { PROMPT, ResponseType } from "./prompt";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase/client";

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
  const json: ResponseType = JSON.parse(answer[0] || "null") || {
    words: [],
    quizzes: [],
  };

  const wordsRef = collection(db, "word");

  const promises = json.words.map(async (word) => {
    const res = await fetch(`${process.env.APP_URL}/api/word/${word.word}`);
    if (res.status === 200) {
      return res.json();
    }

    const wordRef = doc(wordsRef, word.word);
    await setDoc(wordRef, word);

    return { word };
  });

  const words = await Promise.all(promises);

  return Response.json({ ...json, words });
}
