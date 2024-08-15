"use server";

import { error } from "console";

export default async function FormAction(prevData: any, FormData: FormData) {
  await new Promise((response) => setTimeout(response, 4000));
  const password = FormData.get("password");

  if (password !== "1234") {
    return {
      errors: ["Wrong Password!!"],
    };
  } else {
    return {
      success: "Welcome Back",
    };
  }
}
