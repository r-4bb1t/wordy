import { db } from "@/app/lib/firebase/client";
import { WordType } from "@/app/types/result";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export async function POST(request: Request) {
  const word: WordType = await request.json();

  const collectionRef = collection(db, "word");
  const docRef = doc(collectionRef, word.word);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return Response.json(docSnap.data());
  }

  await setDoc(docRef, word);
  return Response.json(word);
}
