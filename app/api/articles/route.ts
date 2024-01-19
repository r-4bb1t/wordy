import { db } from "@/app/lib/firebase/admin";
import { ArticleType } from "@/app/types/articles";

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
        createdAt: new Date(article.createdAt),
      };
    }),
  });
}

export async function POST(request: Request) {
  const article: ArticleType = await request.json();

  const newDoc = await db.collection("article").add({
    ...article,
    words: article.words.map((word) => db.doc(`word/${word.word}`)),
    createdAt: new Date(),
  });

  return Response.json({ ...article, id: newDoc.id });
}
