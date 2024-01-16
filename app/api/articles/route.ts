import { db } from "@/app/firebase/client";
import { QuizType, WordType } from "@/app/types/result";
import { addDoc, collection, getDocs } from "firebase/firestore";

export async function GET(request: Request) {
  const articlesSnap = await getDocs(collection(db, "article"));

  return Response.json({
    articles: articlesSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
  });
}

export async function POST(request: Request) {
  const {
    en,
    ko,
    words,
    quizzes,
  }: { en: string; ko: string; words: WordType[]; quizzes: QuizType[] } =
    await request.json();

  await addDoc(collection(db, "article"), { en, ko, words, quizzes });

  return Response.json({ article: { en, ko, words, quizzes } });
}
