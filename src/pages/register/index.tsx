import type { NextPage } from "next";
import { useRef } from "react";
import { trpc } from "../../utils/trpc";

const Register: NextPage = () => {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const register = trpc.useMutation("authorize.register");

  const onSubmit = async () => {
    if (!emailInput.current?.value || !passwordInput.current?.value) {
      return;
    }

    register.mutate({
      email: emailInput.current.value,
      password: passwordInput.current.value,
    });
  };

  return (
    <div className="container bg-base-100 w-full mx-auto flex align-center justify-center">
      <div className="my-5 w-full h-fit card bg-neutral-content shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-3xl mb-10">Register user</h1>

          <input
            ref={emailInput}
            type="text"
            className="input w-full max-w-xs block mb-3"
            placeholder="username"
          />

          <input
            ref={passwordInput}
            type="text"
            className="input w-full max-w-xs block mb-3"
            placeholder="password"
          />

          <div className="w-full flex justify-end">
            <button onClick={onSubmit} className="btn">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
