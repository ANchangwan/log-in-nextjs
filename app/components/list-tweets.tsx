"use client";
import { useEffect, useRef, useState } from "react";
import { TweetType } from "../(home)/page";
import TweetList from "./tweet-list";
import MoreTweets from "../(home)/action";


interface initialTweetsProps {
  initialTweets: TweetType;
}

export default function ListTweets({ initialTweets }: initialTweetsProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [page, setPage] = useState(0);
  const trigger = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const tweets = await MoreTweets(page + 1);
          if (tweets.length !== 0) {
            setPage((prev) => prev + 1);
            setTweets((prev) => [...prev, ...tweets]);
          } else {
            setIsLast(true);
          }
          setIsLoading(false);
        }
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      console.log("disconnect");
      observer.disconnect();
    };
  }, [page]);

  return (
    <div
      className="max-w-screen-md p-11
     flex flex-col gap-2"
    >
      {tweets.map((tweet) => (
        <TweetList key={tweet.id} {...tweet} username={tweet.user.username} />
      ))}

      {isLast ? null : (
        <span
          ref={trigger}
          className="px-4 mt-[300vh] z-40 mb-96 py-2 w-fit mx-auto font-semibold rounded-lg border-none bg-orange-500 text-white"
        >
          {isLoading ? "로딩 중..." : "Read More"}
        </span>
      )}
    </div>
  );
}
