"use client";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HearIconSolid } from "@heroicons/react/24/solid";
import { useOptimistic } from "react";
import { getDislikeTweet, getLikeTweet } from "../tweets/[id]/action";

interface LikeProps {
  isLike: boolean;
  like: number;
  tweetId: number;
}

export default function LikeButton({ isLike, like, tweetId }: LikeProps) {
  const [state, reduceFn] = useOptimistic(
    { isLike, like },
    (previousState, payload) => ({
      isLike: !previousState.isLike,
      like: previousState.isLike
        ? previousState.like - 1
        : previousState.like + 1,
    })
  );

  const onClick = async () => {
    reduceFn(undefined);
    if (isLike) {
      await getDislikeTweet(tweetId);
    } else {
      await getLikeTweet(tweetId);
    }
  };

  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center gap-1"
    >
      {state.isLike ? (
        <HearIconSolid className="size-7 text-red-500" />
      ) : (
        <HeartIcon className="size-7" />
      )}
      <span>{state.like}</span>
    </button>
  );
}
