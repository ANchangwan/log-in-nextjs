import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import ListTweets from "../components/list-tweets";

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
    take: 25,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export type TweetType = Prisma.PromiseReturnType<typeof getTweet>;

export const dynamic = "force-dynamic";

export default async function Home() {
  const initialTweets = await getTweet();

  return (
    <div>
      <ListTweets initialTweets={initialTweets} />
    </div>
  );
}
