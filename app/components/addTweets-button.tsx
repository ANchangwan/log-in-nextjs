"use client";

import { useRouter } from "next/navigation";

export default function AddTweet() {
  const router = useRouter();
  const onClick = () => {
    router.push("/addTweet");
  };
  return (
    <div className="flex justify-end items-center">
      <button
        onClick={onClick}
        className="p-2 font-semibold text-md text-white  bg-blue-500 rounded-full"
      >
        Add Tweet
      </button>
    </div>
  );
}
