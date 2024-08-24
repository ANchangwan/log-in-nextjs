"use client";
import { useState } from "react";
import { TweetType } from "../(home)/page";
import TweetList from "./tweet-list";
import Button from "./Button";
import MoreTweets from "../(home)/action";

interface initialTweetsProps {
  initialTweets: TweetType;
}

export default function ListTweets({ initialTweets }: initialTweetsProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const onMoreThing = async () => {
    setIsLoading(true);
    const tweets = await MoreTweets(1);
    setTweets((prev) => [...prev, ...tweets]);
    setIsLoading(false);
  };

  return (
    <div
      className="h-screen max-w-screen-md p-11
     flex flex-col gap-2"
    >
      {tweets.map((tweet) => (
        <TweetList key={tweet.id} {...tweet} username={tweet.user.username} />
      ))}

      <button
        onClick={onMoreThing}
        disabled={isLoading}
        className="px-4 py-2 rounded-lg border-none bg-orange-500 text-white"
      >
        {isLoading ? "로딩 중..." : "Read More"}
      </button>
    </div>
  );
}
