import { GithubAuthProvider, signInWithRedirect } from "firebase/auth";
import { IoLogoGithub } from "react-icons/io5";
import { auth } from "../lib/firebase/client";

export default function SignIn() {
  return (
    <div className="bg-base-100 p-12">
      <button
        className="btn bg-[#333] text-white"
        onClick={() => {
          signInWithRedirect(auth, new GithubAuthProvider());
        }}
      >
        <IoLogoGithub />
        Sign in with GitHub
      </button>
    </div>
  );
}
