import BackButton from "@/app/components/back-button";
import DeleteButton from "@/app/components/delete-button";
import UpdateButton from "@/app/components/update-button";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";
async function getUser(id: number) {
  const user = await db.tweet.findUnique({
    where: {
      id,
    },
    select: {
      tweet: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
  return user;
}

export default async function Tweet({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const user = await getUser(id);
  const session = await getSession();

  if (!user) {
    return notFound();
  }

  return (
    <div className="p-10 flex flex-col gap-3">
      <div className="grid grid-cols-3 border-b-2 border-black max-w-screen-sm pb-5">
        <BackButton />
        <div className="text-3xl">Tweet</div>
        <div></div>
      </div>
      <div className="w-full h-48 bg-neutral-200 ring-2 focus:outline-none ring-orange-500 p-3">
        {user?.tweet}
      </div>
      <div className="flex justify-between items-center">
        <div className="col-span- flex justify-center items-center flex-col w-20 max-w-screen-sm">
          <div className="p-5 text-2xl flex justify-center items-center bg-orange-500 rounded-full size-10">
            👩‍🍳
          </div>
          <h1>{user?.user.username}</h1>
        </div>
        {session.id == user?.user.id ? (
          <div className="flex gap-2">
            <UpdateButton />
            <DeleteButton />
          </div>
        ) : null}
      </div>
    </div>
  );
}
