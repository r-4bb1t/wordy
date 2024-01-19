import { IoLogoGithub } from "react-icons/io5";
import { signIn } from "../lib/firebase/client";
import { useCallback, useState } from "react";
import { useUserStore } from "../store/user-store";

export default function SignIn({ close }: { close: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUserStore();

  const handleSignIn = useCallback(async () => {
    const user = await signIn("github");
    if (user) {
      setUser(user);
      setError(null);
      close();
      return;
    }
    setError("Failed to sign in");
  }, [close, setError]);

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
