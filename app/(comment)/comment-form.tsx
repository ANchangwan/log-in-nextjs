"use client";

import Button from "../components/Button";
import { useFormState } from "react-dom";
import commentData from "./action";

export default function CommentForm({ id }: { id: number }) {
  const [state, action] = useFormState(commentData, null);
  return (
    <form action={action}>
      <input type="hidden" name="tweetId" value={id} />
      <textarea
        className="w-full max-h-24 bg-neutral-200 ring-2 focus:outline-none ring-orange-500 p-3"
        name="comment"
        maxLength={500}
        rows={5}
      />
      <Button text="댓글달기" />
    </form>
  );
}
