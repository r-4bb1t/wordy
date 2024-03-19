import { db } from "@/app/lib/firebase/admin";
import { cookies } from "next/headers";

export async function PATCH(
  request: Request,
  { params }: { params: { word: string; sentence: string } }
) {
  const userId = cookies().get("wordy-user")?.value;

  if (!userId) {
    return Response.json({ error: "User not found" });
  }

  const sentenceIndex = parseInt(params.sentence);
  const { meaning, sentence } = await request.json();

  const userRef = db.doc(`user/${userId}`);
  const userDoc = (await userRef.get()).data();

  if (!userDoc) {
    return Response.json({ error: "User not found" });
  }

  const wordRef = db.doc(`word/${params.word}`);
  const wordDoc = (await wordRef.get()).data();

  if (!wordDoc) {
    return Response.json({ error: "Word not found" });
  }

  wordRef.update({
    exampleSentence: wordDoc.exampleSentence.map(
      (s: { meaning: string; sentence: string }, i: number) => {
        if (i === sentenceIndex) {
          return { meaning, sentence };
        }
        return s;
      }
    ),
  });

  return Response.json({ ...wordDoc });
}

export async function DELETE(
  _: Request,
  { params }: { params: { word: string; sentence: string } }
) {
  const userId = cookies().get("wordy-user")?.value;
  if (!userId) {
    return Response.json({ error: "User not found" });
  }

  const sentenceIndex = parseInt(params.sentence);

  const userRef = db.doc(`user/${userId}`);
  const userDoc = (await userRef.get()).data();

  if (!userDoc) {
    return Response.json({ error: "User not found" });
  }

  const wordRef = db.doc(`word/${params.word}`);
  const wordDoc = (await wordRef.get()).data();

  if (!wordDoc) {
    return Response.json({ error: "Word not found" });
  }

  wordRef.update({
    exampleSentence: wordDoc.exampleSentence.filter(
      (_: { meaning: string; sentence: string }, i: number) =>
        i !== sentenceIndex
    ),
  });

  return Response.json({ ...wordDoc });
}
