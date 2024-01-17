import { db } from "@/app/firebase/client";
import { ArticleType } from "@/app/types/articles";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";

export async function GET(request: Request) {
  const articlesSnap = await getDocs(collection(db, "article"));

  return Response.json({
    articles: articlesSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
  });
}

export async function POST(request: Request) {
  const { title, en, ko, words, quizzes }: ArticleType = await request.json();

  const newDoc = await addDoc(collection(db, "article"), {
    title,
    en,
    ko,
    words: words.map((word) => doc(db, "word/" + word.word)),
    quizzes,
  });

  return Response.json({ article: { en, ko, words, quizzes, id: newDoc.id } });
}
