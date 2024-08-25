"use server";
import db from "@/lib/db";

export default async function MoreTweets(page: number) {
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
    skip: page * 1,
    orderBy: {
      created_at: "desc",
    },
  });

  return tweets;
}
