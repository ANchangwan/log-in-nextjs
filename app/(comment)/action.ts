"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { z } from "zod";
import { CommentType } from "../tweets/[id]/page";
import { revalidatePath } from "next/cache";

const commentSchema = z
  .string()
  .max(100, { message: "100자 이상은 입력할 수 없습니다!" })
  .trim()
  .refine((comment) => comment.length > 0, { message: "빈 칸을 입력했습니다" });

export default async function commentData(message: string, tweetId: string) {
  const result = commentSchema.safeParse(message);

  if (!result.success) {
    return result.error?.flatten();
  } else {
    const session = await getSession();
    try {
      const comment = await db.response.create({
        data: {
          comment: result.data,
          user: {
            connect: {
              id: session.id!,
            },
          },
          tweet: {
            connect: {
              id: +tweetId!,
            },
          },
        },
        select: {
          id: true,
          comment: true,
          created_at: true,
          user: {
            select: {
              username: true,
            },
          },
        },
      });

      // CommentType에 맞게 변환
      const formattedComment: CommentType = [
        {
          id: comment.id,
          comment: comment.comment,
          created_at: comment.created_at,
          user: {
            username: comment.user.username,
          },
        },
      ];
      revalidatePath(`tweets/${tweetId}`);
      return formattedComment;
    } catch (e) {
      throw Error;
    }
  }
}
