import { setSession } from "@/lib/session";
import { ApiErrorResponse } from "@/types/api";

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

    return new Response(message, { status: statusCode });
  }

  const { accessToken } = data as SignSuccessResponse;

  await setSession(accessToken);

  return new Response("Ok!", { status: 200 });
}
