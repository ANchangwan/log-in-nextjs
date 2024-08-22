import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      username: true,
    },
  });
  if (user) {
    return user.username;
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logout = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };
  return (
    <div className="flex flex-col gap-6 h-screen justify-center items-center">
      <h1 className="text-5xl">환영합니다!! {user}</h1>
      <form
        className="p-3 w-2/4 text-center rounded-full bg-orange-500"
        action={logout}
      >
        <button>Log Out</button>
      </form>
    </div>
  );
}
