import db from "@/lib/db";
import TweetList from "../components/tweet-list";
import { Prisma } from "@prisma/client";
import ListTweets from "../components/list-tweets";
import Header from "../components/header";

async function getTweet() {
  const tweets = db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      user: {
        select: {
          username: true,
        },
      },
    },
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export type TweetType = Prisma.PromiseReturnType<typeof getTweet>;

export default async function Home() {
  const initialTweets = await getTweet();

  return (
    <div>
      <ListTweets initialTweets={initialTweets} />
    </div>
  );
}
