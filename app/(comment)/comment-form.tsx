"use client";

import Button from "../components/Button";

import commentData from "./action";
import ResponseList from "../components/comment-list";
import { ChangeEvent, useOptimistic, useState } from "react";
import { CommentType } from "../tweets/[id]/page";
import Comments from "../components/comments";
import { formatToTimeAgo } from "@/lib/utils";

export default function CommentForm({
  id,
  comment,
}: {
  id: number;
  comment: CommentType;
}) {
  const [optMessage, addOpMessage] = useOptimistic<CommentType, CommentType>(
    comment,
    (state, newMessage) => [...state, ...newMessage]
  );
  const [isComment, setComment] = useState("");

  const formAction = async (formData: FormData) => {
    const tweetId = formData.get("tweetId") as string;
    const message = formData.get("comment") as string;
    const res = await commentData(message, tweetId);
    //@ts-ignore
    addOpMessage(res);
    setComment("");
  };
  const onhandleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="tweetId" value={id} />
        <textarea
          className="w-full max-h-24 bg-neutral-200 ring-2 focus:outline-none ring-orange-500 p-3"
          name="comment"
          onChange={onhandleChange}
          value={isComment}
          maxLength={500}
          rows={5}
        />
        <Button text="댓글달기" type="submit" />
      </form>
      <div className="flex flex-col gap-5">
        {optMessage.map((message) => (
          <div
            key={message.id}
            className="grid grid-cols-4 bg-slate-400 p-4 rounded-md"
          >
            <div className="flex flex-col justify-center items-center gap-2  max-w-28">
              <div className="size-10 text-2xl bg-red-500 flex justify-center items-center rounded-full">
                🧑‍💻
              </div>
              <span className="text-sm">{message.user.username}</span>
            </div>
            <p className="col-span-2">{message.comment}</p>
            <span>{formatToTimeAgo(message.created_at.toString())}</span>
          </div>
        ))}
      </div>
    </>
  );
}
