import { DocumentReference } from "firebase/firestore";
import { db } from "../../lib/firebase/admin";

export async function GET(request: Request) {
  const words = (await db.collection("word").get()).docs.map(
    (w) => w.data().word
  );
  const articles = await db.collection("article").get();

  const promises = articles.docs.map(async (doc) => {
    const article = doc.data();
    await db
      .doc(`article/${doc.id}`)
      .update({
        words: (article.words as DocumentReference[]).filter((w) =>
          words.includes(w.id)
        ),
      });
  });

  await Promise.all(promises);

  console.log("migration done");
  return Response.json({ message: "done" });
}
