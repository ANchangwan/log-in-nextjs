"use client";

import { useFormState } from "react-dom";
import RegisterTweet from "./action";
import Button from "../components/Button";

export default function TweetText() {
  const [state, action] = useFormState(RegisterTweet, null);
  return (
    <form className="pt-10 flex flex-col gap-3" action={action}>
      <textarea
        className="w-full h-1/4 bg-neutral-200 ring-2 focus:outline-none focus:ring-orange-500 p-3"
        name="tweet"
        maxLength={500}
        rows={5}
        required
      />
      {state?.formErrors.map((error, idx) => (
        <span className="text-red-500 text-xl font-semibold" key={idx}>
          {error}
        </span>
      ))}
      <Button text="Tweet button" />
    </form>
  );
}
