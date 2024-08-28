import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import Comments from "./comments";

interface ResponsProps {
  id: number;
}

async function getResponse(id: number) {
  const response = await db.response.findMany({
    where: {
      tweet: {
        id,
      },
    },
    select: {
      id: true,
      comment: true,
      user: {
        select: {
          username: true,
        },
      },
      created_at: true,
    },
  });
  return response;
}

export default async function ResponseList({ id }: ResponsProps) {
  const responses = await getResponse(id);

  return (
    <div className="flex flex-col gap-5">
      {responses.map((response) => (
        <Comments key={response.id} {...response} />
      ))}
    </div>
  );
}
