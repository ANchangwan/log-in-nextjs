import Link from "next/link";

interface TweetsProps {
  id: number;
  username: string | null;
  tweet: string;
}

export default async function TweetList({ id, username, tweet }: TweetsProps) {
  return (
    <div>
      <div className="px-4 py-3 bg-neutral-400 rounded-lg" key={id}>
        <Link className="grid grid-cols-3 gap-2" href={`/tweets/${id}`}>
          <div className="col-span- flex justify-center items-center flex-col w-20 max-w-screen-sm">
            <div className="p-5 text-2xl flex justify-center items-center bg-red-500 rounded-full size-10">
              👩‍🍳
            </div>
            <h1>{username}</h1>
          </div>
          <div className="col-span-2 flex justify-start items-start">
            <p>{tweet}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
