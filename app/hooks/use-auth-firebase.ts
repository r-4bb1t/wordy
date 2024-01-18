import { User } from "firebase/auth";
import { useUserStore } from "../store/user-store";
import { useCallback } from "react";

export const useAuthFirebase = () => {
  const { setUser } = useUserStore();

  const handleUser = useCallback(
    async (rawUserData: User | null) => {
      if (!rawUserData) {
        setUser(null);
        return;
      }
      const user = await (
        await fetch("/api/auth/sign-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
            token: await rawUserData.getIdToken(),
          },
          body: JSON.stringify(rawUserData),
          cache: "no-store",
        })
      ).json();
      if (user.error) {
        setUser(null);
        return;
      }
      setUser(user);
    },
    [setUser]
  );

  return {
    handleUser,
  };
};
