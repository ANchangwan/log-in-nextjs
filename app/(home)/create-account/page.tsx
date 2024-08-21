"use client";
import Button from "@/app/components/Button";
import FormInput from "@/app/components/input";
import { useFormState } from "react-dom";
import CreateAction from "./action";

export default function CreateAccount() {
  const [state, action] = useFormState(CreateAction, null);

  return (
    <div className="w-1/3 flex flex-col gap-2">
      <div className="text-center text-3xl mb-3">🔥 회원가입을 환영합니다!</div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput
          name="username"
          type="text"
          placeholder="username"
          required
          errors={state?.fieldErrors.username}
        />
        <FormInput
          name="email"
          type="email"
          placeholder="email"
          required
          errors={state?.fieldErrors.email}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="password"
          errors={state?.fieldErrors.password}
          required
        />
        <FormInput
          name="password2"
          type="password"
          placeholder="confirm password"
          required
          errors={state?.fieldErrors.password2}
        />
        <Button text="create account" />
      </form>
    </div>
  );
}
