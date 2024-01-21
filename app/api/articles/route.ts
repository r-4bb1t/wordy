import { db } from "@/app/lib/firebase/admin";
import { ArticleType } from "@/app/types/articles";
import { decodeToken } from "@/app/utils/create-token";
import { Timestamp } from "firebase/firestore";

export async function GET(request: Request) {
  const articles = await db
    .collection("article")
    .orderBy("createdAt", "desc")
    .get();

  return Response.json({
    articles: articles.docs.map((doc) => {
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
  const article: ArticleType = await request.json();

  const userId = decodeToken(
    (request.headers.get("authorization") as string).split(" ")[1]
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

  const newDoc = await db.collection("article").add({
    ...article,
    words: article.words.map((word) => db.doc(`word/${word.word}`)),
    createdAt: new Date(),
  });

  return Response.json({ ...article, id: newDoc.id });
}