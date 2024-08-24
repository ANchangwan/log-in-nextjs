import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DeleteButton() {
  const session = await getSession();
  const onDelete = async (formData: FormData) => {
    "use server";
    const tweets = await db.tweet.delete({
      where: {
        id: session.id,
      },
    });
    console.log(tweets);
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
