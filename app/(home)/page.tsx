"use client";
import { useFormState } from "react-dom";
import Button from "../components/Button";
import FormInput from "../components/input";
import FormAction from "./action";

export default function Home() {
  const [state, action] = useFormState(FormAction, null);

  return (
    <div className="w-1/3 flex flex-col gap-2">
      <div className="text-center text-3xl">✅ Hellow World</div>
      <form
        action={action}
        className="flex flex-col gap-3 
     "
      >
        <FormInput
          name="email"
          type="email"
          placeholder="email"
          errors={state?.fieldErrors?.email}
          required
        />
        <FormInput
          name="username"
          type="text"
          placeholder="username"
          errors={state?.fieldErrors?.username}
          required
        />
        <FormInput
          name="password"
          type="password"
          placeholder="password"
          errors={state?.fieldErrors?.password}
          required
        />
        <Button text="Log In" />
      </form>
      {state?.success ? (
        <div className="flex gap-2 p-3 bg-green-500 rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          로그인 성공했습니다!
        </div>
      ) : null}
    </div>
  );
}
