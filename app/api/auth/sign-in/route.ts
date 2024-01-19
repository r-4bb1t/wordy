import { db } from "@/app/lib/firebase/admin";
import { User } from "firebase/auth";

export async function POST(request: Request, response: Response) {
  const rawUserData: User = await request.json();

  const docRef = db.doc(`user/${rawUserData.uid}`);
  const doc = await docRef.get();

  if (doc.exists) {
    const response = Response.json(doc.data());

    return response;
  }

  const user = {
    id: rawUserData.uid,
    email: rawUserData.email,
    username: rawUserData.displayName,
    image: rawUserData.photoURL,
    provider: rawUserData.providerData[0].providerId,
  };

  docRef.set(user);

  return Response.json(user);
}
