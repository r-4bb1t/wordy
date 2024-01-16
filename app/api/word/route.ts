import { db } from "@/app/firebase/client";
import { WordType } from "@/app/types/result";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export async function POST(request: Request) {
  const words: WordType = await request.json();

  const collectionRef = collection(db, "word");
  const docRef = doc(collectionRef, words.word);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(docRef, words);
    return;
  }

  return Response.json(docRef);
}
