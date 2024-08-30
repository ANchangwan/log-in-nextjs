"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const tweetSchema = z
  .string({
    required_error: "입력해주세요!",
  })
  .max(255, { message: "255글자 이상 입력하지 마세요!!" })
  .refine((value) => value.length > 0, { message: "빈칸 입력은 안됩니다!" });

export default async function RegisterTweet(prevData: any, formData: FormData) {
  const data = formData.get("tweet");

  const result = tweetSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    const tweet = await db.tweet.create({
      data: {
        tweet: result.data,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
    });
    redirect("/");
  }
}
