import AddTweet from "./addTweets-button";

export default function Header() {
  return (
    <div className="grid grid-cols-3 p-7 border-b-2 border-black">
      <div></div>
      <h1 className="text-center text-3xl font-semibold">Tweets</h1>
      <AddTweet />
    </div>
  );
}
