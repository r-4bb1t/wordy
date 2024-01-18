import { db } from "@/app/firebase/client";
import { ArticleType } from "@/app/types/articles";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
} from "firebase/firestore";

export async function GET(request: Request) {
  const articlesSnap = await getDocs(collection(db, "article"));

  return Response.json({
    articles: articlesSnap.docs.map((doc) => {
      const article = doc.data();
      return {
        ...article,
        id: doc.id,
        createdAt: (article.createdAt as Timestamp).toDate(),
      };
    }),
  });
}

export async function POST(request: Request) {
  const { title, image, en, ko, words, quizzes }: ArticleType =
    await request.json();

  const newDoc = await addDoc(collection(db, "article"), {
    title,
    image,
    en,
    ko,
    words: words.map((word) => doc(db, "word/" + word.word)),
    quizzes,
    createdAt: new Date(),
  });

  return Response.json({ article: { en, ko, words, quizzes, id: newDoc.id } });
}
