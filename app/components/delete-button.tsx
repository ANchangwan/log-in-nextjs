import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

interface IdProps {
  id: string;
}

export default async function DeleteButton({ id }: IdProps) {
  const onDelete = async () => {
    "use server";
    const tweet = await db.tweet.delete({
      where: {
        id: +id,
      },
    });
    console.log(tweet);
    redirect("/");
  };
  return (
    <form action={onDelete}>
      <button className="px-4 py-2 rounded-lg bg-red-500 border-none text-white">
        삭제하기
      </button>
    </form>
  );
}
