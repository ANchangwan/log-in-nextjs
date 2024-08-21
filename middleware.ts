import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface MatchProps {
  [key: string]: boolean;
}

const match: MatchProps = {
  "/login": true,
  "/create-account": true,
};

export async function middleware(req: NextRequest, res: NextResponse) {
  const session = await getSession();
  const exist = match[req.nextUrl.pathname];
  if (!session.id) {
    if (!exist) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } else {
    if (exist) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
  }

  return;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
