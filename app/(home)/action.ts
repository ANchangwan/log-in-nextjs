"use server";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .email()
    .refine((email) => email.includes("@zod.com"), {
      message: "@zod.com을 포함해주세요!!",
    }),
  username: z.string().min(5, { message: "5글자 이상 입력해주세요!!" }),
  password: z
    .string()
    .min(10, { message: "10글자 이상을 입력해주세요!!" })
    .regex(/\d/, { message: "숫자를 하나 이상 포함해야 합니다." }),
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

  const result = await loginSchema.safeParse(data);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    return { fieldErrors };
  } else {
    return {
      success: true,
    };
  }
}
