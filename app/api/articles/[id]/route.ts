import { db } from "@/app/lib/firebase/admin";
import { ArticleType } from "@/app/types/articles";
import { WordType } from "@/app/types/result";
import { decodeToken } from "@/app/utils/create-token";
import { DocumentReference, Timestamp } from "firebase/firestore";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const docRef = db.doc(`article/${params.id}`);
  const doc = await docRef.get();

  const userId = decodeToken(
    (request.headers.get("authorization") as string).split(" ")[1]
  )?.userId;
  const userData = userId
    ? (await db.doc(`user/${userId}`).get()).data()
    : null;

  if (doc.exists) {
    const article = doc.data()!;
    const promises = (article.words as DocumentReference[]).map(
      async (wordRef) => {
        const wordDocRef = db.doc(wordRef.path);
        const word = (await wordDocRef.get()).data();
        if (!word) {
          docRef.update({
            words: (article.words as DocumentReference[]).filter(
              (w) => w.id !== wordRef.id
            ),
          });
          return;
        }
        return {
          ...word,
          isLiked: (userData?.words.includes(wordRef.id) as boolean) || false,
        };
      }
    );
    const words = await Promise.all(promises);
    return Response.json({
      article: {
        ...article,
        words: words.filter((word) => word),
        id: params.id,
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

  const userId = decodeToken(
    (request.headers.get("authorization") as string)?.split(" ")[1]
  )?.userId;
  const userData = userId
    ? (await db.doc(`user/${userId}`).get()).data()
    : null;

  if (!userData) {
    return Response.json({ error: "User not found" });
  }
  if (userData.role !== "admin") {
    return Response.json({ error: "User is not admin" });
  }

  await Promise.all(
    article.words.map(async (word: WordType) => {
      const wordRef = db.doc(`word/${word.word}`);
      const w = (await wordRef.get()).data();
      if (w) {
        return await wordRef.update({
          articles: [...(w.articles ?? []), db.doc(`article/${params.id}`)],
        });
      }
      return;
    })
  );

  await doc.set({
    ...article,
    words: article.words
      .map((word) => db.doc("word/" + word.word))
      .filter(
        (word, index, self) =>
          self.findIndex((w) => w.path === word.path) === index
      ),
    createdAt: new Date(
      ((await doc.get()).data()?.createdAt as Timestamp).toDate() || Date.now()
    ),
  });

  return Response.json({ article });
}
