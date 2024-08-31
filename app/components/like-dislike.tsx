import db from "@/lib/db";
import getSession from "@/lib/session";
import LikeButton from "./like-button";

interface LikeDislikeProps {
  id: number;
}

async function getIsLike(tweetId: number) {
  const session = await getSession();
  const like = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId: session.id!,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });
  return { isLike: Boolean(like), likeCount };
}

export default async function LikeDislikeButton({ id }: LikeDislikeProps) {
  const { isLike, likeCount } = await getIsLike(id);

  return <LikeButton tweetId={id} isLike={isLike} like={likeCount} />;
}
