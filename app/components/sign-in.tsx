import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { IoLogoGithub } from "react-icons/io5";
import { auth } from "../lib/firebase/client";
import { useState } from "react";

export default function SignIn({ close }: { close: () => void }) {
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    const res = await signInWithPopup(auth, new GithubAuthProvider());
    if (res.user) {
      setError(null);
      close();
      return;
    }
    setError("Failed to sign in");
  };

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
