import { db } from "@/app/firebase/client";
import { doc, getDoc } from "firebase/firestore";

export async function GET(
  _: Request,
  { params }: { params: { word: string } }
) {
  const docRef = doc(db, "word", params.word);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return Response.json(docSnap.data());
  }

  return new Response("Not Found", {
    status: 404,
  });
}