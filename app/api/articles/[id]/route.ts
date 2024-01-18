import { db } from "@/app/firebase/client";
import { ArticleType } from "@/app/types/articles";
import {
  DocumentReference,
  Timestamp,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
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
    return Response.json({
      article: {
        ...article,
        words,
        id: params.id,
        createdAt: (article.createdAt as Timestamp).toDate(),
      },
    });
  }

  return Response.json({ article: null });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { title, image, en, ko, words, quizzes }: ArticleType =
    await request.json();

  const docRef = doc(db, "article", params.id);

  await setDoc(docRef, {
    title,
    image,
    en,
    ko,
    words: words.map((word) => doc(db, "word/" + word.word)),
    quizzes,
    createdAt: Timestamp.now(),
  });

  return Response.json({ article: { en, ko, words, quizzes } });
}
