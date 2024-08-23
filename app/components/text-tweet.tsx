"use client";

import { useState } from "react";

interface TweetProps {
  text: string;
}
export default function TweetText({ text }: TweetProps) {
  const [tweet, setTweet] = useState(text);
  <form>
    <textarea
      className="w-full h-1/4 bg-neutral-200 ring-2 focus:outline-none ring-orange-500 p-3"
      name="tweet"
      maxLength={500}
      rows={5}
      value={tweet}
    />
  </form>;
}
