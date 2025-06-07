import { getSession } from "@/lib/session";
import { ApiErrorResponse } from "@/types/api";
import { NextResponse } from "next/server";

export async function GET() {
  const { accessToken } = await getSession();
  if (!accessToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const res = await fetch(`${process.env.BASE_URL}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    const { message, statusCode } = data as ApiErrorResponse;

    return new Response(message, { status: statusCode });
  }

  return NextResponse.json(data);
}
