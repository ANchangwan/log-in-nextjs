"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const checkUniqueEmail = async (email: string) => {
  const checkEmail = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(checkEmail);
};

const checkUniqueUsername = async (username: string) => {
  const checkUsername = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  console.log(!Boolean(checkUsername));
  return !Boolean(checkUsername);
};

const formSchema = z
  .object({
    username: z
      .string({
        required_error: "이름이 필수입니다!!",
        invalid_type_error: "텍스트를 입력해주세요!!",
      })
      .refine(checkUniqueUsername, { message: "이미 존재해는 username입니다" }),
    email: z
      .string()
      .email({ message: "이메일을 입력해주세요!!" })
      .refine(checkUniqueEmail, { message: "이미 존재하는 email입니다." }),
    password: z.string({ required_error: "password를 입력해주세요!" }),
    password2: z.string({ required_error: "confirm password를 입력해주세요" }),
  })
  // .superRefine(async ({ username }, ctx) => {
  //   const user = await db.user.findUnique({
  //     where: {
  //       username,
  //     },
  //     select: {
  //       id: true,
  //     },
  //   });
  //   if (!user) {
  //     ctx.addIssue({
  //       code: "custom",
  //       message: "이미 존재하는 username입니다!",
  //       path: ["username"],
  //       fatal: true,
  //     });
  //     return z.NEVER;
  //   }
  // })
  .refine((data) => data.password === data.password2, {
    message: "password가 일치하지 않습니다!",
    path: ["password2"], // path of error
  });

export default async function CreateAction(prevData: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    password2: formData.get("password2"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    const cookie = await getSession();

    cookie.id = user.id;
    await cookie.save();
    redirect("/profile");
  }
}
