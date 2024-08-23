"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const onBack = () => {
    router.back();
  };
  return (
    <div>
      <button
        className="size-8 rounded-full ring-1 bg-white text-black ring-black "
        onClick={onBack}
      >
        ⬅️
      </button>
    </div>
  );
}
