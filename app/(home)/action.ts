"use server";

import { error } from "console";

export default async function FormAction(prevData: any, FormData: FormData) {
  await new Promise((response) => setTimeout(response, 2000));
  const password = FormData.get("password");

  if (password !== "12345") {
    return {
      errors: ["Wrong Password!!"],
    };
  } else {
    return {
      success: "Welcome Back",
    };
  }
}
