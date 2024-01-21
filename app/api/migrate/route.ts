import { DocumentReference } from "firebase/firestore";
import { db } from "../../lib/firebase/admin";

export async function GET(request: Request) {
  /* const articles = await db.collection("article").get();

  const promises = articles.docs.map(async (doc) => {
    await Promise.all(
      doc.data().words.map(async (word: DocumentReference) => {
        const wordRef = db.doc(`word/${word.id}`);
        const wordData = (await wordRef.get()).data();
        wordRef.update({
          articles: [
            ...(wordData?.articles ?? []).filter(
              (a: DocumentReference) => a.id !== doc.id
            ),
            doc.ref,
          ],
        });
      })
    );
  });

  await Promise.all(promises); */
  console.log("migration done");
  return Response.json({ message: "done" });
}
