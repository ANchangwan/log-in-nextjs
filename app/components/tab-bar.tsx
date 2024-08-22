"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div
      className="fixed bottom-0 grid grid-cols-2 w-full max-w-screen-sm 
    border-neutral-600 border-t px-5 py-6
    "
    >
      <Link className="text-center" href="/">
        Tweet
      </Link>
      <Link className="text-center" href="/profile">
        Profile
      </Link>
    </div>
  );
}
