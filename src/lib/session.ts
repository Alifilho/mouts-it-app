import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: process.env.COOKIE_NAME as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  },
};

export type Session = {
  accessToken?: string;
};

export async function getSession() {
  return getIronSession<Session>(await cookies(), sessionOptions);
}

export async function setSession(accessToken: string) {
  const session = await getSession();

  session.accessToken = accessToken;

  await session.save();
}

export async function destroySession() {
  const session = await getSession();

  session.destroy();
}
