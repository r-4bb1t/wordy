import { db } from "@/app/firebase/client";
import { QuizType, WordType } from "@/app/types/result";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const docRef = doc(db, "article", params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return Response.json({ word: docSnap.data() });
  }

  return new Response("Not Found", {
    status: 404,
  });
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

  const docRef = doc(db, "article", params.id);
  await setDoc(docRef, { en, ko, words, quizzes });

  return Response.json({ article: { en, ko, words, quizzes } });
}
