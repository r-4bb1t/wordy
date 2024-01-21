import { IoLogoGithub, IoLogoGoogle } from "react-icons/io5";
import { signIn } from "../lib/firebase/client";
import { useCallback, useState } from "react";
import { useUserStore } from "../store/user-store";

export default function SignIn({ close }: { close: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUserStore();

  const handleSignIn = useCallback(
    async (provider: "github" | "google") => {
      const user = await signIn(provider);
      if (user) {
        setUser(user);
        setError(null);
        close();
        return;
      }
      setError("Failed to sign in");
    },
    [close, setError, setUser]
  );

  return (
    <div className="bg-base-100 p-12 flex flex-col gap-4">
      {error && <div className="text-red-500">{error}</div>}
      <button
        className="btn bg-[#333] text-white justify-between"
        onClick={() => {
          handleSignIn("github");
        }}
      >
        <IoLogoGithub />
        Sign in with GitHub
      </button>
      <button
        className="btn btn-primary btn-outline justify-between"
        onClick={() => {
          handleSignIn("google");
        }}
      >
        <IoLogoGoogle />
        Sign in with Google
      </button>
    </div>
  );
}
