"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { z } from "zod";

const commentSchema = z
  .string()
  .max(100, { message: "100자 이상은 입력할 수 없습니다!" })
  .trim()
  .refine((comment) => comment.length > 0, { message: "빈 칸을 입력했습니다" });

export default async function commentData(prevData: any, formData: FormData) {
  const comment = formData.get("comment");
  const tweetId = formData.get("tweetId");

  const result = commentSchema.safeParse(comment);

  if (!result.success) {
    return result.error?.flatten();
  } else {
    try {
      const session = await getSession();
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
      });
    } catch (e) {
      return {
        fieldErros: {
          comment: ["다시 입력해주세요!"],
        },
      };
    }
    return comment;
  }
}
