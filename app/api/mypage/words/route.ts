import { db } from "@/app/lib/firebase/admin";
import { ArticleType } from "@/app/types/articles";
import { decodeToken } from "@/app/utils/create-token";
import { DocumentReference, Timestamp } from "firebase/firestore";

export async function GET(request: Request) {
  const userId = decodeToken(
    (request.headers.get("authorization") as string).split(" ")[1]
  )?.userId;
  const userData = userId
    ? (await db.doc(`user/${userId}`).get()).data()
    : null;

  if (!userData) {
    return Response.json({ error: "User not found" });
  }

  const words = await Promise.all(
    (await db.doc(`user/${userId}`).get())
      .data()
      ?.words.map(async (word: string) => {
        const wordData = (await db.doc(`word/${word}`).get()).data();
        const articles = await Promise.all(
          (wordData?.articles ?? []).map(async (article: DocumentReference) => {
            const articleData = (await db.doc(article.path).get()).data()!;
            return {
              title: articleData.title,
              image: articleData.image,
              id: article.id,
            };
          })
        );
        return {
          ...wordData,
          isLiked: true,
          articles,
        };
      })
  );

  return Response.json({
    words,
  });
}
