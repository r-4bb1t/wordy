import { db } from "@/app/lib/firebase/client";
import { User } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export async function POST(request: Request, response: Response) {
  const rawUserData: User = await request.json();

  const collectionRef = collection(db, "user");
  const docRef = doc(collectionRef, rawUserData.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const response = Response.json(docSnap.data());

    return response;
  }

  const user = {
    id: rawUserData.uid,
    email: rawUserData.email,
    username: rawUserData.displayName,
    image: rawUserData.photoURL,
    provider: rawUserData.providerData[0].providerId,
  };

  await setDoc(docRef, user);

  return Response.json(user);
}
