import { db } from "@/app/lib/firebase/admin";
import { WordType } from "@/app/types/result";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const word: WordType = await request.json();

  const wordDocRef = db.collection("word").doc(word.word);
  const wordDoc = await wordDocRef.get();
  const userId = cookies().get("wordy-user")?.value;
  const userData = (await db.doc(`user/${userId}`).get()).data();

  if (wordDoc.exists) {
    return Response.json({ ...wordDoc.data(), isLiked:  });
  }

  await wordDocRef.set(word);
  return Response.json({ ...word,
    isLiked: (userData?.words.includes(wordDocRef.id) as boolean) || false, });
}
