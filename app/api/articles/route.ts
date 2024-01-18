import { db } from "@/app/lib/firebase/client";
import { ArticleType } from "@/app/types/articles";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

export async function GET(request: Request) {
  const articlesRef = collection(db, "article");
  const q = query(articlesRef, orderBy("createdAt", "desc"));
  const articlesSnap = await getDocs(q);

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
  const article: ArticleType = await request.json();

  const newDoc = await addDoc(collection(db, "article"), {
    ...article,
    words: article.words.map((word) => doc(db, "word/" + word.word)),
    createdAt: Timestamp.now(),
  });

  return Response.json({ ...article, id: newDoc.id });
}
