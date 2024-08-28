import db from "@/lib/db";
import getSession from "@/lib/session";
import { HeartIcon } from "@heroicons/react/24/outline";
import { revalidatePath } from "next/cache";

interface LikeDislikeProps {
  id: number;
}

async function getLikeCount(id: number) {
  try {
    const like = await db.tweet.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });
    return like;
  } catch (e) {
    return null;
  }
}

async function getIsLike(tweetId: number) {
  try {
    const session = await getSession();
    const like = await db.like.findUnique({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });
    return Boolean(like);
  } catch (e) {
    return null;
  }
}

export default async function LikeDislikeButton({ id }: LikeDislikeProps) {
  const like = await getLikeCount(id);

  const isLike = await getIsLike(id);

  const getLikeTweet = async () => {
    "use server";
    try {
      const session = await getSession();
      const likePost = await db.like.create({
        data: {
          userId: session.id!,
          tweetId: id,
        },
      });
      revalidatePath(`tweets/${id}`);
      return Boolean(likePost);
    } catch (e) {
      return null;
    }
  };
  const getDislikeTweet = async () => {
    "use server";
    try {
      const session = await getSession();
      const dislike = await db.like.delete({
        where: {
          id: {
            userId: session.id!,
            tweetId: id,
          },
        },
      });
      revalidatePath(`tweets/${id}`);
      return Boolean(dislike);
    } catch (e) {
      return;
    }
  };

  return (
    <form action={isLike ? getDislikeTweet : getLikeTweet}>
      <button>
        <HeartIcon className="size-7" />
        <span>{like?._count.likes}</span>
      </button>
    </form>
  );
}
