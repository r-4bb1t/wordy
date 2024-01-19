import { db } from "@/app/lib/firebase/admin";
import { ArticleType } from "@/app/types/articles";
import { DocumentReference } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const docRef = db.doc(`article/${params.id}`);
  const doc = await docRef.get();

  if (doc.exists) {
    const article = doc.data()!;
    const promises = article.words.map(async (wordRef: DocumentReference) =>
      (await db.doc(wordRef.path).get()).data()
    );
    const words = await Promise.all(promises);
    return Response.json({
      article: {
        ...article,
        words,
        id: params.id,
        createdAt: new Date(article.createdAt),
      },
    });
  }

  return Response.json({ article: null });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const article: ArticleType = await request.json();

  const doc = db.doc("article/" + params.id);

  await doc.set({
    ...article,
    words: article.words.map((word) => db.doc("word/" + word.word)),
    createdAt: new Date((await doc.get()).data()?.createdAt || Date.now()),
  });

  return Response.json({ article });
}
