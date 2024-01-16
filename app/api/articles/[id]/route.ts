import { db } from "@/app/firebase/client";
import { QuizType, WordType } from "@/app/types/result";
import { DocumentReference, doc, getDoc, setDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const docRef = doc(db, "article", params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const article = docSnap.data();
    const promises = article.words.map(async (wordRef: DocumentReference) =>
      (await getDoc(wordRef)).data()
    );
    const words = await Promise.all(promises);
    return Response.json({ article: { ...article, words, id: params.id } });
  }

  return Response.json({ article: null });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const {
    en,
    ko,
    words,
    quizzes,
  }: {
    en: string;
    ko: string;
    words: WordType[];
    quizzes: QuizType[];
  } = await request.json();

  const promises = words.map(async (word) => {
    const res = await fetch(`${process.env.APP_URL}/api/word`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(word),
    });

    const w = await res.json();
    return w;
  });

  const list = await Promise.all(promises);

  const docRef = doc(db, "article", params.id);
  await setDoc(docRef, { en, ko, words: list, quizzes });

  return Response.json({ article: { en, ko, words: list, quizzes } });
}
