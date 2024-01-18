import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { IoLogoGithub } from "react-icons/io5";
import { auth } from "../lib/firebase/client";
import { useCallback, useState } from "react";
import { useAuthFirebase } from "../hooks/use-auth-firebase";

export default function SignIn({ close }: { close: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const { handleUser } = useAuthFirebase();

  const handleSignIn = useCallback(async () => {
    const res = await signInWithPopup(auth, new GithubAuthProvider());
    if (res.user) {
      await handleUser(res.user);
      setError(null);
      close();
      return;
    }
    setError("Failed to sign in");
  }, [close, handleUser]);

  return (
    <div className="bg-base-100 p-12">
      {error && <div className="text-red-500">{error}</div>}
      <button
        className="btn bg-[#333] text-white"
        onClick={() => {
          handleSignIn();
        }}
      >
        <IoLogoGithub />
        Sign in with GitHub
      </button>
    </div>
  );
}
