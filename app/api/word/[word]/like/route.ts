import { db } from "@/app/lib/firebase/admin";
import { cookies } from "next/headers";

export async function POST(
  _: Request,
  { params }: { params: { word: string } }
) {
  const userId = cookies().get("wordy-user")?.value;

  if (!userId) {
    return Response.json({ error: "User not found" });
  }

  const userRef = db.doc(`user/${userId}`);
  const userDoc = (await userRef.get()).data();

  if (!userDoc) {
    return Response.json({ error: "User not found" });
  }

  userRef.set({
    ...userDoc,
    words: userDoc.words.includes(params.word)
      ? userDoc.words.filter((word: string) => word !== params.word)
      : [...userDoc.words, params.word],
  });

  return Response.json({ isLiked: !userDoc.words.includes(params.word) });
}
