import { db } from "@/app/lib/firebase/admin";
import { ArticleType } from "@/app/types/articles";
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
    const promises = article.words.map(async (wordRef: DocumentReference) => ({
      ...(await db.doc(wordRef.path).get()).data(),
      isLiked: (userData?.words.includes(wordRef.id) as boolean) || false,
    }));
    const words = await Promise.all(promises);
    return Response.json({
      article: {
        ...article,
        words,
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
