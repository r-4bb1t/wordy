import { db } from "@/app/lib/firebase/admin";
import { WordType } from "@/app/types/result";

export async function POST(request: Request) {
  const word: WordType = await request.json();

  const docRef = db.collection("word").doc(word.word);
  const doc = await docRef.get();

  if (doc.exists) {
    return Response.json(doc.data());
  }

  await docRef.set(word);
  return Response.json(word);
}
