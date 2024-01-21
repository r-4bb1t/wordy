import { User } from "firebase/auth";

export const convertUserType = (rawUserData: User) => {
  return {
    id: rawUserData.uid,
    email: rawUserData.email,
    username: rawUserData.displayName,
    image: rawUserData.photoURL,
    provider: rawUserData.providerData[0].providerId,
    role: "user",
    words: [],
  };
};
