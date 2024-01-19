import { db } from "@/app/lib/firebase/admin";
import { UserType } from "@/app/types/user";
import { User } from "firebase/auth";

export async function POST(request: Request, response: Response) {
  const rawUserData: User = await request.json();

  const docRef = db.doc(`user/${rawUserData.uid}`);
  const doc = await docRef.get();

  if (doc.exists) {
    return Response.json(doc.data());
  }

  const user: UserType = {
    id: rawUserData.uid,
    email: rawUserData.email,
    username: rawUserData.displayName,
    image: rawUserData.photoURL,
    provider: rawUserData.providerData[0].providerId,
    role: "user",
  };

  docRef.set(user);

  return Response.json(user);
}
