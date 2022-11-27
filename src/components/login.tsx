import { useRef } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function LoginCard() {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const onSubmit = async () => {
    const singIn = await signIn("credentials", {
      redirect: false,
      password: passwordInput.current ? passwordInput.current.value : "",
      username: emailInput.current ? emailInput.current.value : "",
    });

    router.push("/");

    console.log("sign in", singIn);
  };

  return (
    <div className="my-auto card bg-neutral-content  shadow-xl">
      <div className="card w-96 w-96 p-10 shadow-xl">
        <input
          ref={emailInput}
          type="text"
          className="input w-full max-w-xs block mb-3"
          placeholder="username"/>

        <input
          ref={passwordInput}
          type="text"
          className="input w-full max-w-xs block mb-3"
          placeholder="password"/>

        <Link
          href={{
            pathname: "/register",
          }}>
          <span className="text-left">No account ? Register now</span>
        </Link>

        <Link
          href={{
            pathname: "/",
          }}>
          <span className="text-left">Forgot password</span>
        </Link>

        <div className="w-full flex justify-end">
          <button onClick={onSubmit} className="btn">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
