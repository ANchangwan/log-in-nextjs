import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionCookie {
  id?: number;
}

export default function getSession() {
  return getIronSession<SessionCookie>(cookies(), {
    cookieName: "nomad-code-challenge",
    password: process.env.COOKIE!,
  });
}
