import { setSession } from "@/lib/session";
import { ApiErrorResponse } from "@/lib/types";
import { NextResponse } from "next/server";

type SignSuccessResponse = { accessToken: string };

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const res = await fetch(`${process.env.BASE_URL}/auth/sign-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();

  if (!res.ok) {
    const { message, statusCode } = data as ApiErrorResponse;

    return NextResponse.json({ message }, { status: statusCode });
  }

  const { accessToken } = data as SignSuccessResponse;

  await setSession(accessToken);

  return NextResponse.json({ message: "Sign in successful!" }, { status: 200 });
}
