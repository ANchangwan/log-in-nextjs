"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function getLikeTweet(tweetId: number) {
  const session = await getSession();
  try {
    const likePost = await db.like.create({
      data: {
        userId: session.id!,
        tweetId,
      },
    });
    revalidatePath(`tweets/${tweetId}`);
    return Boolean(likePost);
  } catch (e) {}
}

export async function getDislikeTweet(tweetId: number) {
  const session = await getSession();
  try {
    const dislike = await db.like.delete({
      where: {
        id: {
          userId: session.id!,
          tweetId,
        },
      },
    });
    revalidatePath(`tweets/${tweetId}`);
    return Boolean(dislike);
  } catch (e) {}
}
