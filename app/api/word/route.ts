import { db } from "@/app/lib/firebase/admin";
import { WordType } from "@/app/types/result";
import { decodeToken } from "@/app/utils/create-token";

export async function POST(request: Request) {
  const word: WordType = await request.json();

  const wordDocRef = db.collection("word").doc(word.word);
  const wordDoc = await wordDocRef.get();

  const userId = decodeToken(
    request.headers.get("authorization")?.split(" ")[1] || ""
  )?.userId;
  const userData = userId
    ? (await db.doc(`user/${userId}`).get()).data()
    : null;

  if (wordDoc.exists) {
    if (
      !wordDoc
        .data()
        ?.exampleSentence.some(
          (sentence: { sentence: string }) =>
            sentence.sentence === word.exampleSentence[0].sentence
        )
    ) {
      await wordDocRef.update({
        exampleSentence: [
          ...wordDoc.data()?.exampleSentence,
          ...word.exampleSentence,
        ],
      });
    }
    return Response.json({
      ...wordDoc.data(),
      isLiked: (userData?.words.includes(wordDoc.id) as boolean) || false,
    });
  }

  await wordDocRef.set(word);
  return Response.json({
    ...word,
    isLiked: (userData?.words.includes(wordDocRef.id) as boolean) || false,
  });
}
