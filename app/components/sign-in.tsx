import { IoLogoGithub } from "react-icons/io5";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="bg-base-100 p-12">
      <button
        className="btn btn-primary"
        onClick={() => {
          signIn("github");
        }}
      >
        <IoLogoGithub />
        Sign in with GitHub
      </button>
    </div>
  );
}
