import db from "@/lib/db";
import TweetList from "../components/tweet-list";

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
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export default async function Home() {
  const tweets = await getTweet();
  return (
    <div
      className="h-screen max-w-screen-md p-11
     flex flex-col gap-2"
    >
      {tweets.map((tweet) => (
        <TweetList key={tweet.id} {...tweet} username={tweet.user.username} />
      ))}
    </div>
  );
}
