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

  const docRef = doc(db, "article", params.id);
  await setDoc(docRef, {
    en,
    ko,
    words: words.map((word) => doc(db, "word/" + word.word)),
    quizzes,
  });

  return Response.json({ article: { en, ko, words, quizzes } });
}
