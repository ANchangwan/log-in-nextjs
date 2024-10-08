"use client";
import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
  type?: string;
}

export default function Button({
  text,
  ...isType
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      {...isType}
      className="w-full h-10 text-center font-semibold text-lg rounded-full
      focus:scale-90 focus:transition-transform
      bg-orange-400 text-white hover:scale-110 hover:transition-transform
      disabled:bg-neutral-400 disabled:text-neutral-500 disabled:opacity-70
      disabled:cursor-not-allowed
  "
    >
      {pending ? "loading..." : text}
    </button>
  );
}
