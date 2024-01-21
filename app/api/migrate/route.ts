import { DocumentReference } from "firebase/firestore";
import { db } from "../../lib/firebase/admin";

export async function GET(request: Request) {
  /* const _words = await db.collection("word").get();
  await Promise.all(
    _words.docs.map(async (_word) => {
      const wordRef = db.doc(`word/${_word.id}`);
      const word = _word.data();
      return await wordRef.update({
        exampleSentence: [
          {
            meaning: word.exampleSentence.meaning,
            sentence: word.exampleSentence.sentence,
          },
        ],
      });
    })
  ); */
  console.log("migration done");
  return Response.json({ message: "done" });
}
