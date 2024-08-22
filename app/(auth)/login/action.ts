"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { z } from "zod";
import bcryt from "bcrypt";
import { redirect } from "next/navigation";

const checkEmailUnique = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const loginSchema = z.object({
  email: z
    .string()
    .email()
    .refine((email) => email.includes("@zod.com"), {
      message: "@zod.com을 포함해주세요!!",
    })
    .refine(checkEmailUnique, { message: "이메일이 존재하지 않습니다" }),
  username: z.string().min(4, { message: "5글자 이상 입력해주세요!!" }),
  password: z.string().min(4, { message: "4글자 이상을 입력해주세요!!" }),
  // .regex(/\d/, { message: "숫자를 하나 이상 포함해야 합니다." }),
});

type FlattenedError<T> = {
  fieldErrors: Partial<Record<keyof T, string>>;
};

export default async function FormAction(prevData: any, FormData: FormData) {
  const data = {
    email: FormData.get("email"),
    username: FormData.get("username"),
    password: FormData.get("password"),
  };

  const result = await loginSchema.spa(data);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    return { fieldErrors };
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcryt.compare(
      result.data.password,
      user!.password ?? "xxxx"
    );
    if (ok) {
      const session = await getSession();
      session.id = user?.id;
      await session.save();
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["잘못된 비밀번호입니다!"],
          email: [],
        },
      };
    }
  }
}
